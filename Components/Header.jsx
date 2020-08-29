import React, { useState, createRef } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../Redux/actions/authActions';
import { Icon, Input, Button } from 'react-native-elements'
import { AdvisorStyles } from '../styles'
import FeatherIcon from 'react-native-vector-icons/Feather';


const Header = (props) => {
    const { navigation } = props
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();

    return (
        <View style={AdvisorStyles.headerView}>
            <FeatherIcon
                name='menu'
                size={30}
                color='#fff'
                onPress={navigation.toggleDrawer}
            />
            <Text style={{ color: '#fff', fontSize: 20, marginLeft: -10, alignSelf: 'center' }}>Home</Text>
            <Text>&nbsp;</Text>
        </View>
    );
};


export default Header;