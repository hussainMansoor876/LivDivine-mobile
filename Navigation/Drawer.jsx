import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Advisors, Categories, FavoriteAdvisors, Home, Journey, Settings, Login, BecomeAdvisor, AdvisorProfile } from '../Screens';
import { createAppContainer } from 'react-navigation'
import Sidebar from './Sidebar'

const DrawerNavigatorExample = createDrawerNavigator(
  {
    Home: Home,
    Advisors: Advisors,
    Categories: Categories,
    MyOrders: Categories,
    FavoriteAdvisors: FavoriteAdvisors,
    BecomeAdvisor: BecomeAdvisor,
    Settings: Settings,
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