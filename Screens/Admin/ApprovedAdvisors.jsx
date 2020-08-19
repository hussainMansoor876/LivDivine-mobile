import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../../Redux/actions/authActions';
import { LoginForm, SocialLogin, SettingsForm, ChangePassword } from '../../Components'
import { loginStyles, AdvisorStyles } from '../../styles'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Icon, Button } from 'react-native-elements'
import Video from 'react-native-video';
import Screen from '../../utils/ScreenDimensions'
import { appColor } from '../../utils/constant'


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
            <View style={{ ...AdvisorStyles.viewProfile, paddingTop: 20, borderTopColor: 'rgba(0, 0, 0, 0.5)', borderTopWidth: 0.5, justifyContent: 'space-between', paddingBottom: 10, flexDirection: 'row' }}>
                <View style={AdvisorStyles.orderView}>
                    <Text style={AdvisorStyles.orderText}>v.title</Text>
                    <Text style={AdvisorStyles.titleColor}>v.subtitle</Text>
                </View>
                <Button title="v.orderPrice" containerStyle={{ width: 105 }} buttonStyle={{ backgroundColor: appColor }} />
            </View>
        </SafeAreaView>
    );
};

export default AdvisorProfile;
