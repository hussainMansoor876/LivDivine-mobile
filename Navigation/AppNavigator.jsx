import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Signup } from '../Screens';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Drawer">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        {/* <Stack.Screen name="advisors" component={Advisors} />
        <Stack.Screen name="categories" component={Categories} />
        <Stack.Screen name="favorite" component={FavoriteAdvisors} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="journey" component={Journey} />
        <Stack.Screen name="settings" component={Settings} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;
