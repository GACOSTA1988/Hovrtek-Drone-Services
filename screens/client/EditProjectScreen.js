import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { editProject } from "../../actions/projects";
import { connect } from "react-redux";
import LoadingScreen from "../../screens/LoadingScreen"
import Geocoder from "react-native-geocoding";
import {API_KEY} from "../../geocoder"
import { APP_STRINGS } from "../../constants/index";
Geocoder.init(API_KEY);

const {
  slide
} = APP_STRINGS;

function EditProjectScreen(props, { editProject }) {
  const { projectDetails } = props.route.params;
  const { fromList } = props.route.params;
  const navigation = useNavigation();

  const [ location, setLocation ] = useState(projectDetails.location);
  const [ date, setDate ] = useState(projectDetails.date);
  const [ recording, setRecording ] = useState(projectDetails.recording);
  const [loadingActive, setLoadingActive] = useState(false)

  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);
  const [isRecordingModalVisible, setIsRecordingModalVisible] = useState(false);


  const openLocationModal = () => {
    setIsLocationModalVisible(true);
  };

  const closeLocationModal = () => {
    setIsLocationModalVisible(false);
  };

  const openDateModal = () => {
    setIsDateModalVisible(true);
  };

  const closeDateModal = () => {
    setIsDateModalVisible(false);
  };

  const openRecordingModal = () => {
    setIsRecordingModalVisible(true);
  };

  const closeRecordingModal = () => {
    setIsRecordingModalVisible(false);
  };

  async function submit(){
    setLoadingActive(true)
    let locationCoordinates
    if(location != projectDetails.location){
      let locationCoordinatesResponse = await convertLocation(location)
      locationCoordinates = locationCoordinatesResponse
    } else {
      locationCoordinates = projectDetails.locationCoordinates
    }
    projectDetails.location = location;
    projectDetails.date = date;
    projectDetails.recording = recording;
    props.editProject(location, date, recording, locationCoordinates, projectDetails.key);
    fromList ? navigation.navigate("ProjectListScreen") :
    navigation.navigate("ProjectDetailsScreen", { projectDetails: projectDetails
    });
    setLoadingActive(false)
  };

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

  return (
    <View style={loadingActive ? styles.loadingWrapper : styles.container}>
       {loadingActive ?
        <LoadingScreen />
        :
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.ProjectText}> </Text>
            <View style={styles.saveButton}>
              <TouchableOpacity hitSlop={styles.hitSlop} onPress={submit}>
                <Text style={styles.saveText}>Save changes</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.detailsHeader}>Where:</Text>

          <TouchableOpacity style={styles.button} onPress={openLocationModal} title={openLocationModal}>
        <Text style={styles.buttonText}>Project Location</Text>
      </TouchableOpacity>
          <Modal
        transparent={true}
        visible={isLocationModalVisible}
        animationType={slide}
        onRequestClose={closeLocationModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.modalText}>Project Location</Text>
          </View>

          <TextInput
          multiline={true}
          style={styles.input}
          onChangeText={setLocation}
          autoFocus={true}
          value={location}
        />

<View styles={styles.cancelWrapper}>
            <TouchableOpacity style={styles.editButton} onPress={closeLocationModal}>
              <Text style={styles.editText}>{APP_STRINGS.choose}</Text>
            </TouchableOpacity> 
          </View>
        </View>
      </Modal>

          <Text style={styles.detailsHeader}>When:</Text>
          <TouchableOpacity style={styles.button} onPress={openDateModal} title={openDateModal}>
        <Text style={styles.buttonText}>Project Date</Text>
      </TouchableOpacity>
          <Modal
        transparent={true}
        visible={isDateModalVisible}
        animationType={slide}
        onRequestClose={closeDateModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.modalText}>Project Recording</Text>
          </View>

          <TextInput
          multiline={true}
          style={styles.input}
          onChangeText={setDate}
          autoFocus={true}
          value={date}
        />

<View styles={styles.cancelWrapper}>
            <TouchableOpacity style={styles.editButton} onPress={closeDateModal}>
              <Text style={styles.editText}>{APP_STRINGS.choose}</Text>
            </TouchableOpacity> 
          </View>
        </View>
      </Modal>
          <Text style={styles.detailsHeader}>What:</Text>
          <TouchableOpacity style={styles.button} onPress={openRecordingModal} title={openRecordingModal}>
        <Text style={styles.buttonText}>Project Recording</Text>
      </TouchableOpacity>
          <Modal
        transparent={true}
        visible={isRecordingModalVisible}
        animationType={slide}
        onRequestClose={closeRecordingModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.modalText}>Project Recording</Text>
          </View>

          <TextInput
          multiline={true}
          style={styles.input}
          onChangeText={setRecording}
          autoFocus={true}
          value={recording}
        />

<View styles={styles.cancelWrapper}>
            <TouchableOpacity style={styles.editButton} onPress={closeRecordingModal}>
              <Text style={styles.editText}>{APP_STRINGS.choose}</Text>
            </TouchableOpacity> 
          </View>
        </View>
      </Modal>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#161616",
    height: "100%"
  },
  loadingWrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  KeyboardAwareScrollView: {
    flex: 1,
    height: "120%",
  },
  editProjectCard: {
    borderRadius: 15,
    backgroundColor: "#161616",
    marginBottom: 15,
    padding: 20,
  },
  editProjectText: {
    fontSize: 30,
    color: "#161616",
    fontWeight: "600",
    textAlign: "center",
  },
  labelText: {
    fontSize: 20,
    color: "#161616",
    fontWeight: "500",
    textAlign: "center",
  },
  input: {
    marginTop: 10,
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 2,
    color: "red",
  },
  submitButton: {
    width: 220,
    height: 60,
    borderWidth: 2,
    borderColor: "#161616",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  submitButtonWrapper: {
    alignItems: "center",
  },
  submitButtonText: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 30,
    color: "#161616",
  },
  backButton: {
    marginTop: 20,
    marginBottom: 40,
    width: 60,
    height: 30,
    backgroundColor: "#161616",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    color: "white",
    textAlign: "center",
  },
  backButtonWrapper: {
    alignItems: "center",
  },
  ProjectText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#3E90D0",
    marginBottom: 20,
    marginTop: 10,
    zIndex: 0
  },
  DetailsText: {
    marginBottom: 20,
    fontSize: 17,
    color: "grey",
    fontWeight: "800",
  },
  detailsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#DDE2E4"
  },
  saveText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#161616",
  },
  saveButton: {
    position: "absolute",
    right: "6%",
    top: "8%",
    backgroundColor: "#DDE2E4",
    padding: 7,
    borderRadius: 5,
    zIndex: 1,
  },
  modalContainer: {
    height: 330,
    justifyContent: "center",
    paddingTop: 10,
    padding: 10,
    backgroundColor: "#161616",
    marginTop: 200,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    borderColor: "#DDE2E4",
    borderWidth: 2
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    height: 50,
    width: 150,
  },
  modalText: {
    fontSize: 20,
    color: "#DDE2E4"
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: "#DDE2E4",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: "#161616",
  },
  input: {
    marginTop: 20,
    height: 90,
    borderColor: "#DDE2E4",
    borderWidth: 1,
    marginBottom: 20,
    marginHorizontal: 20,
    color: "#DDE2E4",
    padding: 5,
  },
  editText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#161616",
  },
  editButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#DDE2E4",
    padding: 7,
    borderRadius: 5,
    margin: 20,
    height: '30%',
  },
});

export default connect(null, { editProject })(EditProjectScreen);