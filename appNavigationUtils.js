import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {AboutNavigation, SupportNavigation} from "./navigation/AboutSupportNavigationStack";
import PilotCreateProfileNavigation from "./navigation/PilotCreateProfileNavigation";
import ClientProfileNavigator from "./navigation/ClientProfileNavigation";
import SignUpNavigation from "./navigation/SignUpNavigation";
import SignInScreen from "./screens/auth/SignInScreen";
import SignOutScreen from "./screens/auth/SignOutScreen";
import LoadingScreen from "./screens/LoadingScreen";
import ClientTabs from './navigation/ClientTabs';
import PilotTabs from './navigation/PilotTabs';
import GlobalHeader from "./components/shared/GlobalHeader";

// auth stack navigator
const AuthStack = createStackNavigator();

const renderLogin = () => {
  const signHeaderStyle = {
    backgroundColor: "#161616",
    width: "100%",
    height: 100,
  };

  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            headerTitle: () => <GlobalHeader isSplash={true}/>,
            headerStyle: signHeaderStyle,
            headerRight: null,
          }}
        />
        <AuthStack.Screen
          name="SignUp"
          component={SignUpNavigation}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name="Loading"
          component={LoadingScreen}
          options={() => ({
            headerTitle: () => <GlobalHeader isSplash={true}/>,
            headerStyle: signHeaderStyle,
            headerLeft: null,
          })}
        />
        <AuthStack.Screen
          name="SignOut"
          component={SignOutScreen}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

// loading screen
const renderLoading = () => {
  const signHeaderStyle = {
    backgroundColor: "#161616",
    width: "100%",
    borderBottomWidth: 10,
    borderBottomColor: "grey",
    height: 110,
  };
  
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Loading"
          component={LoadingScreen}
          options={() => ({
            title: "",
            headerStyle: signHeaderStyle,
          })}
        />    
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

//main drawer nav
const ClientDrawer = createDrawerNavigator();
const PilotDrawer = createDrawerNavigator();

const clientNavigation = (
    <NavigationContainer independent={true} >
      <ClientDrawer.Navigator initialRouteName="Home" 
      drawerPosition={"right"}
      drawerStyle={{backgroundColor: "#161616", color: "white"}}
      drawerContentOptions={{activeTintColor: "white",inactiveTintColor: "#DDE2E4", height: "100%", activeBackgroundColor: "#535756"}}
      >
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
      <PilotDrawer.Navigator 
      initialRouteName="Home" 
      drawerPosition={"right"} 
      drawerStyle={{backgroundColor: "#161616", color: "white"}}
      drawerContentOptions={{activeTintColor: "white",inactiveTintColor: "#DDE2E4", height: "100%", activeBackgroundColor: "rgba(35, 35, 36, 0.2)"}}
      sceneContainerStyle={{color: "white"}}
      >
      <PilotDrawer.Screen name="Home" component={PilotTabs}/>
      <PilotDrawer.Screen name="Profile" component={PilotCreateProfileNavigation}/>
      <PilotDrawer.Screen name="About" component={AboutNavigation}/>
      <PilotDrawer.Screen name="Support" component={SupportNavigation}/>
      <PilotDrawer.Screen name="Sign out" component={() => SignOutScreen()}/>
      </PilotDrawer.Navigator>
    </NavigationContainer>
  )

export { clientNavigation, pilotNavigation, renderLogin, renderLoading };