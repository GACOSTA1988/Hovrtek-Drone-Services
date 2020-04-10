import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { ClientProfile } from "../screens/client/ClientProfileScreen";
import AboutScreen from "../screens/client/AboutScreen";
import SupportScreen from "../screens/client/SupportScreen";
import ClientHeader from "../components/client/ClientHeader";
import ProjectsNewProjectTabNavigation from "./ProjectsNewProjectTabNavigation";

const ClientDrawer = createDrawerNavigator();

const ClientHomeNavigation = () => {
  return (
    <ClientDrawer.Navigator>
      <ClientDrawer.Screen
        name="ProjectsNewProjectTabNavigation"
        component={ProjectsNewProjectTabNavigation}
      />
      <ClientDrawer.Screen
        name="AboutScreen"
        component={AboutScreen}
        headerMode="none"
        options={{ title: "About" }}
      />
      <ClientDrawer.Screen
        name="SupportScreen"
        component={SupportScreen}
        headerMode="none"
        options={{ title: "Support" }}
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
