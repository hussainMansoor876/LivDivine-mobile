import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../Redux/actions/authActions';
import { Input, Button, Icon } from 'react-native-elements'
import client from '../Config/apollo'
import { loginStyles, settingsStyles } from '../styles'
import Spinner from 'react-native-loading-spinner-overlay';
import { UPDATE_PASSWORD } from '../utils/authQueries'
import FontIcon from 'react-native-vector-icons/FontAwesome';

const SettingsForm = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    const [state, setState] = useState({
        currentPassword: '',
        password: '',
        confirmPass: '',
        currentPassErr: '',
        passwordErr: '',
        confirmPassErr: '',
        isLoading: false
    })

    const updateServer = (obj) => {
        client.mutate({ variables: obj, mutation: UPDATE_PASSWORD })
            .then((res) => {
                updateField({ isLoading: false })
                const { updatePassword } = res.data
                if (updatePassword.success) {
                    dispatch(loginUser(updatePassword.user))
                    Alert.alert('Successfully Update Password!')
                    setState({})
                }
                else {
                    Alert.alert(updatePassword.message)
                }
            })
            .catch((e) => Alert.alert('Oops Something Went Wrong!'))
    }

    const updatePassword = () => {
        const { currentPassword, password, confirmPass } = state
        const { id } = user
        if (!currentPassword.length || currentPassword.length < 6) {
            return updateField({ currentPassErr: 'Password length must be 6 Characters!' })
        }
        else if (!password.length || password.length < 6) {
            return updateField({ passwordErr: 'Password length must be 6 Characters!' })
        }
        else if (password !== confirmPass) {
            return updateField({ confirmPassErr: 'Password did not match!' })
        }
        else {
            updateField({ isLoading: true })
            updateServer({ id, currentPassword, password })
        }
    }

    const updateField = (obj) => {
        setState({
            ...state,
            ...obj
        })
    }

    return (
        <View style={{ ...settingsStyles.settingsView, marginBottom: 30 }}>
            <Spinner
                visible={state.isLoading}
                textContent={'Loading...'}
                textStyle={loginStyles.spinnerTextStyle}
            />
            <Text style={settingsStyles.textStyle}>Change Password</Text>
            <Input
                placeholder="Current Password"
                secureTextEntry={true}
                inputContainerStyle={{ ...loginStyles.inputLogin, borderColor: state.currentPassErr ? 'red' : '#000000' }}
                onChangeText={e => updateField({ currentPassword: e })}
                value={state.currentPassword}
                errorMessage={state.currentPassErr}
                onFocus={() => updateField({ currentPassErr: '' })}
                leftIcon={
                    <Icon
                        name='lock'
                        size={24}
                        color='black'
                        type='foundation'
                    />
                }
            />
            <Input
                placeholder="New Password"
                secureTextEntry={true}
                inputContainerStyle={{ ...loginStyles.inputLogin, borderColor: state.passwordErr ? 'red' : '#000000' }}
                onChangeText={e => updateField({ password: e })}
                errorMessage={state.passwordErr}
                value={state.password}
                onFocus={() => updateField({ passwordErr: '' })}
                leftIcon={
                    <Icon
                        name='lock'
                        size={24}
                        color='black'
                        type='foundation'
                    />
                }
            />
            <Input
                placeholder="Retype Password"
                secureTextEntry={true}
                inputContainerStyle={{ ...loginStyles.inputLogin, borderColor: state.confirmPassErr ? 'red' : '#000000' }}
                onChangeText={e => updateField({ confirmPass: e })}
                name="confirmPass"
                errorMessage={state.confirmPassErr}
                value={state.confirmPass}
                onFocus={() => updateField({ confirmPassErr: '' })}
                leftIcon={
                    <Icon
                        name='lock'
                        size={24}
                        color='black'
                        type='foundation'
                    />
                }
            />
            <Button
                title="UPDATE PASSWORD"
                buttonStyle={loginStyles.loginBtn}
                onPress={updatePassword}
            />
        </View>
    );
};


export default SettingsForm;