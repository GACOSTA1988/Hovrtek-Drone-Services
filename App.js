import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AuthContext } from "./context";
import { SignIn } from "./screens/auth/SignInScreen";
import { SignUp } from "./screens/auth/SignUpScreen";
import { ClientProfile } from "./screens/client/ClientProfileScreen";
import { SplashScreen } from "expo";
import Footer from "./components/Footer";
import AboutScreen from "./screens/client/AboutScreen";
import SupportScreen from "./screens/client/SupportScreen";
import ClientHeader from "./components/client/ClientHeader";
import ClientHomeNavigation from "./navigation/ClientHomeNavigation";
import PilotHeader from "./components/pilot/PilotHeader";
import PilotHomeNavigation from "./navigation/PilotHomeNavigation";
import SignUpNavigation from './navigation/SignUpNavigation';
import SignInNavigation from './navigation/SignInNavigation';

// REDUX STUFF
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducers from "./reducers/index";

const AuthStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const RootClientStack = createStackNavigator();
const RootPilotStack = createStackNavigator();

SplashScreen.preventAutoHide();
setTimeout(SplashScreen.hide, 3500);

export default () => {
  // REDUX STATE
  const state = createStore(reducers, {}, applyMiddleware(ReduxThunk));

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
    <Provider store={state}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {userToken ? (
            userToken === "clientToken" ? (
              <RootClientStack.Navigator>
                <RootClientStack.Screen
                  name="Client"
                  component={ClientHomeNavigation}
                  options={{
                    title: "Home",
                    headerTitle: () => <ClientHeader />
                  }}
                />
              </RootClientStack.Navigator>
            ) : (
              <RootPilotStack.Navigator>
                <RootPilotStack.Screen
                  name="Pilot"
                  component={PilotHomeNavigation}
                  options={{
                    title: "Home",
                    headerTitle: () => <PilotHeader />
                  }}
                />
              </RootPilotStack.Navigator>
            )
          ) : (
            <AuthStack.Navigator>
              <AuthStack.Screen
                name="SignIn"
                component={SignInNavigation}
                options={{ title: "Sign In" }}
              />
              <AuthStack.Screen
                name="SignUp"
                component={SignUpNavigation}
                options={{ title: "Sign Up" }}
              />
            </AuthStack.Navigator>
          )}
          <Footer />
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
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
      source={require("./assets/hovrtek_logo.png")}
    />
  );
};
