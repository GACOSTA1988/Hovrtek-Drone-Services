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
import { postProjects } from "../../actions/projects";
import { postClientProfiles } from "../../actions/clientProfiles";
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

          <View style={styles.backButtonWrapper}>
            <TouchableOpacity style={styles.submitWrapper} onPress={submit}>
              <Text style={styles.submitButton}>Submit Form</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={continueButton}>
            <Text style={styles.continueButton}>Fake Continue With Form Route Link</Text>
          </TouchableOpacity>
          <View style={styles.backButtonWrapper}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => props.navigation.goBack()}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
  
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  newProjectListWrapper: {
    alignItems: "center",
  },
  newProjectText: {
    fontSize: 30,
    color: "darkblue",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 10,
  },
  newProjectListTextWrapper: {
    marginBottom: 100
  },

  labelText: {
    marginBottom: 10,
    textAlign: "center",
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
    fontSize: 9,
    color: "#092455",
  },
  modalWrapper: {
    alignItems: 'center'
  },
  backButton: {
    marginTop: 20,
    marginBottom: 40,
    width: 60,
    height: 30,
    backgroundColor: "#092455",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    color: "white",
    textAlign: "center",
    // marginBottom: 40,
  },
  backButtonWrapper:{
    alignItems: 'center'
  },
  submitWrapper: {
    width: 200,
    height: 60,
    borderWidth: 2,
    borderColor: "#092455",
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
});

export default connect(null, { postProjects })(NewProjectScreenOne);
