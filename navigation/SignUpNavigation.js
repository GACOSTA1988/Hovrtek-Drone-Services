import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WhichSignUpScreen from "../screens/auth/WhichSignUpScreen";
import PilotSignUpScreen from "../screens/auth/PilotSignUpScreen";
import ClientSignUpScreen from "../screens/auth/ClientSignUpScreen";

const baseObject = { headerMode: "none" };

const signUpScreensMetadata = [
  {
    ...baseObject,
    name: "WhichSignUpScreen",
    component: WhichSignUpScreen,
  },
  {
    ...baseObject,
    name: "PilotSignUpScreen",
    component: PilotSignUpScreen,
  },
  {
    ...baseObject,
    name: "ClientSignUpScreen",
    component: ClientSignUpScreen,
  },
];

const SignUpNavigation = () => {
  const SignUpStack = createStackNavigator();

  const signUpStackScreens = signUpScreensMetadata.map((metadata) => {
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
