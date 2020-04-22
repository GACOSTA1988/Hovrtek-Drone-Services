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
} from "react-native";
import { AuthContext } from "../../context";
import * as firebase from "firebase";
import { postProfiles } from "../../actions/index";
import { connect } from "react-redux";


import AirDrop from "../../components/pilot/AirMapDropDown";

import { useNavigation } from '@react-navigation/native';
import LicenseUploader from "../../components/auth/LicenseUploader";




function PilotSignUpScreen(props) {
  const navigation = useNavigation();
  const { updateUser } = useContext(AuthContext);
  const [pilotFirstName, setPilotFirstName] = useState("");
  const [pilotLastName, setPilotLastName] = useState("");
  const [pilotLocation, setPilotLocation] = useState("");
  const [droneType, setDroneType] = useState("");
  const [airMap, setAirMap] = useState("No");
  const [fourHundred, setFourHundred] = useState("No");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUp(e) {
    e.preventDefault();
    props.navigation.push("Loading");
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
    props.postProfiles(
      pilotFirstName,
      pilotLastName,
      pilotLocation,
      droneType,
      airMap,
      fourHundred,
      userID
    );
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
          <TextInput
            placeholder="Location"
            value={pilotLocation}
            onChangeText={setPilotLocation}
            style={styles.input}
            placeholderTextColor="grey"
          />
          <TextInput
            placeholder="Drone Type"
            value={droneType}
            onChangeText={setDroneType}
            style={styles.input}
            placeholderTextColor="grey"
          />
          <Text style={styles.textSub}>
            Have you ever used{"\n"}AirMap or Kitty Hawk?
          </Text>
          {/* <AirDrop /> */}
          <Picker
            style={styles.airMapPicker}
            selectedValue={airMap}
            onValueChange={(itemValue, itemIndex) => setAirMap(itemValue)}
          >
            <Picker.Item label="No" value="no" />
            <Picker.Item label="Yes" value="yes" />
          </Picker>

          <Text style={styles.textSub}>
            Do you have experience flying over 400 feet?
          </Text>
          <Picker
            style={styles.fourHundredPicker}
            selectedValue={fourHundred}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => setFourHundred(itemValue)}
          >
            <Picker.Item label="No" value="no" />
            <Picker.Item label="Yes" value="yes" />
          </Picker>


          <Text style={styles.imageUploaderText}>Please upload your FAA license</Text>
          <LicenseUploader/>
     


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
  // emailInput: {
  //   height: 40,
  //   borderColor: "grey",
  //   borderWidth: 1,
  //   marginTop: 200,
  //   width: 200,
  // },

  airMapPicker: {
    height: 100,
    width: 100,
    color: "white",

    // marginBottom: 100,
  },
  airMapQuestionText: {
    // marginTop: 100,
  },

  imageUploaderText:{
    marginTop: 250
  }

});

export default connect(null, { postProfiles })(PilotSignUpScreen);
