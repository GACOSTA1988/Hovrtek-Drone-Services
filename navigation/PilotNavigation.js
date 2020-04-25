import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AboutScreen from "../screens/AboutScreen";
import SupportScreen from "../screens/pilot/SupportScreen";
import JobListMyJobsTabNavigation from "./JobListMyJobsTabNavigation";
import CreateProfileScreen from '../screens/pilot/CreateProfileScreen';
import PilotProfileScreen from '../screens/pilot/PilotProfileScreen';
import SignOutScreen from '../screens/auth/SignOutScreen';

const PilotDrawer = createDrawerNavigator();

const PilotNavigation = () => {
  return (
    <PilotDrawer.Navigator>
      <PilotDrawer.Screen
        name="Home"
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
        name="SignOutScreen"
        component={SignOutScreen}
        headerMode="none"
        options={{ title: "Sign Out" }}
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

export default PilotNavigation;
