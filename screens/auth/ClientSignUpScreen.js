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
import { AuthContext } from "../../context";
import * as firebase from "firebase";
import { postClientProfiles } from "../../actions/index";
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';



function ClientSignUpScreen (props) {
  const navigation = useNavigation();
  const { updateUser } = useContext(AuthContext);
  const [clientName, setClientName] = useState("");
  const [clientLocation, setClientLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUp(e) {

    e.preventDefault();
    props.navigation.push("Loading");

      if (clientName.trim() === '') {
        Alert.alert("Please fill in your name.");
        navigation.navigate("ClientSignUpScreen");
      } else if (clientLocation.trim() == '') {
        Alert.alert("Please fill in your loaction.");
        navigation.navigate("ClientSignUpScreen");
      } else {

      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
      } catch (error) {
        Alert.alert(error.message);
        navigation.navigate("ClientSignUpScreen");
      }
      let user = firebase.auth().currentUser;
      await user.updateProfile({
        displayName: clientName,
        photoURL: "C",
      });
      await user.reload().then(updateUser());
      const userID = user.uid;
      props.postClientProfiles(clientName, clientLocation, email, userID);
        navigation.navigate("ProjectListScreen");
    }
  }


  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Create your client account</Text>
      <TouchableOpacity style={styles.textWrapper}>

        <TextInput
          maxLength={30}
          autoCapitalize='words'
          placeholder=" Name"
          placeholderTextColor="grey"
          value={clientName}
          onChangeText={setClientName}
          style={styles.input}
        />

        <TextInput
          placeholder=" Location"
          placeholderTextColor="grey"
          value={clientLocation}
          onChangeText={setClientLocation}
          style={styles.input}
        />
        <TextInput
          placeholder=" Email"
          keyboardType={"email-address"}
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

        <Button title="Sign up" onPress={signUp} style={{ fontWeight: 900}} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    // justifyContent: "center",
    // flex: .
    backgroundColor: "lightgray",
    height: "100%",
  },
  text: {
    marginTop: "5%",
    marginBottom: "10%",
    fontSize: 30,
    color: "darkblue",
    fontWeight: "600",
  },
  inputText: { textAlign: "center", color: "white", fontSize: 15 },

  textWrapper: {
    elevation: 8,
    borderRadius: 15,
    backgroundColor: "#092455",
    marginBottom: 15,
    padding: 80,
  },
  input: {
    height: 40,
    borderColor: "grey",
    borderWidth: 2,
    margin: 10,
    width: 200,
    alignItems: "center",
    textAlign: "center",
    color: "white",
    fontSize: 15,
  },
});

export default connect(null, { postClientProfiles })(ClientSignUpScreen);
