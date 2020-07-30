import React from 'react';
import { SafeAreaView, ScrollView, Text, Button, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../../Redux/actions/authActions';
import { LoginForm, SocialLogin, SettingsForm, ChangePassword } from '../../Components'
import { loginStyles, settingsStyles } from '../../styles'
import { Divider } from 'react-native-elements'
import { Icon } from 'react-native-elements'




const Settings = (props) => {
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={loginStyles.setFlex}>
            <ScrollView style={loginStyles.setFlex}>
                <View style={settingsStyles.header}>
                    <Text h1 style={settingsStyles.fieldsbold}>ACCOUNT</Text>
                </View>
                <SettingsForm {...props} />
                {user.authType === null ? <ChangePassword {...props} /> : null}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Settings;
