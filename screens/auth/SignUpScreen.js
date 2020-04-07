import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { AuthContext } from "../../context";

export const SignUp = ({ navigation }) => {
  const { signUpPilot } = React.useContext(AuthContext);
  const { signUpClient } = React.useContext(AuthContext);


  return (
    <View style={styles.container}>
      <Text>Sign Up Screen</Text>
      <Button title='Sign Up As Pilot' onPress={() => signUpPilot()} />
      <Button title='Sign Up as Client' onPress={() => signUpClient()} />
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
