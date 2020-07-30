import React from 'react';
import {
    SafeAreaView, ScrollView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../Redux/actions/authActions';
import Drawer from './Drawer'
import AppNavigator from './AppNavigator'
import { gql } from "apollo-boost";
import { useMutation, useQuery } from '@apollo/react-hooks';


const ADD_TODO = gql`
    mutation{
        signUp(
        email: "babar@gmail.com",
        userName: "babarkaramat",
        password: "123123123", isVerified: false){
        token
        }
  }
`;


const Home = (props) => {
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();

    if (user) {
        return (
            <Drawer />
        )
    }
    return (
        <AppNavigator />
    );
};

export default Home;
