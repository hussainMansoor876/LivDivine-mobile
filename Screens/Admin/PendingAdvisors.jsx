import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../../Redux/actions/authActions';
import { loginStyles, AdvisorStyles } from '../../styles'
import { Icon, Button, ListItem } from 'react-native-elements'
import { GET_ADVISORS } from '../../utils/getQueries'
import client from '../../Config/apollo'


const PendingAdvisors = (props) => {
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(true)
    const [allAdvisors, setAllAdvisors] = useState([])

    useEffect(() => {
        client.query({ variables: { userId: '891ecf72-8c28-4ce9-a77a-53cd1f33dc38', isApproved: false }, query: GET_ADVISORS })
            .then((res) => {
                const { getAllAdvisorForAdmin } = res.data
                if (getAllAdvisorForAdmin?.user?.length) {
                    setAllAdvisors(getAllAdvisorForAdmin.user)
                }
                setLoading(false)
            })
    })

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
                                <Button title="View Profile" buttonStyle={AdvisorStyles.btnStyle} />
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

export default PendingAdvisors;
