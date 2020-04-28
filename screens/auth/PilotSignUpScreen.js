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
  Image
} from "react-native";
import { AuthContext } from "../../context";
import * as firebase from "firebase";
import { postPilotProfiles } from "../../actions/index";
import { connect } from "react-redux";
import AirDrop from "../../components/pilot/AirMapDropDown";
import LicenseUploader from "../../components/auth/LicenseUploader";


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
  const [profileComplete, setProfileComplete] = useState("No");

  async function signUp(e) {
    e.preventDefault();
    navigation.push("Loading");

    if (pilotFirstName.trim() === '') {
      Alert.alert("Please fill in your first name");
      navigation.navigate("PilotSignUpScreen");
    } else if (pilotLastName.trim() === '') {
      Alert.alert("Please fill in your last name");
      navigation.navigate("PilotSignUpScreen");
    } else if (pilotLocation.trim() == '') {
      Alert.alert("Please fill in your loaction");
      navigation.navigate("PilotSignUpScreen");
    } else {

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error.toString(error));
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
      personalBio,
      yearsOfExperience,
      faaLicenseExp,
      insuredStatus,
      travelStatus,
      droneType,
      airMap,
      fourHundred,
      userID,
      profileComplete
    );
  }
  }
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.textMain}>Create your pilot account</Text>
        <TouchableOpacity style={styles.textWrapper}>
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
            placeholder="email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor="grey"
          />
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholderTextColor="grey"
          />

          <Button title="Sign up" onPress={signUp} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    backgroundColor: "lightgray",
    height: "100%",
    // justifyContent: 'center'
  },
  textMain: {
    marginTop: "25%",
    marginBottom: "5%",
    fontSize: 30,
    color: "darkblue",
    fontWeight: "600",
    textAlign: "center",
  },
  textSub: {
    marginTop: "25%",
    // marginBottom: "5%",
    fontSize: 20,
    color: "white",
    fontWeight: "400",
    textAlign: "center",
  },
  textWrapper: {
    marginBottom: 20,
    alignItems: "center",
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
  dummyText: {
    marginTop: 200,
  },

  airMapPicker: {
    height: 100,
    width: 100,
    color: "white",

    // marginBottom: 100,
  },
  airMapQuestionText: {
    // marginTop: 100,
  },

  imageUploaderText: {
    marginTop: 250,
  },
});

export default connect(null, { postPilotProfiles })(PilotSignUpScreen);
