import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ClientProfileScreen from "../screens/client/ClientProfileScreen";
import ClientEditProfileScreen from "../screens/client/ClientEditProfileScreen";
import GlobalHeader from "../components/shared/GlobalHeader";
import { Ionicons } from "@expo/vector-icons";

const ClientProfileNavigation = createStackNavigator();

function ClientProfileNavigator() {
  return (
    <ClientProfileNavigation.Navigator>
      <ClientProfileNavigation.Screen
        name="ClientProfileScreen"
        component={ClientProfileScreen}
        options={{
          animationEnabled: false,
          headerTitle: () => <GlobalHeader isHome={false} subheaderTitle={"Profile"} />,
          headerStyle: {
            backgroundColor: "#161616",
            height: 100,
          },
        }}
      />
      <ClientProfileNavigation.Screen
        name="ClientEditProfileScreen"
        component={ClientEditProfileScreen}
        options={{
          headerLeft: null,
          animationEnabled: false,
          headerTitle: () => <GlobalHeader isHome={false} subheaderTitle={"Edit Profile"} />,
          headerStyle: {
            backgroundColor: "#161616",
            height: 100
          },
        }}
      />
    </ClientProfileNavigation.Navigator>
  );
}

export default ClientProfileNavigator;