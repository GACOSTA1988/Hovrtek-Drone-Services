import React, { useState, useContext, useMemo } from "react";
import { Button, Image, StyleSheet, Text, View, Screen } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./context";
import { SplashScreen } from "expo";
import Footer from "./components/Footer";
import ClientNavigation from "./navigation/ClientNavigation";
import MainHeader from "./components/MainHeader";
import PilotNavigation from "./navigation/PilotNavigation";
import SignUpNavigation from "./navigation/SignUpNavigation";
import SignInScreen from "./screens/auth/SignInScreen";
import LoadingScreen from "./screens/LoadingScreen";
import * as firebase from "firebase";
import {
  Ionicons,
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
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
  let [userType, setUserType] = useState(null);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
      setUserType(user.photoURL);
      console.log(
        "this is the user ",
        user,
        "this is the user email",
        user.email,
        "And this is the user photoURL",
        user.photoURL
      );
    } else {
      setLoggedIn(false);
      setUserType(null);
    }
  });

  const authContext = useMemo(() => {
    return {
      updateUser: () => {
        const user = firebase.auth().currentUser;
        console.log(
          "And here in update user, this is the user again: ",
          user,
          "this is the user email",
          user.email,
          "And, again, this is the user photoURL",
          user.photoURL
        );
        setLoggedIn(true);
        setUserType(user.photoURL);
      },
    };
  }, []);

  return (
    <Provider store={state}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {loggedIn ? (
            userType === "C" ? (
              <RootClientStack.Navigator>
                <RootClientStack.Screen
                  name="Client"
                  component={ClientNavigation}
                  headerMode="screen"
                  options={{
                    title: "Home",
                    headerTitle: () => <MainHeader />,
                    headerStyle: {
                      backgroundColor: "#092455",
                    },
                  }}
                />
              </RootClientStack.Navigator>
            ) : userType === "P" ? (
              <RootPilotStack.Navigator>
                <RootPilotStack.Screen
                  name="Pilot"
                  component={PilotNavigation}
                  options={{
                    title: "Home",
                    headerTitle: () => <MainHeader />,
                    headerStyle: {
                      backgroundColor: "#092455",
                    },
                  }}
                />
              </RootPilotStack.Navigator>
            ) : (
              <AuthStack.Navigator>
                <AuthStack.Screen
                  name="SignIn"
                  component={SignInScreen}
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
                <AuthStack.Screen
                  name="Loading"
                  component={LoadingScreen}
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
            )
          ) : (
            <AuthStack.Navigator>
              <AuthStack.Screen
                name="SignIn"
                component={SignInScreen}
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
                options={({ navigation }) => ({
                  title: "",
                  headerLeft: () => (
                    <Button
                      onPress={() => navigation.goBack()}
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
              <AuthStack.Screen
                name="Loading"
                component={LoadingScreen}
                options={({ navigation }) => ({
                  title: "",

                  headerStyle: {
                    backgroundColor: "#092455",
                    borderBottomWidth: 10,
                    borderBottomColor: "grey",
                    height: 110,
                  },
                })}
              />
            </AuthStack.Navigator>
          )}
          {/* <StaturBar barStyle="light-content" backgroundColor="#6a51ae" /> */}
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
    justifyContent: "center",
  },
});

// MainHeader Logo
const LogoTitle = () => {
  return (
    <Image
      style={{ width: 130, height: 22, marginTop: 0 }}
      source={require("./assets/hovrtek_logo.png")}
    />
  );
};
