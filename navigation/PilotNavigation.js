import React, { useState, useMemo } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NotificationContext } from "../context";
import AboutScreen from "../screens/AboutScreen";
import SupportScreen from "../screens/pilot/SupportScreen";
import JobListMyJobsTabNavigation from "./JobListMyJobsTabNavigation";
import PilotCreateProfileNavigation from "./PilotCreateProfileNavigation";
import SignOutScreen from "../screens/auth/SignOutScreen";
import MessagingNavigation from './MessagingNavigation';
import MainHeader from '../components/MainHeader';
import NestedHeader from '../components/NestedHeader';
import { Ionicons } from "@expo/vector-icons";

const PilotDrawer = createDrawerNavigator();

const PilotNavigation = () => {
  return (
    <PilotDrawer.Navigator drawerPosition='right'>
      <PilotDrawer.Screen
      name="Home"
      component={JobListMyJobsTabNavigation}
      />
      <PilotDrawer.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{
          title: "About",
          headerTitle: () => <MainHeader />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100
          },
        }}
      />
      <PilotDrawer.Screen
        name="SupportScreen"
        component={SupportScreen}
        options={{
          title: "Support",
          headerTitle: () => <MainHeader />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100
          },
        }}
      />
      <PilotDrawer.Screen
        name="Profile"
        component={PilotCreateProfileNavigation}
        options={{ title: "Profile" }}
      />
      <PilotDrawer.Screen
        name='MessagingScreen'
        component={MessagingNavigation}
        options={{ title: 'Messages' }}
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
