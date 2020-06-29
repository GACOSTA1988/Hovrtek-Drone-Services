import React, { useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getProjects } from "../../actions/projects";
import { getClientProfiles } from "../../actions/clientProfiles";
import { getPilotProfiles } from "../../actions/pilotProfiles";
import * as firebase from "firebase";
import _ from "lodash";

function JobListScreen(props) {
  const navigation = useNavigation();

  useEffect(() => {
    props.getProjects();
    props.getClientProfiles();
    props.getPilotProfiles();
    navigation.navigate("Messages");
    setTimeout(() => 
      navigation.navigate("Home")
    )
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
              style={{ width: "100%", color: "#DDE2E4"}}
              data={availableProjects}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => {
                return (
                  <View
                    style={styles.flatListContainer, {opacity: 0.1}}
                  >
                      <View>
                        <View style={styles.cardContainer}>
                          <Text style={styles.locationText}>
                            <Entypo name="location" size={14} color="#DDE2E4" /> {item.location}{" "}
                          </Text>
                          <Text style={styles.dateText}>
                            {item.date}
                          </Text>
                        </View>
                        <View style={styles.descriptionTextView}>
                          <Text style={styles.descriptionText}>
                            {item.recording}
                          </Text>
                        </View>
                        {props.listOfClientProfiles.find(
                          (x) => x.userID === item.clientID,
                        ) ? (
                          <Text style={styles.pilotDisplay}>
                            {"@"}
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
                          null
                        )}
                      </View>
                  </View>
                );
              }}
            />
          </View>
      ) : (
        null
      )}

      <ScrollView 
      style={styles.scrollContainer}
      showsVerticalScrollIndicator={false} 
      >
        <View style={styles.projectCard}>
            <FlatList
              style={{ width: "100%", color: "#DDE2E4"}}
              data={availableProjects}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => {
                return (
                  <View
                    style={styles.flatListContainer}
                  >
                    <TouchableHighlight
                      onPress={() =>
                        props.navigation.navigate("JobDetailsScreen", {
                          ...item,
                        })}
                    >
                      <View>
                        <View style={styles.cardContainer}>
                          <Text style={styles.locationText}>
                            <Entypo name="location" size={14} color="#DDE2E4" /> {item.location}{" "}
                          </Text>
                          <Text style={styles.dateText}>
                            {item.date}
                          </Text>
                        </View>
                        <View style={styles.descriptionTextView}>
                          <Text style={styles.descriptionText}>
                            {item.recording}
                          </Text>
                        </View>
                        {props.listOfClientProfiles.find(
                          (x) => x.userID === item.clientID,
                        ) ? (
                          <Text style={styles.pilotDisplay}>
                            {"@"}
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
                          null
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
  flatListContainer:{
    borderTopWidth: 10,
    borderColor: "#161616",
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  cardContainer:{
    flex: 1, 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: "#DDE2E4",  
  },
  cardText: { 
    color: "#DDE2E4", 
    fontWeight: "800" 
  },
  projectCard: {
    width: "100%",
    backgroundColor: "rgba(171, 205, 239, 0.2)"
  },
  ClientProjectListTextWrapper: {
    marginBottom: 20,
  },
  projectListWrapper: {
    alignItems: "center",
    backgroundColor: "#161616",
    height: "100%",
  },
  scrollContainer: {
    width: "100%",
  },
  profileCompleteNotice: {
    top: 0,
    bottom: 0,
    borderWidth: 3,
    borderColor: "#161616",
    width: 280,
    height: '25%',
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    position: "absolute",
    backgroundColor: "silver",
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
  continueText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "silver",
  },
  continueButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#161616",
    padding: 7,
    borderRadius: 5,
    margin: 20,
    height: '40%',
  },
  pilotText: {
    fontSize: 30,
    color: "silver",
    marginBottom: 10,
  },
  mapText: {
    fontWeight: "bold",
    fontSize: 20,
    color:  "silver",
    marginLeft: 10,
  },
  locationText:{ 
    color: "#DDE2E4", 
    fontWeight: "800", 
    fontSize: 13,  
  },
  dateText:{ 
    color: "#DDE2E4", 
    fontWeight: "800", 
    fontSize: 12, 
  },
  descriptionTextView:{
    backgroundColor: "rgba(221,226,228, 0.2)", 
    padding:10, 
    width: "100%", 
    borderRadius: 5,
  },
  descriptionText:{ 
    color: "#DDE2E4", 
    fontWeight: "500", 
    fontSize: 14, 
  },
  pilotDisplay:{ 
    color: "#DDE2E4", 
    fontWeight: "200", 
    alignSelf: "center", 
    fontSize: 12, 
    marginTop: 10, 
    marginBottom: 5, 
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#161616",
    width: "95%",
    marginBottom: 10,
    padding: 10,
    borderRadius: 15,
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
