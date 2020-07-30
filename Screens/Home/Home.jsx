import React from 'react';
import {
    SafeAreaView, ScrollView, Text
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../../Redux/actions/authActions';
import { LoginForm, SocialLogin } from '../../Components'
import { loginStyles } from '../../styles'


const Home = (props) => {
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={loginStyles.setFlex}>
            <ScrollView style={loginStyles.setFlex}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 24
                }}>Home</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
