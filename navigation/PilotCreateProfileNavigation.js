import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PilotProfileWelcomeScreen from "../screens/pilot/PilotProfileWelcomeScreen";
import PilotProfileSetupPageOneScreen from "../screens/pilot/PilotProfileSetupPageOneScreen";
import PilotProfileSetupPageTwoScreen from "../screens/pilot/PilotProfileSetupPageTwoScreen";
import PilotProfileImageUploadScreen from "../screens/pilot/PilotProfileImageUploadScreen";
import MainHeader from "../components/shared/MainHeader";
import NestedHeader from "../components/shared/NestedHeader";
import { Ionicons } from "@expo/vector-icons";

const ProfileStack = createStackNavigator();

const PilotCreateProfileNavigation = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={PilotProfileWelcomeScreen}
        options={{
          title: " ",
          headerMode: 'none',
        }}
      />
      <ProfileStack.Screen
        name="PilotProfileSetupPageOneScreen"
        component={PilotProfileSetupPageOneScreen}
        navigationOptions={{headerMode: 'none'}}
        options={{
          title: " ",
          }}
      />
      <ProfileStack.Screen
        name="PilotProfileSetupPageTwoScreen"
        component={PilotProfileSetupPageTwoScreen}
        options={{
          title: "Accept Job",        
        }}
      />
      <ProfileStack.Screen
        name="PilotProfileImageUploadScreen"
        component={PilotProfileImageUploadScreen}
        options={{
          title: " ",
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default PilotCreateProfileNavigation;
