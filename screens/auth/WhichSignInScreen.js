import React from "react";
import { View, Button, StyleSheet } from 'react-native';
import { AuthContext } from "../../context";

function WhichSignInScreen( {navigation} ) {
  const { signInPilot } = React.useContext(AuthContext);
  const { signInClient } = React.useContext(AuthContext);

  return (
    <View style={styles.whichSignInBody}>
      <Button style={styles.button} title="Sign in as a pilot" onPress={() => {navigation.push('PilotSignInScreen')}} />
      <Button style={styles.button} title="Sign in as a client" onPress={() => {navigation.push('ClientSignInScreen')}} />
      <Button style={styles.button} title='Create Account' onPress={() => navigation.push('SignUp')} />
      <Button style={styles.button} title='Pilot Shortcut' onPress={() => signInPilot()} />
      <Button style={styles.button} title='Client Shortcut' onPress={() => signInClient()} />
    </View>
  );
}

const styles = StyleSheet.create({
  whichSignInBody: {
    alignItems: "center"
  },
  button: {
    marginTop: 20,
    backgroundColor: "lightgreen"
  }
});

export default WhichSignInScreen;
