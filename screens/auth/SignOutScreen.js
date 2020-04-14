import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { AuthContext } from "../../context";
import AuthHeader from '../../components/auth/AuthHeader';

const SignOutScreen = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);
  signOut();
  return(null);
};

export default SignOutScreen;
