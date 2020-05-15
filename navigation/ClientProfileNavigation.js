import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ClientProfileScreen from "../screens/client/ClientProfileScreen";
import ClientEditProfileScreen from "../screens/client/ClientEditProfileScreen";
import MainHeader from "../components/MainHeader";
import NestedHeader from "../components/NestedHeader";
import { APP_STRINGS, APP_COLORS } from "../constants";

const { profile, editProfile } = APP_STRINGS;

const generateNavOptions = (title = "", headerTitleComponent = {}) => {
  return {
    title,
    headerTitle: headerTitleComponent,
    headerStyle: {
      backgroundColor: APP_COLORS.clientNavHeaderBG,
      height: 100, // TODO this should be somewhere else, with other styles
    },
  };
};

const profileScreensMetadata = [
  {
    name: "ClientProfileScreen",
    component: ClientProfileScreen,
    options: generateNavOptions(profile, MainHeader),
  },
  {
    name: "ClientEditProfileScreen",
    component: ClientEditProfileScreen,
    options: generateNavOptions(editProfile, NestedHeader),
  },
];

function ClientProfileNavigator() {
  const ClientProfileNavigation = createStackNavigator();

  const clientProfileNavScreens = profileScreensMetadata.map((metadata) => {
    const { name, component, options } = metadata;

    return (
      <ClientProfileNavigation.Screen
        name={name}
        component={component}
        options={options}
      />
    );
  });

  return (
    <ClientProfileNavigation.Navigator>
      {clientProfileNavScreens}
    </ClientProfileNavigation.Navigator>
  );
}

export default ClientProfileNavigator;
