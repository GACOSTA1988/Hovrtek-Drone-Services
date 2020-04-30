import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ClientProfileScreen from "../screens/client/ClientProfileScreen";
import ClientEditProfileScreen from "../screens/client/ClientEditProfileScreen";

const ClientProfileNavigation = createStackNavigator();

function ClientProfileNavigator() {
  return (
    <ClientProfileNavigation.Navigator headerMode="none">
      <ClientProfileNavigation.Screen
        name="ClientProfileScreen"
        component={ClientProfileScreen}
      />
      <ClientProfileNavigation.Screen
        name="ClientEditProfileScreen"
        component={ClientEditProfileScreen}
      />
    </ClientProfileNavigation.Navigator>
  );
}

export default ClientProfileNavigator;
