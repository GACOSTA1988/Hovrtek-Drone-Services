import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ClientHome } from '../screens/client/ClientHomeScreen';
import { ClientProfile } from '../screens/client/ClientProfileScreen';

const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export const ClientHomeStack = createStackNavigator();
export const ClientProfileStack = createStackNavigator();

export const ClientHomeStackScreen = () => (
  <ClientHomeStack.Navigator screenOptions={{headerShown: false}}>
    <ClientHomeStack.Screen name='ClientHome' component={ClientHome} />
  </ClientHomeStack.Navigator>
)

export const ClientProfileStackScreen = () => (
  <ClientProfileStack.Navigator screenOptions={{headerShown: false}}>
    <ClientProfileStack.Screen name='ClientProfile' component={ClientProfile} />
    <ClientProfileStack.Screen name='AboutScreen' component={AboutScreen} />
    <ClientProfileStack.Screen name='SupportScreen' component={SupportScreen} />
  </ClientProfileStack.Navigator>
)

export const ClientTabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name='ClientHome' component={ClientHomeStackScreen} />
    <Tabs.Screen name='ClientProfile' component={ClientProfileStackScreen} />
  </Tabs.Navigator>
)
