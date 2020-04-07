import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AuthContext } from "./context";
import { SignIn } from './screens/auth/SignInScreen';
import { SignUp } from './screens/auth/SignUpScreen';
import { ClientHome } from './screens/client/ClientHomeScreen';
import { ClientProfile } from './screens/client/ClientProfileScreen';
import { PilotHome } from './screens/pilot/PilotHomeScreen';
import { PilotProfile } from './screens/pilot/PilotProfileScreen';

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Client Stuff

const ClientHomeStack = createStackNavigator();
const ClientProfileStack = createStackNavigator();

const ClientHomeStackScreen = () => (
  <ClientHomeStack.Navigator>
    <ClientHomeStack.Screen name='ClientHome' component={ClientHome} />
  </ClientHomeStack.Navigator>
)

const ClientProfileStackScreen = () => (
  <ClientProfileStack.Navigator>
    <ClientProfileStack.Screen name='ClientProfile' component={ClientProfile} />
  </ClientProfileStack.Navigator>
)

const ClientTabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name='ClientHome' component={ClientHomeStackScreen} />
    <Tabs.Screen name='ClientProfile' component={ClientProfileStackScreen} />
  </Tabs.Navigator>
)

// Pilot Stuff

const PilotHomeStack = createStackNavigator();
const PilotProfileStack = createStackNavigator();

const PilotHomeStackScreen = () => (
  <PilotHomeStack.Navigator>
    <PilotHomeStack.Screen name='PilotHome' component={PilotHome} />
  </PilotHomeStack.Navigator>
)

const PilotProfileStackScreen = () => (
  <PilotProfileStack.Navigator>
    <PilotProfileStack.Screen name='PilotProfile' component={PilotProfile} />
  </PilotProfileStack.Navigator>
)

const PilotTabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name='PilotHome' component={PilotHomeStackScreen} />
    <Tabs.Screen name='PilotProfile' component={PilotProfileStackScreen} />
  </Tabs.Navigator>
)

export default () => {
  const [userToken, setUserToken] = React.useState('clientToken');

  const authContext = React.useMemo(() => {
    return {
      signInPilot: () => {
        setUserToken('pilotToken');
      },
      signInClient: () => {
        setUserToken('clientToken');
      },
      signUp: () => {
        setUserToken('thisisausertoken');
      },
      signOut: () => {
        setUserToken(null);
      }
    }
  }, [])

  if (userToken === 'clientToken') {
    return (
      <AuthContext.Provider>
        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen name='ClientHome' component={ClientTabsScreen} />
            <Drawer.Screen name='ClientProfile' component={ClientProfileStackScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    )
  } else if (userToken === 'pilotToken') {
    return (
      <AuthContext.Provider>
        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen name='PilotHome' component={PilotTabsScreen} />
            <Drawer.Screen name='PilotProfile' component={PilotProfileStackScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    )
  } else {
    return (
      <AuthContext.Provider>
        <NavigationContainer>
          <AuthStack.Navigator>
            <AuthStack.Screen name='SignIn' component={SignIn} />
            <AuthStack.Screen name='SignUp' component={SignUp} />
          </AuthStack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
