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
// import { useNavigation } from "@react-navigation/native";
import {
  getPilotProfiles,
  editPilotProfile,
} from "../../actions/pilotProfiles";
import * as firebase from "firebase";
import _ from "lodash";
import princePic01 from "../../assets/princePic01.jpg";
import { AntDesign } from "@expo/vector-icons";
import { APP_STRINGS, NAV_SCREENS } from "../../constants";

const {
  abilityOver400Ft,
  bio,
  chat,
  droneModel,
  experienceAirMap,
  insured,
  licenseExpirationDate,
  location,
  pilotProfileNotCreated,
  startPilotProfile,
  welcomeHovrtek,
  willingToTravel,
  // yearsOfExperience aliased to not clash with const of same name
  yearsOfExperience: yearsOfExperienceStr,
} = APP_STRINGS;

const { CHAT, JOB_LIST, PILOT_SETUP_ONE } = NAV_SCREENS;

function PilotProfileWelcomeScreen(props) {
  const { navigation, route, listOfPilotProfiles, getPilotProfiles } = props;

  let user = null;
  let profile = null;
  let passedProps = route.params;
  const [ profileDetails, setCurrentUserProps ] = useState(null);

  // useEffect(() => {
  //   // getPilotProfiles();
  // }, []);

  if (firebase.auth().currentUser) {
    user = firebase.auth().currentUser;
    if (user.photoURL === "P") {
      profile = listOfPilotProfiles.find((x) => x.userID === user.uid);
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
        navigation.navigate(JOB_LIST);
      }
    } else if (passedProps && profileDetails != passedProps) {
      setCurrentUserProps(passedProps);
    }
  }

  const renderProfileStatsItem = (titleString = "", specsValue = "") => {
    return (
      <View style={styles.specView}>
        <Text style={styles.specTitle}>{titleString}</Text>
        <Text style={styles.specs}>{specsValue}</Text>
      </View>
    );
  };

  const renderTouchableEditIcon = () => {
    return (
      <TouchableOpacity onPress={() => navigation.push(PILOT_SETUP_ONE)}>
        <AntDesign
          name="edit"
          size={30}
          color="darkblue"
          style={styles.iconStyle}
        />
      </TouchableOpacity>
    );
  };

  const renderTouchableChatIcon = (profileData = {}) => {
    return (
      <TouchableOpacity
        style={styles.chatButton}
        onPress={() =>
          navigation.navigate(CHAT, {
            ...profileData,
          })}
      >
        <Text style={styles.chatText}>{chat}</Text>
      </TouchableOpacity>
    );
  };

  const renderTouchableStartPilotProfileText = () => {
    return (
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate(PILOT_SETUP_ONE)}
      >
        <Text style={styles.startButtonText}>{startPilotProfile}</Text>
      </TouchableOpacity>
    );
  };

  const renderStartProfileView = () => {
    return (
      <View>
        <Text style={styles.welcomeText}>{welcomeHovrtek}</Text>
        <View style={styles.fullName}>
          <Text style={styles.nameText}>{getPilotFullName()}</Text>
        </View>
        <View style={styles.alignItemsCenter}>
          {renderTouchableStartPilotProfileText()}
        </View>
      </View>
    );
  };

  const renderChatView = () => {
    return (
      <View>
        {renderTouchableChatIcon(profileDetails)}
        <Text style={styles.nameText}>{getPilotFullName()}</Text>
        <Text style={styles.welcomeText}>{pilotProfileNotCreated}</Text>
      </View>
    );
  };

  if (!user || !profileDetails) {
    return <View />;
  }

  // it's safe to destructure profileDetails here,
  // because of the check above for it in the 'if' statement
  const {
    profileImageUrl,
    profileComplete,
    pilotFirstName,
    pilotLastName,
    pilotLocation,
    personalBio,
    droneType,
    yearsOfExperience,
    faaLicenseExp,
    travelStatus,
    airMap,
    fourHundred,
    insuredStatus,
  } = profileDetails;

  const getPilotFullName = () => `${pilotFirstName} ${pilotLastName}`;
  const isProfileComplete = profileComplete === "Yes";

  const profileImg = {
    uri: profileImageUrl,
  };

  const { photoURL } = user;
  // todo change this to an actual boolean, true/false
  const hasUserPhoto = photoURL !== "P";

  return (
    <View style={styles.container}>
      {isProfileComplete && (
        <ScrollView style={styles.scrollViewStyle}>
          <Image source={princePic01} style={styles.backgroundImage} />
          <Image style={styles.profilePic} source={profileImg} />

          <View style={styles.fullNameAndIcon}>
            <Text style={styles.nameText}>{getPilotFullName()}</Text>

            {hasUserPhoto && renderTouchableChatIcon(profileDetails)}
            {!hasUserPhoto && renderTouchableEditIcon()}
          </View>

          <Text style={styles.locationText}>
            {location} {pilotLocation}
          </Text>

          <Text style={styles.specTitle}>{bio}</Text>
          <Text style={styles.personalBioStyle}>{personalBio}</Text>

          {renderProfileStatsItem(droneModel, droneType)}
          {renderProfileStatsItem(yearsOfExperienceStr, yearsOfExperience)}
          {renderProfileStatsItem(licenseExpirationDate, faaLicenseExp)}
          {renderProfileStatsItem(willingToTravel, travelStatus)}
          {renderProfileStatsItem(insured, insuredStatus)}
          {renderProfileStatsItem(experienceAirMap, airMap)}
          {renderProfileStatsItem(abilityOver400Ft, fourHundred)}
        </ScrollView>
      )}

      {!isProfileComplete && (
        <ScrollView style={styles.scrollViewStyle}>
          <Image
            source={princePic01}
            style={styles.backgroundImageStartingPage}
          />
          {hasUserPhoto && renderChatView()}
          {!hasUserPhoto && renderStartProfileView()}
        </ScrollView>
      )}
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
  fullName: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    marginBottom: 40,
  },
  fullNameAndIcon: {
    flexDirection: "row",
    display: "flex",
  },
  alignItemsCenter: {
    alignItems: "center",
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
  iconStyle: {
    marginLeft: 40,
    marginTop: 25,
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
