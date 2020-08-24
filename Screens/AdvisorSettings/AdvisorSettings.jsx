import React from 'react';
import { SafeAreaView, ScrollView, Text, Button, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../../Redux/actions/authActions';
import { ASettingsForm, ChangePassword, OrderTypeUpdate } from '../../Components'
import { loginStyles, settingsStyles } from '../../styles'




const AdvisorSettings = (props) => {
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={loginStyles.setFlex}>
            <ScrollView style={loginStyles.setFlex}>
                <View style={settingsStyles.header}>
                    <Text h1 style={settingsStyles.fieldsbold}>ADVISOR ACCOUNT</Text>
                </View>
                <OrderTypeUpdate {...props} />
                <ASettingsForm {...props} />
                {user.authType === null ? <ChangePassword {...props} /> : null}
            </ScrollView>
        </SafeAreaView>
    );
};

export default AdvisorSettings;
