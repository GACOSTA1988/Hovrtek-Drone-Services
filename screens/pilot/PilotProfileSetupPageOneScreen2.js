import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import ProfileImageUploader from "../../components/pilot/ProfileImageUploader";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getPilotProfiles } from "../../actions/index";
import { editPilotProfile } from "../../actions/index";
import * as firebase from "firebase";
import _ from "lodash";
import DroneExperiencePicker from '../../components/DroneExperiencePicker';
import DroneTypePicker from '../../components/DroneTypePicker';
import ValidInsurancePicker from "../../components/ValidInsurancePicker";
import BioPicker from "../../components/BioPicker";


// Context Hook Stuff - passing props to Modals / Pickers
export const PassSetYearsOfExperience = React.createContext()
export const PassYearsOfExperienceState = React.createContext()

export const PassSetDroneType = React.createContext()
export const PassDroneTypeState = React.createContext()
export const PassSetInsuredStatus = React.createContext()
export const PassInsuredStatusState = React.createContext()
export const PassSetPersonalBio = React.createContext()
export const PassPersonalBioState = React.createContext()

function PilotProfileSetupPageOneScreen(
  props,
  { getPilotProfiles, editPilotProfile }
) {
  const navigation = useNavigation();

  useEffect(() => {
    props.getPilotProfiles();
  }, []);

  let userID = null;
  if (firebase.auth().currentUser) {
    userID = firebase.auth().currentUser.uid;
  }



  const list = props.listOfProfiles;
  let currentUserProps = list.find((x) => x.userID === userID);
  if (currentUserProps) {
  }
  let pilotLocationPlaceHolder = "";
  let personalBioPlaceHolder = "";
  let yearsOfExperiencePlaceHolder = "";
  let faaLicenseExpPlaceHolder = "";
  let insuredStatusPlaceHolder = "";
  let travelStatusPlaceHolder = "";
  let droneTypePlaceHolder = "";
  let airMapPlaceHolder = "";
  let fourHundredPlaceHolder = "";
  let profileCompletePlaceHolder = "";
  let profileImageUrlPlaceHolder = "";

  if (currentUserProps) {
    pilotLocationPlaceHolder = currentUserProps.pilotLocation;
    personalBioPlaceHolder = currentUserProps.personalBio;
    yearsOfExperiencePlaceHolder = currentUserProps.yearsOfExperience;
    faaLicenseExpPlaceHolder = currentUserProps.faaLicenseExpPlace;
    insuredStatusPlaceHolder = currentUserProps.insuredStatus;
    travelStatusPlaceHolder = currentUserProps.travelStatus;
    droneTypePlaceHolder = currentUserProps.droneType;
    airMapPlaceHolder = currentUserProps.airMapPlace;
    fourHundredPlaceHolder = currentUserProps.fourHundred;
    profileCompletePlaceHolder = currentUserProps.profileCompletePlaceHolder;
    profileImageUrlPlaceHolder = currentUserProps.profileImageUrl;
  }

  const [profileImageUrl, setProfileImageUrl] = useState(
    profileImageUrlPlaceHolder
  );
  const [personalBio, setPersonalBio] = useState(personalBioPlaceHolder);
  const [yearsOfExperience, setYearsOfExperience] = useState(
    yearsOfExperiencePlaceHolder
  );
  const [faaLicenseExp, setFaaLicenseExp] = useState(faaLicenseExpPlaceHolder);
  const [insuredStatus, setInsuredStatus] = useState(insuredStatusPlaceHolder);
  const [travelStatus, setTravelStatus] = useState(travelStatusPlaceHolder);
  const [droneType, setDroneType] = useState(droneTypePlaceHolder);
  const [airMap, setAirMap] = useState(airMapPlaceHolder);
  const [fourHundred, setFourHundred] = useState(fourHundredPlaceHolder);
  const [profileComplete, setProfileComplete] = useState(
    profileCompletePlaceHolder
  );

  const submit = (e) => {
    e.preventDefault();
    if (personalBio.trim() === "") {
      Alert.alert("Please fill in your personal bio");
      return
    } else if (yearsOfExperience.trim() === '') {

      Alert.alert("Please fill in years of experience");
      navigation.navigate("PilotProfileSetupPageOneScreen");
    } else if (droneType.trim() == "") {
      Alert.alert("Please fill in your Drone type");
      navigation.navigate("PilotProfileSetupPageOneScreen");
    } else if (insuredStatus.trim() === "") {
      Alert.alert("Please fill in your insurance status");
      navigation.navigate("PilotProfileSetupPageOneScreen");
    } else {
      console.log(currentUserProps);
      props.editPilotProfile(
        currentUserProps.pilotLocation,
        personalBio,
        yearsOfExperience,
        faaLicenseExp,
        insuredStatus,
        travelStatus,
        droneType,
        airMap,
        fourHundred,
        currentUserProps.profileComplete,
        profileImageUrl,
        currentUserProps.key
      );
      navigation.navigate("PilotProfileSetupPageTwoScreen");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.welcomeText}>
          Hi!
          {currentUserProps ? (
            <Text style={styles.subText}>
              {"\n"}
              {currentUserProps.pilotFirstName}
              {"\n"}
              {currentUserProps.pilotLastName}
            </Text>
          ) : (
            <Text>Name:</Text>
          )}
        </Text>
        <Text style={styles.bodyText}>
          Please Give Us Brief Summary of Your Work Experience
        </Text>
        {currentUserProps ? (
          <View style={styles.droneExpWrapper}>
          
            <PassSetPersonalBio.Provider value={setPersonalBio}>
              <PassPersonalBioState.Provider value={personalBio}>
                <BioPicker />
              </PassPersonalBioState.Provider>
            </PassSetPersonalBio.Provider>

          </View>
        ) : (
          <Text style={styles.bodyText}>
            Please Give Us Brief Summary of Your Work Experience
          </Text>
        )}

        <Text style={styles.bodyText}>
          How Many Years Of Drone Experience Do You Have?
        </Text>
        {currentUserProps ? (
          <View style={styles.droneExpWrapper}>

            <PassSetYearsOfExperience.Provider value={setYearsOfExperience}>
              <PassYearsOfExperienceState.Provider value={yearsOfExperience}>
                <DroneExperiencePicker/>
              </PassYearsOfExperienceState.Provider>
            </PassSetYearsOfExperience.Provider>

          </View>
        ) : (
          <Text style={styles.bodyText}>
            How Many Years Of Drone Experience Do You Have?
          </Text>
        )}
        <Text style={styles.bodyText}>What Drone Model Do You Have?</Text>
        {currentUserProps ? (
          <View style={styles.droneExpWrapper}>
          <PassSetDroneType.Provider value={setDroneType}>
            <PassDroneTypeState.Provider value={droneType}>
              <DroneTypePicker />
            </PassDroneTypeState.Provider>
          </PassSetDroneType.Provider>
          </View>

        ) : (
          <Text style={styles.bodyText}>What Drone Model Do You Have?</Text>
        )}
        <Text style={styles.bodyText}>Do You Have Valid Insurance?</Text>
        {currentUserProps ? (

          <View style={styles.droneExpWrapper}>
            <PassSetInsuredStatus.Provider value={setInsuredStatus}>
              <PassInsuredStatusState.Provider value={insuredStatus}>
                <ValidInsurancePicker />
              </PassInsuredStatusState.Provider>
            </PassSetInsuredStatus.Provider>
          </View>

        ) : (
          <Text style={styles.bodyText}>Do You Have Valid Insurance?</Text>
        )}

        <Button title="Save and Continue" onPress={submit} />
        <Button title="Back" onPress={() => props.navigation.goBack()} />
        <Text style={styles.dummyText}>Dummy Text</Text>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "lightgray",
    height: "100%",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  welcomeText: {
    marginTop: "15%",
    marginBottom: "10%",
    fontSize: 30,
    color: "darkblue",
    fontWeight: "600",
    textAlign: "center",
  },
  subText: {
    marginTop: "25%",
    marginBottom: "10%",
    fontSize: 30,
    color: "black",
    fontWeight: "600",
    textAlign: "center",
  },
  bodyText: {
    fontSize: 15,
    color: "black",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 3,
    height: 30,
    marginBottom: 80,
  },
  dummyText: {
    marginTop: 200,

    color: 'lightgray'
  },
  droneExpWrapper: {
    alignItems: 'center'
  }

});
function mapStateToProps(state) {
  const listOfProfiles = _.map(
    state.pilotProfilesList.pilotProfilesList,
    (val, key) => {
      return {
        ...val,
        key: key,
      };
    }
  );
  return {
    listOfProfiles,
  };
}

export default connect(mapStateToProps, { getPilotProfiles, editPilotProfile })(
  PilotProfileSetupPageOneScreen
);