import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import * as firebase from "firebase";
import landingPageImage from "../../assets/landingPageImage.png";
import hovrtekLogo from "../../assets/hovrtek_logo.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    if (email.length < 4) {
      Alert.alert("Please enter an email address.");
      return;
    }
    if (!password.length) {
      Alert.alert("Please enter a password.");
      return;
    }
    navigation.push("Loading");
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function (error) {
          if (
            error.code === "auth/wrong-password" ||
            error.code === "auth/user-not-found"
          ) {
            Alert.alert("Incorrect username or password");
          } else {
            Alert.alert(error.toString(error));
          }
          navigation.pop();
        });
    } catch {
      Alert.alert(error.toString(error));
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
        height: "100%",
        backgroundColor: '#092455',
      }}
    >
      <ImageBackground source={landingPageImage} style={styles.MainContainer}>
        <Text style={styles.imageText}>PROFESSIONAL DRONE SERVICES</Text>
        <Text style={styles.imageTextTwo}>
          THE FASTEST WAY TO GET AERIAL IMAGES AND DATA
        </Text>
        <TouchableOpacity>
          <Text style={styles.text}>Welcome Back</Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor="grey"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize={"none"}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.signIn} onPress={signIn}>
          <Text style={styles.text}>SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push("SignUp")}>
          <Text style={styles.buttonText}>or Create an Account</Text>
        </TouchableOpacity>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    alignItems: "center",
    height: "125%",
  },

  buttonText: {
    textAlign: "center",
    color: "grey",
    fontSize: 17,
  },

  input: {
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
    marginTop: "2%",
    width: 250,
    color: "white",
    padding: "2%",
  },

  text: {
    textAlign: "center",
    color: "white",
    fontSize: 17,
  },

  imageText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginLeft: "3%",
    marginTop: "40%",
  },

  imageTextTwo: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#3E90D0",
    textAlign: "left",
    margin: "2%",
  },

  signIn: {
    backgroundColor: "#3E90D0",
    width: 250,
    // marginTop: 10,
    marginTop: "2%",
    marginBottom: "1%",
    padding: 5,
    borderRadius: 3,
  },
});

export default SignInScreen;
