import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { AuthContext } from "../../context";

export const SignIn = ({ navigation }) => {
  const signInPilot = React.useContext(AuthContext);
  const signInClient = React.useContext(AuthContext);


  return (
    <View style={styles.container}>
      <Text>Sign In Screen</Text>
      <Button title='Sign In As Pilot' onPress={() => signInPilot()} />
      <Button title='Sign In As Client' onPress={() => signInClient()} />
      <Button title='Create Account' onPress={() => navigation.push('SignUp')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5
  }
});
