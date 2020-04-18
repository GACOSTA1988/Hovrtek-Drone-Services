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

function PilotSignUpScreen(props) {


  const { signInPilot } = useContext(AuthContext);
  const [pilotName, setPilotName] = useState('');
  const [pilotLocation, setPilotLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handlePilotName(text) {
    setPilotName(text);
  }

  function handlePilotLocation(text) {
    setPilotLocation(text);
  }

  async function signUp(e) {
    e.preventDefault();
   
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password).then((user) => {
          console.log("initial user: ", user);
        })
      signInPilot();
    } catch (error) {
      console.log(error.toString(error));
    }
    let user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: pilotName,
      photoURL: 'P'
    });
    let userID = user.uid
    console.log("let userID = user.ID", userID)
    console.log("user just updated ", user);
    console.log("user id: ", user.uid);
    props.postProfiles(pilotLocation, email, userID, null);
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.textWrapper}>
        <Text style={styles.text}>Create your pilot account</Text>
        <TextInput
          placeholder="Name"
          value={pilotName}
          onChangeText={handlePilotName}
          style={styles.input}
        />
        <TextInput
          placeholder="Location"
          value={pilotLocation}
          onChangeText={handlePilotLocation}
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

export default connect(null, { postProfiles })(PilotSignUpScreen);
