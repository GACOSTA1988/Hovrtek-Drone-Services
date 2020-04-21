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
import { postProfiles } from "../../actions/index";
import { connect } from "react-redux";

function ClientSignUpScreen(props) {

  const { updateUser } = useContext(AuthContext);
  const [clientName, setClientName] = useState('');
  const [clientLocation, setClientLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function signUp(e) {
    e.preventDefault();
    props.navigation.push("Loading");
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error.toString(error));
    }
    let user = firebase.auth().currentUser;
    await user.updateProfile({
      displayName: clientName,
      photoURL: 'C'
    });
    await user.reload().then(updateUser());
    const userID = user.uid;
    props.postProfiles(clientLocation, email, userID, null);
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.textWrapper}>
        <Text style={styles.text}>Create your client account</Text>
        <TextInput
          placeholder="Name"
          value={clientName}
          onChangeText={setClientName}
          style={styles.input}
        />
        <TextInput
          placeholder="Location"
          value={clientLocation}
          onChangeText={setClientLocation}
          style={styles.input}
        />
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

        <Button title="Sign up" onPress={signUp} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 50,
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

export default connect(null, { postProfiles })(ClientSignUpScreen);
