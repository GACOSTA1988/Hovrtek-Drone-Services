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
  Image
} from "react-native";
import ProfileImageUploader from "../../components/pilot/ProfileImageUploader";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getPilotProfiles } from "../../actions/index";
import { editPilotProfile } from "../../actions/index";
import * as firebase from "firebase";
import _ from "lodash";
import pic from "../../assets/landingPageImage.png";


function PilotProfileWelcomeScreen(props, { getPilotProfiles }) {


  useEffect(() => {
    props.getPilotProfiles();
  }, []);

  const [profileDetails, setProfileDetails] = useState(null);

  let user = null;
  if (firebase.auth().currentUser) {
    user = firebase.auth().currentUser;
  }

  try {
    if (!profileDetails) {
      setProfileDetails(props.listOfPilotProfiles.find((x) => x.userID === user.uid));
      console.log("profile details: ", profileDetails);
    }
  } catch (error) {
    console.log("ERROR: ", error.message);
    Alert.alert("User page unavailable");
    props.navigation.navigate("JobListScreen");
  }

  return (
    <View style={styles.container}>
      {profileDetails && profileDetails.profileComplete === "Yes" ? (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={styles.welcomeText}>Hi</Text>
          {profileDetails ? (
            <View>
              <Image
                style={{
                  height: 90,
                  width: 90,
                  borderRadius: 90,
                  alignItems: "center",
                  marginLeft: "35%",
                }}
                source={{
                  uri: url,
                }}
              />
              <Text style={styles.subText}>
                {profileDetails.pilotFirstName}
                {"\n"}
                {profileDetails.pilotLastName}
                {"\n"}
                From {profileDetails.pilotLocation}
                {"\n"}
                {/* source {profileDetails.profileImageUrl} */}
              </Text>
              <Text style={styles.bodyText}>Welcome To Your Profile</Text>
              <Text style={styles.bodyText}>
                Personal Bio: {profileDetails.personalBio}
                {"\n"}
                Drone Type: {profileDetails.droneType}
                {"\n"}
                Years of Experience: {profileDetails.yearsOfExperience}
                {"\n"}
                FAA License Expiration: {profileDetails.faaLicenseExp}
                {"\n"}
                Travel for work? {profileDetails.travelStatus}
                {"\n"}
                Insured: {profileDetails.insuredStatus}
                {"\n"}
                Have you used AirMap: {profileDetails.airMap}
                {"\n"}
                Have you flown over 400FT? {profileDetails.fourHundred}
              </Text>
            </View>
          ) : (
            <Text></Text>
          )}
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={styles.welcomeText}>Hi</Text>
          {profileDetails ? (
            <View>
              <Text style={styles.subText}>
                {profileDetails.pilotFirstName}
                {"\n"}
                {profileDetails.pilotLastName}
                {"\n"}
                From {profileDetails.pilotLocation}
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
  const listOfPilotProfiles = _.map(
    state.pilotProfilesList.pilotProfilesList,
    (val, key) => {
      return {
        ...val,
        key: key,
      };
    }
  );
  return {
    listOfPilotProfiles,
  };
}

export default connect(mapStateToProps, { getPilotProfiles, editPilotProfile })(
  PilotProfileWelcomeScreen
);
