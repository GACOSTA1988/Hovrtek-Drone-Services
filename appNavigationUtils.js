import React from "react";
import { Button, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ClientNavigation from "./navigation/ClientNavigation";
import PilotNavigation from "./navigation/PilotNavigation";
import SignInScreen from "./screens/auth/SignInScreen";
import SignUpNavigation from "./navigation/SignUpNavigation";
import LoadingScreen from "./screens/LoadingScreen";

const RootStack = createStackNavigator();

const LogoTitle = () => {
  const imageStyle = {
    width: 290,
    height: 55,
    marginBottom: 10,
    alignItems: "center",
  };

  return (
    <Image style={imageStyle} source={require("./assets/hovrtek_logo.png")} />
  );
};

const renderLogin = () => {
  const signInScreen = (
    <RootStack.Screen
      name="SignIn"
      component={SignInScreen}
      options={{
        headerTitle: props => <LogoTitle {...props} />,
        headerStyle: {
          backgroundColor: "#092455",
          width: "100%",
          borderBottomWidth: 10,
          borderBottomColor: "grey",
          height: 110,
        },
      }}
    />
  );

  const signUpScreen = (
    <RootStack.Screen
      name="SignUp"
      component={SignUpNavigation}
      options={({ navigation }) => ({
        title: "",
        headerLeft: () => (
          <Button
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            title="Back"
            color="#fff"
          />
        ),
        headerStyle: {
          backgroundColor: "#092455",
          borderBottomWidth: 10,
          borderBottomColor: "grey",
          height: 110,
        },
      })}
    />
  );

  const loadingScreen = (
    <RootStack.Screen
      name="Loading"
      component={LoadingScreen}
      options={() => ({
        title: "",
        headerStyle: {
          backgroundColor: "#092455",
          borderBottomWidth: 10,
          borderBottomColor: "grey",
          height: 110,
        },
      })}
    />
  );

  return (
    <RootStack.Navigator>
      {signInScreen}
      {signUpScreen}
      {loadingScreen}
    </RootStack.Navigator>
  );
};

const clientNavigation = (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen
      name="Client"
      component={ClientNavigation}
    />
  </RootStack.Navigator>
);

const pilotNavigation = (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen
      name="Pilot"
      component={PilotNavigation}
    />
  </RootStack.Navigator>
);

export { clientNavigation, pilotNavigation, renderLogin };
