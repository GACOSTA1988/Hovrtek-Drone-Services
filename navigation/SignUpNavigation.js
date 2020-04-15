import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../context";
import WhichSignUpScreen from '../screens/auth/WhichSignUpScreen';
import PilotSignUpScreen from '../screens/auth/PilotSignUpScreen';
import ClientSignUpScreen from '../screens/auth/ClientSignUpScreen';

const SignUpStack = createStackNavigator();

const SignUpNavigation = () => {
  return (
    <SignUpStack.Navigator>
      <SignUpStack.Screen
        name="WhichSignUpScreen"
        component={WhichSignUpScreen}
        headerMode="none"
      />
      <SignUpStack.Screen
        name="PilotSignUpScreen"
        component={PilotSignUpScreen}
        headerMode="none"
      />
      <SignUpStack.Screen
        name='ClientSignUpScreen'
        component={ClientSignUpScreen}
        headerMode="none"
      />
    </SignUpStack.Navigator>
  );
};

export default SignUpNavigation;
