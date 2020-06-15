import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import JobListScreen from "../screens/pilot/JobListScreen";
import JobDetailsScreen from "../screens/pilot/JobDetailsScreen";
import AcceptJobScreen from "../screens/pilot/AcceptJobScreen";
import ClientProfileScreen from "../screens/client/ClientProfileScreen";
import ChatScreen from "../screens/messaging/ChatScreen";
import PilotCreateProfileNavigation from "./PilotCreateProfileNavigation";
import MyJobsScreen from "../screens/pilot/MyJobsScreen.js";
import GlobalHeader from "../components/shared/GlobalHeader";
import MapComponent from "../screens/pilot/MapComponent"
import { Ionicons } from "@expo/vector-icons";

const HomeStack = createStackNavigator();

const PilotHomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
        <HomeStack.Screen
        name="JobListScreen"
        component={JobListScreen}
        options={{
            headerLeft: null,
            headerTitle: () => <GlobalHeader isHome={true} />,
            headerStyle: {
              backgroundColor: "#092455",
              height: 100,
            },   
          }}
      />
      <HomeStack.Screen
        name="MapComponent"
        component={MapComponent}
        options={{
            headerLeft: null,
            headerTitle: () => <GlobalHeader isHome={false} />,
            headerStyle: {
              backgroundColor: "#092455",
              height: 100,
            },   
          }}
      />
      <HomeStack.Screen
        name="JobDetailsScreen"
        component={JobDetailsScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100,
          },   
        }}
      />
      <HomeStack.Screen
        name="AcceptJobScreen"
        component={AcceptJobScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100,
            borderBottomColor: "grey",
            borderBottomWidth: 10,
          },
        }}
      />
      <HomeStack.Screen
        name="ClientProfileScreen"
        component={ClientProfileScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100,
          },
        }}
      />
      <HomeStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100,
          },
        }}
      />
      <HomeStack.Screen
        name="MyJobsScreen"
        component={MyJobsScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={true} />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100,
          },
        }}
      />
      <HomeStack.Screen
        name="Profile"
        component={PilotCreateProfileNavigation}
        options={{
          headerLeft: null,
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};

export default PilotHomeStackNavigator;
