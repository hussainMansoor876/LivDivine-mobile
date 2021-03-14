import React from 'react';
import { SafeAreaView, ScrollView, Text, Button, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../../Redux/actions/authActions';
import { SettingsForm, ChangePassword, Header } from '../../Components'
import { loginStyles, settingsStyles } from '../../styles'




const Settings = (props) => {
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch()
    return (
        <SafeAreaView style={loginStyles.setFlex}>
            <Header {...props} title="Settings" />
            <ScrollView style={loginStyles.setFlex}>
                <SettingsForm {...props} />
                {user.authType === null ? <ChangePassword {...props} /> : null}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Settings;
