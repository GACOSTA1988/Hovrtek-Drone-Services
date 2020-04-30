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
import PilotProfileUploader from "../../components/auth/PilotProfileUploader";

// CONTEXT HOOK
export const PassSetProfileImageUrlContext = React.createContext();
export const PassProfileImageUrlState = React.createContext();

function PilotProfileImageUploadScreen(
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
  const [profileComplete, setProfileComplete] = useState("Yes");
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
      profileComplete,
      profileImageUrl,
      currentUserProps.key
    );
    navigation.popToTop();
  };
  return (
    <View style={styles.container}>

        <Text style={styles.welcomeText}>
          Hello!
          {currentUserProps ? (
            <Text style={styles.subText}>
              {"\n"}
            {currentUserProps.pilotFirstName + ' ' +currentUserProps.pilotLastName}
          
              {}
            </Text>
          ) : (
            <Text>Name:</Text>
          )}
        </Text>

        <Text>Please Upload Profile Picture</Text>
        <PassSetProfileImageUrlContext.Provider value={setProfileImageUrl}>
          <PassProfileImageUrlState.Provider value={profileImageUrl}>
            <PilotProfileUploader />
          </PassProfileImageUrlState.Provider>
        </PassSetProfileImageUrlContext.Provider>

        <TouchableOpacity
          style={styles.completeButton}
          onPress={submit}
          title={"Complete Profile"}
        >
          <Text style={styles.completeButtonText}>Complete Profile</Text>
        </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => props.navigation.goBack()}
        title={"Back"}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

        {/* <Button style={styles.backButton} title="Back" onPress={() => props.navigation.goBack()} /> */}

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
  completeButton: {
    width: 250,
    height: 50,
    backgroundColor: "#092455",
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 390,
    marginBottom: 10,
    position: 'absolute'
  },
  completeButtonText: {
    color: "white",
    fontSize: 20,
  },
  welcomeText: {
    marginTop: "5%",
    marginBottom: "10%",
    fontSize: 25,
    color: '#4593e7',
    fontWeight: "600",
    textAlign: "center",
  },
  subText: {
    marginTop: "25%",
    marginBottom: "10%",
    fontSize: 25,
    color: 'black',
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
  backButton: {
    marginTop: 450,
    marginBottom: 10,
    position: 'absolute'
  },
  backButtonText: {
    color: '#0000EE',
    fontSize: 20
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
  PilotProfileImageUploadScreen
);


// marginTop: "5%",
//   marginBottom: "10%",
//     fontSize: 25,
//       color: "darkblue",
//         fontWeight: "600",
//           textAlign: "center",