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
import { orderTypes, appColor } from '../../utils/constant'


const ViewAdvisor = (props) => {
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch()
    const advisor = props.advisor
    const [isLoading, setLoading] = useState(true)
    const [currentTime, setCurretTime] = useState(0)
    const [showVideo, setShowVideo] = useState(false)
    console.log(advisor)
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
            {showVideo ? <View style={{ height: Screen.height, backgroundColor: '#000' }}>
                <TouchableOpacity onPress={() => setShowVideo(false)} style={AdvisorStyles.leftIcon}>
                    <Icon
                        type="font-awesome"
                        color="#fff"
                        name="chevron-left"
                        iconStyle={{ zIndex: 9999 }}
                    />
                </TouchableOpacity>
                {isLoading ? <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: Screen.height, position: 'absolute' }}>
                    <ActivityIndicator
                        color="#fff"
                        size="small"
                        style={AdvisorStyles.ActivityIndicatorStyle}
                    />
                </View> : null}
                <Video
                    source={{ uri: 'https://res.cloudinary.com/dzkbtggax/video/upload/v1595798886/zyomzszkxsban4sgu1yo.mp4' }}
                    style={{ marginTop: Screen.height / 4, height: Screen.height / 2, width: Screen.width }}
                    controls
                    resizeMode="stretch"
                    onProgress={updateLoading}
                />
            </View> :
                <ScrollView style={loginStyles.setFlex}>
                    <TouchableOpacity onPress={() => setShowVideo(true)} style={{ height: 230, width: Screen.width }}>
                        <Image
                            source={{ uri: 'https://res.cloudinary.com/dhspait8a/image/upload/v1595100989/cwbwopm3ys9hpkjaajw1.jpg' }}
                            style={{ height: 230, width: Screen.width, resizeMode: 'cover' }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowVideo(true)} style={AdvisorStyles.playButton}>
                        <MaterialIcon style={{ color: '#fff' }} name="play-arrow" size={42} />
                    </TouchableOpacity>
                    <View style={{ ...AdvisorStyles.setFlex, ...AdvisorStyles.viewProfile, paddingBottom: 20 }}>
                        <Image
                            source={{ uri: advisor.image }}
                            style={AdvisorStyles.profileImage}
                        />
                        <View style={AdvisorStyles.orderView}>
                            <Text style={{ ...AdvisorStyles.orderText, fontWeight: 'bold' }}>{advisor.userName}</Text>
                            <Text>{advisor.title}</Text>
                        </View>
                    </View>
                    {orderTypes.map((v, i) => {
                        return (
                            <View key={i} style={{ ...AdvisorStyles.setFlex, ...AdvisorStyles.viewProfile, paddingTop: 20, borderTopColor: 'rgba(0, 0, 0, 0.5)', borderTopWidth: 0.5, justifyContent: 'space-between', paddingBottom: 10 }}>
                                <View style={AdvisorStyles.orderView}>
                                    <Text style={AdvisorStyles.orderText}>{v.title}</Text>
                                    <Text style={AdvisorStyles.titleColor}>{v.subtitle}</Text>
                                </View>
                                <Button title={v.orderPrice} containerStyle={{ width: 105 }} buttonStyle={{ backgroundColor: appColor }} />
                            </View>
                        )
                    })}
                    <View style={{ ...AdvisorStyles.setFlex, ...AdvisorStyles.viewProfile, paddingTop: 20, borderTopColor: 'rgba(0, 0, 0, 0.1)', borderTopWidth: 0.5, justifyContent: 'space-between', flexDirection: 'column' }}>
                        <Text style={{ ...AdvisorStyles.orderText, fontWeight: 'bold' }}>ABOUT MY SERVICES</Text>
                        <Text style={AdvisorStyles.aboutText}>{advisor.aboutService}
                        </Text>
                    </View>
                    <View style={{ ...AdvisorStyles.setFlex, ...AdvisorStyles.viewProfile, paddingTop: 20, borderTopColor: 'rgba(0, 0, 0, 0.1)', borderTopWidth: 0.5, justifyContent: 'space-between', flexDirection: 'column' }}>
                        <Text style={{ ...AdvisorStyles.orderText, fontWeight: 'bold' }}>ABOUT ME</Text>
                        <Text style={AdvisorStyles.aboutText}>{advisor.aboutMe}
                        </Text>
                    </View>
                    <View style={{ ...AdvisorStyles.setFlex, ...AdvisorStyles.viewProfile, paddingTop: 20, borderTopColor: 'rgba(0, 0, 0, 0.1)', borderTopWidth: 0.5, justifyContent: 'space-between', flexDirection: 'column' }}>
                        <Text style={{ ...AdvisorStyles.orderText, fontWeight: 'bold' }}>CATEGORIES</Text>
                        <Text style={AdvisorStyles.aboutText}>Relationship coaching psychic</Text>
                    </View>
                </ScrollView>}
        </SafeAreaView>
    );
};

export default ViewAdvisor;
