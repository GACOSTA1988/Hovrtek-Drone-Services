import React from "react";
import { Button, Image, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {AboutNavigation, SupportNavigation} from "./navigation/ClientNavigation";
import PilotNavigation from "./navigation/PilotNavigation";
import SignInScreen from "./screens/auth/SignInScreen";
import SignOutScreen from "./screens/auth/SignOutScreen";
import SignUpNavigation from "./navigation/SignUpNavigation";
import LoadingScreen from "./screens/LoadingScreen";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { ClientDrawerContent } from './navigation/ClientDrawerContent';
import { PilotDrawerContent } from './navigation/PilotDrawerContent';
import ClientProfileNavigator from "./navigation/ClientProfileNavigation";
import ClientTabs from './navigation/ClientTabs';
import PilotTabs from './navigation/PilotTabs';



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
  const signHeaderStyle = {
    backgroundColor: "#092455",
    width: "100%",
    borderBottomWidth: 10,
    borderBottomColor: "grey",
    height: 110,
  };

  const signInScreen = (
    <RootStack.Screen
      name="SignIn"
      component={SignInScreen}
      options={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerStyle: signHeaderStyle,
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
          <TouchableOpacity onPress={navigation.goBack}>
            <Ionicons
              name="ios-arrow-back"
              size={24}
              color="white"
              style={{ margin: 10 }}
            />
          </TouchableOpacity>
        ),
        headerStyle: signHeaderStyle,
      })}
    />
  );

  const loadingScreen = (
    <RootStack.Screen
      name="Loading"
      component={LoadingScreen}
      options={() => ({
        title: "",
        headerStyle: signHeaderStyle,
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

const renderLoading = () => {

  const signHeaderStyle = {
    backgroundColor: "#092455",
    width: "100%",
    borderBottomWidth: 10,
    borderBottomColor: "grey",
    height: 110,
  };
  
  const loadingScreen = (
    <RootStack.Screen
      name="Loading"
      component={LoadingScreen}
      options={() => ({
        title: "",
        headerStyle: signHeaderStyle,
      })}
    />
  );
  return (
    <RootStack.Navigator>
      {loadingScreen}
    </RootStack.Navigator>
  );
}

//new drawer nav
const ClientDrawer = createDrawerNavigator();
const PilotDrawer = createDrawerNavigator();

const clientNavigation = (
    <NavigationContainer independent={true} >
      <ClientDrawer.Navigator initialRouteName="Home" drawerPosition={"right"}>
        <ClientDrawer.Screen name="Home" component={ClientTabs}/>
        <ClientDrawer.Screen name="Profile" component={ClientProfileNavigator}/>
        <ClientDrawer.Screen name="About" component={AboutNavigation}/>
        <ClientDrawer.Screen name="Support" component={SupportNavigation}/>
        <ClientDrawer.Screen name="Sign out" component={() => SignOutScreen()}/>

      </ClientDrawer.Navigator>
    </NavigationContainer>
  )

const pilotNavigation = (
    <NavigationContainer independent={true}>
      <PilotDrawer.Navigator initialRouteName="Home" drawerPosition={"right"}>
      <PilotDrawer.Screen name="Home" component={PilotTabs}/>
      {/* <PilotDrawer.Screen name="Profile" component={PilotPro}/> */}
      <PilotDrawer.Screen name="About" component={AboutNavigation}/>
      <PilotDrawer.Screen name="Support" component={SupportNavigation}/>
      <PilotDrawer.Screen name="Sign out" component={() => SignOutScreen()}/>
      </PilotDrawer.Navigator>
    </NavigationContainer>
  )

// const clientNavigation = (
//   <RootStack.Navigator headerMode="none">
//     <RootStack.Screen name="Client" component={ClientNavigation} />
//   </RootStack.Navigator>
// );

// const pilotNavigation = (
//   <RootStack.Navigator headerMode="none">
//     <RootStack.Screen name="Pilot" component={PilotNavigation} />
//   </RootStack.Navigator>
// );

export { clientNavigation, pilotNavigation, renderLogin, renderLoading };
