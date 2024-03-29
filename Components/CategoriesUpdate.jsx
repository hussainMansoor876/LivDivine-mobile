import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ListItem, Button } from 'react-native-elements'
import { loginUser } from '../Redux/actions/authActions';
import { loginStyles } from '../styles'
import { categoriesArray } from '../utils/constant'
import client from '../Config/apollo'
import { UPDATE_CATEGORIES } from '../utils/updateMutations'
import Spinner from 'react-native-loading-spinner-overlay';


const CategoriesUpdate = (props) => {
    const { navigation, title } = props
    const user = useSelector(state => state.authReducer.user);
    const { categories } = user
    let [categoriesData, setCategories] = useState({})
    const dispatch = useDispatch();
    const [state, setState] = useState({
        isLoading: false
    })

    const getObjLength = (obj) => Object.values(obj).filter(v => v).length

    useEffect(() => {
        for (var v of categories) {
            categoriesData[v.categoryName] = true
        }
        setCategories({ ...categoriesData })
    }, [])

    const updateCategories = (obj) => {
        if (Object.values(obj)[0] && getObjLength(categoriesData) >= 3) {
            return Alert.alert('Maximum 3 categories Allowed!')
        }
        setCategories({
            ...categoriesData,
            ...obj
        })
    }

    const updateCategoriesData = () => {
        updateField({ isLoading: true })
        var userCategories = Object.entries(categoriesData).filter(v => v[1]).map(v => v[0])
        client.mutate({ variables: { userId: user.id, userCategories }, mutation: UPDATE_CATEGORIES })
            .then((res) => {
                updateField({ isLoading: false })
                const { updateUserCategories } = res.data
                if (updateUserCategories.success) {
                    user.categories = updateUserCategories.result
                    dispatch(loginUser(user))
                    Alert.alert('Successfully Update Orders!')
                }
                else {
                    Alert.alert(updatePassword.message)
                }
            })
            .catch((e) => {
                updateField({ isLoading: false })
                Alert.alert('Oops Something Went Wrong!')
            })
    }

    const updateField = (obj) => {
        setState({
            ...state,
            ...obj
        })
    }

    return (
        <View style={loginStyles.setFlex}>
            <Spinner
                visible={state.isLoading}
                textContent={'Loading...'}
                textStyle={loginStyles.spinnerTextStyle}
            />
            <Button
                title="Back"
                buttonStyle={{ ...loginStyles.loginBtn, width: 100, marginTop: 10, marginBottom: 15 }}
                onPress={props.updateField}
            />
            <Text style={{ textAlign: 'center' }}>Select Categories (3 Max)</Text>
            {categoriesArray.map((v, i) => {
                return (
                    <TouchableOpacity onPress={() => updateCategories({ [v.name]: !categoriesData[v.name] })}>
                        <ListItem
                            key={i}
                            // leftAvatar={{ source: { uri: l.avatar_url } }}
                            title={v.name}
                            bottomDivider
                            checkmark={categoriesData[v.name]}
                        />
                    </TouchableOpacity>
                )
            })}
            <Button
                title="UPDATE CATEGORIES"
                buttonStyle={loginStyles.loginBtn}
                onPress={updateCategoriesData}
            />
        </View>
    );
};


export default CategoriesUpdate;