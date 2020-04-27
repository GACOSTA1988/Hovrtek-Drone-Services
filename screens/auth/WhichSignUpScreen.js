import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import hovrtekLogo from "../../assets/hovrtek_logo.png";


function WhichSignUpScreen({ navigation }) {
  return (
    <View style={styles.whichSignUpBody}>
      <Text style={styles.welcomeText}>Welcome {"\n"}To</Text>
      <Image source={hovrtekLogo} style={styles.hovrtekLogo} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.push("PilotSignUpScreen");
        }}
      >
        <Text style={styles.buttonText}> Sign up as a pilot</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.push("ClientSignUpScreen");
        }}
      >
        <Text style={styles.buttonText}> Sign up as a client</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  whichSignUpBody: {
    alignItems: "center",
    // justifyContent: "center",
    // flex: 0.5,
    backgroundColor: "lightgray",
    height: "100%",
  },
  button: {
    marginTop: 20,
    padding: 10,
    color: "white",
    width: "90%",
    alignItems: "center",
    backgroundColor: "#092455",
    borderRadius: 4
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    alignItems: "center",
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "400",
    marginTop: "25%",
  },
  // hovrtekText: {
  //   textAlign: "center",
  //   fontSize: 40,
  //   fontWeight: "600",
  //   marginBottom: 50,
  // },
  hovrtekLogo: {
    height: 50,
    width: 280,
    marginBottom: 30
  }
});

export default WhichSignUpScreen;
