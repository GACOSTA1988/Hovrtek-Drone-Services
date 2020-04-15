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


function ClientSignInScreen() {

  const { signInClient } = React.useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = (e) => {
    e.preventDefault();
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => { console.warn(user) });
      signInClient();
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
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Sign in" onPress={signIn} />
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

export default ClientSignInScreen;
