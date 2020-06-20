import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProjectListScreen from "../screens/client/ProjectListScreen";
import ProjectDetailsScreen from "../screens/client/ProjectDetailsScreen";
import EditProjectScreen from "../screens/client/EditProjectScreen";
import PilotProfileWelcomeScreen from "../screens/pilot/PilotProfileWelcomeScreen";
import ChatScreen from "../screens/messaging/ChatScreen";
import GlobalHeader from "../components/shared/GlobalHeader";
import { Ionicons } from "@expo/vector-icons";

const ProjectStack = createStackNavigator();

const mainHeaderStyle = {
  backgroundColor: "#161616",
  height: 100,
};

const ClientProjectStackNavigator = () => {
  return (
    <ProjectStack.Navigator initialRouteName="ProjectListScreen">
      <ProjectStack.Screen
        name="ProjectListScreen"
        component={ProjectListScreen}
        options={{
          headerTitle: () => <GlobalHeader isHome={true} subheaderTitle={"My Projects"} />,
          headerStyle: mainHeaderStyle,
        }}
      />
      <ProjectStack.Screen
        name="ProjectDetailsScreen"
        component={ProjectDetailsScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} subheaderTitle={"My Projects"} />,
          headerStyle: mainHeaderStyle,
        }}
      />
      <ProjectStack.Screen
        name="EditProjectScreen"
        component={EditProjectScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} subheaderTitle={"My Projects"} />,
          headerStyle: mainHeaderStyle,
        }}
      />
      <ProjectStack.Screen
        name="PilotProfileWelcomeScreen"
        component={PilotProfileWelcomeScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} />,
          headerStyle: mainHeaderStyle,
        }}
      />
      <ProjectStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} subheaderTitle={"Messages"} />,
          headerStyle: mainHeaderStyle,
        }}
      />
    </ProjectStack.Navigator>
  );
};

export default ClientProjectStackNavigator;