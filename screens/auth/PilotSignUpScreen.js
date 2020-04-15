import React, { useState } from "react";
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

function PilotSignUpScreen() {

  const { signInPilot } = React.useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = (e) => {
    e.preventDefault();
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => { console.warn(user) });
      signInPilot();
    } catch (error) {
      console.warn(error.toString(error));
    }
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.textWrapper}>
        <Text style={styles.text}>Create your pilot account</Text>
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Sign up" onPress={signUp} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center"
  },
  text: {
    fontSize: 30,
    color: "darkblue"
  },
  textWrapper: {
    marginBottom: 20
  }
});

export default PilotSignUpScreen;
