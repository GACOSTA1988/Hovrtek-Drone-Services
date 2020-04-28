import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import ProfileImageUploader from "../../components/pilot/ProfileImageUploader";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getPilotProfiles } from "../../actions/index";
import { editPilotProfile } from "../../actions/index";
import * as firebase from "firebase";
import _ from "lodash";
import pic from "../../assets/landingPageImage.png";

function PilotProfileWelcomeScreen(
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
  let isComplete = "";
  let url = "";

  if (currentUserProps) {
    url = currentUserProps.profileImageUrl;
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
    isComplete = currentUserProps.profileComplete;
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
    navigation.navigate("PilotProfileSetupPageOneScreen");
  };
  console.log(url);

  return (
    <View style={styles.container}>
      {currentUserProps && isComplete === "Yes" ? (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={styles.welcomeText}>Hi</Text>
          {currentUserProps ? (
            <View>
              <Image
                style={{ height: 500, width: 500 }}
                source={{
                  uri: url,
                }}
              />
              <Text style={styles.subText}>
                {currentUserProps.pilotFirstName}
                {"\n"}
                {currentUserProps.pilotLastName}
                {"\n"}
                From {currentUserProps.pilotLocation}
                {"\n"}
                {/* source {currentUserProps.profileImageUrl} */}
              </Text>
              <Text style={styles.bodyText}>Welcome To Your Profile</Text>
              <Text style={styles.bodyText}>
                Personal Bio: {currentUserProps.personalBio}
                {"\n"}
                Drone Type: {currentUserProps.droneType}
                {"\n"}
                Years of Experience: {currentUserProps.yearsOfExperience}
                {"\n"}
                FAA License Expiration: {currentUserProps.faaLicenseExp}
                {"\n"}
                Travel for work? {currentUserProps.travelStatus}
                {"\n"}
                Insured: {currentUserProps.insuredStatus}
                {"\n"}
                Have you used AirMap: {currentUserProps.airMap}
                {"\n"}
                Have you flown over 400FT? {currentUserProps.fourHundred}
              </Text>
            </View>
          ) : (
            <Text></Text>
          )}
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={styles.welcomeText}>Hi</Text>
          {currentUserProps ? (
            <View>
              <Text style={styles.subText}>
                {currentUserProps.pilotFirstName}
                {"\n"}
                {currentUserProps.pilotLastName}
                {"\n"}
                From {currentUserProps.pilotLocation}
              </Text>
              <Text style={styles.bodyText}>Welcome To Your Profile</Text>
            </View>
          ) : (
            <Text style={styles.h2}>Location:</Text>
          )}

          <Button
            title="Start Pilot Profile"
            onPress={() =>
              props.navigation.navigate("PilotProfilePageSetupPageOneScreen")
            }
          />
        </ScrollView>
      )}
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
    marginTop: "25%",

    fontSize: 30,
    color: "darkblue",
    fontWeight: "600",
    textAlign: "center",
  },
  subText: {
    marginBottom: "10%",
    marginTop: "5%",
    fontSize: 30,
    color: "black",
    fontWeight: "600",
    textAlign: "center",
  },
  bodyText: {
    marginTop: "5%",
    marginBottom: "10%",
    fontSize: 20,
    color: "black",
    fontWeight: "600",
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderRadius: 3,
    height: 30,
    marginBottom: 80,
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
    }
  );
  return {
    listOfProfiles,
  };
}

export default connect(mapStateToProps, { getPilotProfiles, editPilotProfile })(
  PilotProfileWelcomeScreen
);
