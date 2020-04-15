import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

function WhichSignUpScreen( {navigation} ) {

  return (
    <View style={styles.whichSignUpBody}>
      <TouchableOpacity style={styles.button} onPress={() => {navigation.push('PilotSignUpScreen')}} >
      <Text> Sign up as a pilot</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {navigation.push('ClientSignUpScreen')}} >
      <Text> Sign up as a client</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  whichSignUpBody: {
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
  }
});

export default WhichSignUpScreen;
