import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import PostsScreen from './screens/mainScreen/PostsScreen';
import CreateScreen from './screens/mainScreen/CreateScreen';
import ProfileScreen from './screens/mainScreen/ProfileScreen';

export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
};

export type RootTabParamList = {
  Posts: {photo:string};
  Create: undefined;
  Profile: undefined;
};

const AuthStack = createNativeStackNavigator<RootStackParamList>();
const MainTab = createBottomTabNavigator<RootTabParamList>();

const useRoute = (isAuth: boolean) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Register"
          component={RegisterScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="postage-stamp"
              size={size}
              color={color}
            />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <EvilIcons name="plus" size={35} color={color} />
          ),
        }}
        name="Create"
        component={CreateScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="face-man-profile"
              size={size}
              color={color}
            />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

export default useRoute;
