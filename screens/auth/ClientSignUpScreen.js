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

  const signUp = (e) => {
    e.preventDefault();
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password).then((user) => {
          console.log(user);
        })
      signInClient();
    } catch (error) {
      console.log(error.toString(error));
    }
    let user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: "somethingElse",
      photoURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.almanac.com%2Fnews%2Fhome-health%2Fchickens%2Fraising-chickens-101-how-get-started&psig=AOvVaw16Hoi574wlL8Dy8TJnqJ6f&ust=1587245536477000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCND2wcW08OgCFQAAAAAdAAAAABAH"
    });
    console.log("user just updated ", user);
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
