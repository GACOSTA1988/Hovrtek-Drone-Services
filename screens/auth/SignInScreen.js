import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Alert
} from "react-native";
import * as firebase from "firebase";
import HomeImage from "../../components/auth/HomeImage";


function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const signIn = (e) => {
    e.preventDefault();
    if (email.length < 4) {
      Alert.alert('Please enter an email address.');
      return;
    }
    if (!password.length) {
      Alert.alert('Please enter a password.');
      return;
    }
    navigation.push("Loading");
    try {
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
          Alert.alert('Incorrect username or password');
        } else {
          console.log(error.code);
          Alert.alert(error.toString(error));
        }
        navigation.pop();
      });
    } catch {
      Alert.alert(error.toString(error));
    }
  };

  return (
    <View>
      <HomeImage />
      <View style={styles.SignInBody}>
        <TouchableOpacity>
          <Text style={styles.text}>Welcome Back</Text>
          <TextInput
            placeholder=" Email"
            placeholderTextColor="grey"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder=" Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <Button title="Sign in" onPress={signIn} style={styles.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push("SignUp")}>
          <Text style={styles.buttonText}>Create an Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => firebase.auth().signInWithEmailAndPassword("imaclient@mail.com", "password")} >
          <Text style={styles.buttonText}>Client shortcut</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => firebase.auth().signInWithEmailAndPassword("imapilot@mail.com", "password")} >
          <Text style={styles.buttonText}>Pilot shortcut</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  SignInBody: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: 200,
    position: "absolute",
    marginLeft: "22%",

  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    marginTop: 30
  },
  // button: {
  //   marginTop: 30,
  //   padding: 10,
  //   width: 80,
  //   alignItems: "center",
  //   backgroundColor: "white",
  // },
  // buttonShortcut: {
  //   marginTop: 20,
  //   padding: 10,
  //   width: 100,
  //   alignItems: "center",
  //   backgroundColor: "lightgreen",
  // },
  buttonText: {
    textAlign: "center",
    color: "grey",
  },
  input: {
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
    marginTop: 8,
    width: 200,
    color: "white",
  },
});

export default SignInScreen;
