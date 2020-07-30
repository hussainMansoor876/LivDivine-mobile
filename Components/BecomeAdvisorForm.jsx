import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../Redux/actions/authActions';
import { Icon, Input, Button, ListItem, Image } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay';
import { loginStyles, AdvisorStyles } from '../styles'
import client from '../Config/apollo'
import { BECOME_ADVISOR } from '../utils/authQueries'
import { categoriesArray } from '../utils/constant'
import FontIcon from 'react-native-vector-icons/FontAwesome';
import StepIndicator from 'react-native-step-indicator';
import ImagePicker from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import MediaMeta from 'react-native-media-meta';
import RNThumbnail from 'react-native-thumbnail';
import Screen from '../utils/ScreenDimensions'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { customStyles, labels, videoOptions, orderTypes } from '../utils/constant'
import { SafeAreaView } from 'react-native-safe-area-context';
import RNFetchBlob from 'react-native-fetch-blob'
import { ScrollView } from 'react-native-gesture-handler';


const BecomeAdvisorForm = (props) => {
    const { navigation } = props
    // console.log('navigation', navigation.navigate('Home'))
    const user = useSelector(state => state.authReducer.user)
    const dispatch = useDispatch();
    const [photo, setPhoto] = useState(user.image === null ? null : user.image)
    const [uploadVideo, setUploadVideo] = useState(null)
    const [showVideo, setShowVideo] = useState(false)
    const [isLoadingVideo, setLoading] = useState(true)
    const [currentTime, setCurretTime] = useState(0)
    const [categoriesData, setCategories] = useState({})
    const [ordersData, setOrders] = useState({})
    const [state, setState] = useState({
        userName: user.userName,
        title: '',
        aboutService: '',
        aboutMe: '',
        userNameErr: '',
        titleErr: '',
        aboutServiceErr: '',
        aboutMeErr: '',
        isLoading: false,
        currentPosition: 0,
        thumbnail: null,
        loadingText: 'Loading...'
    })

    const updateServer = (obj) => {
        client.mutate({ variables: obj, mutation: BECOME_ADVISOR })
            .then((res) => {
                updateField({ isLoading: false })
                const { becomeAdvisor } = res.data
                if (becomeAdvisor.success) {
                    dispatch(loginUser(becomeAdvisor.user))
                    Alert.alert(
                        'Success',
                        'Successfully Created Advisor',
                        [
                            { text: 'OK', onPress: () => navigation.navigate('Home') }
                        ],
                        { cancelable: false }
                    );
                }
                else {
                    Alert.alert(becomeAdvisor.message)
                }
            })
            .catch((e) => {
                updateField({ isLoading: false })
                Alert.alert('Oops Something Went Wrong!')
            })
    }


    const uploadFile = (file) => {
        return RNFetchBlob.fetch('POST', 'https://api.cloudinary.com/v1_1/dzkbtggax/image/upload?upload_preset=livdivine', {
            'Content-Type': 'multipart/form-data'
        }, [
            { name: 'file', filename: 'abc', data: RNFetchBlob.wrap(file) }
        ])
    }

    const uploadVideoFile = (file) => {
        return RNFetchBlob.fetch('POST', 'https://api.cloudinary.com/v1_1/dzkbtggax/video/upload?upload_preset=livdivine', {
            'Content-Type': 'multipart/form-data'
        }, [
            { name: 'file', filename: 'abc', data: RNFetchBlob.wrap(file) }
        ])
    }

    const handleChoosePhoto = () => {
        const options = {
            noData: true,
        }
        ImageCropPicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        })
            .then(image => {
                setPhoto(image.path)
            })
    }

    const updateLoading = (e) => {
        if (currentTime === e.currentTime) {
            setLoading(true)
        }
        else {
            setLoading(false)
        }
        setCurretTime(e.currentTime)
    }

    const handleChooseVideo = () => {
        ImagePicker.showImagePicker(videoOptions, response => {
            if (response.uri) {
                const path = response.path
                const maxTime = 180000;
                MediaMeta.get(path)
                    .then((metadata) => {
                        if (metadata.duration > maxTime) {
                            Alert.alert(
                                'Sorry',
                                'Video duration must be less then 3 minutes',
                                [
                                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                                ],
                                { cancelable: false }
                            );
                        } else {
                            setUploadVideo(response.uri)
                            RNThumbnail.get(response.path)
                                .then((res) => {
                                    updateField({ thumbnail: res.path })
                                })
                        }
                    })
                    .catch(err => console.error(err));
            }
        })
    }

    const updateFieldSteps = (e) => {
        const { currentPosition, userName, title, aboutMe, aboutService } = state
        if (e === 'left') {
            return updateField({ currentPosition: currentPosition - 1 })
        }
        if (currentPosition === 0) {
            if (!userName.length || userName.length < 4) {
                return updateField({ userNameErr: 'Minimum 4 Characters required!' })
            }
            else if (!title.length || title.length < 4) {
                return updateField({ titleErr: 'Minimum 4 Characters required!' })
            }
            else if (photo === null) {
                return Alert.alert('Please upload an image!')
            }
        }
        else if (currentPosition === 1) {
            if (!aboutService.length || aboutService.length < 4) {
                return updateField({ aboutServiceErr: 'Minimum 4 Characters required!' })
            }
            else if (!aboutMe.length || aboutMe.length < 4) {
                return updateField({ aboutMeErr: 'Minimum 4 Characters required!' })
            }
        }
        else if (currentPosition === 2) {
            if (!getObjLength(ordersData)) {
                return Alert.alert('Please select minimum 1 order!')
            }
        }
        else if (currentPosition === 3) {
            if (!uploadVideo) {
                return Alert.alert('Please record or upload video!')
            }
        }
        else if (currentPosition === 4) {
            if (!getObjLength(categoriesData)) {
                return Alert.alert('Please select minimum 1 category!')
            }
            else {
                updateField({ isLoading: true })
                return registerAdvisor()
            }
        }
        else {
            updateField({ isLoading: true })
            return registerAdvisor()
        }
        if (e === 'right') {
            updateField({ currentPosition: currentPosition + 1 })
        }
    }

    const uploadCloud = async () => {
        if (photo.indexOf('https://res.cloudinary.com') === -1) {
            await uploadFile(photo)
                .then(response => response.json())
                .then((result) => {
                    setPhoto(result.secure_url)
                })
        }
        await uploadFile(state.thumbnail)
            .then(response => response.json())
            .then((result) => {
                updateField({ thumbnail: result.secure_url })
            })
        // await uploadVideoFile(uploadVideo)
        //     .then(response => response.json())
        //     .then((result) => {
        //         setUploadVideo(result.secure_url)
        //     })
    }

    const registerAdvisor = async () => {
        await uploadCloud()
        const { userName, title, aboutMe, aboutService, thumbnail } = state
        const { id } = user
        updateServer({ id, userName, title, image: photo, thumbnail, aboutService, aboutMe })
    }

    const getObjLength = (obj) => Object.values(obj).filter(v => v).length

    const updateField = (obj) => {
        setState({
            ...state,
            ...obj
        })
    }

    const updateCategories = (obj) => {
        if (getObjLength(categoriesData) >= 3) {
            return Alert.alert('Maximum 3 categories Allowed!')
        }
        setCategories({
            ...categoriesData,
            ...obj
        })
    }

    const goBack = () => {
        setShowVideo(false)
        setLoading(true)
    }

    const updateOrders = (obj) => {
        setOrders({
            ...ordersData,
            ...obj
        })
    }

    const viewList = (v) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: Screen.width - 90 }}>
                <Text style={{ fontSize: 12 }}>{v.subtitle}</Text>
                <Text>{v.price}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={loginStyles.setFlex}>
            <Spinner
                visible={state.isLoading}
                textContent={state.loadingText}
                textStyle={loginStyles.spinnerTextStyle}
            />
            {showVideo ? <View style={{ height: Screen.height, backgroundColor: '#000' }}>
                <TouchableOpacity onPress={goBack} style={AdvisorStyles.leftIcon}>
                    <Icon
                        type="font-awesome"
                        color="#fff"
                        name="chevron-left"
                        iconStyle={{ zIndex: 9999 }}
                    />
                </TouchableOpacity>
                {isLoadingVideo ? <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: Screen.height, position: 'absolute' }}>
                    <ActivityIndicator
                        color="#fff"
                        size="small"
                        style={AdvisorStyles.ActivityIndicatorStyle}
                    />
                </View> : null}
                <Video
                    source={{ uri: uploadVideo }}
                    style={{ marginTop: Screen.height / 4, height: Screen.height / 2, width: Screen.width }}
                    controls
                    resizeMode="contain"
                    onProgress={updateLoading}
                />
            </View> :
                <ScrollView style={loginStyles.loginView}>
                    <Spinner
                        visible={state.isLoading}
                        textContent={'Loading...'}
                        textStyle={loginStyles.spinnerTextStyle}
                    />
                    <Text style={{ textAlign: 'center', fontSize: 24, marginBottom: 20, marginTop: 20, textDecorationLine: 'underline' }}>Become Advisor</Text>
                    <StepIndicator
                        customStyles={customStyles}
                        currentPosition={state.currentPosition}
                        labels={labels}
                    />
                    <View style={{ marginTop: 30 }}>
                        {state.currentPosition === 0 ? <View>
                            <Input
                                placeholder="Full Name"
                                inputContainerStyle={{ ...loginStyles.inputLogin, borderColor: state.userNameErr ? 'red' : '#000000' }}
                                onChangeText={e => updateField({ userName: e })}
                                value={state.userName}
                                errorMessage={state.userNameErr}
                                onFocus={() => updateField({ userNameErr: '' })}
                                leftIcon={
                                    <Icon
                                        name='user'
                                        size={24}
                                        color='black'
                                        type='font-awesome'
                                    />
                                }
                            />
                            <Input
                                placeholder="Title"
                                inputContainerStyle={{ ...loginStyles.inputLogin, borderColor: state.titleErr ? 'red' : '#000000' }}
                                onChangeText={e => updateField({ title: e })}
                                value={state.title}
                                errorMessage={state.titleErr}
                                onFocus={() => updateField({ titleErr: '' })}
                                leftIcon={
                                    <FontIcon
                                        name='slack'
                                        size={24}
                                        color='black'
                                    />
                                }
                            />

                            {photo && (
                                <Image
                                    source={{ uri: photo }}
                                    style={{ width: 150, height: 150, marginRight: 10, marginLeft: 10, borderRadius: 250 }}
                                />
                            )}
                            <Button title="Choose Photo" buttonStyle={{ ...loginStyles.loginBtn, width: 150 }} onPress={handleChoosePhoto} />
                        </View> : state.currentPosition === 1 ? <View>
                            <Input
                                placeholder="About my services"
                                multiline={true}
                                numberOfLines={4}
                                inputContainerStyle={{ ...loginStyles.inputLogin, borderColor: state.aboutServiceErr ? 'red' : '#000000' }}
                                onChangeText={e => updateField({ aboutService: e })}
                                value={state.aboutService}
                                errorMessage={state.aboutServiceErr}
                                onFocus={() => updateField({ aboutServiceErr: '' })}
                            />
                            <Input
                                placeholder="Aboutme"
                                multiline={true}
                                numberOfLines={4}
                                inputContainerStyle={{ ...loginStyles.inputLogin, borderColor: state.aboutMeErr ? 'red' : '#000000' }}
                                onChangeText={e => updateField({ aboutMe: e })}
                                value={state.aboutMe}
                                errorMessage={state.aboutMeErr}
                                onFocus={() => updateField({ aboutMeErr: '' })}
                            />
                        </View> : state.currentPosition === 2 ? <View>
                            <Text style={{ textAlign: 'center' }}>Select Minimum 1 Order Type</Text>
                            {orderTypes.map((v, i) => {
                                return (
                                    <TouchableOpacity onPress={() => updateOrders({ [v.title]: !ordersData[v.title] })}>
                                        <ListItem
                                            key={i}
                                            // leftAvatar={{ source: { uri: l.avatar_url } }}
                                            title={v.title}
                                            subtitle={viewList(v)}
                                            bottomDivider
                                            checkmark={ordersData[v.title]}
                                        />
                                    </TouchableOpacity>
                                )
                            })}
                        </View> : state.currentPosition === 3 ? <View>
                            {state.thumbnail && (
                                <View style={{ justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => setShowVideo(true)} style={{ height: 230, width: Screen.width }}>
                                        <Image
                                            source={{ uri: state.thumbnail }}
                                            style={{ height: 230, width: Screen.width, resizeMode: 'cover' }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setShowVideo(true)} style={AdvisorStyles.playButton}>
                                        <MaterialIcon style={{ color: '#fff' }} name="play-arrow" size={42} />
                                    </TouchableOpacity>
                                </View>
                            )}
                            <Button title="Record or Choose Video" buttonStyle={{ ...loginStyles.loginBtn, width: 150 }} onPress={handleChooseVideo} />
                            <Text>Briefly tell potential clients about your service. Make sure that the video and the audio clear and give it your best effort</Text>
                        </View> : state.currentPosition === 4 ? <View>
                            <Text style={{ textAlign: 'center' }}>Select Categories (3 Max)</Text>
                            {categoriesArray.map((v, i) => {
                                return (
                                    <TouchableOpacity onPress={() => updateCategories({ [v.name]: !categoriesData[v.name] })}>
                                        <ListItem
                                            key={i}
                                            // leftAvatar={{ source: { uri: l.avatar_url } }}
                                            title={v.name}
                                            bottomDivider
                                            checkmark={categoriesData[v.name]}
                                        />
                                    </TouchableOpacity>
                                )
                            })}
                        </View> : null}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Button icon={
                            <FontIcon
                                name='arrow-left'
                                size={24}
                                color='#fff'
                            />
                        }
                            buttonStyle={{ width: 150 }}
                            disabled={!state.currentPosition}
                            onPress={() => updateFieldSteps('left')}
                        />
                        <Button icon={
                            <FontIcon
                                name='arrow-right'
                                size={24}
                                color='#fff'
                            />
                        }
                            buttonStyle={{ width: 150 }}
                            onPress={() => updateFieldSteps('right')}
                            disabled={state.currentPosition === 5}
                        />
                    </View>
                </ScrollView>}
        </SafeAreaView>
    );
};


export default BecomeAdvisorForm;