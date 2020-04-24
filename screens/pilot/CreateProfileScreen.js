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

function CreateProfileScreen(props, { getPilotProfiles, editPilotProfile }) {
  const navigation = useNavigation();
  console.log("nooooooooo", editPilotProfile);
  console.log("yoooooooo", getPilotProfiles);
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
      currentUserProps.key
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.welcomeText}>
          Welcome to your Profile Page{"\n"}
          {currentUserProps ? (
            <Text>
              {"\n"}
              {currentUserProps.pilotFirstName} {currentUserProps.pilotLastName}
            </Text>
          ) : (
            <Text>Name:</Text>
          )}
        </Text>
        {currentUserProps ? (
          <Text style={styles.h2}>
            {"\n"}
            Location: {currentUserProps.pilotLocation || "ssss"}
          </Text>
        ) : (
          <Text style={styles.h2}>Location:</Text>
        )}

        {currentUserProps ? (
          <Text style={styles.h2}>
            {"\n"}
            Bio: {currentUserProps.airMap}
          </Text>
        ) : (
          <Text style={styles.h2}>Location:</Text>
        )}

        {currentUserProps ? (
          <TextInput
            style={{
              marginTop: 20,
              height: 90,
              borderColor: "gray",
              borderWidth: 1,
            }}
            onChangeText={setPersonalBio}
            value={personalBio}
          />
        ) : (
          <Text style={styles.h2}>Please:</Text>
        )}

        <Button title="Submit" onPress={submit} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 25,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  welcomeText: {
    fontSize: 25,
  },
  h1: {
    fontSize: 15,
    marginBottom: 20,
    marginTop: 50,
  },
  h2: {
    fontSize: 15,
    marginBottom: 20,
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 3,
    height: 30,
    marginBottom: 80,
  },
  dummyText: {
    marginTop: 300,
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
  CreateProfileScreen
);
