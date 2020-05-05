import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagingScreen from "../screens/messaging/MessagingScreen";
import ChatScreen from "../screens/messaging/ChatScreen";

const MessagingStack = createStackNavigator();

function MessagingNavigation() {
  return (
    <MessagingStack.Navigator headerMode="none">
      <MessagingStack.Screen
        name="MessagingScreen"
        component={MessagingScreen}
      />
      <MessagingStack.Screen
        name="ChatScreen"
        component={ChatScreen}
      />
    </MessagingStack.Navigator>
  );
}

export default MessagingNavigation;
