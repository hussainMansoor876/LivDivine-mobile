import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../../Redux/actions/authActions';
import { ASettingsForm, ChangePassword, OrderTypeUpdate, Header } from '../../Components'
import { loginStyles, settingsStyles } from '../../styles'
import { Button } from 'react-native-elements'
import { appColor } from '../../utils/constant';

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
            <Header {...props} />
            <ScrollView style={loginStyles.setFlex}>
                {state.showOrder ? <OrderTypeUpdate
                    {...props}
                    updateField={() => updateField({ showOrder: false })}
                /> : <View>
                        <View style={{ marginTop: 10, marginBottom: -10, flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Button
                                title="Orders Setting"
                                buttonStyle={{ backgroundColor: appColor, marginLeft: 10, borderRadius: 10 }}
                                onPress={() => updateField({ showOrder: true })}
                            />
                            <Button
                                title="Categories Setting"
                                buttonStyle={{ backgroundColor: appColor, marginRight: 10, borderRadius: 10 }}
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
