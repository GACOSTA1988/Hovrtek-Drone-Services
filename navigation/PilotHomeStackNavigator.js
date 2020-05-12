import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import JobListScreen from "../screens/pilot/JobListScreen";
import JobDetailsScreen from "../screens/pilot/JobDetailsScreen";
import AcceptJobScreen from "../screens/pilot/AcceptJobScreen";
import ClientProfileScreen from "../screens/client/ClientProfileScreen";
import ChatScreen from "../screens/messaging/ChatScreen";
import PilotCreateProfileNavigation from "./PilotCreateProfileNavigation";
import MyJobsScreen from "../screens/pilot/MyJobsScreen.js";
import MainHeader from "../components/MainHeader";
import NestedHeader from "../components/NestedHeader";
import { Ionicons } from "@expo/vector-icons";

const HomeStack = createStackNavigator();

const PilotHomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="JobListScreen"
        component={JobListScreen}
        options={{
          title: "Available Jobs",
          headerTitle: () => <MainHeader />,
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
          title: "Job Details",
          headerTitle: () => <NestedHeader />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100,
          },
          headerBackImage: () => (
            <Ionicons name="ios-arrow-round-back" size={50} color={"white"} />
          ),
        }}
      />
      <HomeStack.Screen
        name="AcceptJobScreen"
        component={AcceptJobScreen}
        options={{
          title: "Accept Job",
          headerTitle: () => <NestedHeader />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100,
          },
          headerBackImage: () => (
            <Ionicons name="ios-arrow-round-back" size={50} color={"white"} />
          ),
        }}
      />
      <HomeStack.Screen
        name="ClientProfileScreen"
        component={ClientProfileScreen}
        options={{
          title: "Profile",
          headerTitle: () => <NestedHeader />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100,
          },
          headerBackImage: () => (
            <Ionicons name="ios-arrow-round-back" size={50} color={"white"} />
          ),
        }}
      />
      <HomeStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          title: "Chat",
          headerTitle: () => <NestedHeader />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100,
          },
          headerBackImage: () => (
            <Ionicons name="ios-arrow-round-back" size={50} color={"white"} />
          ),
        }}
      />
      <HomeStack.Screen
        name="My Jobs"
        component={MyJobsScreen}
        options={{
          title: "My Jobs",
          headerTitle: () => <MainHeader />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100,
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

export default PilotHomeStackNavigator;
