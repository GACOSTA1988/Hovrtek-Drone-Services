import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Platform
} from "react-native";
import { connect } from "react-redux";
import {
  getPilotProfiles,
  editPilotProfile,
} from "../../actions/pilotProfiles";
import * as firebase from "firebase";
import _ from "lodash";
import princePic01 from "../../assets/princePic01.jpg";
import { AntDesign } from "@expo/vector-icons";
import { APP_STRINGS, NAV_SCREENS } from "../../constants";
import logo from "../../assets/hovrtek_logo.png";

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
  const {
    navigation,
    route: { params },
    listOfPilotProfiles,
    getPilotProfiles,
  } = props;

  const [ profileDetails, setProfileDetails ] = useState(null);
  const [ user, setComponentUser ] = useState(null);

  useEffect(() => {
    props.getPilotProfiles();
  }, []);

  const { currentUser } = firebase.auth();
  if (currentUser && user != currentUser) {
    setComponentUser(currentUser);
  }
  const { photoURL } = currentUser;
  const unsubscribe = navigation.addListener("focus", () => {
    if (photoURL === "P") {
      const profile = listOfPilotProfiles.find((x) => x.userID === currentUser.uid);
      if (profileDetails != profile) {
        setProfileDetails(profile);
      }
    } else if (params && profileDetails != params) {
      setProfileDetails(params);
    }
  });


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
      <TouchableOpacity onPress={() => navigation.push(PILOT_SETUP_ONE)} style={styles.iconTO}>
        <AntDesign
          name="edit"
          size={35}
          color="#DDE2E4"
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
          (navigation.popToTop(), navigation.navigate("ChatScreen", {
            ...profileData
          }))}
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
      <View style={styles.alignItemsCenter}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Image style={styles.logo} source={logo}/>
        {/* <Text style={styles.nameText}>{getPilotFullName()}</Text> */}
        {renderTouchableStartPilotProfileText()}
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

  return (
    <View style={styles.container}>
      {(profileDetails.profileComplete === "Yes") ? (
        <ScrollView style={styles.scrollViewStyle}>
          <Image source={princePic01} style={styles.backgroundImage} />
          <Image style={styles.profilePic} source={profileImg} />
          <View style={styles.fullNameAndIcon}>
            <Text style={styles.nameText}>{getPilotFullName()}</Text>
            {currentUser.photoURL === "P" ? renderTouchableEditIcon() : renderTouchableChatIcon(profileDetails)}

          </View>

          <Text style={styles.specTitle}>{location}
            <Text style={styles.locationText}>{pilotLocation}</Text>
          </Text>
          <Text style={styles.specTitle}>{bio}
            <Text style={styles.personalBioStyle}> {personalBio}</Text>
          </Text>
          {renderProfileStatsItem(droneModel, droneType)}
          {renderProfileStatsItem(yearsOfExperienceStr, yearsOfExperience)}
          {renderProfileStatsItem(licenseExpirationDate, faaLicenseExp)}
          {renderProfileStatsItem(willingToTravel, travelStatus)}
          {renderProfileStatsItem(insured, insuredStatus)}
          {renderProfileStatsItem(experienceAirMap, airMap)}
          {renderProfileStatsItem(abilityOver400Ft, fourHundred)}
        </ScrollView>
      ) : (
        <ScrollView style={styles.scrollViewStyle}>
          <Image
            source={princePic01}
            style={styles.backgroundImageStartingPage}
          />
          {renderStartProfileView()}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161616",
    height: "100%",
  },
  scrollViewStyle: {
    width: "100%",
  },
  fullNameAndIcon: {
    flexDirection: "row",
    display: "flex",
  },
  alignItemsCenter: {
    alignItems: "center",
    marginTop: "50%",
  },
  nameText: {
    fontSize: 30,
    color: "#DDE2E4",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: "10%",
  },
  locationText: {
    fontSize: 20,
    color: "#DDE2E4",
    fontWeight: "300",
    textAlign: "left",
    marginLeft: "4%",
  },
  subHeaderText: {
    marginTop: "5%",
    marginBottom: "10%",
    fontSize: 20,
    color: "#DDE2E4",
    fontWeight: "600",
    textAlign: "center",
  },
  iconTO: {
    position: "absolute",
    right: "6%",
  },
  input: {
    borderWidth: 1,
    borderRadius: 3,
    height: 30,
    marginBottom: 80,
  },
  backgroundImage: {
    width: "100%",
    height: "30%",
    position: "absolute",
  },
  backgroundImageStartingPage: {
    width: "100%",
    height: "60%",
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
    borderColor: "#DDE2E4",
  },
  specs: {
    fontSize: 20,
    color: "#DDE2E4",
    fontWeight: "200",
    marginLeft: "4%",
    marginTop: 8,
  },
  specTitle: {
    fontSize: 20,
    color: "#DDE2E4",
    fontWeight: "400",
    marginLeft: "4%",
    marginTop: 8,
  },
  specView: {
    flexDirection: "row",
    display: "flex",
  },
  chatText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#161616",
  },
  chatButton: {
    position: "absolute",
    right: "4%",
    backgroundColor: "#DDE2E4",
    padding: 7,
    borderRadius: 5,
  },
  startButton: {
    width: 250,
    height: 50,
    backgroundColor: "#DDE2E4",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  startButtonText: {
    color: "#161616",
    fontSize: 20,
  },
  personalBioStyle: {
    fontSize: 15,
    color: "#DDE2E4",
    marginLeft: "4%",
    marginRight: "5%",
    marginTop: "1%",
  },
  welcomeText: {
    color: "#DDE2E4"
  },
  logo: {
    ...Platform.select({
      ios: {
        resizeMode: "contain",
      },
    width: 220,
    height: 40,
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
    },
  );
  return {
    listOfPilotProfiles,
  };
}

export default connect(mapStateToProps, { getPilotProfiles, editPilotProfile })(
  PilotProfileWelcomeScreen,
);
