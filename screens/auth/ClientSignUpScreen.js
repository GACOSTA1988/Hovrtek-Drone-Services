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

function ClientSignUpScreen() {
  const { signUpClient } = React.useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = (e) => {
    e.preventDefault();
    console.log(email);
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => { console.warn(user) });
      signUpClient();
    } catch (error) {
      console.log(error.toString(error));
    }
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.textWrapper}>
        <Text style={styles.text}>Create your client account</Text>
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
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

export default ClientSignUpScreen;
