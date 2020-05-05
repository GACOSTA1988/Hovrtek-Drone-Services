import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagingScreen from "../screens/messaging/MessagingScreen";
import ChatScreen from "../screens/messaging/ChatScreen";

const MessagingNavigatorStack = createStackNavigator();

function MessagingNavigation() {
  return (
    <MessagingNavigatorStack.Navigator headerMode="none">
      <MessagingNavigatorStack.Screen
        name="MessagingScreen"
        component={MessagingScreen}
      />
      <MessagingNavigatorStack.Screen
        name="ChatScreen"
        component={ChatScreen}
      />
    </MessagingNavigatorStack.Navigator>
  );
}

export default MessagingNavigation;
