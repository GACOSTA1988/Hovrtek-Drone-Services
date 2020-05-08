import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PilotProfileWelcomeScreen from "../screens/pilot/PilotProfileWelcomeScreen";
import PilotProfileSetupPageOneScreen from "../screens/pilot/PilotProfileSetupPageOneScreen";
import PilotProfileSetupPageTwoScreen from "../screens/pilot/PilotProfileSetupPageTwoScreen";
import PilotProfileImageUploadScreen from "../screens/pilot/PilotProfileImageUploadScreen";
import MainHeader from '../components/MainHeader';
import NestedHeader from '../components/NestedHeader';
import { Ionicons } from "@expo/vector-icons";

const PilotCreateProfileNavigationStack = createStackNavigator();

function PilotCreateProfileNavigation() {
  return (
    <PilotCreateProfileNavigationStack.Navigator>
      <PilotCreateProfileNavigationStack.Screen
        name="Profile"
        component={PilotProfileWelcomeScreen}
        options={{
          title: "About",
          headerTitle: () => <MainHeader />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100
          },
        }}
      />
      <PilotCreateProfileNavigationStack.Screen
        name="PilotProfilePageSetupPageOneScreen"
        component={PilotProfileSetupPageOneScreen}
        options={{
          title: "Chat",
          headerTitle: () => <NestedHeader />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100
          },
          headerBackImage: () => <Ionicons name="ios-arrow-round-back" size={50} color={"white"} />,
        }}
      />
      <PilotCreateProfileNavigationStack.Screen
        name="PilotProfileSetupPageTwoScreen"
        component={PilotProfileSetupPageTwoScreen}
        options={{
          title: "Chat",
          headerTitle: () => <NestedHeader />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100
          },
          headerBackImage: () => <Ionicons name="ios-arrow-round-back" size={50} color={"white"} />,
        }}
      />
      <PilotCreateProfileNavigationStack.Screen
        name="PilotProfileImageUploadScreen"
        component={PilotProfileImageUploadScreen}
        options={{
          title: "Chat",
          headerTitle: () => <NestedHeader />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100
          },
          headerBackImage: () => <Ionicons name="ios-arrow-round-back" size={50} color={"white"} />,
        }}
      />
    </PilotCreateProfileNavigationStack.Navigator>
  );
}

export default PilotCreateProfileNavigation;
