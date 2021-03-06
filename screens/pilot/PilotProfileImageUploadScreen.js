import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  getPilotProfiles,
  editPilotProfile,
} from "../../actions/pilotProfiles";
import * as firebase from "firebase";
import _ from "lodash";
import ProfileUploader from "../../components/shared/ProfileUploader";
import LoadingScreen from "../../screens/LoadingScreen"
import { APP_STRINGS } from "../../constants/index";

// CONTEXT HOOK
export const PassSetProfileImageUrlContext = React.createContext();
export const PassProfileImageUrlState = React.createContext();

function PilotProfileImageUploadScreen(props) {
  const navigation = useNavigation();
  const { goBack } = props.navigation;

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

  const [ profileImageUrl, setProfileImageUrl ] = useState(
    profileImageUrlPlaceHolder,
  );

  const [loadingActive, setLoadingActive] = useState(false)
  const [imagePreview, setImagePreview] = useState("")
  const [ personalBio, setPersonalBio ] = useState(personalBioPlaceHolder);
  const [ yearsOfExperience, setYearsOfExperience ] = useState(
    yearsOfExperiencePlaceHolder,
  );
  const [ faaLicenseExp, setFaaLicenseExp ] = useState(
    faaLicenseExpPlaceHolder,
  );
  const [ insuredStatus, setInsuredStatus ] = useState(
    insuredStatusPlaceHolder,
  );
  const [ travelStatus, setTravelStatus ] = useState(travelStatusPlaceHolder);
  const [ droneType, setDroneType ] = useState(droneTypePlaceHolder);
  const [ airMap, setAirMap ] = useState(airMapPlaceHolder);
  const [ fourHundred, setFourHundred ] = useState(fourHundredPlaceHolder);
  const [ profileComplete, setProfileComplete ] = useState("Yes");

  const submit = (e) => {
    props.editPilotProfile(
      currentUserProps.pilotLocation,
      currentUserProps.pilotCoordinates,
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
      currentUserProps.key,
    );

    navigation.navigate("Profile", {
      profile: profileImageUrl,
    });
  };

  const pluckImage = (imgUrl = "") => {
    setProfileImageUrl(imgUrl);
  };

  return (
    <View style={styles.container}>
      {loadingActive ?
      <LoadingScreen />
      :
      <View style={styles.uploadContainer}>
        <Text style={styles.text}>Please Upload Profile Picture</Text>
        <PassSetProfileImageUrlContext.Provider value={setProfileImageUrl}>
          <PassProfileImageUrlState.Provider value={profileImageUrl}>
            <ProfileUploader 
              hasSquareImage={true} 
              pluckImage={pluckImage} 
              triggerLoading={() => setLoadingActive(true)} 
              disableLoading={() => setLoadingActive(false)}
              pullURI={(uri) => setImagePreview(uri)}
            />
            {imagePreview.length ? <Image source={{uri: imagePreview}} style={{width: 200, height: 200, borderWidth: 1, borderColor: "#DDE2E4", marginBottom: 20, marginTop: 10}} /> : null}
          </PassProfileImageUrlState.Provider>
        </PassSetProfileImageUrlContext.Provider>

        <TouchableOpacity
          style={styles.completeButton}
          onPress={submit}
          title={"Complete Profile"}
        >
          <Text style={styles.completeButtonText}>Complete Profile</Text>
        </TouchableOpacity>
      </View>
      }
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "#161616"
  },
  uploadContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  completeButton: {
    width: 250,
    height: 50,
    backgroundColor: "#DDE2E4",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  completeButtonText: {
    color: "#161616",
    fontSize: 20,
  },
  text: {
    color: "#DDE2E4"
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
  },
});

function mapStateToProps(state) {
  const listOfProfiles = _.map(
    state.pilotProfilesList.pilotProfilesList,
    (val, key) => {
      return {
        ...val,
        key: key,
      };
    },
  );

  return {
    listOfProfiles,
  };
}

export default connect(mapStateToProps, { getPilotProfiles, editPilotProfile })(
  PilotProfileImageUploadScreen,
);
