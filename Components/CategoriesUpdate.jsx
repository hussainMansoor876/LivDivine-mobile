import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ListItem, Button } from 'react-native-elements'
import { loginStyles } from '../styles'
import { categoriesArray } from '../utils/constant'
import client from '../Config/apollo'
import { UPDATE_CATEGORIES } from '../utils/updateMutations'


const CategoriesUpdate = (props) => {
    const { navigation, title } = props
    const user = useSelector(state => state.authReducer.user);
    const { categories } = user
    let [categoriesData, setCategories] = useState({})
    const dispatch = useDispatch();

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
        // updateField({ isLoading: true })

        client.mutate({ variables: { userId: user.id, userCategories: Object.keys(categoriesData) }, mutation: UPDATE_CATEGORIES })
            .then((res) => {
                // updateField({ isLoading: false })
                const { updateUserCategories } = res.data
                console.log('updateUserCategories', updateUserCategories.success)
                // if (updateUserOrderTypes.success) {
                //     user.orderTypes = updateUserOrderTypes.result
                //     dispatch(loginUser(user))
                //     Alert.alert('Successfully Update Orders!')
                // }
                // else {
                //     Alert.alert(updatePassword.message)
                // }
            })
            .catch((e) => {
                updateField({ isLoading: false })
                Alert.alert('Oops Something Went Wrong!')
            })
    }
    return (
        <View style={loginStyles.setFlex}>
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