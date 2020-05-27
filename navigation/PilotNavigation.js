import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NotificationContext } from "../context";
import AboutScreen from "../screens/AboutScreen";
import SupportScreen from "../screens/pilot/SupportScreen";
import PilotHomeStackNavigator from "./PilotHomeStackNavigator";
import PilotCreateProfileNavigation from "./PilotCreateProfileNavigation";
import SignOutScreen from "../screens/auth/SignOutScreen";
import MessagingNavigation from './MessagingNavigation';
import MainHeader from '../components/MainHeader';
import NestedHeader from '../components/NestedHeader';

const PilotDrawer = createDrawerNavigator();
const AboutStack = createStackNavigator();
const SupportStack = createStackNavigator();

const mainHeaderStyle = {
  backgroundColor: "#092455",
  height: 100
}

const AboutNavigation = () => {
  return (
    <AboutStack.Navigator>
      <AboutStack.Screen
        name='About'
        component={AboutScreen}
        options={{
          headerTitle: () => <MainHeader />,
          headerStyle: mainHeaderStyle
        }}
      />
    </AboutStack.Navigator>
  );
};

const SupportNavigation = () => {
  return (
    <SupportStack.Navigator>
      <SupportStack.Screen
        name='Support'
        component={SupportScreen}
        options={{
          headerTitle: () => <MainHeader />,
          headerStyle: mainHeaderStyle
        }}
      />
    </SupportStack.Navigator>
  );
};

const PilotNavigation = () => {
  return (
    <PilotDrawer.Navigator
      drawerPosition="right"
      drawerStyle={{
        backgroundColor: '#F4EDEA',
        width: 200,
        marginTop: 102,
      }}
      drawerContentOptions={{
        activeTintColor: '#120309'
      }}
    >
      <PilotDrawer.Screen name="Home" component={PilotHomeStackNavigator} />
      <PilotDrawer.Screen
        name="AboutScreen"
        component={AboutNavigation}
        options={{ title: "About" }}
      />
      <PilotDrawer.Screen
        name="SupportScreen"
        component={SupportNavigation}
        options={{ title: "Support" }}
      />
      <PilotDrawer.Screen
        name="Profile"
        component={PilotCreateProfileNavigation}
        options={{ title: "Profile" }}
      />
      <PilotDrawer.Screen
        name="MessagingScreen"
        component={MessagingNavigation}
        options={{ title: "Messages" }}
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

export default PilotNavigation;
