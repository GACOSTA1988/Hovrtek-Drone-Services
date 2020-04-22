import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import JobScreensStackNavigator from "./JobScreensStackNavigator";
import MyJobsScreen from "../screens/pilot/MyJobsScreen.js";

const HomeScreenTab = createMaterialTopTabNavigator();

function JobListMyJobsTabNavigation({ navigation }) {
  return (
    <HomeScreenTab.Navigator>
      <HomeScreenTab.Screen
        name="Available Jobs"
        component={JobScreensStackNavigator}
      />
      <HomeScreenTab.Screen
        name="My Jobs"
        component={MyJobsScreen}
      />
    </HomeScreenTab.Navigator>
  );
}

export default JobListMyJobsTabNavigation;
