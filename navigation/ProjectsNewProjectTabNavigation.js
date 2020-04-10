import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProjectListScreen from "../screens/client/ProjectListScreen.js";
import NewProjectScreen from "../screens/client/NewProjectScreen.js";

const HomeScreenTab = createMaterialTopTabNavigator();

function ProjectsNewProjectTabNavigation({ navigation }) {
  return (
    <HomeScreenTab.Navigator>
      <HomeScreenTab.Screen
        name="ProjectListScreen"
        component={ProjectListScreen}
      />
      <HomeScreenTab.Screen
        name="NewProjectScreen"
        component={NewProjectScreen}
      />
    </HomeScreenTab.Navigator>
  );
}

export default ProjectsNewProjectTabNavigation;
