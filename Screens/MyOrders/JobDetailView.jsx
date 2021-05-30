import React, { useState, useRef } from 'react'
import { SafeAreaView, ScrollView, Text, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import FeatherIcon from 'react-native-vector-icons/Feather'
import AntdIcon from 'react-native-vector-icons/AntDesign'
import * as Animatable from 'react-native-animatable'
import { loginStyles, AdvisorStyles } from '../../styles'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Icon, Button, Rating } from 'react-native-elements'
import Video from 'react-native-video'
import Screen from '../../utils/ScreenDimensions'
import { appColor } from '../../utils/constant'
import { LiveChat } from '..'

const AnimatedIcon = Animatable.createAnimatableComponent(AntdIcon)

const JobDetailView = (props) => {
    const user = useSelector(state => state.authReducer.user)
    const { backPress } = props
    const smallAnimatedIcon = useRef()
    const [isLoading, setLoading] = useState(true)
    const [currentTime, setCurretTime] = useState(0)
    const [showVideo, setShowVideo] = useState(false)
    const [liked, setLiked] = useState(false)
    const [showChat, setShowChat] = useState(false)

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

    const handleOnPressLike = async () => {
        setLiked(!liked)
        smallAnimatedIcon.current.bounceIn()
    }

    const validateOrder = (orderType) => {
        if (orderType.toLowerCase() === 'live chat') {
            setShowChat(true)
        }
    }

    if (showChat) {
        return (
            <LiveChat {...props} />
        )
    }

    return (
        <SafeAreaView style={loginStyles.setFlex}>
            <View style={AdvisorStyles.headerView}>
                <FeatherIcon
                    name='arrow-left'
                    size={30}
                    color='#fff'
                    onPress={backPress}
                />
                <Text style={{ color: '#fff', fontSize: 20, alignSelf: 'center' }}>{'Rush Video'}</Text>
                <Text></Text>
            </View>
            {showVideo ? <View style={{ height: Screen.height, backgroundColor: '#000' }}>
                <TouchableOpacity onPress={() => setShowVideo(false)} style={AdvisorStyles.leftIcon}>
                    <Icon
                        type='font-awesome'
                        color='#fff'
                        name='chevron-left'
                        iconStyle={{ zIndex: 9999 }}
                    />
                </TouchableOpacity>
                {isLoading ? <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: Screen.height, position: 'absolute' }}>
                    <ActivityIndicator
                        color='#fff'
                        size='small'
                        style={AdvisorStyles.ActivityIndicatorStyle}
                    />
                </View> : null}
                {/* <Video
                    source={{ uri: advisor.video }}
                    style={{ marginTop: Screen.height / 4, height: Screen.height / 2, width: Screen.width }}
                    controls
                    resizeMode='stretch'
                    onProgress={updateLoading}
                /> */}
            </View> :
                <ScrollView style={loginStyles.setFlex}>
                    <TouchableOpacity onPress={() => setShowVideo(true)} style={{ height: 230, width: Screen.width }}>
                        <Image
                            source={{ uri: `'https://res.cloudinary.com/dklfq58uq/image/upload/v1567608968/sample.jpg'` }}
                            style={{ height: 230, width: Screen.width, resizeMode: 'cover' }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowVideo(true)} style={AdvisorStyles.playButton}>
                        <MaterialIcon style={{ color: '#fff' }} name='play-arrow' size={42} />
                    </TouchableOpacity>
                    <View style={{ ...AdvisorStyles.setFlex, ...AdvisorStyles.viewProfile, paddingBottom: 20 }}>
                        <Image
                            source={{ uri: `'https://res.cloudinary.com/dklfq58uq/image/upload/v1567608968/sample.jpg'` }}
                            style={AdvisorStyles.profileImage}
                        />
                    </View>
                    <View style={{ ...AdvisorStyles.setFlex, ...AdvisorStyles.viewProfile, paddingTop: 20, borderTopColor: 'rgba(0, 0, 0, 0.1)', borderTopWidth: 0.5, justifyContent: 'space-between', flexDirection: 'column' }}>
                        <View style={AdvisorStyles.modalView}>
                            <Text style={{ ...AdvisorStyles.orderText, fontWeight: 'bold' }}>Mansoor Hussain</Text>
                            <Text style={AdvisorStyles.orderText}>$5</Text>
                        </View>
                        <View style={AdvisorStyles.modalView}>
                            <Text style={AdvisorStyles.orderText}>Rush Video</Text>
                            <Text style={AdvisorStyles.orderText}>Completed</Text>
                        </View>
                    </View>
                    <View style={{ ...AdvisorStyles.setFlex, ...AdvisorStyles.viewProfile, paddingTop: 20, borderTopColor: 'rgba(0, 0, 0, 0.1)', borderTopWidth: 0.5, justifyContent: 'space-between', flexDirection: 'column' }}>
                        <View style={AdvisorStyles.modalView}>
                            <Text style={{ ...AdvisorStyles.orderText, fontWeight: 'bold' }}>Advisor Feedback</Text>
                            <Rating imageSize={20} readonly startingValue={5} />
                        </View>
                        <Text style={AdvisorStyles.aboutText}>{'Very good person'}</Text>
                    </View>
                    <View style={{ ...AdvisorStyles.setFlex, ...AdvisorStyles.viewProfile, paddingTop: 20, borderTopColor: 'rgba(0, 0, 0, 0.1)', borderTopWidth: 0.5, justifyContent: 'space-between', flexDirection: 'column' }}>
                        <View style={AdvisorStyles.modalView}>
                            <Text style={{ ...AdvisorStyles.orderText, fontWeight: 'bold' }}>Your Feedback</Text>
                            <Rating imageSize={20} readonly startingValue={5} />
                        </View>
                        <Text style={AdvisorStyles.aboutText}>{'Very good person'}</Text>
                    </View>
                </ScrollView>}
        </SafeAreaView>
    )
}

export default JobDetailView
