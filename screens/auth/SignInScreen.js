import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button
} from "react-native";
import * as firebase from "firebase";
import HomeImage from "../../components/auth/HomeImage";

function SignInScreen( {navigation} ) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // supposed to be async?
  const signIn = (e) => {
    e.preventDefault();
    navigation.push("Loading");
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
    } catch (error) {
      console.warn(error.toString(error));
    }

  }

  return (
    <View>
      <HomeImage />
      <View style={styles.SignInBody}>
        <TouchableOpacity style={styles.textWrapper}>
          <Text style={styles.text}>Sign In</Text>
          <TextInput
            placeholder="email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <Button title="Sign in" onPress={signIn} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.push('SignUp')} >
          <Text style={styles.buttonText}>Or Create an Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => firebase.auth().signInWithEmailAndPassword("imaclient@email.com", "password")} >
          <Text style={styles.buttonText}>Client shortcut (imaclient@email.com)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => firebase.auth().signInWithEmailAndPassword("imapilot@email.com", "password")} >
          <Text style={styles.buttonText}>Pilot shortcut (imapilot@email.com)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  SignInBody: {
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
  buttonText: {
    textAlign: "center"
  },
  input: {
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
    margin: 10,
    width: 200
  }
});

export default SignInScreen;
