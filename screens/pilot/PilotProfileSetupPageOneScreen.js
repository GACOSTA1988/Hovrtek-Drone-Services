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

function PilotProfileSetupPageOneScreen(
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
    faaLicenseExpPlaceHolder = currentUserProps.faaLicenseExpPlace;
    insuredStatusPlaceHolder = currentUserProps.insuredStatus;
    travelStatusPlaceHolder = currentUserProps.travelStatus;
    droneTypePlaceHolder = currentUserProps.droneType;
    airMapPlaceHolder = currentUserProps.airMapPlace;
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
    navigation.navigate("PilotProfileSetupPageTwoScreen");
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
          <TextInput
            style={{
              marginTop: 20,
              height: 90,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 20,
            }}
            onChangeText={setPersonalBio}
            value={personalBio}
          />
        ) : (
          <Text style={styles.bodyText}>
            Please Give Us Brief Summary of Your Work Experience
          </Text>
        )}

        <Text style={styles.bodyText}>
          How Many Years Of Drone Experience Do You Have?
        </Text>
        {currentUserProps ? (
          <TextInput
            placeholder=" 4"
            style={{
              marginTop: 20,
              height: 20,
              borderColor: "gray",
              borderWidth: 1,
              textAlign: "center",
              marginBottom: 20,
            }}
            onChangeText={setYearsOfExperience}
            value={yearsOfExperience}
          />
        ) : (
          <Text style={styles.bodyText}>
            How Many Years Of Drone Experience Do You Have?
          </Text>
        )}
        <Text style={styles.bodyText}>What Drone Model Do You Have?</Text>
        {currentUserProps ? (
          <TextInput
            placeholder=" DJI Mavic 2 Pro"
            style={{
              marginTop: 20,
              height: 20,
              borderColor: "gray",
              borderWidth: 1,
              textAlign: "center",
              marginBottom: 20,
            }}
            onChangeText={setDroneType}
            value={droneType}
          />
        ) : (
          <Text style={styles.bodyText}>What Drone Model Do You Have?</Text>
        )}
        <Text style={styles.bodyText}>Do You Have Valid Insurace?</Text>
        {currentUserProps ? (
          <TextInput
            placeholder=" Yes or No"
            style={{
              marginTop: 20,
              height: 20,
              borderColor: "gray",
              borderWidth: 1,
              textAlign: "center",
              marginBottom: 20,
            }}
            onChangeText={setInsuredStatus}
            value={insuredStatus}
          />
        ) : (
          <Text style={styles.bodyText}>Do You Have Valid Insurace?</Text>
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
