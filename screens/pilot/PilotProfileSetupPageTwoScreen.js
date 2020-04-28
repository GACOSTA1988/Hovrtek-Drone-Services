import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TextInput,
} from "react-native";
import ProfileImageUploader from "../../components/pilot/ProfileImageUploader";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getPilotProfiles } from "../../actions/index";
import { editPilotProfile } from "../../actions/index";
import * as firebase from "firebase";
import _ from "lodash";
import DatePicker from '../../components/DatePicker';
import TravelStatusPicker from '../../components/TravelStatusPicker';
import FourHundredPicker from "../../components/FourHundredPicker";
import AirMapPicker from "../../components/AirMapPicker";

// context hook stuff
export const PassSetFaaLicenseContext = React.createContext()
export const PassFaaLicenseState = React.createContext()
export const PassSetTravelStatus = React.createContext()
export const PassTravelStatusState = React.createContext()
export const PassSetFourHundred = React.createContext()
export const PassFourHundredState = React.createContext()
export const PassSetAirMap = React.createContext()
export const PassAirMapState = React.createContext()

function PilotProfileSetupPageTwoScreen(
  props,
  { getPilotProfiles, editPilotProfile }
) {
  const navigation = useNavigation();

  useEffect(() => {
    props.getPilotProfiles();
  }, []);
  let user = firebase.auth().currentUser;
  let userID = user.uid;
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

  if (currentUserProps) {
    pilotLocationPlaceHolder = currentUserProps.pilotLocation;
    personalBioPlaceHolder = currentUserProps.personalBio;
    yearsOfExperiencePlaceHolder = currentUserProps.yearsOfExperience;
    faaLicenseExpPlaceHolder = currentUserProps.faaLicenseExp;
    insuredStatusPlaceHolder = currentUserProps.insuredStatus;
    travelStatusPlaceHolder = currentUserProps.travelStatus;
    droneTypePlaceHolder = currentUserProps.droneType;
    airMapPlaceHolder = currentUserProps.airMap;
    fourHundredPlaceHolder = currentUserProps.fourHundred;
    profileCompletePlaceHolder = currentUserProps.profileCompletePlaceHolder;
  }

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
      currentUserProps.key
    );
    navigation.navigate("PilotProfileImageUploadScreen");
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
          Please Provide FAA License Expiration Date
        </Text>
        {currentUserProps ? (
          <View>
            <PassSetFaaLicenseContext.Provider value={setFaaLicenseExp}>
              <PassFaaLicenseState.Provider value={faaLicenseExp}>
               <DatePicker/>
              </PassFaaLicenseState.Provider>
            </PassSetFaaLicenseContext.Provider>
          </View>
        ) : (
          <Text style={styles.bodyText}>
            Please Provide FAA License Expiration Date
          </Text>
        )}
        <Text style={styles.bodyText}>
          Are You Willing To Travel Out Of State For A Drone Job?
        </Text>
        {currentUserProps ? (
          <View style={styles.pickerButtonWrapper}>
            <PassSetTravelStatus.Provider value={setTravelStatus}>
              <PassTravelStatusState.Provider value={travelStatus}>
                <TravelStatusPicker />
              </PassTravelStatusState.Provider>
            </PassSetTravelStatus.Provider>
          </View>

        ) : (
          <Text style={styles.bodyText}>
            Are You Willing To Tarvel Out Of State For A Drone Job?
          </Text>
        )}

        <Text style={styles.bodyText}>
          Have You Had Experience Flying Over 400FT?
        </Text>
        {currentUserProps ? (


          <View style={styles.pickerButtonWrapper}>
            <PassSetFourHundred.Provider value={setFourHundred}>
              <PassFourHundredState.Provider value={fourHundred}>
                <FourHundredPicker />
              </PassFourHundredState.Provider>
            </PassSetFourHundred.Provider>
          </View>

        ) : (
          <Text style={styles.bodyText}>
            Have You Had Experience Flying Over 400FT?
          </Text>
        )}
        <Text style={styles.bodyText}>Have You Used AirMap?</Text>
        {currentUserProps ? (

          <View style={styles.pickerButtonWrapper}>
            <PassSetAirMap.Provider value={setAirMap}>
              <PassAirMapState.Provider value={airMap}>
                <AirMapPicker />
              </PassAirMapState.Provider>
            </PassSetAirMap.Provider>
          </View>

        ) : (
          <Text style={styles.bodyText}>Have You Used AirMap?</Text>
        )}

        <Button title="Save and Continue" onPress={submit} />
        <Button title="Back" onPress={() => props.navigation.goBack()} />
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
  pickerButtonWrapper: {
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
  PilotProfileSetupPageTwoScreen
);
