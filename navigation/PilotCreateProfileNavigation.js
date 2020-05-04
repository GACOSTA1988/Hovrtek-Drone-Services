import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PilotProfileWelcomeScreen from "../screens/pilot/PilotProfileWelcomeScreen";
import PilotProfileSetupPageOneScreen from "../screens/pilot/PilotProfileSetupPageOneScreen";
import PilotProfileSetupPageTwoScreen from "../screens/pilot/PilotProfileSetupPageTwoScreen";
import PilotProfileImageUploadScreen from "../screens/pilot/PilotProfileImageUploadScreen";

const PilotCreateProfileNavigationStack = createStackNavigator();

function PilotCreateProfileNavigation() {
  return (
    <PilotCreateProfileNavigationStack.Navigator headerMode="none">
      <PilotCreateProfileNavigationStack.Screen
        name="Profile"
        component={PilotProfileWelcomeScreen}
      />
      <PilotCreateProfileNavigationStack.Screen
        name="PilotProfilePageSetupPageOneScreen"
        component={PilotProfileSetupPageOneScreen}
      />
      <PilotCreateProfileNavigationStack.Screen
        name="PilotProfileSetupPageTwoScreen"
        component={PilotProfileSetupPageTwoScreen}
      />
      <PilotCreateProfileNavigationStack.Screen
        name="PilotProfileImageUploadScreen"
        component={PilotProfileImageUploadScreen}
      />
    </PilotCreateProfileNavigationStack.Navigator>
  );
}

export default PilotCreateProfileNavigation;
