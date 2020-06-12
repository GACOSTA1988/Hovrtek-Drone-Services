import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import JobDetailsScreen from "../screens/pilot/JobDetailsScreen";
import ClientProfileScreen from "../screens/client/ClientProfileScreen";
import ChatScreen from "../screens/messaging/ChatScreen";
import MyJobsScreen from "../screens/pilot/MyJobsScreen.js";
import GlobalHeader from "../components/shared/GlobalHeader";
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
          headerTitle: () => <GlobalHeader isHome={true} />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100,
          },
        }}
      />
      <JobsStack.Screen
        name="JobDetailsScreen"
        component={JobDetailsScreen}
        options={{
          headerLeft: null,
          title: " ",
          headerTitle: () => <GlobalHeader isHome={false} />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100,
            borderBottomColor: "grey",
            borderBottomWidth: 10,
          },
        }}
      />
      <JobsStack.Screen
        name="ClientProfileScreen"
        component={ClientProfileScreen}
        options={{
          headerLeft: null,
          title: " ",
          headerTitle: () => <GlobalHeader isHome={false} />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100,
            borderBottomColor: "grey",
            borderBottomWidth: 10,
          },
        }}
      />
      <JobsStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerLeft: null,
          title: " ",
          headerTitle: () => <GlobalHeader isHome={false} />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100,
            borderBottomColor: "grey",
            borderBottomWidth: 10,
          },
        }}
      />
    </JobsStack.Navigator>
  );
};

export default PilotJobsStackNavigator;