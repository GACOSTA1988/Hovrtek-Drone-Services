import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WhichSignUpScreen from "../screens/auth/WhichSignUpScreen";
import PilotSignUpScreen from "../screens/auth/PilotSignUpScreen";
import ClientSignUpScreen from "../screens/auth/ClientSignUpScreen";

const signUpScreensMetadata = [
  {
    name: "WhichSignUpScreen",
    component: WhichSignUpScreen,
    headerMode: "none",
  },
  {
    name: "PilotSignUpScreen",
    component: PilotSignUpScreen,
    headerMode: "none",
  },
  {
    name: "ClientSignUpScreen",
    component: ClientSignUpScreen,
    headerMode: "none",
  },
];

const SignUpNavigation = () => {
  const SignUpStack = createStackNavigator();

  const signUpStackScreens = signUpScreensMetadata.map(metadata => {
    const { name, component, headerMode } = metadata;

    return (
      <SignUpStack.Screen
        name={name}
        component={component}
        headerMode={headerMode}
      />
    );
  });

  return signUpStackScreens;
};

export default SignUpNavigation;
