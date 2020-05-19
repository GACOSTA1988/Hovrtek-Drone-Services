import React, { useState, useMemo } from "react";
import { NavigationContainer} from "@react-navigation/native";
import { AuthContext } from "./context";
import { SplashScreen } from "expo";
import Footer from "./components/Footer";
import * as firebase from "firebase";
import {
  clientNavigation,
  pilotNavigation,
  renderLogin,
} from "./appNavigationUtils";
// REDUX STUFF
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducers from "./reducers/index";
import { StatusBar, Platform } from 'react-native'

SplashScreen.preventAutoHide();
setTimeout(SplashScreen.hide, 3500);

export default () => {
  // REDUX STATE
  const state = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  console.disableYellowBox = true;
  // auth stuff - maybe should be elsewhere?
  const auth = firebase.auth();

  let [loggedIn, setLoggedIn] = useState(false);
  let [userType, setUserType] = useState(null);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
      setUserType(user.photoURL);
    } else {
      setLoggedIn(false);
      setUserType(null);
    }
  });

  const authContext = useMemo(() => {
    return {
      updateUser: () => {
        const user = firebase.auth().currentUser;
        setLoggedIn(true);
        setUserType(user.photoURL);
      },
    };
  }, []);

  const isClientLoggedIn = loggedIn && userType === 'C';
  const isPilotLoggedIn = loggedIn && userType === 'P';

  return (
    <Provider store={state}>
      { Platform.OS === 'ios' &&
        <StatusBar
        backgroundColor="white"
        barStyle="light-content"
        />
      }
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>

          {isClientLoggedIn && clientNavigation}
          {isPilotLoggedIn && pilotNavigation}
          {!loggedIn && renderLogin()}
          <Footer />
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
};
