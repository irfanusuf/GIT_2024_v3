/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Snake from './screens/Snake';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />


      <Snake/>
     
    </SafeAreaProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text : {
    color : "white"
  }
});

export default App;
