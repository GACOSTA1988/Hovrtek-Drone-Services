import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TextInput,
  Alert
} from "react-native";
import ProfileImageUploader from "../../components/pilot/ProfileImageUploader";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getPilotProfiles } from "../../actions/index";
import { editPilotProfile } from "../../actions/index";
import * as firebase from "firebase";
import _ from "lodash";

function PilotProfileWelcomeScreen(
  props,
  { getPilotProfiles, editPilotProfile }
) {
  const navigation = useNavigation();

  getCurrentUserProps();

  useEffect(() => {
    props.getPilotProfiles();
  }, []);

  let userID = null;
  if (firebase.auth().currentUser) {
    userID = firebase.auth().currentUser.uid;
  }

  const [currentUserProps, setCurrentUserProps] = useState(null);

  async function getCurrentUserProps() {
    const currentUserProfile = await props.listOfProfiles.find((x) => x.userID === userID);
    await setCurrentUserProps(currentUserProfile);
    console.log("these are currentUserProps: ", currentUserProps);
    return currentUserProps;
  }

  const submit = (e) => {
    navigation.navigate("PilotProfileSetupPageOneScreen");
  };

  return (
    <View style={styles.container}>
      {currentUserProps && currentUserProps.profileComplete === "Yes" ? (
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
