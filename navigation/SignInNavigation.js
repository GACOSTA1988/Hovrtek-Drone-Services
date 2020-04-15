import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../context";
import WhichSignInScreen from '../screens/auth/WhichSignInScreen';
import PilotSignInScreen from '../screens/auth/PilotSignInScreen';
import ClientSignInScreen from '../screens/auth/ClientSignInScreen';

const SignInStack = createStackNavigator();

const SignInNavigation = () => {
  return (
    <SignInStack.Navigator>
      <SignInStack.Screen
        name="WhichSignInScreen"
        component={WhichSignInScreen}
        headerMode="none"
      />
      <SignInStack.Screen
        name="PilotSignInScreen"
        component={PilotSignInScreen}
        headerMode="none"
      />
      <SignInStack.Screen
        name='ClientSignInScreen'
        component={ClientSignInScreen}
        headerMode="none"
      />
    </SignInStack.Navigator>
  );
};

export default SignInNavigation;
