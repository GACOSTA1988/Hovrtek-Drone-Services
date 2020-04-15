import React from "react";
import { View, Button, StyleSheet } from 'react-native';

function WhichSignUpScreen( {navigation} ) {

  return (
    <View style={styles.whichSignUpBody}>
      <Button title="Sign up as a pilot" onPress={() => {navigation.push('PilotSignUpScreen')}} />
      <Button title="Sign up as a client" onPress={() => {navigation.push('ClientSignUpScreen')}} />
    </View>
  );
}

const styles = StyleSheet.create({
  whichSignUpBody: {
    alignItems: "center"
  }
});

export default WhichSignUpScreen;
