import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WhichSignUpScreen from "../screens/auth/WhichSignUpScreen";
import PilotSignUpScreen from "../screens/auth/PilotSignUpScreen";
import ClientSignUpScreen from "../screens/auth/ClientSignUpScreen";
import GlobalHeader from "../components/shared/GlobalHeader";

const SignUpStack = createStackNavigator();

const SignUpNavigation = () => {
  return (
    <SignUpStack.Navigator>
      <SignUpStack.Screen
        name="WhichSignUpScreen"
        component={WhichSignUpScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} subheaderTitle={" "} />,
          headerStyle: {
            backgroundColor: "#161616",
            height: 100,
          }, 
        }}
      />
      <SignUpStack.Screen
        name="PilotSignUpScreen"
        component={PilotSignUpScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} subheaderTitle={"Create Account"}  />,
          headerStyle: {
            backgroundColor: "#161616",
            height: 100,
          }, 
        }}
      />
      <SignUpStack.Screen
        name="ClientSignUpScreen"
        component={ClientSignUpScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} subheaderTitle={"Create Account"}  />,
          headerStyle: {
            backgroundColor: "#161616",
            height: 100,
          }, 
        }}     
      />
    </SignUpStack.Navigator>
  );
};

export default SignUpNavigation;
