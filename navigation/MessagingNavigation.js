import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagingScreen from "../screens/messaging/MessagingScreen";
import ChatScreen from "../screens/messaging/ChatScreen";

const MessagingNavigator = createStackNavigator();

function MessagingNavigation() {
  return (
    <MessagingNavigation.Navigator headerMode="none">
      <MessagingNavigation.Screen
        name="MessagingScreen"
        component={MessagingScreen}
      />
      <MessagingNavigation.Screen
        name="ChatScreen"
        component={ChatScreen}
      />
    </MessagingNavigation.Navigator>
  );
}

export default MessagingNavigation;
