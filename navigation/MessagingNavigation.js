import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagingScreen from "../screens/messaging/MessagingScreen";
import ChatScreen from "../screens/messaging/ChatScreen";
import NestedHeader from '../components/NestedHeader';
import MainHeader from '../components/MainHeader';
import { Ionicons } from "@expo/vector-icons";

const MessagingNavigatorStack = createStackNavigator();

function MessagingNavigation() {
  return (
    <MessagingNavigatorStack.Navigator>
      <MessagingNavigatorStack.Screen
        name="MessagingScreen"
        component={MessagingScreen}
        options={{
          headerBackTitle: " ",
          title: "Messaging",
          headerTitle: () => <MainHeader />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100
          },
        }}
      />
      <MessagingNavigatorStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerBackTitle: " ",
          title: "Chat",
          headerTitle: () => <NestedHeader />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100
          },
          // headerBackImage: () => <Ionicons name="ios-arrow-round-back" size={50} color={"white"} />,
        }}
      />
    </MessagingNavigatorStack.Navigator>
  );
}

export default MessagingNavigation;
