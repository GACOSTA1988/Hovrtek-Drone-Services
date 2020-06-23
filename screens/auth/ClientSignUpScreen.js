import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Alert,
  Dimensions,
} from "react-native";
import { AuthContext } from "../../context";
import * as firebase from "firebase";
import { postClientProfiles } from "../../actions/clientProfiles";
import { connect } from "react-redux";
import landingPageImage from "../../assets/backgroundImage.jpg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const windowHeight = Dimensions.get('window').height;


function ClientSignUpScreen(props) {
  const navigation = props.navigation;
  const { updateUser } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  async function signUp(e) {
    e.preventDefault();
    navigation.push("Loading");

    if (firstName.trim() === "" || lastName.trim() === "") {
      Alert.alert("Please fill in your name.");
      navigation.navigate("ClientSignUpScreen");
    } else if (location.trim() == "") {
      Alert.alert("Please fill in your loaction.");
      navigation.navigate("ClientSignUpScreen");
    } else if (password !== passwordConfirm) {
      Alert.alert("Passwords don't match, please try again");
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
      showsVerticalScrollIndicator={false}
      scrollToOverflowEnabled={false}
      style={{
        flex: 1,
        height: "100%",
        backgroundColor: "#161616",
      }}
    >
      <ImageBackground source={landingPageImage} style={styles.MainContainer}>
        <View style={styles.textWrapper}>
          <TextInput
            maxLength={30}
            autoCapitalize="words"
            placeholder=" First Name"
            placeholderTextColor="#DDE2E4"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />

          <TextInput
            maxLength={30}
            autoCapitalize="words"
            placeholder=" Last Name"
            placeholderTextColor="#DDE2E4"
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
          />

          <TextInput
            placeholder=" Location"
            placeholderTextColor="#DDE2E4"
            value={location}
            onChangeText={setLocation}
            style={styles.input}
          />
          <TextInput
            placeholder=" Email"
            autoCapitalize="none"
            keyboardType={"email-address"}
            placeholderTextColor="#DDE2E4"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder=" Password"
            placeholderTextColor="#DDE2E4"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <TextInput
            placeholder="Confirm password"
            placeholderTextColor="#DDE2E4"
            secureTextEntry={true}
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={signUp}>
            <Text style={styles.buttontext}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.linkText}>or return to sign in</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    height: windowHeight,
    width: "100%",
    resizeMode: "contain",
  },
  text: {
    marginTop: "5%",
    marginBottom: "10%",
    fontSize: 30,
    color: "#161616",
    fontWeight: "600",
  },
  inputText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
  },
  textWrapper: {
    padding: 50,
    alignItems: "center",
    backgroundColor: "rgba(16,16,16,0.4)",
    width: "100%",
    height: windowHeight,
  },
  input: {
    backgroundColor: "#161616",
    height: 40,
    borderColor: "#DDE2E4",
    borderWidth: 2,
    margin: 13,
    width: 200,
    alignItems: "center",
    textAlign: "center",
    color: "white",
    fontSize: 15,
  },
  button: {
    backgroundColor: "#DDE2E4",
    margin: 13,
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 200,
  },
  buttontext: {
    fontSize: 20,
    color: "#161616",
  },
  linkText: {
    textAlign: "center",
    color: "#DDE2E4",
    fontSize: 17,
  },
});

export default connect(null, { postClientProfiles })(ClientSignUpScreen);