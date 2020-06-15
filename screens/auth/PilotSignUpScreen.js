import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Picker,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { AuthContext } from "../../context";
import * as firebase from "firebase";
import { postPilotProfiles } from "../../actions/pilotProfiles";
import { connect } from "react-redux";
import AirDrop from "../../components/pilot/AirMapDropDown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Geocoder from "react-native-geocoding";
import {API_KEY} from "../../geocoder"
Geocoder.init(API_KEY);

function PilotSignUpScreen(props) {
  const navigation = props.navigation;
  const { updateUser } = useContext(AuthContext);

  const [pilotFirstName, setPilotFirstName] = useState("");
  const [pilotLastName, setPilotLastName] = useState("");
  const [pilotLocation, setPilotLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
   
    let pilotCoordinates = await convertLocation(pilotLocation)
    if (pilotFirstName.trim() === "") {
      Alert.alert("Please fill in your first name");
      navigation.navigate("PilotSignUpScreen");
    } else if (pilotLastName.trim() === "") {
      Alert.alert("Please fill in your last name");
      navigation.navigate("PilotSignUpScreen");
    } else if (pilotLocation.trim() == "") {
      Alert.alert("Please fill in your loaction");
      navigation.navigate("PilotSignUpScreen");
    } else if (password.length < 6) {
      Alert.alert("Password must be longer than 6 characters");
      navigation.navigate("PilotSignUpScreen");
    } else {
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
    let final = await Geocoder.from(location).then(json => {
        const { lat, lng } = json.results[0].geometry.location;
        let pilotCoords = [lat, lng]
        return pilotCoords
      }).catch(error => {
        console.error(error);
      }
    );
    return final
  }
  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
        height: "100%",
      }}
    >
      <View style={styles.wrapper}>
        <Text style={styles.textMain}>Create your pilot account</Text>
        <View style={styles.textWrapper}>
          <TextInput
            placeholder="First Name"
            value={pilotFirstName}
            onChangeText={setPilotFirstName}
            style={styles.input}
            placeholderTextColor="grey"
          />
          <TextInput
            placeholder="Last Name"
            value={pilotLastName}
            onChangeText={setPilotLastName}
            style={styles.input}
            placeholderTextColor="grey"
          />
          <TextInput
            placeholder="State"
            value={pilotLocation}
            onChangeText={setPilotLocation}
            style={styles.input}
            placeholderTextColor="grey"
          />
          <TextInput
            keyboardType={"email-address"}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor="grey"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholderTextColor="grey"
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
  textMain: {
    marginTop: "5%",
    marginBottom: "10%",
    fontSize: 30,
    color: "darkblue",
    fontWeight: "600",
  },
  textSub: {
    marginTop: "25%",
    fontSize: 20,
    color: "white",
    fontWeight: "400",
    textAlign: "center",
  },
  textWrapper: {
    alignItems: "center",
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
    color: "darkblue",
  },
});

export default connect(null, { postPilotProfiles })(PilotSignUpScreen);
