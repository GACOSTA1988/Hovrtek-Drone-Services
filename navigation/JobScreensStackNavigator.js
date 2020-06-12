import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import JobListScreen from "../screens/pilot/JobListScreen";
import JobDetailsScreen from "../screens/pilot/JobDetailsScreen";
import AcceptJobScreen from "../screens/pilot/AcceptJobScreen";
import ClientProfileScreen from '../screens/client/ClientProfileScreen';
import ChatScreen from '../screens/messaging/ChatScreen';
import GlobalHeader from "../components/shared/GlobalHeader";
import { Ionicons } from "@expo/vector-icons";

const JobScreensStack = createStackNavigator();

function JobScreensStackNavigator() {
  return (
    <JobScreensStack.Navigator>
      <JobScreensStack.Screen
        name="JobListScreen"
        component={JobListScreen}
        options={{
          headerTitle: () => <GlobalHeader isHome={true} />,
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
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100
          },
        }}
      />
      <JobScreensStack.Screen
        name="AcceptJobScreen"
        component={AcceptJobScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100
          },
        }}
      />
      <JobScreensStack.Screen
        name="ClientProfileScreen"
        component={ClientProfileScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100
          },
        }}
      />
      <JobScreensStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100
          },
        }}
      />
    </JobScreensStack.Navigator>
  );
}

export default JobScreensStackNavigator;
