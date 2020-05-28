import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  getPilotProfiles,
  editPilotProfile,
} from "../../actions/pilotProfiles";
import * as firebase from "firebase";
import _ from "lodash";
import princePic01 from "../../assets/princePic01.jpg";
import { AntDesign } from "@expo/vector-icons";
import { APP_STRINGS } from "../../constants";

const {
  abilityOver400Ft,
  chat,
  droneModel,
  experienceAirMap,
  insured,
  licenseExpirationDate,
  willingToTravel,
  yearsOfExperience,
  pilotProfileNotCreated,
  startPilotProfile,
} = APP_STRINGS;

function PilotProfileWelcomeScreen(
  props,
  // { getPilotProfiles, editPilotProfile },
) {
  const navigation = useNavigation();
  const { route } = props;

  // console.log("PROPS ", JSON.stringify(props, null, 4));

  let user = null;
  let profile = null;
  let passedProps = route.params;
  const [ profileDetails, setCurrentUserProps ] = useState(null);
  // console.log("passedProps", JSON.stringify(passedProps, null, 4));

  // useEffect(() => {
  //   // props.getPilotProfiles();
  // }, []);

  const renderProfileStatsItem = (titleString = "", specsValue = "") => {
    return (
      <View style={styles.specView}>
        <Text style={styles.specTitle}>{titleString}</Text>
        <Text style={styles.specs}>{specsValue}</Text>
      </View>
    );
  };

  const renderIcon = () => {
    return (
      <AntDesign
        name="edit"
        size={30}
        color="darkblue"
        style={{ marginLeft: 40, marginTop: 25 }}
      />
    );
  };

  if (firebase.auth().currentUser) {
    user = firebase.auth().currentUser;
    if (user.photoURL === "P") {
      profile = props.listOfPilotProfiles.find((x) => x.userID === user.uid);
      try {
        if (
          (!profileDetails && profile) ||
          (profileDetails && profileDetails != profile)
        ) {
          setCurrentUserProps(profile);
          passedProps = profile;
        }
      } catch (error) {
        Alert.alert("User page unavailable");
        props.navigation.navigate("JobListScreen");
      }
    } else if (passedProps && profileDetails != passedProps) {
      setCurrentUserProps(passedProps);
    }
  }

  // const submit = (e) => {
  //   navigation.navigate("PilotProfileSetupPageOneScreen");
  // };

  if (!user || !profileDetails) {
    return <View />;
  }

  const profileImg = {
    uri: profileDetails.profileImageUrl,
  };
  return (
    <View style={styles.container}>
      <View>
        {profileDetails.profileComplete === "Yes" ? (
          <ScrollView style={styles.scrollViewStyle}>
            <Image source={princePic01} style={styles.backgroundImage} />
            <Image style={styles.profilePic} source={profileImg} />

            <View style={{ flexDirection: "row", display: "flex" }}>
              <Text style={styles.nameText}>
                {profileDetails.pilotFirstName} {profileDetails.pilotLastName}
              </Text>

              {user.photoURL === "P" ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.push("PilotProfilePageSetupPageOneScreen")}
                >
                  {renderIcon()}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.chatButton}
                  onPress={() =>
                    props.navigation.navigate("ChatScreen", {
                      ...profileDetails,
                    })}
                >
                  <Text style={styles.chatText}>Chat</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.locationText}>
              Location: {profileDetails.pilotLocation}
            </Text>
            <Text style={styles.specTitle}>Bio:</Text>
            <Text style={styles.personalBioStyle}>
              {profileDetails.personalBio}
            </Text>

            {renderProfileStatsItem(droneModel, profileDetails.droneType)}
            {renderProfileStatsItem(
              yearsOfExperience,
              profileDetails.yearsOfExperience,
            )}
            {renderProfileStatsItem(
              licenseExpirationDate,
              profileDetails.faaLicenseExp,
            )}
            {renderProfileStatsItem(
              willingToTravel,
              profileDetails.travelStatus,
            )}
            {renderProfileStatsItem(insured, profileDetails.insuredStatus)}
            {renderProfileStatsItem(experienceAirMap, profileDetails.airMap)}
            {renderProfileStatsItem(
              abilityOver400Ft,
              profileDetails.fourHundred,
            )}
          </ScrollView>
        ) : (
          <ScrollView style={styles.scrollViewStyle}>
            <Image
              source={princePic01}
              style={styles.backgroundImageStartingPage}
            />
            {user.photoURL === "P" ? (
              <View>
                <Text style={styles.welcomeText}>Welcome to Hovrtek</Text>
                <View
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 40,
                  }}
                >
                  <Text style={styles.nameText}>
                    {profileDetails.pilotFirstName}{" "}
                    {profileDetails.pilotLastName}
                  </Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    style={styles.startButton}
                    onPress={() =>
                      props.navigation.navigate(
                        "PilotProfilePageSetupPageOneScreen",
                      )}
                  >
                    <Text style={styles.startButtonText}>
                      {startPilotProfile}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  style={styles.chatButton}
                  onPress={() =>
                    props.navigation.navigate("ChatScreen", {
                      ...profileDetails,
                    })}
                >
                  <Text style={styles.chatText}>{chat}</Text>
                </TouchableOpacity>

                <Text style={styles.nameText}>
                  {profileDetails.pilotFirstName} {profileDetails.pilotLastName}
                </Text>

                <Text style={styles.welcomeText}>{pilotProfileNotCreated}</Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
  scrollViewStyle: {
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
    fontSize: 30,
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
    borderWidth: 4,
    borderColor: "#092455",
  },
  specs: {
    fontSize: 20,
    color: "black",
    fontWeight: "200",
    marginLeft: "2%",
    marginTop: 8,
  },
  specTitle: {
    fontSize: 20,
    color: "black",
    fontWeight: "400",
    marginLeft: "2%",
    marginTop: 8,
  },
  specView: {
    flexDirection: "row",
    display: "flex",
  },
  chatText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
  },
  chatButton: {
    position: "absolute",
    right: 0,
    backgroundColor: "#092455",
    padding: 7,
    borderRadius: 5,
  },
  startButton: {
    width: 250,
    height: 50,
    backgroundColor: "#092455",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 30,
    color: "white",
  },
  startButtonText: {
    color: "white",
    fontSize: 20,
  },
  personalBioStyle: {
    fontSize: 15,
    color: "black",
    marginLeft: "2%",
    marginTop: "1%",
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
    },
  );
  return {
    listOfPilotProfiles,
  };
}

export default connect(mapStateToProps, { getPilotProfiles, editPilotProfile })(
  PilotProfileWelcomeScreen,
);
