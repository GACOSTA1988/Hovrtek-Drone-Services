import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProjectListScreen from "../screens/client/ProjectListScreen";
import ProjectDetailsScreen from "../screens/client/ProjectDetailsScreen";
import EditProjectScreen from "../screens/client/EditProjectScreen";
import PilotProfileWelcomeScreen from '../screens/pilot/PilotProfileWelcomeScreen';
import ChatScreen from '../screens/ChatScreen';

const ProjectScreensStack = createStackNavigator();

function ProjectScreensStackNavigator() {
  return (
    <ProjectScreensStack.Navigator headerMode="none">
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
      <ProjectScreensStack.Screen
        name="PilotProfileWelcomeScreen"
        component={PilotProfileWelcomeScreen}
      />
      <ProjectScreensStack.Screen
        name="ChatScreen"
        component={ChatScreen}
      />
    </ProjectScreensStack.Navigator>
  );
}

export default ProjectScreensStackNavigator;
