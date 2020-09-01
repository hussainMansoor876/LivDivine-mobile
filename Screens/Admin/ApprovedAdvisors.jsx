import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../../Redux/actions/authActions';
import { loginStyles, AdvisorStyles } from '../../styles'
import { Icon, Button, ListItem } from 'react-native-elements'
import { GET_ADVISORS } from '../../utils/getQueries'
import client from '../../Config/apollo'
import ViewAdvisor from './ViewAdvisor'

const ApprovedAdvisors = (props) => {
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(true)
    const [showAdvisor, setShowAdvisor] = useState(false)
    const [advisor, setAdvisor] = useState({})
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
        client.query({ variables: { adminId: '421c6267-7911-4686-91fe-fe424e8efe00', isApproved: true }, query: GET_ADVISORS })
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

    const showProfile = (user) => {
        setAdvisor(user)
        setShowAdvisor(true)
    }

    if (showAdvisor) {
        return (
            <ViewAdvisor {...props} advisor={advisor} cancelView={() => setShowAdvisor(false)} />
        )
    }

    return (
        <SafeAreaView style={loginStyles.setFlex}>
            <ScrollView>
                {
                    state.allAdvisors.map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.userName}
                            leftAvatar={{ source: { uri: item.image } }}
                            bottomDivider
                            chevron={
                                <Button
                                    title="View Profile"
                                    buttonStyle={AdvisorStyles.btnStyle}
                                    onPress={() => showProfile(item)}
                                />
                            }
                        />
                    ))
                }
            </ScrollView>
            {isLoading && !state.allAdvisors.length ? <ActivityIndicator
                color="rgba(0, 0, 0, 0.5)"
                size="small"
                style={AdvisorStyles.activityStyle}
            /> : !isLoading && !state.allAdvisors.length ? <View style={AdvisorStyles.container}>
                <Text>No Advisor found!</Text>
            </View> : null}
        </SafeAreaView>
    );
};

export default ApprovedAdvisors;
