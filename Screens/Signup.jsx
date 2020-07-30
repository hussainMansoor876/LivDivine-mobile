import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../Redux/actions/authActions';
import { SocialLogin, SignupForm } from '../Components'
import { loginStyles, signupStyles } from '../styles';

const logo = require('../assets/logo.png')

const Signup = (props) => {
  const { navigation } = props
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={loginStyles.setFlex}>
      <ScrollView style={loginStyles.setFlex}>
        <Image
          source={logo}
          style={{ ...loginStyles.logoImg, marginTop: 0 }}
        />
        <View style={{ flex: 4, marginTop: 5 }}>
          <Text style={signupStyles.txt}>Connect With</Text>
          <SocialLogin {...props} />
          <SignupForm {...props} />
        </View>
        <View style={loginStyles.loginView}>
          <Text style={signupStyles.baseText}>
            You must be at least 18 years old to sign up for LivDivine. &nbsp;
          <Text>By signing up you agree to the</Text>
            <Text style={signupStyles.innerText}> Privacy Policy&nbsp;</Text>
            <Text>and</Text>
            <Text style={signupStyles.innerText}> Terms of</Text>
            <Text style={signupStyles.service}> Service</Text>
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ ...signupStyles.baseText, ...signupStyles.innerText, marginBottom: 20, marginTop: 20 }}>Already have an account?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
