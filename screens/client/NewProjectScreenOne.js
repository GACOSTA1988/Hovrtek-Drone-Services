import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { postProjects } from "../../actions/index";
import { postClientProfiles } from "../../actions/index";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import ClientDatePicker from '../../components/ClientDatePicker';
import ClientLocationPicker from '../../components/ClientLocationPicker';
import ClientRecordingPicker from '../../components/ClientRecordingPicker';
import ClientLightPicker from '../../components/ClientLightPicker';
import ClientCreateNewProjectNavigation from "../../navigation/ClientCreateNewProjectNavigation";

// CONTEXT HOOKS FOR MODAL FORMS
export const PassSetDate = React.createContext();
export const PassDateState = React.createContext();
export const PassSetLocation= React.createContext();
export const PassLocationState = React.createContext();
export const PassSetRecording = React.createContext();
export const PassRecordingState = React.createContext();
export const PassSetLight = React.createContext();
export const PassLightState = React.createContext();


function NewProjectScreenOne(props, { postProjects }) {
  const navigation = useNavigation();
  let clientID = null;
  if (firebase.auth().currentUser) {
    clientID = firebase.auth().currentUser.uid;
  }
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [recording, setRecording] = useState("");
  const [light, setLight] = useState("");


  const submit = (e) => {
    e.preventDefault();

    if (location.trim() === '') {
      Alert.alert("Please fill in the location of your Drone Service");
      return
    } else if (date.trim() === '') {
      Alert.alert("Please enter the date of your drone service");
      return
    } else if (recording.trim() === '') {
      Alert.alert("Please enter what you will be recording with the drone");
    } else {

    props.postProjects(clientID, location, date, recording, light, null);
    navigation.navigate("ProjectListScreen");
    setDate(""), setLight(""), setLocation(""), setRecording("");
  };
  }

  const continueButton = () => {
    navigation.navigate("NewProjectScreenTwo");
  }


  return (
    <View style={styles.newProjectListWrapper}>
      <ScrollView>
        <TouchableOpacity style={styles.newProjectListTextWrapper}>

          <Text style={styles.newProjectText}>Create a New Project</Text>

          <Text style={styles.labelText}>
            Where is the location of your drone service?
          </Text>
          <View style={styles.modalWrapper}>
            <PassSetLocation.Provider value={setLocation}>
              <PassLocationState.Provider value={location}>
                <ClientLocationPicker />
              </PassLocationState.Provider>
            </PassSetLocation.Provider>
          </View>

          <Text style={styles.labelText}>
            What is the date of your Drone shoot?
          </Text>
          <View style={styles.modalWrapper}>
            <PassSetDate.Provider value={setDate}>
              <PassDateState.Provider value={date}>
                <ClientDatePicker />
              </PassDateState.Provider>
            </PassSetDate.Provider>
          </View>

          <Text style={styles.labelText}>
            What will the Drone Service be recording?
          </Text>
          <View style={styles.modalWrapper}>
            <PassSetRecording.Provider value={setRecording}>
              <PassRecordingState.Provider value={recording}>
                <ClientRecordingPicker />
              </PassRecordingState.Provider>
            </PassSetRecording.Provider>
          </View>

          <Text style={styles.labelText}>
            Do you have any light specification?
          </Text>
          <View style={styles.modalWrapper}>
            <PassSetLight.Provider value={setLight}>
              <PassLightState.Provider value={light}>
                <ClientLightPicker />
              </PassLightState.Provider>
            </PassSetLight.Provider>
          </View>

          <TouchableOpacity onPress={continueButton}>
            <Text style={styles.continueButton}>Continue with Form</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={submit}>
            <Text style={styles.submitButton}>Submit Form</Text>
          </TouchableOpacity>
          <Button title="Back" onPress={() => props.navigation.goBack()} />
          {/* <Button style={styles.submitButton} title="Submit" onPress={submit} /> */}
        </TouchableOpacity>
        <Text style={styles.dummyText}>Dummy Text</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  newProjectListWrapper: {
    alignItems: "center",
  },
  newProjectListForm: {
    backgroundColor: "darkgray",
    width: 380,
    borderWidth: 1,
    padding: 6,
  },
  newProjectText: {
    fontSize: 30,
    color: "darkblue",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 10,
  },
  newProjectListTextWrapper: {
    // marginBottom: 100
  },
  input: {
    borderWidth: 1,
    borderRadius: 3,
    height: 30,
    marginBottom: 50
  },
  imageButton: {
    height: 30,
    width: 20,
    marginBottom: 1000,
    backgroundColor: "red",
  },
  labelText: {
    marginBottom: 10,
    textAlign: "center",
  },
  uploaderText: {
    marginTop: 100,
  },
  dummyText: {
    marginTop: 200,

    color: 'lightgray'
  },
  submitButton: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 30,
    color: "#092455",
  },
  continueButton: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 30,
    color: "#092455",
  },
  modalWrapper: {
    alignItems: 'center'
  }
});

export default connect(null, { postProjects })(NewProjectScreenOne);
