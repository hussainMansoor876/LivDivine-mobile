import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { AllAdvisors, Categories, FavoriteAdvisors, Home, Journey, Settings, Login, BecomeAdvisor, AdvisorProfile, AdvisorSettings } from '../Screens';
import { createAppContainer } from 'react-navigation'
import Sidebar from './Sidebar'

const DrawerNavigatorExample = createDrawerNavigator(
  {
    Home: Home,
    AllAdvisors: AllAdvisors,
    Categories: Categories,
    MyOrders: Categories,
    FavoriteAdvisors: FavoriteAdvisors,
    BecomeAdvisor: BecomeAdvisor,
    Settings: Settings,
    AdvisorSettings: AdvisorSettings,
    AdvisorProfile: AdvisorProfile,
    Logout: Login
  },
  {
    // contentOptions: {
    //   activeTintColor: "#e91e63"
    // },
    contentComponent: props => <Sidebar {...props} />,
    // drawerType: 'slide'
    // drawerWidth: Dimensions.get('window').width - 130,
  }
);

export default createAppContainer(DrawerNavigatorExample);