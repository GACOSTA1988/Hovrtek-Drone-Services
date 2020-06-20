import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagingScreen from "../screens/messaging/MessagingScreen";
import ChatScreen from "../screens/messaging/ChatScreen";
import GlobalHeader from "../components/shared/GlobalHeader";
import { Ionicons } from "@expo/vector-icons";

const MessagingNavigatorStack = createStackNavigator();

function MessagingNavigation() {
  return (
    <MessagingNavigatorStack.Navigator>
      <MessagingNavigatorStack.Screen
        name="MessagingScreen"
        component={MessagingScreen}
        options={{
          headerTitle: () => <GlobalHeader isHome={true} subheaderTitle={"Messages"} />,
          headerStyle: {
            backgroundColor: "#161616",
            height: 100
          },
        }}
      />
      <MessagingNavigatorStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} subheaderTitle={"Messages"} />,
          headerStyle: {
            backgroundColor: "#161616",
            height: 100
          },
        }}
      />
    </MessagingNavigatorStack.Navigator>
  );
}

export default MessagingNavigation;
