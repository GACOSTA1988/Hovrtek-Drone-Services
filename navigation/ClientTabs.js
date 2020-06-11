import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ClientHomeStackNavigator from "./ClientHomeStackNavigator";
import MessagingNavigation from './MessagingNavigation';
import ProjectScreensStackNavigator from './ProjectScreensStackNavigator';
import ProjectListScreen from '../screens/client/ProjectListScreen';


function ClientTabs() {
  const Tabs = createBottomTabNavigator();

  return (
      <Tabs.Navigator tabBarOptions={{activeBackgroundColor: 'lightblue', inactiveBackgroundColor: '#092455', activeTintColor: '#092455', inactiveTintColor: 'white'}}>
        <Tabs.Screen name="Home" component={ClientHomeStackNavigator}/>
        <Tabs.Screen name="Projects" component={ProjectListScreen}/>
        <Tabs.Screen name="Messages" component={MessagingNavigation}/>
      </Tabs.Navigator>
  );
}

export default ClientTabs;