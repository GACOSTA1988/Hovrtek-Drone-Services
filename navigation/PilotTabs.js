import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PilotHomeStackNavigator from "./PilotHomeStackNavigator";
import MessagingNavigation from './MessagingNavigation';
import MyJobsScreen from '../screens/pilot/MyJobsScreen';

function PilotTabs() {
  const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator tabBarOptions={{activeBackgroundColor: 'lightblue', inactiveBackgroundColor: '#092455', activeTintColor: '#092455', inactiveTintColor: 'white'}}>
      <Tabs.Screen name="Home" component={PilotHomeStackNavigator}/>
      <Tabs.Screen name="Jobs" component={MyJobsScreen}/>
      <Tabs.Screen name="Messages" component={MessagingNavigation}/>
    </Tabs.Navigator>
  );
}

export default PilotTabs;