import * as React from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ApprovedAdvisors, PendingAdvisors } from '../Screens/Admin'
const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Approved" component={ApprovedAdvisors} />
          <Tab.Screen name="Pending" component={PendingAdvisors} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
