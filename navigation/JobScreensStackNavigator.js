import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import JobListScreen from "../screens/pilot/JobListScreen";
import JobDetailsScreen from "../screens/pilot/JobDetailsScreen";
import AcceptJobScreen from "../screens/pilot/AcceptJobScreen";
import ClientProfileScreen from '../screens/client/ClientProfileScreen';

const JobScreensStack = createStackNavigator();

function JobScreensStackNavigator() {
  return (
    <JobScreensStack.Navigator headerMode="none">
      <JobScreensStack.Screen
        name="JobListScreen"
        component={JobListScreen}
      />
      <JobScreensStack.Screen
        name="JobDetailsScreen"
        component={JobDetailsScreen}
      />
      <JobScreensStack.Screen
        name="AcceptJobScreen"
        component={AcceptJobScreen}
      />
      <JobScreensStack.Screen
        name="ClientProfileScreen"
        component={ClientProfileScreen}
      />
    </JobScreensStack.Navigator>
  );
}

export default JobScreensStackNavigator;
