import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import PilotHomeScreen from '../screens/pilot/PilotHomeScreen';
import PilotProfileScreen from '../screens/pilot/PilotProfileScreen';

const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export const PilotHomeStack = createStackNavigator();
export const PilotProfileStack = createStackNavigator();

export const PilotHomeStackScreen = () => (

  <PilotHomeStack.Navigator screenOptions={{headerShown: false}}>
    <PilotHomeStack.Screen name='PilotHomeScreen' component={PilotHomeScreen} />

  </PilotHomeStack.Navigator>
)

export const PilotProfileStackScreen = () => (
  <PilotProfileStack.Navigator screenOptions={{headerShown: false}}>
    <PilotProfileStack.Screen name='PilotProfileScreen' component={PilotProfileScreen} />
  </PilotProfileStack.Navigator>
)

export const PilotTabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name='PilotHomeScreen' component={PilotHomeStackScreen} />
    <Tabs.Screen name='PilotProfileScreen' component={PilotProfileStackScreen} />
  </Tabs.Navigator>
)
