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
  backgroundColor: "#092455",
  height: 100,
  borderBottomColor: "grey",
  borderBottomWidth: 10,
};

const ClientProjectStackNavigator = () => {
  return (
    <ProjectStack.Navigator initialRouteName="ProjectListScreen">
      <ProjectStack.Screen
        name="ProjectListScreen"
        component={ProjectListScreen}
        options={{
          headerTitle: () => <GlobalHeader isHome={true} />,
          headerStyle: mainHeaderStyle,
          headerBackTitle: " ",
          title: "",
        }}
      />
      <ProjectStack.Screen
        name="ProjectDetailsScreen"
        component={ProjectDetailsScreen}
        options={{
          headerLeft: null,
          headerBackTitle: " ",
          title: "",
          headerTitle: () => <GlobalHeader isHome={false} />,
          headerStyle: mainHeaderStyle,
        }}
      />
      <ProjectStack.Screen
        name="EditProjectScreen"
        component={EditProjectScreen}
        options={{
          headerLeft: null,
          headerBackTitle: " ",
          title: "Edit",
          headerTitle: () => <GlobalHeader isHome={false} />,
          headerStyle: mainHeaderStyle,
        }}
      />
      <ProjectStack.Screen
        name="PilotProfileWelcomeScreen"
        component={PilotProfileWelcomeScreen}
        options={{
          headerLeft: null,
          headerBackTitle: " ",
          title: "Pilot Profile",
          headerTitle: () => <GlobalHeader isHome={false} />,
          headerStyle: mainHeaderStyle,
        }}
      />
      <ProjectStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} />,
          headerStyle: mainHeaderStyle,
          headerBackTitle: " ",
          title: "Pilot Profile",
        }}
      />
    </ProjectStack.Navigator>
  );
};

export default ClientProjectStackNavigator;