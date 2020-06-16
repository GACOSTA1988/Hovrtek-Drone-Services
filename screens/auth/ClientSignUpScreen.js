import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { AuthContext } from "../../context";
import * as firebase from "firebase";
import { postClientProfiles } from "../../actions/clientProfiles";
import { connect } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function ClientSignUpScreen(props) {
  const navigation = props.navigation;
  const { updateUser } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUp(e) {
    e.preventDefault();
    navigation.push("Loading");

    if (firstName.trim() === "" || lastName.trim() === "") {
      Alert.alert("Please fill in your name.");
      navigation.navigate("ClientSignUpScreen");
    } else if (location.trim() == "") {
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
        displayName: firstName,
        photoURL: "C",
      });
      await user.reload().then(updateUser());
      const userID = user.uid;
      try {
        props.postClientProfiles(
          firstName,
          lastName,
          location,
          email,
          "Amelia Mary Earhart (/ˈɛərhɑːrt/, born July 24, 1897; disappeared July 2, 1937) was an American aviation pioneer and author. Earhart was the first female aviator to fly solo across the Atlantic Ocean. She set many other records, wrote best-selling books about her flying experiences, and was instrumental in the formation of The Ninety-Nines, an organization for female pilots.",
          "Set industry",
          "Set payment type",
          "",
          userID,
        );
      } catch (error) {
        Alert.alert("Error: ", error.message);

        // if client profile can't be created, delete user and redirect to signup
      }
    }
  }

  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
        height: "100%",
      }}
    >
      <View style={styles.wrapper}>
        <Text style={styles.text}>Create your client account</Text>
        <View style={styles.textWrapper}>
          <TextInput
            maxLength={30}
            autoCapitalize="words"
            placeholder=" First Name"
            placeholderTextColor="grey"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />

          <TextInput
            maxLength={30}
            autoCapitalize="words"
            placeholder=" Last Name"
            placeholderTextColor="grey"
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
          />

          <TextInput
            placeholder=" Location"
            placeholderTextColor="grey"
            value={location}
            onChangeText={setLocation}
            style={styles.input}
          />
          <TextInput
            placeholder=" Email"
            autoCapitalize="none"
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
          <TextInput
            placeholder="Confirm password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={signUp}>
            <Text style={styles.buttontext}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    backgroundColor: "lightgray",
    height: "120%",
  },
  text: {
    marginTop: "5%",
    marginBottom: "10%",
    fontSize: 30,
    color: "#092455",
    fontWeight: "600",
  },
  inputText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
  },
  textWrapper: {
    borderRadius: 15,
    backgroundColor: "#092455",
    marginBottom: 15,
    padding: 80,
    alignItems: "center",
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
  button: {
    backgroundColor: "lightgray",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 200,
  },
  buttontext: {
    fontSize: 20,
    color: "#092455",
  },
});

export default connect(null, { postClientProfiles })(ClientSignUpScreen);
