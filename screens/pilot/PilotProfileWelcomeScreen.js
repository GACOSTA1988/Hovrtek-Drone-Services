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
import princePic01 from "../../assets/princePic01.jpg";

function PilotProfileWelcomeScreen(props, { getPilotProfiles }) {

  useEffect(() => {
    props.getPilotProfiles();
  }, []);

  const [profileDetails, setProfileDetails] = useState(null);
  const [profileComplete, setProfileComplete] = useState(true);

  let user = null;
  let profile = null;

  if (firebase.auth().currentUser) {
    user = firebase.auth().currentUser;
    profile = props.listOfPilotProfiles.find((x) => x.userID === user.uid);
    try {
      if (!profileDetails) {
        console.log("profile details is null");
        if (profile) {
          setProfileDetails(props.listOfPilotProfiles.find((x) => x.userID === user.uid));
        }
      }
    } catch(error) {
      console.log("ERROR: ", error.message);
      Alert.alert("User page unavailable");
      props.navigation.navigate("JobListScreen");
    }
  }

  return (
    <View style={styles.container}>
      { (profileDetails && profileComplete === true) ? (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Image source={princePic01} style={styles.backgroundImage} />
          <Image
            style={{
              height: 100,
              width: 100,
              borderRadius: 90,
              alignItems: "center",
              marginTop: "17%",
              marginLeft: 20,
              elevation: 8,
              borderWidth: 4,
              borderColor: "#092455",
            }}
            source={{
              uri: profileDetails.profileImageUrl,
            }}
          />
          {profileDetails ? (

            <View>
              <Text style={styles.nameText}>
                {profileDetails.pilotFirstName}{" "}
                {profileDetails.pilotLastName}
              </Text>
              <Text style={styles.locationText}>
                Location: {profileDetails.pilotLocation}
              </Text>

              <Text
                style={{
                  fontSize: 20,
                  color: "black",
                  fontWeight: "450",
                  marginLeft: "2%",
                  marginTop: "4%",
                }}

              >
                Bio:
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: "black",
                  // fontWeight: "450",
                  marginLeft: "2%",
                  marginTop: "1%",
                }}
              >
                {profileDetails.personalBio}

              </Text>
              <View
                style={{
                  flexDirection: "row",
                  display: "flex",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "black",
                    fontWeight: "450",
                    marginLeft: "2%",
                    marginTop: 8,
                  }}
                >
                  Drone Model:
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: "black",
                    fontWeight: "200",
                    marginLeft: "2%",
                    marginTop: 8,
                  }}
                >
                  {profileDetails.droneType}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  display: "flex",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "black",
                    fontWeight: "450",
                    marginLeft: "2%",
                    marginTop: 8,
                  }}
                >
                  Year Of Experience:
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: "black",
                    fontWeight: "200",
                    marginLeft: "2%",
                    marginTop: 8,
                  }}
                >
                  {profileDetails.yearsOfExperience}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  display: "flex",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "black",
                    fontWeight: "450",
                    marginLeft: "2%",
                    marginTop: 8,
                  }}
                >
                  License Expiration Date:
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: "black",
                    fontWeight: "200",
                    marginLeft: "2%",
                    marginTop: 8,
                  }}
                >
                  {profileDetails.faaLicenseExp}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  display: "flex",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "black",
                    fontWeight: "450",
                    marginLeft: "2%",
                    marginTop: 8,
                  }}
                >
                  Willing To Travel:
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: "black",
                    fontWeight: "200",
                    marginLeft: "2%",
                    marginTop: 8,
                  }}
                >
                  {profileDetails.travelStatus}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  display: "flex",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "black",
                    fontWeight: "450",
                    marginLeft: "2%",
                    marginTop: 8,
                  }}
                >
                  Insured:
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: "black",
                    fontWeight: "200",
                    marginLeft: "2%",
                    marginTop: 8,
                  }}
                >
                  {profileDetails.insuredStatus}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  display: "flex",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "black",
                    fontWeight: "450",
                    marginLeft: "2%",
                    marginTop: 8,
                  }}
                >
                  Experience with Air Map:
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: "black",
                    fontWeight: "200",
                    marginLeft: "2%",
                    marginTop: 8,
                  }}
                >
                  {profileDetails.airMap}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  display: "flex",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "black",
                    fontWeight: "450",
                    marginLeft: "2%",
                    marginTop: 8,
                  }}
                >
                  Able to Fly over 400 FT:
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: "black",
                    fontWeight: "200",
                    marginLeft: "2%",
                    marginTop: 8,
                  }}
                >
                  {profileDetails.fourHundred}
                </Text>
              </View>
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

              <Text style={styles.nameText}>
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

  nameText: {
    marginTop: "5%",
    fontSize: 30,
    color: "black",
    fontWeight: "600",
    textAlign: "left",
    marginLeft: "2%",
  },
  locationText: {
    fontSize: 20,
    color: "black",
    fontWeight: "300",
    textAlign: "left",
    marginLeft: "2%",
  },

  subHeaderText: {
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
  backgroundImage: {
    width: "100%",
    height: "20%",
    position: "absolute",
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
    listOfPilotProfiles
  };
}

export default connect(mapStateToProps, { getPilotProfiles, editPilotProfile })(
  PilotProfileWelcomeScreen
);
