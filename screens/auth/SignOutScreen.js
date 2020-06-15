import React from "react";
import * as firebase from "firebase";

const SignOutScreen = (props) => {
  try {
    firebase.auth().signOut();
    props.navigation.navigate("SignIn");
  } catch (error) {}
  return null;
};

export default SignOutScreen;
