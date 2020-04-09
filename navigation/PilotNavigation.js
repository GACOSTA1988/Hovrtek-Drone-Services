import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { PilotHome } from '../screens/pilot/PilotHomeScreen';
import { PilotProfile } from '../screens/pilot/PilotProfileScreen';

const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export const PilotHomeStack = createStackNavigator();
export const PilotProfileStack = createStackNavigator();

export const PilotHomeStackScreen = () => (
  <PilotHomeStack.Navigator screenOptions={{ headerShown: false }}>
    <PilotHomeStack.Screen name='PilotHome' component={PilotHome} />
  </PilotHomeStack.Navigator>
)

export const PilotProfileStackScreen = () => (
  <PilotProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <PilotProfileStack.Screen name='PilotProfile' component={PilotProfile} />
  </PilotProfileStack.Navigator>
)

export const PilotTabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name='PilotHome' component={PilotHomeStackScreen} />
    <Tabs.Screen name='PilotProfile' component={PilotProfileStackScreen} />
  </Tabs.Navigator>
)
