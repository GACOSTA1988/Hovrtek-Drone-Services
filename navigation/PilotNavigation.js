import React, { useState, useMemo } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NotificationContext } from "../context";
import AboutScreen from "../screens/AboutScreen";
import SupportScreen from "../screens/pilot/SupportScreen";
import JobListMyJobsTabNavigation from "./JobListMyJobsTabNavigation";
import PilotCreateProfileNavigation from "./PilotCreateProfileNavigation";
import SignOutScreen from "../screens/auth/SignOutScreen";


const PilotDrawer = createDrawerNavigator();

// Trying to set up a notifications thing. Need to learn more about useContext
// const [notifications, setNotifications] = useState(0);
//
// const notificationContext = useMemo(() => {
//   return {
//     notify: () => {
//       setNotifications(notifications++);
//     }
//   }
// }, []);



const PilotNavigation = () => {
  return (
    <PilotDrawer.Navigator drawerPosition='right'>
      <PilotDrawer.Screen name="Home" component={JobListMyJobsTabNavigation} />
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
        name="Profile"
        component={PilotCreateProfileNavigation}
        headerMode="none"
        options={{ title: "Profile" }}
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
