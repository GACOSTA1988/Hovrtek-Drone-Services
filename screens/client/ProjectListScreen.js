import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { getProjects, deleteProject } from "../../actions/projects";
import { getPilotProfiles } from "../../actions/pilotProfiles";
import _ from "lodash";
import {
  FontAwesome5,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";
import * as firebase from "firebase";

function ProjectListScreen(props) {
  useEffect(() => {
    props.getProjects();
    props.getPilotProfiles();
  }, []);

  let user = "";
  if (firebase.auth().currentUser) {
    user = firebase.auth().currentUser;
  }

  const listOfMyProjects = [];
  props.listOfProjects.forEach((project) => {
    if (project.clientID === user.uid) {
      listOfMyProjects.push(project);
    }
  });

  return (
    <View style={styles.projectListWrapper}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false} 
        >
        <View style={styles.projectCard}>
            <FlatList
              style={{ width: "100%" }}
              data={listOfMyProjects}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      borderTopColor: "#161616",
                      borderTopWidth: 10,
                      backgroundColor: "rgb(35,35,36)",
                      padding: 20,
                    }}
                  >
                    <TouchableHighlight
                      onPress={() =>
                        props.navigation.navigate("ProjectDetailsScreen", {
                          ...item,
                        })}
                    >
                      <View>
                        <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "#D9B08C",  }}>
                          <Text style={{ color: "#DDE2E4", fontWeight: "800", fontSize: 13,  }}>
                            <Entypo name="location" size={14} color="white" /> {item.location}{" "}
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "flex-end",
                              }}
                            >
                              <TouchableHighlight
                                onPress={() =>
                                  props.navigation.navigate("EditProjectScreen", {
                                    projectDetails: item,
                                    fromList: true
                                  })}
                              >
                                <View>
                                  <FontAwesome5 name="edit" size={32} color="white" />
                                </View>
                              </TouchableHighlight>
                              <TouchableHighlight
                                onPress={() => props.deleteProject(item.key)}
                              >
                                <View>
                                  <MaterialIcons name="delete" size={24} color="white" />
                                </View>
                              </TouchableHighlight>
                            </View>
                          </Text>
                        </View>
                          <Text style={{ color: "#DDE2E4", fontWeight: "800", fontSize: 12, }}>
                            {item.date}
                          </Text>
                        <View style={{backgroundColor: "rgba(217, 176, 140, 0.2)", padding:10, width: "100%", borderRadius: 5,}}>
                          <Text style={{ color: "#DDE2E4", fontWeight: "500", fontSize: 14, }}>
                            {item.recording}
                          </Text>
                        </View>
                        {item.pilotID &&
                        props.listOfPilotProfiles.find(
                          (x) => x.userID === item.pilotID,
                        ) ? (
                          <Text style={{ color: "white", fontWeight: "800" }}>
                            Your pilot:{" "}
                            {
                              props.listOfPilotProfiles.find(
                                (x) => x.userID === item.pilotID,
                              ).pilotFirstName
                            }{" "}
                            {
                              props.listOfPilotProfiles.find(
                                (x) => x.userID === item.pilotID,
                              ).pilotLastName
                            }
                          </Text>
                        ) : (
                          <Text style={{ color: "white", fontWeight: "800" }}>
                            Pending pilot
                          </Text>
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
  );
}

const styles = StyleSheet.create({
  projectCard: {
    width: "100%",
  },
  scrollContainer: {
    width: "100%",
  },
  clientText: {
    fontSize: 30,
    color: "#161616",
    textAlign: "center",
  },
  ClientProjectListTextWrapper: {
    marginBottom: 20,
  },
  projectListWrapper: {
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#161616"
  },
});

function mapStateToProps(state) {
  const listOfProjects = _.map(state.projectsList.projectsList, (val, key) => {
    return {
      ...val,
      key: key,
    };
  });
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
    listOfPilotProfiles,
  };
}

export default connect(mapStateToProps, {
  getProjects,
  deleteProject,
  getPilotProfiles,
})(ProjectListScreen);
