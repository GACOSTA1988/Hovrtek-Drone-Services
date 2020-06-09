import React, { useState, useEffect, useContext } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TextInput,
  FlatList,
  TouchableHighlight,
  Alert,
} from "react-native";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getProjects } from "../../actions/projects";
import { getClientProfiles } from "../../actions/clientProfiles";
import { getPilotProfiles } from "../../actions/pilotProfiles";
import * as firebase from "firebase";
import _ from "lodash";
import { render } from "react-dom";
import PilotSubheader from "../../components/pilot/PilotSubheader";

function JobListScreen(
  props,
  { getProjects, getClientProfiles, getPilotProfiles },
) {
  const navigation = useNavigation();

  useEffect(() => {
    props.getProjects();
    props.getClientProfiles();
    props.getPilotProfiles();
  }, []);

  const availableProjects = [];
  props.listOfProjects.forEach((project) => {
    if (!project.pilotID) {
      availableProjects.push(project);
    }
  });

  // GETTING USER profileComplete STATE WITHOUT BREAKING UPON RECEIVING UNDEFINED USER AND DB PROPS

  let currentUser = firebase.auth().currentUser;
  if (currentUser) {
    currentUser = firebase.auth().currentUser;
  }
  let userID = null;
  if (currentUser !== null) {
    userID = firebase.auth().currentUser.uid;
  }
  let list = null;
  if (props.listOfPilotProfiles) {
    list = props.listOfPilotProfiles;
  }
  let currentUserProps = null;
  if (list !== null) {
    currentUserProps = list.find((x) => x.userID === userID);
  }
  let profileCompleteState = null;
  if (currentUserProps) {
    profileCompleteState = currentUserProps.profileComplete;
  }

  return (
    <View style={styles.projectListWrapper}>
      {profileCompleteState === "No" ? (
        <View style={styles.profileCompleteNoticeWrapper}>
          <TouchableOpacity
            style={styles.profileCompleteNotice}
            onPress={() => navigation.navigate("Profile")}
          >
            <View style={styles.textRow}>
              <Text style={styles.profileCompleteNoticeText}>
                Click here to complete your profile to be eligible for jobs!
              </Text>
            </View>
            <View>
              <FontAwesome5 name="check-circle" size={30} color="red" />
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <Text />
      )}

      <View style={styles.subheaderWrapper}>
        <PilotSubheader />
      </View>

      <ScrollView>
        <View style={styles.projectCard}>
          <TouchableOpacity>
            <FlatList
              style={{ width: "100%" }}
              data={availableProjects}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      borderRadius: 15,
                      backgroundColor: "#092455",
                      marginBottom: 15,
                      padding: 20,
                    }}
                  >
                    <TouchableHighlight
                      onPress={() =>
                        props.navigation.navigate("JobDetailsScreen", {
                          ...item,
                        })}
                    >
                      <View>
                        <Text style={{ color: "white", fontWeight: "800" }}>
                          Location: {item.location}{" "}
                        </Text>
                        <Text style={{ color: "white", fontWeight: "800" }}>
                          Date: {item.date}{" "}
                        </Text>
                        <Text style={{ color: "white", fontWeight: "800" }}>
                          Recording: {item.recording}{" "}
                        </Text>
                        {props.listOfClientProfiles.find(
                          (x) => x.userID === item.clientID,
                        ) ? (
                          <Text style={{ color: "white", fontWeight: "800" }}>
                            Posted by:{" "}
                            {
                              props.listOfClientProfiles.find(
                                (x) => x.userID === item.clientID,
                              ).firstName
                            }{" "}
                            {
                              props.listOfClientProfiles.find(
                                (x) => x.userID === item.clientID,
                              ).lastName
                            }
                          </Text>
                        ) : (
                          <Text>Posted by:</Text>
                        )}
                      </View>
                    </TouchableHighlight>
                  </View>
                );
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  projectCard: {
    width: 380,
    marginTop: 15,
  },
  ClientProjectListTextWrapper: {
    marginBottom: 20,
  },
  projectListWrapper: {
    alignItems: "center",
  },
  profileCompleteNotice: {
    flexDirection: "row",
    top: 0,
    bottom: 0,
    borderWidth: 3,
    borderColor: "red",
    width: 280,
    height: 120,
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    position: "absolute",
    backgroundColor: "white",
    zIndex: 1,
  },
  textRow: {
    marginRight: 10,
  },
  profileCompleteNoticeWrapper: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    // backgroundColor: "blue",
    marginTop: "45%",
    height: "100%",
  },
  profileCompleteNoticeText: {
    fontSize: 15,
    fontWeight: "600",
  },
  subheaderWrapper: {
    marginBottom: 14,
  },
});

function mapStateToProps(state) {
  const listOfProjects = _.map(state.projectsList.projectsList, (val, key) => {
    return {
      ...val,
      key: key,
    };
  });

  const listOfClientProfiles = _.map(
    state.clientProfilesList.clientProfilesList,
    (val, key) => {
      return {
        ...val,
        key: key,
      };
    },
  );
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
    listOfProjects,
    listOfClientProfiles,
    listOfPilotProfiles,
  };
}

export default connect(mapStateToProps, {
  getProjects,
  getClientProfiles,
  getPilotProfiles,
})(JobListScreen);
