import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { AuthContext } from "./context";
import { SignIn } from './screens/auth/SignInScreen';
import { SignUp } from './screens/auth/SignUpScreen';
import { PilotHome } from './screens/pilot/PilotHomeScreen';
import { PilotProfile } from './screens/pilot/PilotProfileScreen';
import { PilotHomeStack, PilotProfileStack, PilotHomeStackScreen, PilotProfileStackScreen, PilotTabsScreen } from './navigation/PilotNavigation';
import { SplashScreen } from "expo";
import Footer from './components/Footer';
import PilotHeader from './components/pilot/PilotHeader';
import AboutScreen from './screens/client/AboutScreen'
import SupportScreen from './screens/client/SupportScreen'
import ClientHomeScreen from './screens/client/ClientHomeScreen';
import {DrawerNavigator} from './navigation/ClientHomeNavigation'
import ClientHomeNavigation from './navigation/ClientHomeNavigation'
import ClientHeader from './components/client/ClientHeader'
import TestHeader from './components/client/TestHeader'



const AuthStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const RootClientStack = createStackNavigator();

SplashScreen.preventAutoHide();
setTimeout(SplashScreen.hide, 3500);

const pushBurger = () => {
  navigation.toggleDrawer()
}




export default ({navigation}) => {
  const [userToken, setUserToken] = React.useState('clientToken');

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
  // options={{ headerTitle: () => <TestHeader/> }}
return (
    <AuthContext.Provider value={authContext}>


      <NavigationContainer>
      
        {userToken ? (
          (userToken === 'clientToken') ? (
   
            <RootClientStack.Navigator>
              <RootClientStack.Screen 
              name='ClientHomeScreen' 
              component={ClientHomeNavigation} 
              options={{ headerTitle: () => <TestHeader/> }}
              
              />
            </RootClientStack.Navigator>

          ) : (
            <Drawer.Navigator headerMode='none'>
              <StaturBar barStyle='light-content' backgroundColor='#6a51ae'/>
              <Drawer.Screen name='PilotHome' component={PilotTabsScreen} />
              <Drawer.Screen name='PilotProfile' component={PilotProfileStackScreen} />
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


// Header Logo
const LogoTitle = () => {
  return (
    <Image
    style={{ width: 130, height: 22, marginTop: 0 }}
    source={require('./assets/hovrtek_logo.png')}
    />
  )
}


