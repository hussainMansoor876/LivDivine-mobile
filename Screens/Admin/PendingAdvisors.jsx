import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../../Redux/actions/authActions';
import { loginStyles, AdvisorStyles } from '../../styles'
import { Icon, Button, ListItem } from 'react-native-elements'
import { GET_ADVISORS } from '../../utils/getQueries'
import { UPDATE_STATUS } from '../../utils/updateMutations'
import Spinner from 'react-native-loading-spinner-overlay';
import client from '../../Config/apollo'


const PendingAdvisors = (props) => {
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(false)
    const [updateList, setUpdateList] = useState(true)
    const [spin, setSpin] = useState(false)
    let [allAdvisors, setAllAdvisors] = useState([])

    useEffect(() => {
        client.query({ variables: { adminId: '421c6267-7911-4686-91fe-fe424e8efe00', isApproved: false }, query: GET_ADVISORS })
            .then((res) => {
                const { getAllAdvisorForAdmin } = res.data
                if (getAllAdvisorForAdmin?.user?.length) {
                    setAllAdvisors(getAllAdvisorForAdmin.user)
                }
                setLoading(false)
            })
    })

    const updateStatus = (userId, status) => {
        setSpin(true)
        client.mutate({ variables: { userId, adminId: '421c6267-7911-4686-91fe-fe424e8efe00', status }, mutation: UPDATE_STATUS })
            .then((res) => {
                const { approvedAdvisor } = res.data
                if (approvedAdvisor.success) {
                    setAllAdvisors([])
                    setLoading(true)
                    setSpin(false)
                    client.query({ variables: { adminId: '421c6267-7911-4686-91fe-fe424e8efe00', isApproved: false }, query: GET_ADVISORS })
                        .then((res) => {
                            const { getAllAdvisorForAdmin } = res.data
                            if (getAllAdvisorForAdmin?.user?.length) {
                                setAllAdvisors(getAllAdvisorForAdmin.user)
                            }
                            setLoading(false)
                        })
                }
                else {
                    Alert.alert('Oops Something Went Wrong!')
                    setSpin(false)
                }
            })
            .catch((e) => {
                Alert.alert('Oops Something Went Wrong!')
                setSpin(false)
            })
    }

    return (
        <SafeAreaView style={loginStyles.setFlex}>
            <Spinner
                visible={spin}
                textContent={'Loading...'}
                textStyle={loginStyles.spinnerTextStyle}
            />
            {allAdvisors.map((item, i) => (
                <ListItem
                    key={i}
                    title={item.userName}
                    leftAvatar={{ source: { uri: item.image } }}
                    bottomDivider
                    chevron={
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 150 }}>
                            <Button
                                title="Approve"
                                onPress={() => updateStatus(item.id, true)}
                            />
                            <Button
                                title="Cancel"
                                onPress={() => updateStatus(item.id, false)}
                                buttonStyle={{ backgroundColor: '#d9534f' }}
                            />
                        </View>
                    }
                />
            ))}
            {
                isLoading && !allAdvisors.length ? <ActivityIndicator
                    color="rgba(0, 0, 0, 0.5)"
                    size="small"
                    style={AdvisorStyles.activityStyle}
                /> : !isLoading && !allAdvisors.length ? <View style={AdvisorStyles.container}>
                    <Text>No Advisor found!</Text>
                </View> : null
            }
        </SafeAreaView >
    );
};

export default PendingAdvisors;
