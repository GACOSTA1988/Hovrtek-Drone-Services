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
import { postPilotProfiles } from "../../actions/pilotProfiles";
import { connect } from "react-redux";
import AirDrop from "../../components/pilot/AirMapDropDown";
import landingPageImage from "../../assets/backgroundImage.jpg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Geocoder from "react-native-geocoding";
import {API_KEY} from "../../geocoder"
Geocoder.init(API_KEY);
const windowHeight = Dimensions.get('window').height;


function PilotSignUpScreen(props) {
  const navigation = props.navigation;
  const { updateUser } = useContext(AuthContext);

  const [pilotFirstName, setPilotFirstName] = useState("");
  const [pilotLastName, setPilotLastName] = useState("");
  const [pilotLocation, setPilotLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // BLANK PLACE HOLDERS TO BE UPDATED ON PROFILE CREATION
  const [personalBio, setPersonalBio] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [faaLicenseExp, setFaaLicenseExp] = useState("");
  const [insuredStatus, setInsuredStatus] = useState("");
  const [travelStatus, setTravelStatus] = useState("");
  const [droneType, setDroneType] = useState("");
  const [airMap, setAirMap] = useState("");
  const [fourHundred, setFourHundred] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [profileComplete, setProfileComplete] = useState("No");

  async function signUp(e) {
    e.preventDefault();
    navigation.push("Loading");

    if (pilotFirstName.trim() === "") {
      Alert.alert("Please fill in your first name");
      navigation.navigate("PilotSignUpScreen");
    } else if (pilotLastName.trim() === "") {
      Alert.alert("Please fill in your last name");
      navigation.navigate("PilotSignUpScreen");
    } else if (pilotLocation.trim() == "") {
      Alert.alert("Please fill in your location");
      navigation.navigate("PilotSignUpScreen");
    } else if (password.length < 6) {
      Alert.alert("Password must be longer than 6 characters");
      navigation.navigate("PilotSignUpScreen");
    } else if (password !== passwordConfirm) {
      Alert.alert("Passwords don't match, please try again");
      navigation.navigate("PilotSignUpScreen");
    } else {
      let pilotCoordinates = await convertLocation(pilotLocation)
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
      } catch (error) {
        Alert.alert(error.message);
        navigation.navigate("PilotSignUpScreen");
      }
      let user = firebase.auth().currentUser;
      await user.updateProfile({
        displayName: pilotFirstName,
        photoURL: "P",
      });
      await user.reload().then(updateUser());
      const userID = user.uid;
      props.postPilotProfiles(
        pilotFirstName,
        pilotLastName,
        pilotLocation,
        email,
        pilotCoordinates,
        personalBio,
        yearsOfExperience,
        faaLicenseExp,
        insuredStatus,
        travelStatus,
        droneType,
        airMap,
        fourHundred,
        userID,
        profileImageUrl,
        profileComplete,
      );
    }
  }

  async function convertLocation(location){
    let coordinates
    try {
      coordinates = await Geocoder.from(location).then(json => {
        const { lat, lng } = json.results[0].geometry.location;
        let pilotCoords = [lat, lng]
        return pilotCoords
      }).catch(error => {
        console.log(error)
        return coordinates = [45.523064, -122.676483]
      });
    } catch (error) {
      coordinates = [45.523064, -122.676483]
    }
    return coordinates
  }

  function passwordsDontMatch() {
    setPasswordFail(true);
    setTimeout(() => {
      setPasswordFail(false)
      }, 3000);
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
      keyboardShouldPersistTaps='handled'
    >
      <ImageBackground source={landingPageImage} style={styles.MainContainer}>
        <View style={styles.textWrapper}>
          <TextInput
            placeholder="First Name"
            value={pilotFirstName}
            onChangeText={setPilotFirstName}
            style={styles.input}
            placeholderTextColor="#DDE2E4"
          />
          <TextInput
            placeholder="Last Name"
            value={pilotLastName}
            onChangeText={setPilotLastName}
            style={styles.input}
            placeholderTextColor="#DDE2E4"
          />
          <TextInput
            placeholder="City, State"
            value={pilotLocation}
            onChangeText={setPilotLocation}
            style={styles.input}
            placeholderTextColor="#DDE2E4"
          />
          <TextInput
            keyboardType={"email-address"}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor="#DDE2E4"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholderTextColor="#DDE2E4"
          />
          <TextInput
            placeholder="Confirm password"
            secureTextEntry={true}
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            style={styles.input}
            placeholderTextColor="#DDE2E4"
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
  textMain: {
    marginBottom: "10%",
    fontSize: 30,
    color: "#DDE2E4",
    fontWeight: "600",
  },
  textSub: {
    fontSize: 20,
    color: "white",
    fontWeight: "400",
    textAlign: "center",
  },
  textWrapper: {
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "rgba(16,16,16,0.4)",
    padding: 50,
    width: "100%",
    height: "100%",
  },
  input: {
    height: 40,
    borderColor: "#DDE2E4",
    borderWidth: 2,
    margin: 13,
    width: 200,
    alignItems: "center",
    textAlign: "center",
    color: "white",
    fontSize: 15,
    backgroundColor: "#161616"
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

export default connect(null, { postPilotProfiles })(PilotSignUpScreen);
