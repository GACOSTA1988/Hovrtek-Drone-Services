import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PilotProfileWelcomeScreen from "../screens/pilot/PilotProfileWelcomeScreen";
import PilotProfileSetupPageOneScreen from "../screens/pilot/PilotProfileSetupPageOneScreen";
import PilotProfileSetupPageTwoScreen from "../screens/pilot/PilotProfileSetupPageTwoScreen";
import PilotProfileImageUploadScreen from "../screens/pilot/PilotProfileImageUploadScreen";
import GlobalHeader from "../components/shared/GlobalHeader";
import { Ionicons } from "@expo/vector-icons";

const ProfileStack = createStackNavigator();

const backgroundColor = "#092455";

const headerStyle = {
  backgroundColor,
  height: 100,
};

const headerBackImage = () => (
  <Ionicons name="ios-arrow-round-back" size={50} color={backgroundColor} />
);

const PilotCreateProfileNavigation = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={PilotProfileWelcomeScreen}
        options={{
          title: " ",
          headerTitle: () => <GlobalHeader isHome={false} />,
          headerStyle,
        }}
      />
      <ProfileStack.Screen
        name="PilotProfileSetupPageOneScreen"
        component={PilotProfileSetupPageOneScreen}
        navigationOptions={{headerMode: 'none'}}
        options={{
          headerLeft: null,
          title: " ",
          headerTitle: () => <GlobalHeader isHome={false}/>,
          headerStyle,
          }}
      />
      <ProfileStack.Screen
        name="PilotProfileSetupPageTwoScreen"
        component={PilotProfileSetupPageTwoScreen}
        options={{
          headerLeft: null,
          title: "Accept Job",  
          headerTitle: () => <GlobalHeader isHome={false}/>,
          headerStyle,      
        }}
      />
      <ProfileStack.Screen
        name="PilotProfileImageUploadScreen"
        component={PilotProfileImageUploadScreen}
        options={{
          headerLeft: null,
          title: " ",
          headerTitle: () => <GlobalHeader isHome={false}/>,
          headerStyle,
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default PilotCreateProfileNavigation;
