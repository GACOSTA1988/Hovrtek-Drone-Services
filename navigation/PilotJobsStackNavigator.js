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
          headerTitle: () => <GlobalHeader isHome={true} subheaderTitle={"My Jobs"}  />,
          headerStyle: {
            backgroundColor:"#161616",
            height: 100,
          },
        }}
      />
      <JobsStack.Screen
        name="JobDetailsScreen"
        component={JobDetailsScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} subheaderTitle={"Job Details"}  />,
          headerStyle: {
            backgroundColor:"#161616",
            height: 100,
          },
        }}
      />
      <JobsStack.Screen
        name="ClientProfileScreen"
        component={ClientProfileScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} subheaderTitle={" "}/>,
          headerStyle: {
            backgroundColor: "#161616",
            height: 100,
          },
        }}
      />
    </JobsStack.Navigator>
  );
};

export default PilotJobsStackNavigator;