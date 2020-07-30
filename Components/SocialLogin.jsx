import React, { useEffect, useState } from 'react';
import { View, Alert, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../Redux/actions/authActions';
import { SocialIcon } from 'react-native-elements'
import { loginStyles } from '../styles'
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import Spinner from 'react-native-loading-spinner-overlay';
import client from '../Config/apollo'
import { SOCIAL_LOGIN } from '../utils/authQueries'

GoogleSignin.configure();


const user1 = { name: 'Mansoor Hussain' };

const SocialLogin = (props) => {
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        isLoading: false
    })

    useEffect(() => {
        try {
            LoginManager.logOut()
            GoogleSignin.signOut()
        } catch (error) {
            console.error(error);
        }
    }, [])

    const updateField = (obj) => {
        setState({
            ...state,
            ...obj
        })
    }

    const facebookLogin = () => {
        LoginManager.logInWithPermissions(['public_profile', 'email'])
            .then((result) => {
                updateField({ isLoading: true })
                if (result.isCancelled) {
                    updateField({ isLoading: false })
                    console.log("Login cancelled");
                }
                else {
                    AccessToken.getCurrentAccessToken()
                        .then((data) => {
                            const get_Response_Info = (error, result) => {
                                if (error) {
                                    updateField({ isLoading: false })
                                    console.log('Error fetching data: ' + error.toString());
                                } else {
                                    console.log('result', JSON.stringify(result))
                                    updateField({ isLoading: true })
                                    result.image = result.picture.url
                                    result.authType = 'facebook'
                                    client.mutate({ variables: { ...result }, mutation: SOCIAL_LOGIN })
                                        .then((res) => {
                                            console.log('res', res)
                                            updateField({ isLoading: false })
                                            const { socialSignUp } = res.data
                                            if (socialSignUp.success) {
                                                dispatch(loginUser(socialSignUp.user))
                                            }
                                            else {
                                                Alert.alert(socialSignUp.message)
                                            }
                                        })
                                        .catch((e) => {
                                            updateField({ isLoading: false })
                                            Alert.alert('Oops Something went Wrong!')
                                        })
                                }
                            };
                            const processRequest = new GraphRequest(
                                '/me?fields=name,email,picture.type(large)',
                                null,
                                get_Response_Info
                            );
                            new GraphRequestManager().addRequest(processRequest).start();
                        })
                }
            }
            )
            .catch((error) => {
                Alert.alert('Oops Something went Wrong!')
                console.log('error', error)
            })
    }


    const signIn = () => {
        GoogleSignin.signIn()
            .then((result) => {
                const { user } = result
                updateField({ isLoading: true })
                user.authType = 'google'
                if (user.photo) {
                    user.image = user.photo
                }
                client.mutate({ variables: { ...user }, mutation: SOCIAL_LOGIN })
                    .then((res) => {
                        updateField({ isLoading: false })
                        const { socialSignUp } = res.data
                        if (socialSignUp.success) {
                            dispatch(loginUser(socialSignUp.user))
                        }
                        else {
                            Alert.alert(socialSignUp.message)
                        }
                    })
                    .catch((e) => {
                        updateField({ isLoading: false })
                        Alert.alert('Oops Something went Wrong!')
                    })
            })
            .catch((e) => {
                updateField({ isLoading: false })
                Alert.alert('Oops Something went Wrong!')
            })
    };


    return (
        <View>
            <Spinner
                visible={state.isLoading}
                textContent={'Loading...'}
                textStyle={loginStyles.spinnerTextStyle}
            />
            <View style={loginStyles.social}>
                <SocialIcon style={loginStyles.socialBtn} onPress={facebookLogin} title="Facebook" button type="facebook" />
                <SocialIcon style={loginStyles.socialBtn} title="Google" onPress={signIn} button type="google" />
            </View>
        </View>
    );
};


export default SocialLogin;