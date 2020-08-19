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
    const [allAdvisors, setAllAdvisors] = useState([])
    const [showAdvisor, setShowAdvisor] = useState(false)
    const [advisor, setAdvisor] = useState({})

    useEffect(() => {
        client.query({ variables: { userId: '891ecf72-8c28-4ce9-a77a-53cd1f33dc38', isApproved: true }, query: GET_ADVISORS })
            .then((res) => {
                const { getAllAdvisorForAdmin } = res.data
                if (getAllAdvisorForAdmin?.user?.length) {
                    setAllAdvisors(getAllAdvisorForAdmin.user)
                }
                setLoading(false)
            })
    })

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
            <View>
                {
                    allAdvisors.map((item, i) => (
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
            </View>
            {isLoading ? <ActivityIndicator
                color="rgba(0, 0, 0, 0.5)"
                size="small"
                style={AdvisorStyles.activityStyle}
            /> : null}
        </SafeAreaView>
    );
};

export default ApprovedAdvisors;
