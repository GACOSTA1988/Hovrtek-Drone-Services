import React from "react";
import { AuthContext } from "../../context";
import * as firebase from "firebase";

const SignOutScreen = () => {
  const { signOut } = React.useContext(AuthContext);
  try {
    firebase.auth().signOut();
    signOut();
  } catch (e) {
    console.warn(e);
  }
  return(null);
};

export default SignOutScreen;
