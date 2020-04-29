import React from "react";
import * as firebase from "firebase";

const SignOutScreen = (props) => {

  try {
    firebase.auth().signOut();
  } catch (error) {
    console.log("THIS IS THE SIGN OUT ERROR: ", error);
  }
  return(null);
};

export default SignOutScreen;
