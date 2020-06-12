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
          title: "Profile",
          headerTitle: () => <GlobalHeader isHome={false} />,
          headerStyle: {
            backgroundColor: "#092455",
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
          title: "Edit Profile",
          headerTitle: () => <GlobalHeader isHome={false} />,
          headerStyle: {
            backgroundColor: "#092455",
            height: 100
          },
        }}
      />
    </ClientProfileNavigation.Navigator>
  );
}

export default ClientProfileNavigator;
