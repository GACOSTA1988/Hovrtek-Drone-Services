import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { getProjects, postProjects } from "../../actions/projects";
import { postClientProfiles } from "../../actions/clientProfiles";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import ClientDatePicker from '../../components/client/ClientDatePicker';
import ClientLocationPicker from '../../components/client/ClientLocationPicker';
import ClientRecordingPicker from '../../components/client/ClientRecordingPicker';
import ClientLightPicker from '../../components/client/ClientLightPicker';
import LoadingScreen from "../../screens/LoadingScreen"
import Geocoder from "react-native-geocoding";
import {API_KEY} from "../../geocoder"
Geocoder.init(API_KEY);
// CONTEXT HOOKS FOR MODAL FORMS
export const PassSetDate = React.createContext();
export const PassDateState = React.createContext();
export const PassSetLocation= React.createContext();
export const PassLocationState = React.createContext();
export const PassSetRecording = React.createContext();
export const PassRecordingState = React.createContext();
export const PassSetLight = React.createContext();
export const PassLightState = React.createContext();

function NewProjectScreenOne(props) {
  const navigation = useNavigation();

  useEffect(() => {
    props.getProjects();
  }, []);

  let clientID = null;
  if (firebase.auth().currentUser) {
    clientID = firebase.auth().currentUser.uid;
  }

  const list = props.listOfProjects;
  let currentProjectProps = list.find((x) => x.projectID === projectID);

    let projectLocationPlaceholder = '';
    let projectDatePlaceholder = '';
    let projectRecordingPlaceholder = '';
    let projectLightPlaceholder = '';
  
  if (currentProjectProps) {
    projectLocationPlaceholder = currentProjectProps.location;
    projectDatePlaceholder = currentProjectProps.date;
    projectRecordingPlaceholder = currentProjectProps.recording;
    projectLightPlaceholder = currentProjectProps.light;
  }

  const [loadingActive, setLoadingActive] = useState(false)
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [recording, setRecording] = useState("");
  const [light, setLight] = useState("");

  async function submit(){
    // setLoadingActive(true)
    let locationCoordinates = await convertLocation(location)
    if (location.trim() === '') {
      Alert.alert("Please fill in the location of your Drone Service");
      return
    } else if (date.trim() === '') {
      Alert.alert("Please enter the date of your drone service");
      return
    } else if (recording.trim() === '') {
      Alert.alert("Please enter what you will be recording with the drone");
    } else {
      props.postProjects(clientID, location, date, recording, light, null, locationCoordinates);
      setDate(""), setLight(""), setLocation(""), setRecording("");
      props.navigation.popToTop();
      props.navigation.navigate("Projects");
      setLoadingActive(false)
    };
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

  const continueButton = () => {
    navigation.navigate("NewProjectScreenTwo");
  }

  const [isModalActive, setIsModalActive] = useState(false);

  return (
    <View style={loadingActive ? styles.loadingWrapper : styles.newProjectListWrapper}>
      {loadingActive ?
        <LoadingScreen />
        :
        <ScrollView 
        style={[styles.scrollWrapper, isModalActive ? styles.opaque : '']}
        showsVerticalScrollIndicator={false} 
        >
        <View style={styles.newProjectListTextWrapper}>
          <Text style={styles.labelText}>
            Where is the location of your drone service?
          </Text>
          <View style={styles.modalWrapper}>
            <PassSetLocation.Provider value={setLocation}>
              <PassLocationState.Provider value={location}>
                <ClientLocationPicker setIsModalActive={setIsModalActive}/>
              </PassLocationState.Provider>
            </PassSetLocation.Provider>
          </View>
          <Text style={styles.labelText}>
            What is the date of your Drone shoot?
          </Text>
          <View style={styles.modalWrapper}>
            <PassSetDate.Provider value={setDate}>
              <PassDateState.Provider value={date}>
                <ClientDatePicker setIsModalActive={setIsModalActive}/>
              </PassDateState.Provider>
            </PassSetDate.Provider>
          </View>
          <Text style={styles.labelText}>
            What will the Drone Service be recording?
          </Text>
          <View style={styles.modalWrapper}>
            <PassSetRecording.Provider value={setRecording}>
              <PassRecordingState.Provider value={recording}>
                <ClientRecordingPicker setIsModalActive={setIsModalActive}/>
              </PassRecordingState.Provider>
            </PassSetRecording.Provider>
          </View>
          <Text style={styles.labelText}>
            Do you have any light specifications?
          </Text>
          <View style={styles.modalWrapper}>
            <PassSetLight.Provider value={setLight}>
              <PassLightState.Provider value={light}>
                <ClientLightPicker />
              </PassLightState.Provider>
            </PassSetLight.Provider>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.submitWrapper} onPress={submit}>
              <Text style={styles.submitButton}>Submit Form</Text>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity onPress={continueButton}>
            <Text style={styles.continueButton}>Fake Continue With Form Route Link</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>}
    </View>
  );
}
const styles = StyleSheet.create({
  newProjectListWrapper: {
    alignItems: "center",
    backgroundColor: "#161616",
    height: "100%"
  },
  loadingWrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  }, 
  scrollWrapper: {
    width: "100%",
    paddingTop: "10%",
  },
  // newProjectText: {
  //   fontSize: 30,
  //   color: "white",
  //   marginBottom: 20,
  //   textAlign: "center",
  //   marginTop: 10,
  //   // backgroundColor: "white"
  // },
  newProjectListTextWrapper: {
    marginBottom: 100,
  },
  labelText: {
    marginBottom: 10,
    textAlign: "center",
    color: "#DDE2E4"
  },
  submitButton: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 30,
    color: "#DDE2E4",
  },
  continueButton: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 9,
    color: "#DDE2E4",
  },
  modalWrapper: {
    alignItems: 'center',
  },
  // backButton: {
  //   marginTop: 20,
  //   marginBottom: 40,
  //   width: 60,
  //   height: 30,
  //   backgroundColor: "#DDE2E4",
  //   borderRadius: 30,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // backButtonText: {
  //   color: "#161616",
  //   textAlign: "center",
  //   // marginBottom: 40,
  // },
  buttonWrapper:{
    alignItems: 'center'
  },
  submitWrapper: {
    width: 200,
    height: 60,
    borderWidth: 2,
    borderColor: "#DDE2E4",
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  opaque: {
    opacity: 0.2
  }
});
export default connect(null, { postProjects })(NewProjectScreenOne);