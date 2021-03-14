import React, { useState, createRef } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AdvisorStyles } from '../styles'


const Header = (props) => {
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();

    return (
        <View style={AdvisorStyles.headerView}>
            
        </View>
    );
};


export default Header;