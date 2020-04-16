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


function PilotSignInScreen( {navigation} ) {

  const { signInPilot } = React.useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = (e) => {
    e.preventDefault();
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => { console.warn(user) });
      signInPilot();
    } catch (error) {
      console.log(error.toString(error));
      navigation.pop();
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

export default PilotSignInScreen;