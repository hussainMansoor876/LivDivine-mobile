import React from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../../Redux/actions/authActions';
import { LoginForm, SocialLogin } from '../../Components'
import { loginStyles } from '../../styles'
import FeatherIcon from 'react-native-vector-icons/Feather';

const AllAdvisors = (props) => {
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={loginStyles.setFlex}>
            <ScrollView style={loginStyles.setFlex}>
                <View style={{ backgroundColor: '#32CD32' }}>
                    <FeatherIcon
                        name='menu'
                        size={24}
                        color='#fff'
                    />
                    <Text>All Advisors</Text>
                    <Text>All</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AllAdvisors;
