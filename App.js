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
import SignUpNavigation from './navigation/SignUpNavigation';
import SignInNavigation from './navigation/SignInNavigation';
import * as firebase from 'firebase';
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

  auth.onAuthStateChanged(user => {
    if (user) {
      setLoggedIn(true);
      // let user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: "somethingElse",
        photoURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.almanac.com%2Fnews%2Fhome-health%2Fchickens%2Fraising-chickens-101-how-get-started&psig=AOvVaw16Hoi574wlL8Dy8TJnqJ6f&ust=1587245536477000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCND2wcW08OgCFQAAAAAdAAAAABAH"
      });
      console.log(user);
    } else {
      setLoggedIn(false);
    }
  })


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
      }
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
