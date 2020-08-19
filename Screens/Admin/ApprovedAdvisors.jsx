import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../../Redux/actions/authActions';
import { LoginForm, SocialLogin, SettingsForm, ChangePassword } from '../../Components'
import { loginStyles, AdvisorStyles } from '../../styles'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Icon, Button, ListItem } from 'react-native-elements'

const list = [
    {
        title: 'Appointments',
        icon: 'av-timer'
    },
    {
        title: 'Trips',
        icon: 'flight-takeoff'
    }
]


const AdvisorProfile = (props) => {
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(true)
    const [currentTime, setCurretTime] = useState(0)
    const [showVideo, setShowVideo] = useState(false)

    const updateLoading = (e) => {
        if (currentTime === e.currentTime) {
            setCurretTime(e.currentTime)
            setLoading(true)
        }
        else {
            setCurretTime(e.currentTime)
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={loginStyles.setFlex}>
            <View>
                {
                    list.map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.title}
                            leftIcon={{ name: item.icon }}
                            bottomDivider
                            chevron={
                                <Button title="View Profile" buttonStyle={AdvisorStyles.btnStyle} />
                            }
                        />
                    ))
                }
            </View>
        </SafeAreaView>
    );
};

export default AdvisorProfile;
