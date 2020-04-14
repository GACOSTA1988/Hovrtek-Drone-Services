import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { ClientProfile } from "../screens/client/ClientProfileScreen";
import AboutScreen from "../screens/client/AboutScreen";
import SupportScreen from "../screens/client/SupportScreen";
import ClientHeader from "../components/client/ClientHeader";
import ProjectsNewProjectTabNavigation from "./ProjectsNewProjectTabNavigation";
import AccountScreen from '../screens/client/AccountScreen';
import LocationScreen from '../screens/client/LocationScreen';
import ServicesScreen from '../screens/client/ServicesScreen';
import ClientProfileScreen from '../screens/client/ClientProfileScreen';


const ClientDrawer = createDrawerNavigator();

const ClientHomeNavigation = () => {
  return (
    <ClientDrawer.Navigator>
      <ClientDrawer.Screen
        name="Home"
        component={ProjectsNewProjectTabNavigation}
      />
      <ClientDrawer.Screen
        name='AccountScreen'
        component={AccountScreen}
        options={{ title: 'Account' }}
      />
      <ClientDrawer.Screen
        name='ServicesScreen'
        component={ServicesScreen}
        options={{ title: 'Services' }}
      />
      <ClientDrawer.Screen
        name='LocationScreen'
        component={LocationScreen}
        options={{ title: 'Location' }}
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
        name="ClientProfileScreen"
        component={ClientProfileScreen}
        headerMode="none"
        options={{ title: "Your Profile" }}
      />
    </ClientDrawer.Navigator>
  );
};

const LogoTitle = () => {
  return (
    <Image
      style={{ width: 130, height: 22, marginTop: 0 }}
      source={require("../assets/hovrtek_logo.png")}
    />
  );
};

export default ClientHomeNavigation;
