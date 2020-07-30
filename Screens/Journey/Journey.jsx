import React from 'react';
import {
    SafeAreaView, ScrollView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../../Redux/actions/authActions';
import { LoginForm, SocialLogin } from '../../Components'
import { loginStyles } from '../../styles'


const Journey = (props) => {
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={loginStyles.setFlex}>
            <ScrollView style={loginStyles.setFlex}>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Journey;
