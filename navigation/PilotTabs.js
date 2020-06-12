import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PilotHomeStackNavigator from "./PilotHomeStackNavigator";
import PilotJobsStackNavigator from "./PilotJobsStackNavigator";
import MessagingNavigation from './MessagingNavigation';
import MyJobsScreen from '../screens/pilot/MyJobsScreen';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

function PilotTabs() {
  const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator tabBarOptions={{activeBackgroundColor: 'lightblue', inactiveBackgroundColor: '#092455', activeTintColor: '#092455', inactiveTintColor: 'white', showLabel: false}}>
      <Tabs.Screen 
        name="Home" 
        labelStyle={ {color: 'white'}}
        component={PilotHomeStackNavigator} 
        options={{
          tabBarIcon: ({color}) => (<FontAwesome name="home" size={24} color={color} />),
        }}
        />
      <Tabs.Screen 
        name="Projects" 
        component={PilotJobsStackNavigator}
        options={{
          tabBarIcon: ({color}) => (<FontAwesome5 name="helicopter" size={20} color={color}/>)
        }} />
      <Tabs.Screen 
        name="Messages" 
        component={MessagingNavigation}
        options={{
          tabBarIcon: ({color}) => (<Entypo name="message" size={24} color={color}/>)
        }} />
    </Tabs.Navigator>
  );
}

export default PilotTabs;