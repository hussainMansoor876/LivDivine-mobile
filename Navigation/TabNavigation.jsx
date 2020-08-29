import * as React from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Button } from 'react-native-elements'
import { ApprovedAdvisors, PendingAdvisors } from '../Screens/Admin'
import { appColor } from '../utils/constant'
const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button
        title="Logout"
        buttonStyle={{ backgroundColor: appColor, alignSelf: 'flex-end', margin: 20, width: 120 }}
      />
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
