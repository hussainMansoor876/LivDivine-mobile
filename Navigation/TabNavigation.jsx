import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Button } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux';
import { ApprovedAdvisors, PendingAdvisors } from '../Screens/Admin'
import { appColor } from '../utils/constant'
import { removeUser } from '../Redux/actions/authActions'
const Tab = createMaterialTopTabNavigator();

const TabScreen = () => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          lazy={true}
        >
          <Tab.Screen name="Approved" component={ApprovedAdvisors} />
          <Tab.Screen name="Pending" component={PendingAdvisors} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default TabScreen
