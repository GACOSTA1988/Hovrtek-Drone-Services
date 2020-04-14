import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { PilotProfile } from "../screens/pilot/PilotProfileScreen";
import AboutScreen from "../screens/pilot/AboutScreen";
import SupportScreen from "../screens/pilot/SupportScreen";
import PilotHeader from "../components/pilot/PilotHeader";
import JobListMyJobsTabNavigation from "./JobListMyJobsTabNavigation";
import CreateProfileScreen from '../screens/pilot/CreateProfileScreen';
import PilotProfileScreen from '../screens/pilot/PilotProfileScreen';
import ProfileListScreen from '../screens/pilot/ProfileListScreen';

const PilotDrawer = createDrawerNavigator();

const PilotHomeNavigation = () => {
  return (
    <PilotDrawer.Navigator>
      <PilotDrawer.Screen
        name="ProjectsNewProjectTabNavigation"
        component={JobListMyJobsTabNavigation}
      />
      <PilotDrawer.Screen
        name="AboutScreen"
        component={AboutScreen}
        headerMode="none"
        options={{ title: "About" }}
      />
      <PilotDrawer.Screen
        name="SupportScreen"
        component={SupportScreen}
        headerMode="none"
        options={{ title: "Support" }}
      />
      <PilotDrawer.Screen
        name="CreateProfileScreen"
        component={CreateProfileScreen}
        headerMode="none"
        options={{ title: "Create/Edit Profile" }}
      />
      <PilotDrawer.Screen
        name="PilotProfileScreen"
        component={PilotProfileScreen}
        headerMode="none"
        options={{ title: "Your Profile" }}
      />
      <PilotDrawer.Screen
        name="ProfileListScreen"
        component={ProfileListScreen}
        headerMode="none"
        options={{ title: "All Profiles" }}
      />
    </PilotDrawer.Navigator>
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

export default PilotHomeNavigation;
