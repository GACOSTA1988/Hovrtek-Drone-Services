import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ClientHomeStackNavigator from "./ClientHomeStackNavigator";
import MessagingNavigation from './MessagingNavigation';
import ProjectScreensStackNavigator from './ProjectScreensStackNavigator';
import ProjectListScreen from '../screens/client/ProjectListScreen';
import { NavigationContainer } from '@react-navigation/native';


const Tabs = createBottomTabNavigator();

function ClientTabs() {

  return (
    <NavigationContainer independent={true}>
      <Tabs.Navigator>
        <Tabs.Screen name="Home" component={ClientHomeStackNavigator}/>
        <Tabs.Screen name="Projects" component={ProjectListScreen}/>
        <Tabs.Screen name="Messages" component={MessagingNavigation}/>
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

export default ClientTabs;