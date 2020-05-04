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
import { AntDesign } from "@expo/vector-icons";

function PilotProfileWelcomeScreen(
  props,
  { getPilotProfiles, editPilotProfile }
) {
  const navigation = useNavigation();

  // getCurrentUserProps();

  let passedProps = props.route.params;

  useEffect(() => {
    props.getPilotProfiles();
  }, []);


  const [profileDetails, setCurrentUserProps] = useState(null);

  let user = null;
  let profile = null;
  if (firebase.auth().currentUser) {
    user = firebase.auth().currentUser;
    if (user.photoURL === "P") {
      profile = props.listOfPilotProfiles.find((x) => x.userID === user.uid);
      try {
        if ((!profileDetails && profile) || (profileDetails && profileDetails != profile)) {
          setCurrentUserProps(profile);
          console.log("profileDetails", profileDetails);
          passedProps = profile;
        }
      } catch (error) {
        console.log("ERROR: ", error.message);
        Alert.alert("User page unavailable");
        props.navigation.navigate("JobListScreen");
      }
    } else if (passedProps && profileDetails != passedProps) {
      setCurrentUserProps(passedProps);
    }
  }

  const submit = (e) => {
    navigation.navigate("PilotProfileSetupPageOneScreen");
  };

  return (
    <View style={styles.container}>
      {user && profileDetails ? (
        <View>
          {profileDetails.profileComplete === "Yes" ? (
            <ScrollView style={{ width: "100%" }}>
              <Image source={princePic01} style={styles.backgroundImage} />
              <Image
                style={styles.profilePic}
                source={{
                  uri: profileDetails.profileImageUrl,
                }}
              />
              <View style={{ flexDirection: "row", display: "flex" }}>
                <Text style={styles.nameText}>
                  {profileDetails.pilotFirstName} {profileDetails.pilotLastName}
                </Text>
                {user.photoURL === "P" ? (
                  <TouchableOpacity
                  onPress={() =>
                    navigation.push("PilotProfilePageSetupPageOneScreen")
                  }
                  >
                  <AntDesign
                    name="edit"
                    size={30}
                    color="darkblue"
                    style={{ marginLeft: 40, marginTop: 25 }}
                  />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.chatButton}
                    onPress={() =>
                      props.navigation.navigate("ChatScreen",
                      {
                        ...profileDetails
                      }
                    )}
                  >
                    <Text style={styles.chatText}>Chat</Text>
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.locationText}>Location: {profileDetails.pilotLocation}</Text>
              <Text style={styles.specTitle}>Bio:</Text>
              <Text style={{
                  fontSize: 15,
                  color: "black",
                  // fontWeight: "450",
                  marginLeft: "2%",
                  marginTop: "1%",
                }}
              >
                {profileDetails.personalBio}
              </Text>
              <View style={styles.specView}>
                <Text style={styles.specTitle}>Drone Model:</Text>
                <Text style={styles.specs}>{profileDetails.droneType}</Text>
              </View>
              <View style={styles.specView}>
                <Text style={styles.specTitle}>Years Of Experience:</Text>
                <Text style={styles.specs}>{profileDetails.yearsOfExperience}</Text>
              </View>
              <View style={styles.specView}>
                <Text style={styles.specTitle}>License Expiration Date:</Text>
                <Text style={styles.specs}>{profileDetails.faaLicenseExp}</Text>
              </View>
              <View style={styles.specView}>
                <Text style={styles.specTitle}>Willing To Travel:</Text>
                <Text style={styles.specs}>{profileDetails.travelStatus}</Text>
              </View>
              <View style={styles.specView}>
                <Text style={styles.specTitle}>Insured:</Text>
                <Text style={styles.specs}>{profileDetails.insuredStatus}</Text>
              </View>
              <View style={styles.specView}>
                <Text style={styles.specTitle}>Experience with Air Map:</Text>
                <Text style={styles.specs}>{profileDetails.airMap}</Text>
              </View>
              <View style={styles.specView}>
                <Text style={styles.specTitle}>Able to Fly over 400 FT:</Text>
                <Text style={styles.specs}>{profileDetails.fourHundred}</Text>
              </View>
            </ScrollView>
          ) : (
            <ScrollView style={{ width: "100%" }}>
              <Image
                source={princePic01}
                style={styles.backgroundImageStartingPage}
              />
              {user.photoURL === "P" ? (
                <View>
                  <Text style={styles.welcomeText}>
                  Welcome to Hovrtek
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: 40
                    }}
                    >
                    <Text style={styles.nameText}>
                    {profileDetails.pilotFirstName}{" "}{profileDetails.pilotLastName}
                    </Text>
                  </View>
                  <Button
                    title="Start Pilot Profile"
                    onPress={() =>
                      props.navigation.navigate("PilotProfilePageSetupPageOneScreen")
                    }
                  />
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 40,
                  }}
                  >
                  <Text style={styles.nameText}>
                  {profileDetails.pilotFirstName}{" "}{profileDetails.pilotLastName}
                  </Text>
                  <Text style={styles.welcomeText}>
                  This pilot has not created their profile yet
                  </Text>
                </View>
              )}
            </ScrollView>
          )}
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    backgroundColor: "lightgray",
    height: "100%",
    width: "100%",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  welcomeText: {
    marginTop: "40%",
    textAlign: "center",
    fontSize: 30
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
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
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
  backgroundImageStartingPage: {
    width: "100%",
    height: "40%",
    position: "absolute",
  },
  profilePic: {
    height: 100,
    width: 100,
    borderRadius: 90,
    alignItems: "center",
    marginTop: "17%",
    marginLeft: 20,
    elevation: 8,
    borderWidth: 4,
    borderColor: "#092455",
  },
  specs: {
    fontSize: 20,
    color: "black",
    fontWeight: "200",
    marginLeft: "2%",
    marginTop: 8
  },
  specTitle: {
    fontSize: 20,
    color: "black",
    fontWeight: "400",
    marginLeft: "2%",
    marginTop: 8
  },
  specView: {
    flexDirection: "row",
    display: "flex"
  },
  chatText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white"
  },
  chatButton: {
    position: 'absolute',
    right: 0,
    backgroundColor: "#092455",
    padding: 7,
    borderRadius: 5
  }

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
  console.log("THESE ARE PILOT PROFILES", listOfPilotProfiles);
  return {
    listOfPilotProfiles
  };
}

export default connect(mapStateToProps, { getPilotProfiles, editPilotProfile })(
  PilotProfileWelcomeScreen
);
