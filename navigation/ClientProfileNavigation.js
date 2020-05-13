import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ClientProfileScreen from "../screens/client/ClientProfileScreen";
import ClientEditProfileScreen from "../screens/client/ClientEditProfileScreen";
import MainHeader from "../components/MainHeader";
import NestedHeader from "../components/NestedHeader";
import { Ionicons } from "@expo/vector-icons";

// TODO move to central app strings
const APP_STRINGS = {
  profile: "Profile",
  editProfile: "Edit Profile",
};

// named by using the hex value in http://chir.ag/projects/name-that-color/#092455
const APP_COLORS = {
  downriver: "#092455",
};

const generateNavOptions = (title = "", headerTitleComponent = {}) => {
  return {
    title,
    headerTitle: headerTitleComponent,
    headerStyle: {
      backgroundColor: APP_COLORS.downriver,
      height: 100,
    },
  };
};

const clientNavProfileNavScreensMetadata = [
  {
    name: "ClientProfileScreen",
    component: ClientProfileScreen,
    options: generateNavOptions(APP_STRINGS.profile, MainHeader),
  },
  {
    name: "ClientEditProfileScreen",
    component: ClientEditProfileScreen,
    options: generateNavOptions(APP_STRINGS.editProfile, NestedHeader),
  },
];

function ClientProfileNavigator() {
  const ClientProfileNavigation = createStackNavigator();

  const clientProfileNavScreens = clientNavProfileNavScreensMetadata.map(
    metadata => {
      const { name, component, options } = metadata;

      return (
        <ClientProfileNavigation.Screen
          name={metadata.name}
          component={metadata.component}
          options={metadata.options}
        />
      );
    },
  );

  return (
    <ClientProfileNavigation.Navigator>
      {clientProfileNavScreens}
    </ClientProfileNavigation.Navigator>
  );
}

export default ClientProfileNavigator;
