import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { AuthContext } from "../../context";
import AuthHeader from '../../components/auth/AuthHeader';
import * as firebase from "firebase";

const SignOutScreen = ({ navigation }) => {
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
