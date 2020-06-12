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
import { Ionicons } from "@expo/vector-icons";
import GlobalHeader from "../components/shared/GlobalHeader";


const HomeStack = createStackNavigator();

const mainHeaderStyle = {
  backgroundColor: "#092455",
  height: 100,
  borderBottomColor: "grey",
  borderBottomWidth: 10,
};

const ClientHomeStackNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="NewProjectScreenWelcome">
      <HomeStack.Screen
        name="NewProjectScreenWelcome"
        component={NewProjectScreenWelcome}
        options={{
          headerBackTitle: " ",
          title: "Welcome",
          headerTitle: () => <GlobalHeader isHome={true}/>,
          headerStyle: mainHeaderStyle,
        }}
      />
      <HomeStack.Screen
        name="NewProjectScreenOne"
        component={NewProjectScreenOne}
        options={{
          headerLeft: null,
          headerBackTitle: " ",
          title: "New Project",
          headerTitle: () => <GlobalHeader isHome={false}/>,
          headerStyle: mainHeaderStyle,
        }}
      />
      <HomeStack.Screen
        name="NewProjectScreenTwo"
        component={NewProjectScreenTwo}
        options={{
          headerLeft: null,
          headerBackTitle: " ",
          title: "New Project",
          headerTitle: () => <GlobalHeader isHome={false}/>,
          headerStyle: mainHeaderStyle,
        }}
      />
      <HomeStack.Screen
        name="NewProjectScreenThree"
        component={NewProjectScreenThree}
        options={{
          headerLeft: null,
          headerBackTitle: " ",
          title: "New Project",
          headerTitle: () => <GlobalHeader isHome={false}/>,
          headerStyle: mainHeaderStyle,
        }}
      />
      <HomeStack.Screen
        name="ProjectListScreen"
        component={ProjectListScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false}/>,
          headerStyle: mainHeaderStyle,
          headerBackTitle: " ",
          title: "",
        }}
      />
      <HomeStack.Screen
        name="ProjectDetailsScreen"
        component={ProjectDetailsScreen}
        options={{
          headerLeft: null,
          headerBackTitle: " ",
          title: "",
          headerTitle: () => <GlobalHeader isHome={false}/>,
          headerStyle: mainHeaderStyle,
        }}
      />
      <HomeStack.Screen
        name="EditProjectScreen"
        component={EditProjectScreen}
        options={{
          headerLeft: null,
          headerBackTitle: " ",
          title: "Edit",
          headerTitle: () => <GlobalHeader isHome={false}/>,
          headerStyle: mainHeaderStyle,
        }}
      />
      <HomeStack.Screen
        name="PilotProfileWelcomeScreen"
        component={PilotProfileWelcomeScreen}
        options={{
          headerLeft: null,
          headerBackTitle: " ",
          title: "Pilot Profile",
          headerTitle: () => <GlobalHeader isHome={false}/>,
          headerStyle: mainHeaderStyle,
        }}
      />
      <HomeStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false}/>,
          headerStyle: mainHeaderStyle,
          headerBackTitle: " ",
          title: "Pilot Profile",
        }}
      />
    </HomeStack.Navigator>
  );
};

export default ClientHomeStackNavigator;
