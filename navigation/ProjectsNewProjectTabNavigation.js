import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProjectScreensStackNavigator from "./ProjectScreensStackNavigator";
import NewProjectScreen from "../screens/client/NewProjectScreen.js";

const HomeScreenTab = createMaterialTopTabNavigator();

function ProjectsNewProjectTabNavigation() {
  return (
    <HomeScreenTab.Navigator>
      <HomeScreenTab.Screen
        name="Projects"
        component={ProjectScreensStackNavigator}
      />
      <HomeScreenTab.Screen
        name="Create New Project"
        component={NewProjectScreen}
      />
    </HomeScreenTab.Navigator>
  );
}

export default ProjectsNewProjectTabNavigation;
