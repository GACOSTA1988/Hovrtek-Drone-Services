import React from "react";
import { View, Button, StyleSheet } from 'react-native';

function WhichSignInScreen( {navigation} ) {

  return (
    <View style={styles.whichSignInBody}>
      <Button title="Sign in as a pilot" onPress={() => {navigation.push('PilotSignInScreen')}} />
      <Button title="Sign in as a client" onPress={() => {navigation.push('ClientSignInScreen')}} />
      <Button title='Create Account' onPress={() => navigation.push('SignUp')} />
    </View>
  );
}

const styles = StyleSheet.create({
  whichSignInBody: {
    alignItems: "center"
  }
});

export default WhichSignInScreen;
