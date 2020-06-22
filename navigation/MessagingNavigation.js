import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagingScreen from "../screens/messaging/MessagingScreen";
import ChatScreen from "../screens/messaging/ChatScreen";
import GlobalHeader from "../components/shared/GlobalHeader";

const MessagingNavigatorStack = createStackNavigator();

function MessagingNavigation(props) {

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
          headerTitle: () => <GlobalHeader isHome={false} subheaderTitle={props.route.state.routes[1].params ? (props.route.state.routes[1].params.firstName + " " + props.route.state.routes[1].params.lastName) : " "} />,
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
