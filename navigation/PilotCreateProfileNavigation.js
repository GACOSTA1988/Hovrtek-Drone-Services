import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PilotProfileWelcomeScreen from "../screens/pilot/PilotProfileWelcomeScreen";
import PilotProfileSetupPageOneScreen from "../screens/pilot/PilotProfileSetupPageOneScreen";
import PilotProfileSetupPageTwoScreen from "../screens/pilot/PilotProfileSetupPageTwoScreen";
import PilotProfileImageUploadScreen from "../screens/pilot/PilotProfileImageUploadScreen";
import MainHeader from "../components/MainHeader";
import NestedHeader from "../components/NestedHeader";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
// todo move to app colors
const backgroundColor = "#092455";

function PilotCreateProfileNavigation() {
  const headerStyle = {
    backgroundColor,
    height: 100,
  };

  const screensMetadata = [
    {
      name: "Profile",
      component: PilotProfileWelcomeScreen,
      options: {
        title: " ",
        headerTitle: () => <MainHeader />,
        headerStyle,
      },
    },
    {
      name: "PilotProfilePageSetupPageOneScreen",
      component: PilotProfileSetupPageOneScreen,
      options: {
        title: " ",
        headerTitle: () => <NestedHeader />,
        headerStyle: {
          ...headerStyle,
          justifyContent: "center",
        },
        headerBackImage: () => (
          <Ionicons
            name="ios-arrow-round-back"
            size={50}
            color={backgroundColor}
          />
        ),
      },
    },
    {
      name: "PilotProfileSetupPageTwoScreen",
      component: PilotProfileSetupPageTwoScreen,
      options: {
        title: " ",
        headerTitle: () => <NestedHeader />,
        headerStyle,
        headerBackImage: () => (
          <Ionicons
            name="ios-arrow-round-back"
            size={50}
            color={backgroundColor}
          />
        ),
      },
    },
    {
      name: "PilotProfileImageUploadScreen",
      component: PilotProfileImageUploadScreen,
      options: {
        title: " ",
        headerTitle: () => <NestedHeader />,
        headerStyle,
        headerBackImage: () => (
          <Ionicons
            name="ios-arrow-round-back"
            size={50}
            color={backgroundColor}
          />
        ),
      },
    },
  ];

  const screens = screensMetadata.map((metadata) => {
    return <Stack.Screen key={metadata.name} {...metadata} />;
  });

  return <Stack.Navigator>{screens}</Stack.Navigator>;
}

export default PilotCreateProfileNavigation;
