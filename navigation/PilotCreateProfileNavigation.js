import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CreateProfileScreen from "../screens/pilot/CreateProfileScreen";

const PilotCreateProfileNavigation = createStackNavigator();

function PilotCreateProfileNavigationNavigator() {
  return (
    <PilotCreateProfileNavigation.Navigator headerMode="none">
      <PilotCreateProfileNavigation.Screen
        name="Profile"
        component={CreateProfileScreen}
      />
    </PilotCreateProfileNavigation.Navigator>
  );
}

export default PilotCreateProfileNavigationNavigator;
