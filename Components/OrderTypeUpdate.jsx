import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../Redux/actions/authActions';
import { Input, Button, Icon, CheckBox } from 'react-native-elements'
import client from '../Config/apollo'
import { loginStyles, settingsStyles } from '../styles'
import Spinner from 'react-native-loading-spinner-overlay';
import { UPDATE_PASSWORD } from '../utils/authQueries'
import { orderTypesCopy, appColor, roundToTwo } from '../utils/constant';
import Screen from '../utils/ScreenDimensions'
import Slider from 'react-native-slider'

const SettingsForm = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    let [orderTypes, setOrdertypes] = useState(orderTypesCopy)
    const [orderUpdate, setOrderUpdate] = useState(false)
    const [state, setState] = useState({
        isLoading: false,
        sliderValue: 0.5
    })

    const updateServer = (obj) => {
        client.mutate({ variables: obj, mutation: UPDATE_PASSWORD })
            .then((res) => {
                updateField({ isLoading: false })
                const { updatePassword } = res.data
                if (updatePassword.success) {
                    dispatch(loginUser(updatePassword.user))
                    Alert.alert('Successfully Update Password!')
                    setState({})
                }
                else {
                    Alert.alert(updatePassword.message)
                }
            })
            .catch((e) => Alert.alert('Oops Something Went Wrong!'))
    }

    const updatePassword = () => {
        const { currentPassword, password, confirmPass } = state
        const { id } = user
        if (!currentPassword.length || currentPassword.length < 6) {
            return updateField({ currentPassErr: 'Password length must be 6 Characters!' })
        }
        else if (!password.length || password.length < 6) {
            return updateField({ passwordErr: 'Password length must be 6 Characters!' })
        }
        else if (password !== confirmPass) {
            return updateField({ confirmPassErr: 'Password did not match!' })
        }
        else {
            updateField({ isLoading: true })
            updateServer({ id, currentPassword, password })
        }
    }

    const updateField = (obj) => {
        setState({
            ...state,
            ...obj
        })
    }

    const updateOrders = (i, value) => {
        orderTypes[i].price = value
        setOrderUpdate(!orderUpdate)
        // setOrdertypes(orderTypes)
    }

    const updateActive = (i) =>{
        orderTypes[i].isActive = !orderTypes[i].isActive
        setOrderUpdate(!orderUpdate)
    }

    return (
        <View style={{ ...settingsStyles.aSettingsView, marginBottom: 30 }}>
            <Spinner
                visible={state.isLoading}
                textContent={'Loading...'}
                textStyle={loginStyles.spinnerTextStyle}
            />
            <Button
                title="Back"
                buttonStyle={{ ...loginStyles.loginBtn, width: 100, marginTop: 0, marginBottom: 15 }}
                onPress={props.updateField}
            />
            <Text style={settingsStyles.textStyle}>Update Orders</Text>
            <View style={{ width: '95%', marginLeft: '2%' }}>
                {orderTypes.map((v, i) => {
                    return (
                        <View key={i} style={{ marginBottom: 5, marginTop: 5, borderTopColor: '#000000', borderTopWidth: 0.5 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 20, letterSpacing: 1.2, marginTop: 10 }}>{v.orderTypeName}</Text>
                                <CheckBox
                                    title="Activate"
                                    checked={v.isActive}
                                    onPress={() => updateActive(i)}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Slider
                                    value={v.price}
                                    maximumValue={100}
                                    minimumValue={0.1}
                                    onValueChange={(value) => updateOrders(i, value)}
                                    step={0.1}
                                    minimumTrackTintColor={appColor}
                                    thumbTintColor={appColor}
                                    style={{ width: Screen.width - 90 }}
                                />
                                <Text style={{ fontSize: 18 }}>${roundToTwo(v.price)}</Text>
                            </View>
                        </View>
                    )
                })}
            </View>
            <Button
                title="UPDATE ORDERS"
                buttonStyle={loginStyles.loginBtn}
            />
        </View>
    );
};


export default SettingsForm;