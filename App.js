import React, { useState, useContext } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./context";
import { SplashScreen } from "expo";
import Footer from "./components/Footer";
import ClientHeader from "./components/client/ClientHeader";
import ClientHomeNavigation from "./navigation/ClientHomeNavigation";
import PilotHeader from "./components/pilot/PilotHeader";
import PilotHomeNavigation from "./navigation/PilotHomeNavigation";
import SignUpNavigation from "./navigation/SignUpNavigation";
import SignInNavigation from "./navigation/SignInNavigation";
import * as firebase from "firebase";
// REDUX STUFF
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducers from "./reducers/index";

const AuthStack = createStackNavigator();
const RootClientStack = createStackNavigator();
const RootPilotStack = createStackNavigator();

SplashScreen.preventAutoHide();
setTimeout(SplashScreen.hide, 3500);

export default () => {
  // REDUX STATE
  const state = createStore(reducers, {}, applyMiddleware(ReduxThunk));

  // auth stuff - maybe should be elsewhere?
  const auth = firebase.auth();

  let [loggedIn, setLoggedIn] = useState(false);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  const [userType, setUserType] = useState(null);

  const authContext = React.useMemo(() => {
    return {
      signInPilot: () => {
        setUserType("pilot");
      },
      signInClient: () => {
        setUserType("client");
      },
      signOut: () => {
        setUserType(null);
      },
    };
  }, []);

  return (
    <Provider store={state}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {userType ? (
            userType === "client" ? (
              <RootClientStack.Navigator>
                <RootClientStack.Screen
                  name="Client"
                  component={ClientHomeNavigation}
                  headerMode="screen"
                  options={{
                    title: "Home",
                    headerTitle: () => <ClientHeader />,
                    headerStyle: {
                      backgroundColor: "#092455",
                    },
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
                    headerTitle: () => <PilotHeader />,
                    headerStyle: {
                      backgroundColor: "#092455",
                    },
                  }}
                />
              </RootPilotStack.Navigator>
            )
          ) : (
            <AuthStack.Navigator>
              <AuthStack.Screen
                name="SignIn"
                component={SignInNavigation}
                options={{
                  title: "",
                  headerStyle: {
                    backgroundColor: "#092455",
                    borderBottomWidth: 10,
                    borderBottomColor: "grey",
                    height: 110,
                  },
                }}
              />
              <AuthStack.Screen
                name="SignUp"
                component={SignUpNavigation}
                options={{
                  title: "",
                  headerStyle: {
                    backgroundColor: "#092455",
                    borderBottomWidth: 10,
                    borderBottomColor: "grey",
                    height: 110,
                  },
                }}
              />
            </AuthStack.Navigator>
          )}

          <Footer />
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
    // <StaturBar barStyle="light-content" backgroundColor="#6a51ae" />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
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
