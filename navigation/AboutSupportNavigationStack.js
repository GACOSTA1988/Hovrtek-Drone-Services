import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AboutScreen from "../screens/AboutScreen";
import SupportScreen from "../screens/SupportScreen";
import GlobalHeader from "../components/shared/GlobalHeader";

const AboutStack = createStackNavigator();
const SupportStack = createStackNavigator();

const mainHeaderStyle = {
  backgroundColor: "#161616",
  height: 100
}

export const AboutNavigation = () => {
  return (
    <AboutStack.Navigator>
      <AboutStack.Screen
        name='About'
        component={AboutScreen}
        options={{
          headerTitle: () => <GlobalHeader isHome={false}/>,
          headerStyle: mainHeaderStyle
        }}
      />
    </AboutStack.Navigator>
  );
};

export const SupportNavigation = () => {
  return (
    <SupportStack.Navigator>
      <SupportStack.Screen
        name='Support'
        component={SupportScreen}
        options={{
          headerLeft: null,
          headerTitle: () => <GlobalHeader isHome={false} />,
          headerStyle: mainHeaderStyle
        }}
      />
    </SupportStack.Navigator>
  );
};