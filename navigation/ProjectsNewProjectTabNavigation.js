import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProjectScreensStackNavigator from "./ProjectScreensStackNavigator";
import NewProjectScreen from "../screens/client/NewProjectScreen.js";

const HomeScreenTab = createMaterialTopTabNavigator();

function ProjectsNewProjectTabNavigation({ navigation }) {
  return (
    <HomeScreenTab.Navigator>
      <HomeScreenTab.Screen
        name="ProjectScreensStackNavigator"
        component={ProjectScreensStackNavigator}
      />
      <HomeScreenTab.Screen
        name="NewProjectScreen"
        component={NewProjectScreen}
      />
    </HomeScreenTab.Navigator>
  );
}

export default ProjectsNewProjectTabNavigation;
