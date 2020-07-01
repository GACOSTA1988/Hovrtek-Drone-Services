import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  getPilotProfiles,
  editPilotProfile,
} from "../../actions/pilotProfiles";
import * as firebase from "firebase";
import _ from "lodash";
import DroneExperiencePicker from "../../components/pilot/DroneExperiencePicker";
import DroneTypePicker from "../../components/pilot/DroneTypePicker";
import BioPicker from "../../components/pilot/BioPicker";
import DatePicker from "../../components/pilot/DatePicker";
import { APP_STRINGS } from '../../constants/index';
import InsuranceRadio from "../../components/pilot/InsuranceRadio";

// Context Hook Stuff - passing props to Modals / Pickers
export const PassSetPersonalBio = React.createContext();
export const PassPersonalBioState = React.createContext();
export const PassSetYearsOfExperience = React.createContext();
export const PassYearsOfExperienceState = React.createContext();

export const PassSetFaaLicenseExp = React.createContext();
export const PassFaaLicenseExpState = React.createContext();

export const PassSetDroneType = React.createContext();
export const PassDroneTypeState = React.createContext();
export const PassSetInsuredStatus = React.createContext();
export const PassInsuredStatusState = React.createContext();

const {
  briefSummary,
  yearsExperience,
  modelDrone,
  insurance,
  saveAndContinue,
} = APP_STRINGS;


function PilotProfileSetupPageOneScreen(props) {
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
    faaLicenseExpPlaceHolder = currentUserProps.faaLicenseExp;
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
  const [location, setLocation] = useState(pilotLocationPlaceHolder);

  const [isModalActive, setIsModalActive] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (personalBio.trim() === "") {
      Alert.alert("Please fill in your personal bio");
      return;
    } else {
      props.editPilotProfile(
        location,
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
      <ScrollView contentContainerStyle={[{ flexGrow: 1, backgroundColor: "#161616",  }, isModalActive ? styles.opaque : '']}>
        <Text style={styles.bodyText}>{briefSummary}</Text>
          <View style={styles.droneExpWrapper}>
             <PassSetPersonalBio.Provider value={setPersonalBio}>
              <PassPersonalBioState.Provider value={personalBio}>
            <BioPicker setIsModalActive={setIsModalActive}/>
               </PassPersonalBioState.Provider>
            </PassSetPersonalBio.Provider>
          </View>
        <Text style={styles.bodyText}>{yearsExperience}</Text>
          <View style={styles.droneExpWrapper}>
            <PassSetYearsOfExperience.Provider value={setYearsOfExperience}>
              <PassYearsOfExperienceState.Provider value={yearsOfExperience}>
                <DroneExperiencePicker setIsModalActive={setIsModalActive}/>
              </PassYearsOfExperienceState.Provider>
            </PassSetYearsOfExperience.Provider>
          </View>
        <Text style={styles.bodyText}>{modelDrone}</Text>
        <View style={styles.droneExpWrapper}>
          <PassSetDroneType.Provider value={setDroneType}>
            <PassDroneTypeState.Provider value={droneType}>
              <DroneTypePicker setIsModalActive={setIsModalActive}/>
            </PassDroneTypeState.Provider>
          </PassSetDroneType.Provider>
        </View>
        <Text style={styles.bodyText}>Please Provide FAA License Expiration Date</Text>
        <View style={styles.droneExpWrapper}>
          <PassSetFaaLicenseExp.Provider value={setFaaLicenseExp}>
            <PassFaaLicenseExpState.Provider value={faaLicenseExp}>
              <DatePicker setIsModalActive={setIsModalActive}/>
            </PassFaaLicenseExpState.Provider>
          </PassSetFaaLicenseExp.Provider>
        </View>
        <View style={styles.radioWrapper}>
          <Text style={styles.radioText}>{insurance}</Text>
          <InsuranceRadio
            setInsuredStatus={setInsuredStatus}
            insuredStatus={insuredStatus}
          />
        </View>
        <View style={styles.radioWrapper}>
          <Text style={styles.radioText}>Location:</Text>
          <TextInput
            value={location}
            onChangeText={setLocation}
            style={{color: "white"}}
            placeholderTextColor="#DDE2E4"
          />
        </View>
        <View style={styles.centerButton}>
          <TouchableOpacity style={styles.saveAndContinueWrapper} onPress={submit} title={saveAndContinue}>
            <Text style={styles.saveAndContinueText}>{saveAndContinue}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#161616",
    height: "100%",
    paddingTop: "15%"
  },
  centerButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  saveAndContinueWrapper: {
    width: 170,
    height: 50,
    borderWidth: 2,
    borderColor: "#DDE2E4",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  saveAndContinueText: {
    fontSize: 15,
    color: "#DDE2E4",
  },
  subText: {
    marginTop: "25%",
    marginBottom: "10%",
    fontSize: 25,
    color: "#DDE2E4",
    fontWeight: "600",
    textAlign: "center",
  },
  bodyText: {
    fontSize: 15,
    color: "#DDE2E4",
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
    color: "#DDE2E4",
  },
  droneExpWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  radioWrapper: {
    alignSelf: "center",
    marginBottom: 20
  },
  radioText: {
    marginBottom: 7,
    color: "#DDE2E4"
  },
  opaque: {
    opacity: 0.2
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
