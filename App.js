import React, { useState, useMemo } from "react";
import { AuthContext } from "./context";
import { SplashScreen } from "expo";
import * as firebase from "firebase";
import {
  clientNavigation,
  pilotNavigation,
  renderLogin,
  renderLoading,
} from "./appNavigationUtils";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducers from "./reducers/index";
import { StatusBar, Platform } from "react-native";
import Footer from './components/shared/Footer';

SplashScreen.preventAutoHide();
setTimeout(SplashScreen.hide, 3500);

export default () => {
  // REDUX STATE
  const state = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  console.disableYellowBox = true;
  // auth stuff - maybe should be elsewhere?
  const auth = firebase.auth();

  let [ loggedIn, setLoggedIn ] = useState("loading");
  let [ userType, setUserType ] = useState(null);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn("true");
      setUserType(user.photoURL);
    } else {
      setLoggedIn("false");
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

  // to-do change "true" to actual boolean true
  const isClientLoggedIn = loggedIn === "true" && userType === "C";
  const isPilotLoggedIn = loggedIn === "true" && userType === "P";
  const isIOS = Platform.OS === "ios";

  return (
    <Provider store={state}>
      {isIOS && <StatusBar backgroundColor="white" barStyle="light-content" />}
      <AuthContext.Provider value={authContext}>
          {isClientLoggedIn && clientNavigation}
          {isPilotLoggedIn && pilotNavigation}
          {loggedIn === "false" && renderLogin()}
          {loggedIn === "loading" && renderLoading()}
        <Footer />
      </AuthContext.Provider>
    </Provider>
  );
};