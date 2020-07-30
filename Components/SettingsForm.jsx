import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../Redux/actions/authActions';
import { Input, Button, Icon, Image } from 'react-native-elements'
import client from '../Config/apollo'
import { loginStyles, settingsStyles } from '../styles'
import Spinner from 'react-native-loading-spinner-overlay';
import { UPDATE_USER } from '../utils/authQueries'
import FontIcon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'react-native-fetch-blob'

const SettingsForm = (props) => {
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        userName: user.userName,
        userNameErr: '',
        isLoading: false,
        photo: user.image ? user.image : null
    })


    const updateServer = (obj) => {
        client.mutate({ variables: obj, mutation: UPDATE_USER })
            .then((res) => {
                updateField({ isLoading: false })
                const { updateUser } = res.data
                if (updateUser.success) {
                    dispatch(loginUser(updateUser.user))
                    Alert.alert('Successfully Update Settings!')
                }
                else {
                    Alert.alert('Oops Something Went Wrong!')
                }
            })
            .catch((e) => Alert.alert('Oops Something Went Wrong!'))
    }


    const updateSetting = async () => {
        const { userName, photo } = state
        const { id } = user
        if (!userName.length || userName.length < 4) {
            return updateField({ userNameErr: 'Minimum 4 Characters required!' })
        }
        updateField({ isLoading: true })
        if (photo !== null) {
            if (photo.indexOf('https://res.cloudinary.com') === -1) {
                uploadFile(photo)
                    .then(response => response.json())
                    .then((result) => {
                        updateServer({ id, userName, photo: result.secure_url })
                        updateField({ photo: result.secure_url, isLoading: false })
                    })
                    .catch((e) => {
                        Alert.alert('Oops Something Went Wrong!')
                        updateField({ isLoading: false })
                    })
            }
            else {
                updateServer({ id, userName })
                updateField({ isLoading: false })
            }

        }
        else {
            updateServer({ id, userName })
        }
    }

    const handleChoosePhoto = async () => {
        const options = {
            noData: true,
            quality: 0.5
        }
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        })
            .then(image => {
                updateField({ photo: image.path })
            });
        // ImagePicker.showImagePicker(options, response => {
        //     console.log('response', response)
        //     if (response.uri) {
        //         updateField({ photo: response.uri })
        //     }
        // })
    }

    const uploadFile = (file) => {
        return RNFetchBlob.fetch('POST', 'https://api.cloudinary.com/v1_1/dzkbtggax/image/upload?upload_preset=livdivine', {
            'Content-Type': 'multipart/form-data'
        }, [
            { name: 'file', filename: 'abc.jpg', data: RNFetchBlob.wrap(file), height: 400 }
        ])
    }

    const updateField = (obj) => {
        setState({
            ...state,
            ...obj
        })
    }

    return (
        <View style={settingsStyles.settingsView}>
            <Spinner
                visible={state.isLoading}
                textContent={'Loading...'}
                textStyle={loginStyles.spinnerTextStyle}
            />
            <Text style={settingsStyles.textStyle}>Profile Setting</Text>
            {state.photo && (
                <Image
                    source={{ uri: state.photo }}
                    style={{ width: 150, height: 150, marginRight: 10, marginLeft: 10, borderRadius: 250 }}
                />
            )}
            <Button title="Choose Photo" buttonStyle={{ ...loginStyles.loginBtn, width: 150 }} onPress={handleChoosePhoto} />
            <Input
                placeholder="User Name"
                inputContainerStyle={{ ...loginStyles.inputLogin, borderColor: state.userNameErr ? 'red' : '#000000' }}
                onChangeText={e => updateField({ userName: e })}
                value={state.userName}
                errorMessage={state.userNameErr}
                onFocus={() => updateField({ emailErr: '' })}
                leftIcon={
                    <FontIcon
                        name='user'
                        size={24}
                        color='black'
                    />
                }
            />
            {user.email ? <Input
                placeholder="Email"
                inputContainerStyle={loginStyles.inputLogin}
                value={user.email}
                disabled
                leftIcon={
                    <Icon
                        name='mail'
                        size={24}
                        color='black'
                        type='foundation'
                    />
                }
            /> : null}
            <Input
                placeholder="User ID"
                inputContainerStyle={{ ...loginStyles.inputLogin }}
                value={user.id?.slice(0, 25)}
                disabled
                leftIcon={
                    <FontIcon
                        name='slack'
                        size={24}
                        color='black'
                    />
                }
            />
            <Button
                title="UPDATE SETTING"
                buttonStyle={loginStyles.loginBtn}
                onPress={updateSetting}
            />
        </View>
    );
};


export default SettingsForm;