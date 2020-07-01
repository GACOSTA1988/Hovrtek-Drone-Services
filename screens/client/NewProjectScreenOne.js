
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import { getProjects, postProjects, editProject } from "../../actions/projects";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import ClientDatePicker from '../../components/client/ClientDatePicker';
import ClientLocationPicker from '../../components/client/ClientLocationPicker';
import ClientRecordingPicker from '../../components/client/ClientRecordingPicker';
import ClientLightPicker from '../../components/client/ClientLightPicker';
import LoadingScreen from "../LoadingScreen"
import Geocoder from "react-native-geocoding";
import {API_KEY} from "../../geocoder"
Geocoder.init(API_KEY);
// CONTEXT HOOKS FOR MODAL FORMS
export const PassSetDate = React.createContext();
export const PassDateState = React.createContext();
export const PassSetLight = React.createContext();
export const PassLightState = React.createContext();

function NewProjectScreenOne(props) {
  const navigation = useNavigation();

  let clientID = null;
  if (firebase.auth().currentUser) {
    clientID = firebase.auth().currentUser.uid;
  }

    const { projectDetails } = props.route.params;
    const [ location, setLocation ] = (props.route.params.isEditing? useState(projectDetails.location) : useState(""));
    const [ date, setDate ] = (props.route.params.isEditing? useState(projectDetails.date) : useState(""));
    const [ recording, setRecording ] = (props.route.params.isEditing? useState(projectDetails.recording) : useState(""));
    const [ light, setLight ] = (props.route.params.isEditing? useState(projectDetails.light) : useState(""));

  const [ loadingActive, setLoadingActive ] = useState(false);

  async function submit(){
    let locationCoordinates = await convertLocation(location)
    setLoadingActive(true)
    if (location.trim() === '') {
      Alert.alert("Please fill in the location of your Drone Service");
      setLoadingActive(false)
      return
    } else if (date.trim() === '') {
      Alert.alert("Please enter when the recording will be scheduled");
      setLoadingActive(false)
      return
    } else if (recording.trim() === '') {
      Alert.alert("Please enter what you will be recording with the drone");
      setLoadingActive(false)
      return
    } else {
      if (props.route.params.isEditing) {
        projectDetails.location = location;
        projectDetails.date = date;
        projectDetails.recording = recording;
        props.editProject(location, date, recording, locationCoordinates, projectDetails.key);
      } else {
        props.postProjects(clientID, location, date, recording, light, null, locationCoordinates);
      }
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

  const [isModalActive, setIsModalActive] = useState(false);

  const [focus, setFocus] = useState(false);

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
          <Text style={styles.detailsHeader}>What?</Text>
          <TextInput
            placeholder={"Enter a short description of what you are recording"}
            style={styles.input}
            value={recording}
            onChangeText={setRecording}
            onChangeText={setLocation}
            returnKeyType={"next"}
            underlineColorAndroid={"grey"}
          />
          <Text style={styles.detailsHeader}>When?</Text>
          <View>
            <PassSetDate.Provider value={setDate}>
              <PassDateState.Provider value={date}>
                <ClientDatePicker setIsModalActive={setIsModalActive}/>
              </PassDateState.Provider>
            </PassSetDate.Provider>
          </View>
          <View style={styles.hr}/>
          <Text style={styles.detailsHeader}>Where?</Text>
          <TextInput
            placeholder={"Enter the location of your drone service"}
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            returnKeyType={"next"}
            underlineColorAndroid={"grey"}
          />
          <Text style={styles.detailsHeader}>Light specifications?</Text>
          <View style={styles.radio}>
            <PassSetLight.Provider value={setLight}>
              <PassLightState.Provider value={light}>
                <ClientLightPicker setIsModalActive={setIsModalActive}/>
              </PassLightState.Provider>
            </PassSetLight.Provider>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.submitWrapper} onPress={submit}>
              {props.route.params.isEditing ?
              <Text style={styles.submitButton}>Save Changes</Text> :
              <Text style={styles.submitButton}>Submit Project</Text>
            }
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>}
    </View>
  );
}
const styles = StyleSheet.create({
  newProjectListWrapper: {
    backgroundColor: "#161616",
    height: "100%",
    paddingLeft: 20,
    paddingRight: 20
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
  newProjectListTextWrapper: {
    marginBottom: 100,
  },
  detailsHeader: {
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
    color: "#DDE2E4"
  },
  submitButton: {
    // marginTop: 10,
    // marginBottom: 10,
    textAlign: "center",
    fontSize: 17,
    // color: "#DDE2E4",
    backgroundColor: "#DDE2E4",
    width: 250,
    marginTop: 15,
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
  },
  continueButton: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 9,
    color: "#DDE2E4",
  },
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
  },
  input: {
    height: 40,
    paddingLeft: 5,
    paddingBottom: 15,
    marginBottom: 10,
    color: "#a8acad",
    fontSize: 17,
  },
  hr: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginBottom: 20,
    width: "96%",
    alignSelf: "center"
  },
  radio: {
    marginLeft: "2%",
    marginTop: 5
  }
});
export default connect(null, { getProjects, postProjects, editProject })(NewProjectScreenOne);
