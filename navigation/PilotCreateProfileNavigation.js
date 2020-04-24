import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PilotProfileWelcomeScreen from "../screens/pilot/PilotProfileWelcomeScreen";
import PilotProfileSetupPageOneScreen from "../screens/pilot/PilotProfileSetupPageOneScreen";
import PilotProfileSetupPageTwoScreen from "../screens/pilot/PilotProfileSetupPageTwoScreen";
import PilotProfileImageUploadScreen from "../screens/pilot/PilotProfileImageUploadScreen";

const PilotCreateProfileNavigation = createStackNavigator();

function PilotCreateProfileNavigator() {
  return (
    <PilotCreateProfileNavigation.Navigator headerMode="none">
      <PilotCreateProfileNavigation.Screen
        name="Profile"
        component={PilotProfileWelcomeScreen}
      />
      <PilotCreateProfileNavigation.Screen
        name="PilotProfilePageSetupPageOneScreen"
        component={PilotProfileSetupPageOneScreen}
      />
      <PilotCreateProfileNavigation.Screen
        name="PilotProfileSetupPageTwoScreen"
        component={PilotProfileSetupPageTwoScreen}
      />
      <PilotCreateProfileNavigation.Screen
        name="PilotProfileImageUploadScreen"
        component={PilotProfileImageUploadScreen}
      />
    </PilotCreateProfileNavigation.Navigator>
  );
}

export default PilotCreateProfileNavigator;
