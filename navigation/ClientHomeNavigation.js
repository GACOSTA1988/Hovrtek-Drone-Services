import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ClientHomeScreen from '../screens/client/ClientHomeScreen';
import { ClientProfile } from '../screens/client/ClientProfileScreen';
import AboutScreen from '../screens/client/AboutScreen'
import SupportScreen from '../screens/client/SupportScreen'
import ClientHeader from '../components/client/ClientHeader'

const Drawer = createDrawerNavigator();

export const ClientHomeStack = createStackNavigator();
export const ClientProfileStack = createStackNavigator();

const ClientHomeNavigation = () => {

  return (
  <Drawer.Navigator>
    <Drawer.Screen 
      name='ClientHomeScreen' 
      component={ClientHomeScreen}  
      options={({navigation})=> {
        return {
          headerTitle: () => <TestHeader navigation = {navigation}/>
        }
      }}
    />
    <Drawer.Screen 
      name='AboutScreen' 
      component={AboutScreen}  
      headerMode='none'
      options={{title: 'About'}}
    />
    <Drawer.Screen 
      name='SupportScreen' 
      component={SupportScreen}  
      headerMode='none'
      options={{title: 'Support'}}
    />
  </Drawer.Navigator>  
  )
}



const LogoTitle = () => {
  return (
    <Image
    style={{ width: 130, height: 22, marginTop: 0 }}
    source={require('../assets/hovrtek_logo.png')}
    />
  )
}

export default ClientHomeNavigation
