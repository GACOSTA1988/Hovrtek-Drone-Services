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


function ClientSignInScreen( {navigation} ) {

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
    <View style={styles.wrapper}>
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
        <Text>Or Create an Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => firebase.auth().signInWithEmailAndPassword("imaclient@email.com", "password")} >
        <Text>Client shortcut (imaclient@email.com)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => firebase.auth().signInWithEmailAndPassword("imapilot@email.com", "password")} >
        <Text>Pilot shortcut (imapilot@email.com)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: .5
  },
  text: {
    fontSize: 30,
    color: "darkblue"
  },
  textWrapper: {
    marginBottom: 20
  },
  input: {
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
    margin: 10,
    width: 200
  },
  button: {
    marginTop: 20,
    padding: 10,
    width: "90%",
    alignItems: "center",
    backgroundColor: "lightblue"
  }
});

export default ClientSignInScreen;
