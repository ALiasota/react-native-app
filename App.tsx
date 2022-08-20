import React, { useState } from "react";
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';

import {} from "react-native";

import useRoute from "./router";

const loadAppLication = async()=>{
  await Font.loadAsync({
    'DMMono-Regular':require('./assets/fonts/DMMono-Regular.ttf'),
  })
};




export default function App() { 
  const[isReady, setIsReady] = useState<boolean>(false);
  const routing = useRoute(true);

  if(!isReady) {
    return <AppLoading 
    startAsync={loadAppLication} 
    onFinish={()=>setIsReady(true)}
    onError={console.warn}
    />
  }

  return (
    <NavigationContainer>      
      {routing}
    </NavigationContainer>  
  );
}

