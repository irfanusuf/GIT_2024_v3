import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import Register from './screens/Register'
import Login from './screens/Login';
import Snake from './screens/Snake';


const RootStack = createNativeStackNavigator({
  screens: {
    Register: Register,
    Login : Login,
    Snake : Snake
  },
});

const Navigation = createStaticNavigation(RootStack);


const App = () => {
  return (
    <Navigation/>
  )
}

export default App