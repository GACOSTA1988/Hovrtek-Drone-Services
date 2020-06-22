import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as firebase from "firebase";
import { connect } from "react-redux";
import { getPilotProfiles } from "../../actions/pilotProfiles";
import _ from "lodash";
import { useNavigation } from "@react-navigation/native";

function ProjectDetailsScreen(props) {
  const projectDetails = props.route.params;
  const navigation = useNavigation();

  useEffect(() => {
    props.getPilotProfiles();
  }, []);

  let pilot = null;
  let user = null;

  if (firebase.auth().currentUser) {
    user = firebase.auth().currentUser;
  }

  if (props.listOfPilotProfiles.find((x) => x.userID === projectDetails.pilotID)) {
    pilot = props.listOfPilotProfiles.find(
      (x) => x.userID === projectDetails.pilotID,
    );
  }

  return (
    <View style={styles.container}>
      {(user.uid === projectDetails.clientID) && (
        <TouchableOpacity
        style={styles.editIcon}
        onPress={() =>
          props.navigation.navigate("EditProjectScreen", {
            projectDetails: projectDetails,
            fromList: false
          })
        }
        >
          <AntDesign name="edit" size={40} color={"#DDE2E4"}/>
        </TouchableOpacity>
      )}
      <Text style={styles.ProjectText}> </Text>
      <Text style={styles.detailsHeader}>Where:</Text>
      <Text style={styles.DetailsText}>{projectDetails.location}</Text>
      <Text style={styles.detailsHeader}>When:</Text>
      <Text style={styles.DetailsText}>{projectDetails.date}</Text>
      <Text style={styles.detailsHeader}>What:</Text>
      <Text style={styles.DetailsText}>{projectDetails.recording}</Text>
      <Text style={styles.detailsHeader}>Pilot:</Text>
      {pilot ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("PilotProfileWelcomeScreen", {
              ...pilot,
            })}
        >
          <View style={{ flexDirection: "row" }}>
            {pilot.profileImageUrl ? (
              <Image
                source={{
                  uri: pilot.profileImageUrl,
                }}
                style={styles.profilePic}
              />
            ) : (
              <Image
                source={{
                  uri:
                    "https://thenypost.files.wordpress.com/2017/07/ameliaearhart.jpg?quality=90&strip=all&w=1200",
                }}
                style={styles.profilePic}
              />
            )}
            <Text style={styles.nameText}>
              {pilot.pilotFirstName} {pilot.pilotLastName}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={{ flexDirection: "row" }}>
          <Image
            source={{
              uri:
                "https://thenypost.files.wordpress.com/2017/07/ameliaearhart.jpg?quality=90&strip=all&w=1200",
            }}
            style={styles.profilePic}
          />
          <Text style={styles.unnamedText}>Pending Pilot</Text>
        </View>
      )}
      {/* <View style={styles.backButtonWrapper}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => props.navigation.pop()}
        >
          <Text style={styles.backButtonText}>Back to projects</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#161616",
    height: "100%"
  },
  ProjectText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#DDE2E4",
    marginBottom: 20,
    marginTop: 10,
    zIndex: 0
  },
  DetailsText: {
    backgroundColor: "rgba(221,226,228, 0.2)", 
    padding:10, 
    width: "100%", 
    marginTop: 10, 
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 17,
    color: "#DDE2E4",
    fontWeight: "800",
  },
  nameText: {
    marginBottom: 20,
    fontSize: 17,
    color: "#DDE2E4",
    marginTop: 20,
    fontWeight: "bold",
    color: "#DDE2E4",
  },
  unnamedText: {
    marginBottom: 20,
    fontSize: 17,
    color: "#DDE2E4",
    marginTop: 20,
  },
  line: {
    borderBottomColor: "#DDE2E4",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  detailsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#DDE2E4"
  },
  back: {
    marginTop: 40,
    fontSize: 18,
    fontWeight: "bold",
    color: "#161616",
  },
  profilePic: {
    height: 50,
    width: 50,
    borderRadius: 90,
    marginTop: 5,
    marginRight: 10,
  },
  backButton: {
    backgroundColor: "#DDE2E4",
    height: 40,
    width: 160,
    alignSelf: "flex-start",
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  backButtonText: {
    color: "#161616",
  },
  backButtonWrapper: {
    marginTop: 20,
    alignItems: "center",
  },
  editIcon: {
    top: "4%",
    position: "absolute",
    right: "6%",
    zIndex: 1,
    color: "#DDE2E4"
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

export default connect(mapStateToProps, { getPilotProfiles })(
  ProjectDetailsScreen,
);
