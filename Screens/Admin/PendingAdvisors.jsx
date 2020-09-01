import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View, Alert, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
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
    const [isLoading, setLoading] = useState(true)
    const [updateList, setUpdateList] = useState(true)
    const [spin, setSpin] = useState(false)
    const [state, setState] = useState({
        allAdvisors: []
    })

    useEffect(() => {
        getData()
    },[])

    const updateField = (obj) => {
        setState({
            ...state,
            ...obj
        })
    }

    const getData = () => {
        client.query({ variables: { adminId: '421c6267-7911-4686-91fe-fe424e8efe00', isApproved: false }, query: GET_ADVISORS })
            .then((res) => {
                const { getAllAdvisorForAdmin } = res.data
                if (getAllAdvisorForAdmin?.user?.length) {
                    updateField({ allAdvisors: getAllAdvisorForAdmin.user })
                }
                setLoading(false)
            })
            .catch((e) => {
                Alert.alert('Oops Something Went Wrong!')
                setLoading(false)
            })
    }

    const updateStatus = (userId, status) => {
        setSpin(true)
        client.mutate({ variables: { userId, adminId: '421c6267-7911-4686-91fe-fe424e8efe00', status }, mutation: UPDATE_STATUS })
            .then((res) => {
                const { approvedAdvisor } = res.data
                if (approvedAdvisor.success) {
                    let { allAdvisors } = state
                    allAdvisors = allAdvisors.filter(v => v.id !== userId)
                    updateField({ allAdvisors })
                    setSpin(false)
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
            <ScrollView>
                {state.allAdvisors.map((v, i) => {
                    return (
                        <View key={i} style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, backgroundColor: '#fff', borderBottomColor: 'rgba(0, 0, 0, 0.5)', borderBottomWidth: 0.5, justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    source={{ uri: v.image }}
                                    style={{ width: 50, height: 50, marginRight: 10, marginLeft: 10, borderRadius: 250 }}
                                />
                                <Text style={{ fontSize: 16, marginTop: 12 }}>{v.userName}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 150, marginRight: 10 }}>
                                <Button
                                    title="Approve"
                                    onPress={() => updateStatus(v.id, true)}
                                />
                                <Button
                                    title="Cancel"
                                    onPress={() => updateStatus(v.id, false)}
                                    buttonStyle={{ backgroundColor: '#d9534f' }}
                                />
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
            {
                isLoading && !state.allAdvisors.length ? <ActivityIndicator
                    color="rgba(0, 0, 0, 0.5)"
                    size="small"
                    style={AdvisorStyles.activityStyle}
                /> : !isLoading && !state.allAdvisors.length ? <View style={AdvisorStyles.container}>
                    <Text>No Advisor found!</Text>
                </View> : null
            }
        </SafeAreaView >
    );
};

export default PendingAdvisors;
