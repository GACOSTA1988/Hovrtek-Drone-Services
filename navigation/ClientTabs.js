import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ClientHomeStackNavigator from "./ClientHomeStackNavigator";
import MessagingNavigation from './MessagingNavigation';
import ProjectScreensStackNavigator from './ProjectScreensStackNavigator';
import ProjectListScreen from '../screens/client/ProjectListScreen';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

function ClientTabs() {
  const Tabs = createBottomTabNavigator();

  return (
      <Tabs.Navigator tabBarOptions={{activeBackgroundColor: 'lightblue', inactiveBackgroundColor: '#092455', activeTintColor: '#092455', inactiveTintColor: 'white'}}>
        <Tabs.Screen 
          name="Home" 
          labelStyle={ {color: 'white'}}
          component={ClientHomeStackNavigator} 
          options={{
            tabBarIcon: ({color}) => (<FontAwesome name="home" size={24} color={color} />),
          }}
          />
        <Tabs.Screen 
          name="Projects" 
          component={ProjectListScreen}
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

export default ClientTabs;