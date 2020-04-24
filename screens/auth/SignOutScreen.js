import React from "react";
import * as firebase from "firebase";

const SignOutScreen = () => {

 

  try {
    firebase.auth().signOut();
  } catch (e) {
    console.warn(e);
  }
  return(null);
};

export default SignOutScreen;
