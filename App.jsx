import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/store";
import { PersistGate } from 'redux-persist/integration/react'
import AppNavigator from './Navigation'
import SplashScreen from 'react-native-splash-screen'
import { ApolloProvider } from '@apollo/react-hooks';
import client from './Config/apollo'
import { AllAdvisors } from './Screens'
import TabNavigation from './Navigation/TabNavigation'

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  })


  return (
    <Provider store={store} >
      <PersistGate persistor={persistor}>
        <ApolloProvider client={client}>
          <AppNavigator />
          {/* <TabNavigation /> */}
        </ApolloProvider>
      </PersistGate>
    </Provider>
  )
};

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  highlight: {
    fontWeight: '700',
  }
});



export default App;
