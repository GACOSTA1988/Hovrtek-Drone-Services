import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProjectListScreen from "../screens/client/ProjectListScreen";
import ProjectDetailsScreen from "../screens/client/ProjectDetailsScreen";
import EditProjectScreen from "../screens/client/EditProjectScreen";

const ProjectScreensStack = createStackNavigator();

function ProjectScreensStackNavigator({ navigation }) {
  return (
    <ProjectScreensStack.Navigator>
      <ProjectScreensStack.Screen
        name="ProjectListScreen"
        component={ProjectListScreen}
      />
      <ProjectScreensStack.Screen
        name="ProjectDetailsScreen"
        component={ProjectDetailsScreen}
      />
      <ProjectScreensStack.Screen
        name="EditProjectScreen"
        component={EditProjectScreen}
      />
    </ProjectScreensStack.Navigator>
  );
}

export default ProjectScreensStackNavigator;
