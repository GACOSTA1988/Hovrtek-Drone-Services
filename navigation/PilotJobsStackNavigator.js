import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import JobListScreen from "../screens/pilot/JobListScreen";
import JobDetailsScreen from "../screens/pilot/JobDetailsScreen";
import AcceptJobScreen from "../screens/pilot/AcceptJobScreen";
import ClientProfileScreen from "../screens/client/ClientProfileScreen";
import ChatScreen from "../screens/messaging/ChatScreen";
import PilotCreateProfileNavigation from "./PilotCreateProfileNavigation";
import MyJobsScreen from "../screens/pilot/MyJobsScreen.js";
import MainHeader from "../components/shared/MainHeader";
import NestedHeader from "../components/shared/NestedHeader";
import { Ionicons } from "@expo/vector-icons";

const JobsStack = createStackNavigator();

const PilotJobsStackNavigator = () => {
  return (
    <JobsStack.Navigator>
      <JobsStack.Screen
        name="MyJobsScreen"
        component={MyJobsScreen}
        options={{
          title: " ",
          headerTitle: () => <MainHeader />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100,
          },
          headerBackImage: () => (
            <Ionicons name="ios-arrow-round-back" size={50} color={"white"} />
          ),
        }}
      />
      <JobsStack.Screen
        name="JobDetailsScreen"
        component={JobDetailsScreen}
        options={{
          title: " ",
          headerTitle: () => <NestedHeader />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100,
            borderBottomColor: "grey",
            borderBottomWidth: 10,
          },
          headerBackImage: () => (
            <Ionicons name="ios-arrow-round-back" size={50} color={"#092455"} />
          ),
        }}
      />
      <JobsStack.Screen
        name="ClientProfileScreen"
        component={ClientProfileScreen}
        options={{
          title: " ",
          headerTitle: () => <NestedHeader />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100,
            borderBottomColor: "grey",
            borderBottomWidth: 10,
          },
          headerBackImage: () => (
            <Ionicons name="ios-arrow-round-back" size={50} color={"#092455"} />
          ),
        }}
      />
      <JobsStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          title: " ",
          headerTitle: () => <NestedHeader />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100,
            borderBottomColor: "grey",
            borderBottomWidth: 10,
          },
          headerBackImage: () => (
            <Ionicons name="ios-arrow-round-back" size={50} color={"#092455"} />
          ),
        }}
      />
    </JobsStack.Navigator>
  );
};

export default PilotJobsStackNavigator;