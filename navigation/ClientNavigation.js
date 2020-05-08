import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AboutScreen from "../screens/AboutScreen";
import SupportScreen from "../screens/client/SupportScreen";
import ProjectsNewProjectTabNavigation from "./ProjectsNewProjectTabNavigation";
import AccountScreen from '../screens/client/AccountScreen';
import LocationScreen from '../screens/client/LocationScreen';
import ServicesScreen from '../screens/client/ServicesScreen';
import SignOutScreen from '../screens/auth/SignOutScreen';
import ClientProfileNavigation from './ClientProfileNavigation';
import MessagingNavigation from './MessagingNavigation';
import ChatScreen from '../screens/messaging/ChatScreen';
import GoHomeButton from '../screens/client/GoHomeButton';


import HomeStackNavigator from "./HomeStackNavigator";

const ClientDrawer = createDrawerNavigator();


const ClientNavigation = () => {

  return (
    <ClientDrawer.Navigator initialRouteName="HomeStackNavigator" >
      <ClientDrawer.Screen
        name="Home"
        component={HomeStackNavigator}
      />
      <ClientDrawer.Screen
        name='AboutScreen'
        component={AboutScreen}
        options={{ title: 'About' }}
      />
      <ClientDrawer.Screen
        name='SupportScreen'
        component={SupportScreen}
        options={{ title: 'Support' }}
      />
      <ClientDrawer.Screen
        name='ClientProfileNavigation'
        component={ClientProfileNavigation}
        options={{ title: 'Public Profile' }}
      />
      <ClientDrawer.Screen
        name='MessagingScreen'
        component={MessagingNavigation}
        headerMode="screen"
        options={{
          title: "Messages",
          headerTitle: () => <MessagingHeader />,
          headerStyle: {
            backgroundColor: "#092455"
          }
        }}
      />
      {/* <ClientDrawer.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ title: 'Messages' }}
      /> */}
      <ClientDrawer.Screen
        name="SignOutScreen"
        component={SignOutScreen}
        headerMode="none"
        options={{ title: "Sign Out" }}
      />
    </ClientDrawer.Navigator>
  );
};

export default ClientNavigation;
