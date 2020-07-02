import React from "react";
import * as firebase from "firebase";

const deleteUser = (props) => {
  let user = firebase.auth().currentUser;
  try {
    user.delete();
    firebase.auth().signOut();
    // props.navigation.navigate("SignIn");
  } catch (error) {}
  return null;
};

export default deleteUser;
