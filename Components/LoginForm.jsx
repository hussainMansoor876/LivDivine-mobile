import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../Redux/actions/authActions';
import { Icon, Input, Button } from 'react-native-elements'
import client from '../Config/apollo'
import { loginStyles } from '../styles'
import Spinner from 'react-native-loading-spinner-overlay';
import { LOGIN } from '../utils/authQueries'

const LoginForm = (props) => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        email: '',
        password: '',
        emailErr: '',
        passwordErr: '',
        isLoading: false
    })

    const validateLogin = () => {
        const { email, password } = state
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false) {
            return updateField({ emailErr: 'Invalid Email!' })
        }
        else if (!password.length || password.length < 6) {
            return updateField({ passwordErr: 'Password length must be 6 Characters!' })
        }
        updateField({ isLoading: true })
        client.mutate({ variables: { email: email.toLocaleLowerCase(), password }, mutation: LOGIN })
            .then((res) => {
                updateField({ isLoading: false })
                const { signIn } = res.data
                console.log('signIn', signIn)
                if (signIn.success) {
                    dispatch(loginUser(signIn.user))
                }
                else {
                    Alert.alert(signIn.message)
                }
            })
            .catch((e) => console.log(e))
    }

    const updateField = (obj) => {
        setState({
            ...state,
            ...obj
        })
    }

    return (
        <View style={loginStyles.loginView}>
            <Spinner
                visible={state.isLoading}
                textContent={'Loading...'}
                textStyle={loginStyles.spinnerTextStyle}
            />
            <Input
                placeholder="Email"
                inputContainerStyle={{ ...loginStyles.inputLogin, borderColor: state.emailErr ? 'red' : '#000000' }}
                onChangeText={e => updateField({ email: e })}
                value={state.email}
                errorMessage={state.emailErr}
                onFocus={() => updateField({ emailErr: '' })}
                leftIcon={
                    <Icon
                        name='mail'
                        size={24}
                        color='black'
                        type='foundation'
                    />
                }
            />
            <Input
                placeholder="Password"
                secureTextEntry={true}
                inputContainerStyle={{ ...loginStyles.inputLogin, borderColor: state.passwordErr ? 'red' : '#000000' }}
                onChangeText={e => updateField({ password: e })}
                value={state.password}
                errorMessage={state.passwordErr}
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
            <Button
                title="Login"
                buttonStyle={loginStyles.loginBtn}
                onPress={validateLogin}
            />
            <TouchableOpacity onPress={() => console.log('Hello')}>
                <Text style={loginStyles.forgotPas}>I forgot my Password</Text>
            </TouchableOpacity>
        </View>
    );
};


export default LoginForm;