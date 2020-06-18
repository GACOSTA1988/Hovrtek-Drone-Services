import React, { useState, useEffect, useContext} from "react";
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
              <View style={styles.profileCompleteNotice}>
                <Text style={styles.profileCompleteNoticeText}>
                  You will need to complete your profile before you can apply for jobs.
                </Text>
                <View style={styles.blurredView}>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => navigation.navigate("Profile")}
              >
              <Text style={styles.continueText}>
                Continue
              </Text>
            </TouchableOpacity>
            </View>
              </View>
              <FlatList
                style={{ width: "100%", marginTop: 15 }}
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
                      opacity: 0.2,
                    }}
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
                    </View>
                  );
                }}
                />
          </View>
      ) : (
        <Text />
      )}
  
      <Text style={styles.pilotText}>Available Projects</Text>
      <TouchableOpacity style={styles.mapButton}
        onPress={() => props.navigation.navigate("MapComponent")}
        >
        <Ionicons name="md-globe" size={30} color="white" />       
        <Text style={styles.mapText}>Map View</Text>
      </TouchableOpacity>
      
      <ScrollView 
      style={styles.scrollContainer}
      showsVerticalScrollIndicator={false} 
      >
        <View style={styles.projectCard}>
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
        </View>
      </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  projectCard: {
    width: "100%",
    marginTop: 15,
    marginBottom: 100
  },
  ClientProjectListTextWrapper: {
    marginBottom: 20,
  },
  projectListWrapper: {
    alignItems: "center",
  },
  scrollContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
  profileCompleteNotice: {
    top: 0,
    bottom: 0,
    borderWidth: 3,
    borderColor: "#092455",
    width: 280,
    height: '15%',
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    position: "absolute",
    backgroundColor: "white",
    marginTop: "30%",
    zIndex: 1
  },
  textRow: {
    marginRight: 10,
  },
  profileCompleteNoticeWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  profileCompleteNoticeText: {
    fontSize: 15,
    fontWeight: "600",
  },
  subheaderWrapper: {
    marginBottom: 14,
  },
  continueText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
  },
  continueButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#092455",
    padding: 7,
    borderRadius: 5,
    margin: 20,
    height: '40%',
  },
  pilotText: {
    fontSize: 30,
    color: "#092455",
    marginBottom: 10,
  },
  mapText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    marginLeft: 10,
  },
  mapButton: {
    flexDirection: "row",
    alignItems: 'center',
    backgroundColor: "#092455",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 30,
    marginBottom: 10,
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
