import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { AuthContext } from "../../context";

function WhichSignInScreen( {navigation} ) {
  const { signInPilot } = React.useContext(AuthContext);
  const { signInClient } = React.useContext(AuthContext);

  return (
    <View style={styles.whichSignInBody}>
      <TouchableOpacity style={styles.button} onPress={() => {navigation.push('PilotSignInScreen')}} >
      <Text>Sign in as a pilot</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {navigation.push('ClientSignInScreen')}} >
      <Text>Sign in as a client</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.push('SignUp')} >
      <Text>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonShortcut} onPress={() => signInPilot()} >
      <Text>Pilot Shortcut</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonShortcut} onPress={() => signInClient()} >
      <Text>Client Shortcut</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  whichSignInBody: {
    alignItems: "center",
    justifyContent: "center",
    flex: .5
  },
  button: {
    marginTop: 20,
    padding: 10,
    width: "90%",
    alignItems: "center",
    backgroundColor: "lightblue"
  },
  buttonShortcut: {
    marginTop: 20,
    padding: 10,
    width: "90%",
    alignItems: "center",
    backgroundColor: "lightgreen"
  }
});

export default WhichSignInScreen;
