import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import { AuthContext } from "../../context";

import HomeImage from "../../components/auth/HomeImage";

function WhichSignInScreen({ navigation }) {
  const { signInPilot } = React.useContext(AuthContext);
  const { signInClient } = React.useContext(AuthContext);

  return (
    <View>
      <HomeImage />
      <View style={styles.whichSignInBody}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.push("PilotSignInScreen");
          }}
        >
          <Text style={styles.buttonText}>Pilot sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.push("ClientSignInScreen");
          }}
        >
          <Text style={styles.buttonText}>Client sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push("SignUp")}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => signInPilot()}>
          <Text style={styles.buttonText}>Pilot Shortcut</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => signInClient()}>
          <Text style={styles.buttonText}>Client Shortcut</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  whichSignInBody: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0.5,
    marginTop: 350,
    position: "absolute",
    flexDirection: "row",
    marginLeft: "2%",

    // justifyContent: "flex-end",
  },
  button: {
    marginTop: 30,
    padding: 10,
    width: 80,
    alignItems: "center",
    backgroundColor: "white",
  },
  buttonShortcut: {
    marginTop: 20,
    padding: 10,
    width: 100,
    alignItems: "center",
    backgroundColor: "lightgreen",
  },
  buttonText: { textAlign: "center" },
});

export default WhichSignInScreen;
