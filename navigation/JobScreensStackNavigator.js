import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import JobListScreen from "../screens/pilot/JobListScreen";
import JobDetailsScreen from "../screens/pilot/JobDetailsScreen";
import AcceptJobScreen from "../screens/pilot/AcceptJobScreen";
import ClientProfileScreen from '../screens/client/ClientProfileScreen';
import ChatScreen from '../screens/messaging/ChatScreen';
import PilotCreateProfileNavigation from './PilotCreateProfileNavigation'
import MainHeader from '../components/MainHeader';
import NestedHeader from '../components/NestedHeader';
import { Ionicons } from "@expo/vector-icons";

const JobScreensStack = createStackNavigator();

function JobScreensStackNavigator() {
  return (
    <JobScreensStack.Navigator>
      <JobScreensStack.Screen
        name="JobListScreen"
        component={JobListScreen}
        options={{
          title: "Available Jobs",
          headerTitle: () => <MainHeader />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100
          },
        }}
      />
      <JobScreensStack.Screen
        name="JobDetailsScreen"
        component={JobDetailsScreen}
        options={{
          title: "Job Details",
          headerTitle: () => <NestedHeader />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100
          },
          headerBackImage: () => <Ionicons name="ios-arrow-round-back" size={50} color={"white"} />,
        }}
      />
      <JobScreensStack.Screen
        name="AcceptJobScreen"
        component={AcceptJobScreen}
        options={{
          title: "Accept Job",
          headerTitle: () => <NestedHeader />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100
          },
          headerBackImage: () => <Ionicons name="ios-arrow-round-back" size={50} color={"white"} />,
        }}
      />
      <JobScreensStack.Screen
        name="ClientProfileScreen"
        component={ClientProfileScreen}
        options={{
          title: "Profile",
          headerTitle: () => <NestedHeader />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100
          },
          headerBackImage: () => <Ionicons name="ios-arrow-round-back" size={50} color={"white"} />,
        }}
      />
      <JobScreensStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          title: "Chat",
          headerTitle: () => <NestedHeader />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100
          },
          headerBackImage: () => <Ionicons name="ios-arrow-round-back" size={50} color={"white"} />,
        }}
      />
    </JobScreensStack.Navigator>
  );
}

export default JobScreensStackNavigator;
