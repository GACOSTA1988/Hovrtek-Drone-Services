import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ClientHomeScreen from '../screens/client/ClientHomeScreen';
import { ClientProfile } from '../screens/client/ClientProfileScreen';
import AboutScreen from '../screens/client/AboutScreen'
import SupportScreen from '../screens/client/SupportScreen'


const Drawer = createDrawerNavigator();

export const ClientHomeStack = createStackNavigator();
export const ClientProfileStack = createStackNavigator();

const ClientHomeNavigation = () => {

  return (
  <Drawer.Navigator headerMode='none'>
  <Drawer.Screen 
  name='ClientHomeScreen' 
  component={ClientHomeScreen}  headerMode='none'
  NavigationOptions={({ navigation, route }) => ({
    clientHeader: props => <ClientHeader navigation={navigation}/>,
  })}
  />
  <Drawer.Screen name='AboutScreen' component={AboutScreen}  headerMode='none'/>
  <Drawer.Screen name='SupportScreen' component={SupportScreen}  headerMode='none'/>
  </Drawer.Navigator>  
  )
}

export default ClientHomeNavigation
