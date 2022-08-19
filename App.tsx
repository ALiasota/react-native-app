import React, { useState } from "react";
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {} from "react-native";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';


const loadAppLication = async()=>{
  await Font.loadAsync({
    'DMMono-Regular':require('./assets/fonts/DMMono-Regular.ttf'),
  })
};

export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
};

const AuthStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
 
  const[isReady, setIsReady] = useState<boolean>(false);
  

  if(!isReady) {
    return <AppLoading 
    startAsync={loadAppLication} 
    onFinish={()=>setIsReady(true)}
    onError={console.warn}
    />
  }

  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen 
        options={{
          headerShown:false
        }}
        name="Login" 
        component={LoginScreen} />
        <AuthStack.Screen 
        options={{
          headerShown:false
        }}
        name="Register" 
        component={RegisterScreen} />
      </AuthStack.Navigator>
      
    </NavigationContainer>  
  );
}

