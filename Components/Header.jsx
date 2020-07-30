import React, { useState, createRef } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../Redux/actions/authActions';
import { Icon, Input, Button } from 'react-native-elements'
import { loginStyles } from '../styles'


const Header = (props) => {
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();

    return (
        <View>

        </View>
    );
};


export default Header;