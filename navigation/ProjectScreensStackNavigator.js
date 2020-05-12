import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProjectListScreen from "../screens/client/ProjectListScreen";
import ProjectDetailsScreen from "../screens/client/ProjectDetailsScreen";
import EditProjectScreen from "../screens/client/EditProjectScreen";
import PilotProfileWelcomeScreen from '../screens/pilot/PilotProfileWelcomeScreen';
import ChatScreen from '../screens/messaging/ChatScreen';
import MainHeader from '../components/MainHeader';
import NestedHeader from '../components/NestedHeader';
import { Ionicons } from "@expo/vector-icons";

const ProjectScreensStack = createStackNavigator();

function ProjectScreensStackNavigator() {
  return (
    <ProjectScreensStack.Navigator>
      <ProjectScreensStack.Screen
        name="ProjectListScreen"
        component={ProjectListScreen}
        options={{
          title: "Projects",
          headerTitle: () => <MainHeader />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100
          },
        }}
      />
      <ProjectScreensStack.Screen
        name="ProjectDetailsScreen"
        component={ProjectDetailsScreen}
        options={{
          title: "Details",
          headerTitle: () => <NestedHeader />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100
          },
        }}
      />
      <ProjectScreensStack.Screen
        name="EditProjectScreen"
        component={EditProjectScreen}
        options={{
          title: "Edit",
          headerTitle: () => <NestedHeader />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100
          },
        }}
      />
      <ProjectScreensStack.Screen
        name="PilotProfileWelcomeScreen"
        component={PilotProfileWelcomeScreen}
        options={{
          title: "Profile",
          headerTitle: () => <NestedHeader />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100
          },
        }}
      />
      <ProjectScreensStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          title: "Chat",
          headerTitle: () => <NestedHeader />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100
          },
        }}
      />
    </ProjectScreensStack.Navigator>
  );
}

export default ProjectScreensStackNavigator;
