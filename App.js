import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AuthContext } from "./context";
import { SignIn } from './screens/auth/SignInScreen';
import { SignUp } from './screens/auth/SignUpScreen';

import { ClientProfile } from './screens/client/ClientProfileScreen';
import PilotHomeScreen from './screens/pilot/PilotHomeScreen';
import PilotProfileScreen from './screens/pilot/PilotProfileScreen';
import { ClientHomeStack, ClientProfileStack, ClientHomeStackScreen, ClientProfileStackScreen, ClientTabsScreen } from './navigation/ClientNavigation';
import { PilotHomeStack, PilotProfileStack, PilotHomeStackScreen, PilotProfileStackScreen, PilotTabsScreen } from './navigation/PilotNavigation';
import { SplashScreen } from "expo";
import Footer from './components/Footer';
import PilotHeader from './components/pilot/PilotHeader';
import AboutScreen from './screens/client/AboutScreen'
import SupportScreen from './screens/client/SupportScreen'
import ClientHomeScreen from './screens/client/ClientHomeScreen';

const AuthStack = createStackNavigator();
const Drawer = createDrawerNavigator();

SplashScreen.preventAutoHide();
setTimeout(SplashScreen.hide, 3500);

export default () => {
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => {
    return {
      signInPilot: () => {
        setUserToken("pilotToken");
      },
      signInClient: () => {
        setUserToken("clientToken");
      },
      signUpPilot: () => {
        setUserToken("pilotToken");
      },
      signUpClient: () => {
        setUserToken("clientToken");
      },
      signOut: () => {
        setUserToken(null);
      }
    };
  }, []);

return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken ? (
          (userToken === 'clientToken') ? (
            <Drawer.Navigator headerMode='none'>
              <Drawer.Screen name='ClientHomeScreen' component={ClientHomeScreen} headerMode='none'/>
              <Drawer.Screen name='AboutScreen' component={AboutScreen}  headerMode='none'/>
              <Drawer.Screen name='SupportScreen' component={SupportScreen}  headerMode='none'/>
            </Drawer.Navigator>
          ) : (
            <Drawer.Navigator headerMode='none'>
              <Drawer.Screen name='PilotHomeScreen' component={PilotHomeScreen} />
              <Drawer.Screen name='PilotProfileScreen' component={PilotProfileStackScreen} />
            </Drawer.Navigator>
          )
      ) : (
        <AuthStack.Navigator>
          <AuthStack.Screen name='SignIn' component={SignIn} options={{ title: 'Sign In'}}/>
          <AuthStack.Screen name='SignUp' component={SignUp} options={{ title: 'Create Account'}}/>
        </AuthStack.Navigator>
      )
    }
    <Footer />
    </NavigationContainer>
  </AuthContext.Provider>
  )

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
