import React from 'react'
import { SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useDispatch } from 'react-redux'
import { ApprovedAdvisors, PendingAdvisors } from '../Admin'

const Tab = createMaterialTopTabNavigator()

const JobList = () => {
  const dispatch = useDispatch()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          lazy={true}
        >
          <Tab.Screen name='Approved' component={ApprovedAdvisors} />
          <Tab.Screen name='Pending' component={PendingAdvisors} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default JobList