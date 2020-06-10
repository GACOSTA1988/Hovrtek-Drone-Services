import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ClientProfileScreen from "../screens/client/ClientProfileScreen";
import ClientEditProfileScreen from "../screens/client/ClientEditProfileScreen";
import MainHeader from '../components/shared/MainHeader';
import NestedHeader from '../components/shared/NestedHeader';
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
          headerTitle: () => <MainHeader />,
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
          animationEnabled: false,
          title: "Edit Profile",
          headerTitle: () => <NestedHeader />,
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
