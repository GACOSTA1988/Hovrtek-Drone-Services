import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../context";
import WhichSignUpScreen from '../screens/auth/WhichSignUpScreen';
import PilotSignUpScreen from '../screens/auth/PilotSignUpScreen';
import ClientSignUpScreen from '../screens/auth/ClientSignUpScreen';

const SignUpStack = createStackNavigator();

const ClientHomeNavigation = () => {
  return (
    <SignUpStack.Navigator>
      <SignUpStack.Screen
        name="WhichSignUpScreen"
        component={WhichSignUpScreen}
      />
      <SignUpStack.Screen
        name="PilotSignUpScreen"
        component={PilotSignUpScreen}
      />
      <SignUpStack.Screen
        name='ClientSignUpScreen'
        component={ClientSignUpScreen}
      />
    </SignUpStack.Navigator>
  );
};

export default ClientHomeNavigation;
