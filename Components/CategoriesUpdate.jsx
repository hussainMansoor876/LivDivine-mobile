import React, { useState, createRef } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../Redux/actions/authActions';
import { Icon, Input, Button } from 'react-native-elements'
import { loginStyles } from '../styles'
import { categoriesArray } from '../utils/constant'


const CategoriesUpdate = (props) => {
    const { navigation, title } = props
    const user = useSelector(state => state.authReducer.user);
    const [categoriesData, setCategories] = useState({})
    const dispatch = useDispatch();

    const updateCategories = (obj) => {
        if (Object.values(obj)[0] && getObjLength(categoriesData) >= 3) {
            return Alert.alert('Maximum 3 categories Allowed!')
        }
        setCategories({
            ...categoriesData,
            ...obj
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
        </View>
    );
};


export default CategoriesUpdate;