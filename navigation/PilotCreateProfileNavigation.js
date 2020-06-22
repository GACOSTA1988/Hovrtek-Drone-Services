import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PilotProfileWelcomeScreen from "../screens/pilot/PilotProfileWelcomeScreen";
import PilotProfileSetupPageOneScreen from "../screens/pilot/PilotProfileSetupPageOneScreen";
import PilotProfileSetupPageTwoScreen from "../screens/pilot/PilotProfileSetupPageTwoScreen";
import PilotProfileImageUploadScreen from "../screens/pilot/PilotProfileImageUploadScreen";
import GlobalHeader from "../components/shared/GlobalHeader";

const ProfileStack = createStackNavigator();

const backgroundColor = "#161616";

const headerStyle = {
  backgroundColor,
  height: 100,
};

const PilotCreateProfileNavigation = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={PilotProfileWelcomeScreen}
        options={{
          headerTitle: () => <GlobalHeader isHome={false} subheaderTitle={"Profile"}/>,
          headerStyle,
        }}
      />
      <ProfileStack.Screen
        name="PilotProfileSetupPageOneScreen"
        component={PilotProfileSetupPageOneScreen}
        navigationOptions={{headerMode: 'none'}}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} subheaderTitle={"Edit Profile"}/>,
          headerStyle,
          }}
      />
      <ProfileStack.Screen
        name="PilotProfileSetupPageTwoScreen"
        component={PilotProfileSetupPageTwoScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} subheaderTitle={"Edit Profile"}/>,
          headerStyle,      
        }}
      />
      <ProfileStack.Screen
        name="PilotProfileImageUploadScreen"
        component={PilotProfileImageUploadScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} subheaderTitle={"Add Image"}/>,
          headerStyle,
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default PilotCreateProfileNavigation;
