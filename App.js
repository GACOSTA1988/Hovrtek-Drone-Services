import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AuthContext } from "./context";
import { SignIn } from './screens/SignInScreen';
import { SignUp } from './screens/SignUpScreen';
import { Home } from './screens/HomeScreen';
import { Profile } from './screens/ProfileScreen';

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name='Home' component={Home} />
  </HomeStack.Navigator>
)

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name='Profile' component={Profile} />
  </ProfileStack.Navigator>
)

const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name='Home' component={HomeStackScreen} />
    <Tabs.Screen name='Profile' component={ProfileStackScreen} />
  </Tabs.Navigator>
)

const Drawer = createDrawerNavigator();

export default () => {
  const [userToken, setUserToken] = React.useState('token');

  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setUserToken('thisisausertoken');
      },
      signUp: () => {
        setUserToken('thisisausertoken');
      },
      signOut: () => {
        setUserToken(null);
      }
    }
  }, [])

  return (
    <AuthContext.Provider>
      <NavigationContainer>
        {userToken ? (
          <Drawer.Navigator>
            <Drawer.Screen name='Home' component={TabsScreen} />
            <Drawer.Screen name='Profile' component={ProfileStackScreen} />
          </Drawer.Navigator>
        ) : (
          <AuthStack.Navigator>
            <AuthStack.Screen name='SignIn' component={SignIn} />
            <AuthStack.Screen name='SignUp' component={SignUp} />
          </AuthStack.Navigator>
        )}

      </NavigationContainer>
    </AuthContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
