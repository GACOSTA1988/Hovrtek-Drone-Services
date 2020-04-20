import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button
} from "react-native";
import { AuthContext } from "../../context";
import * as firebase from "firebase";

function ClientSignUpScreen() {
  const { signInClient } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  async function signUp(e) {
    e.preventDefault();
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password).then((user) => {
          console.log("initial user: ", user);
        })
    } catch (error) {
      console.log(error.toString(error));
    }
    let user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name,
      photoURL: 'C'
    });
    console.log("user just updated ", user);
    console.log("user id: ", user.uid);
    console.log("photoURL: ", user.photoURL);
    // todo/ jay already did? push location and uid to profile
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.textWrapper}>
        <Text style={styles.text}>Create your client account</Text>
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={styles.input}
        />
        <Button title="Sign up" onPress={signUp} />
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
  }
});

export default ClientSignUpScreen;
