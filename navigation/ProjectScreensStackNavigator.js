import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProjectListScreen from "../screens/client/ProjectListScreen";
import ProjectDetailsScreen from "../screens/client/ProjectDetailsScreen";
import EditProjectScreen from "../screens/client/EditProjectScreen";
import PilotProfileWelcomeScreen from '../screens/pilot/PilotProfileWelcomeScreen';
import ChatScreen from '../screens/messaging/ChatScreen';
import GlobalHeader from "../components/shared/GlobalHeader";
import { Ionicons } from "@expo/vector-icons";

const ProjectScreensStack = createStackNavigator();

function ProjectScreensStackNavigator() {
  return (
    <ProjectScreensStack.Navigator>
      <ProjectScreensStack.Screen
        name="ProjectListScreen"
        component={ProjectListScreen}
        options={{
          headerTitle: () => <GlobalHeader isHome={true} />,
          headerStyle: {
            backgroundColor: "#161616",
            height: 100
          }
        }}
      />
      <ProjectScreensStack.Screen
        name="ProjectDetailsScreen"
        component={ProjectDetailsScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} />,
          headerStyle: {
            backgroundColor: "#161616",
            height: 100
          }
        }}
      />
      <ProjectScreensStack.Screen
        name="EditProjectScreen"
        component={EditProjectScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} />,
          headerStyle: {
            backgroundColor: "#161616",
            height: 100
          }
        }}
      />
      <ProjectScreensStack.Screen
        name="PilotProfileWelcomeScreen"
        component={PilotProfileWelcomeScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} />,
          headerStyle: {
            backgroundColor: "#161616",
            height: 100
          }
        }}
      />
      <ProjectScreensStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} />,
          headerStyle: {
            backgroundColor: "#161616",
            height: 100
          }
        }}
      />
    </ProjectScreensStack.Navigator>
  );
}

export default ProjectScreensStackNavigator;