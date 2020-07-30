import React from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../../Redux/actions/authActions';
import { LoginForm, SocialLogin } from '../../Components'
import { loginStyles, categoriesStyles } from '../../styles'
import categoriesData from '../../utils/categoriesData'



const Categories = (props) => {
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={loginStyles.setFlex}>
            <ScrollView style={loginStyles.setFlex}>
                {categoriesData.map((v, i) => {
                    return (
                        <View key={i} style={categoriesStyles.titlesView}>
                            {v.map((y, j) => {
                                return (
                                    <View key={j} style={categoriesStyles.cardStyle}>
                                        <Text>{y.text}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Categories;
