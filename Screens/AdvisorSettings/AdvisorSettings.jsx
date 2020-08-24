import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../../Redux/actions/authActions';
import { ASettingsForm, ChangePassword, OrderTypeUpdate } from '../../Components'
import { loginStyles, settingsStyles } from '../../styles'
import { Button } from 'react-native-elements'

const AdvisorSettings = (props) => {
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        showOrder: false,
        showCategory: false
    })

    const updateField = (obj) => {
        setState({
            ...state,
            ...obj
        })
    }


    return (
        <SafeAreaView style={loginStyles.setFlex}>
            <ScrollView style={loginStyles.setFlex}>
                <View style={settingsStyles.header}>
                    <Text h1 style={settingsStyles.fieldsbold}>ADVISOR ACCOUNT</Text>
                </View>
                {state.showOrder ? <OrderTypeUpdate
                    {...props}
                    updateField={() => updateField({ showOrder: false })}
                /> : <View>
                        <View style={{ marginTop: 10, marginBottom: -10, flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Button
                                title="Orders Setting"
                                buttonStyle={{ ...loginStyles.loginBtn, width: 180 }}
                                onPress={() => updateField({ showOrder: true })}
                            />
                            <Button
                                title="Categories Setting"
                                buttonStyle={{ ...loginStyles.loginBtn, width: 180 }}
                            />
                        </View>
                        <ASettingsForm {...props} />
                        {user.authType === null ? <ChangePassword {...props} /> : null}
                    </View>}
            </ScrollView>
        </SafeAreaView>
    );
};

export default AdvisorSettings;
