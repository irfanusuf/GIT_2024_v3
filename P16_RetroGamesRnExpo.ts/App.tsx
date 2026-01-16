import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GameHub from "./screens/Home";
import Snake from "./screens/Snake";
import SnakeLoader from "./screens/SnakeLoader";
import SpaceInvaderzLoader from "./screens/SpaceInvaderzLoader";


export type RootStackParamList = {
  Home: undefined
  SnakeLoader: undefined;
  Snake:  undefined;
  SpaceInvaderzLoader : undefined
  
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        id="root"
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >

        <Stack.Screen name="Home" component={GameHub} />
        <Stack.Screen name="SnakeLoader" component={SnakeLoader}/>
        <Stack.Screen name="Snake" component={Snake}/>
        <Stack.Screen name="SpaceInvaderzLoader" component={SpaceInvaderzLoader}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
