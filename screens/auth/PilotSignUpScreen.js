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

//
// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       password: ""
//     };
//   }
//   SignUp = (email, password) => {
//     try {
//       firebase
//           .auth()
//           .createUserWithEmailAndPassword(email, password)
//           .then(user => {
//                  console.log(user);
//            });} catch (error) {
//       console.log(error.toString(error));
//     }
//   };


function PilotSignUpScreen() {
  const { signUpPilot } = React.useContext(AuthContext);

  const email = useState('');
  const password = useState('');

  const submit = (e) => {
    e.preventDefault();
    signUpPilot();
  }

  return (
    <View style={styles.createProfileWrapper}>
      <TouchableOpacity style={styles.createProfileTextWrapper}>
        <Text style={styles.createProfileText}>Create your account</Text>
        <TextInput
          placeholder="email"
          value={email}
        />
        <TextInput
          placeholder="password"
          value={password}
        />
        <Button title="Sign up" onPress={submit} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  createProfileWrapper: {
    alignItems: "center"
  },
  createProfileForm: {
    backgroundColor: "darkgray",
    width: 380,
    borderWidth: 1,
    padding: 6
  },
  createProfileText: {
    fontSize: 30,
    color: "darkblue"
  },
  createProfileTextWrapper: {
    marginBottom: 20
  }
});

export default PilotSignUpScreen;
