import React from 'react';
import { SafeAreaView, ScrollView, Text, Image, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../../Redux/actions/authActions';
import { BecomeAdvisorForm, Header } from '../../Components'
import { loginStyles } from '../../styles'

const logo = require('../../assets/logo.png')

const user1 = { name: 'Mansoor Hussain' };

const BecomeAdvisor = (props) => {
    const { navigation } = props
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={loginStyles.setFlex}>
            <Header {...props} title="Become Advisor" />
            <ScrollView style={loginStyles.setFlex}>
                {/* <Image
                    source={logo}
                    style={loginStyles.AdvisorLogoImg}
                /> */}
                <BecomeAdvisorForm {...props} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default BecomeAdvisor;
