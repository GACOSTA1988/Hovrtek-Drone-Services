import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  getPilotProfiles,
  editPilotProfile,
} from "../../actions/pilotProfiles";
import * as firebase from "firebase";
import _ from "lodash";

import DatePicker from "../../components/pilot/DatePicker";
import TravelStatusRadio from "../../components/pilot/TravelStatusRadio";
import AirMapRadio from "../../components/pilot/AirMapRadio";
import FourHundredRadio from "../../components/pilot/FourHundredRadio";

// context hook stuff
export const PassSetFaaLicenseContext = React.createContext();
export const PassFaaLicenseState = React.createContext();
export const PassSetTravelStatus = React.createContext();
export const PassTravelStatusState = React.createContext();
export const PassSetFourHundred = React.createContext();
export const PassFourHundredState = React.createContext();
export const PassSetAirMap = React.createContext();
export const PassAirMapState = React.createContext();

function PilotProfileSetupPageTwoScreen(props) {
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
  let profileImageUrlPlaceHolder = "";

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
    profileImageUrlPlaceHolder = currentUserProps.profileImageUrl;
  }

  const [isModalActive, setIsModalActive] = useState(false);

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
    if (faaLicenseExp === "") {
      Alert.alert("Please fill in the expiration date of your FAA License");
      return;
    } else {
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
        currentUserProps.key,
      );
      navigation.navigate("PilotProfileImageUploadScreen");
    }
  };
  return (
    <View style={[styles.container, isModalActive ? styles.opaque : '']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.bodyText}>
          Please Provide FAA License Expiration Date
        </Text>
        {currentUserProps ? (
          <View>
                <DatePicker
                  setFaaLicenseExp={setFaaLicenseExp}
                  faaLicenseExp={faaLicenseExp}
                  setIsModalActive={setIsModalActive}
                />
          </View>
        ) : (
          <Text style={styles.bodyText}>
            Please Provide FAA License Expiration Date
          </Text>
        )}

        {currentUserProps && (
          <View style={styles.radioWrapper}>
            <Text style={styles.radioText}>
              Are You Willing To Travel Out Of State For A Drone Job?
            </Text>
            <TravelStatusRadio
              setTravelStatus={setTravelStatus}
              travelStatus={travelStatus}
            />
          </View>
        )}

        {currentUserProps && (
          <View style={styles.radioWrapper}>
            <Text style={styles.radioText}>
              Have You Had Experience Flying Over 400FT?
            </Text>
            <FourHundredRadio
              setFourHundred={setFourHundred}
              fourHundred={fourHundred}
            />
          </View>
        )}

        {currentUserProps && (
          <View style={styles.radioWrapper}>
            <Text style={styles.radioText}>Have You Used AirMap?</Text>
            <AirMapRadio setAirMap={setAirMap} airMap={airMap} />
          </View>
        )}

        <View style={styles.centerButton}>
            <TouchableOpacity
              // style={styles.submitButton}
              onPress={submit}
              title={"Save and Continue"}
              style={styles.saveAndContinueWrapper}
            >
              <Text style={styles.saveAndContinueText}>Save and Continue</Text>
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
    marginTop: 50,
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
  pickerButtonWrapper: {
    alignItems: "center",
  },
  radioWrapper: {
    alignSelf: "center",
    marginBottom: 25,
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
  PilotProfileSetupPageTwoScreen
);
