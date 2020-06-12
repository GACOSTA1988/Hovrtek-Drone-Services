import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NewProjectScreenOne from "../screens/client/NewProjectScreenOne";
import NewProjectScreenTwo from "../screens/client/NewProjectScreenTwo";
import NewProjectScreenThree from "../screens/client/NewProjectScreenThree";
import NewProjectScreenWelcome from "../screens/client/NewProjectScreenWelcome";
import ProjectListScreen from "../screens/client/ProjectListScreen";
import ProjectDetailsScreen from "../screens/client/ProjectDetailsScreen";
import EditProjectScreen from "../screens/client/EditProjectScreen";
import PilotProfileWelcomeScreen from "../screens/pilot/PilotProfileWelcomeScreen";
import ChatScreen from "../screens/messaging/ChatScreen";
import MainHeader from "../components/shared/MainHeader";
import NestedHeader from "../components/shared/NestedHeader";
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
          headerTitle: () => <NestedHeader />,
          headerStyle: mainHeaderStyle,
          headerBackTitle: " ",
          title: "",
        }}
      />
      <ProjectStack.Screen
        name="ProjectDetailsScreen"
        component={ProjectDetailsScreen}
        options={{
          headerBackTitle: " ",
          title: "",
          headerTitle: () => <NestedHeader />,
          headerStyle: mainHeaderStyle,
        }}
      />
      <ProjectStack.Screen
        name="EditProjectScreen"
        component={EditProjectScreen}
        options={{
          headerBackTitle: " ",
          title: "Edit",
          headerTitle: () => <NestedHeader />,
          headerStyle: mainHeaderStyle,
        }}
      />
      <ProjectStack.Screen
        name="PilotProfileWelcomeScreen"
        component={PilotProfileWelcomeScreen}
        options={{
          headerBackTitle: " ",
          title: "Pilot Profile",
          headerTitle: () => <NestedHeader />,
          headerStyle: mainHeaderStyle,
        }}
      />
      <ProjectStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerTitle: () => <NestedHeader />,
          headerStyle: mainHeaderStyle,
          headerBackTitle: " ",
          title: "Pilot Profile",
        }}
      />
    </ProjectStack.Navigator>
  );
};

export default ClientProjectStackNavigator;