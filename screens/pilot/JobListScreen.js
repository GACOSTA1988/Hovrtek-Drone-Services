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
  Alert
} from "react-native";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { getProjects, getClientProfiles, getPilotProfiles } from "../../actions/index";
import * as firebase from 'firebase';
import _ from "lodash";
import { render } from "react-dom";



function JobListScreen(props, { getProjects, getClientProfiles, getPilotProfiles }) {

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
  })

  // GETTING USER profileComplete STATE WITHOUT BREAKING UPON RECEIVING UNDEFINED USER AND DB PROPS

  let currentUser = firebase.auth().currentUser
  if (currentUser) {
    currentUser = firebase.auth().currentUser
    console.log(" FIRE BASE AUTH CURRENT USER", currentUser)
  }
  let userID = null;
  if (currentUser !== null) {
    userID = firebase.auth().currentUser.uid;
    console.log("USER ID", userID)
  }
  let list = null
  if (props.listOfPilotProfiles) {
    list = props.listOfPilotProfiles;
    console.log("LIST", list)
    }
  let currentUserProps = null
    if (list !== null){
      currentUserProps = list.find((x) => x.userID === userID);
      console.log("CURRENET USER PROPS", currentUserProps)
    }
  let profileCompleteState = null
  if (currentUserProps){
    profileCompleteState = currentUserProps.profileComplete
    console.log("PROFILE COMPLETE STATE", profileCompleteState)
  }

  return (
    <View style={styles.projectListWrapper}>

      {(profileCompleteState === "No") ?
        <View style={styles.profileCompleteNoticeWrapper}>

          <TouchableOpacity
          style={styles.profileCompleteNotice}
            onPress={() => navigation.navigate('Profile')}
          >
            <View style={styles.textRow}>
            <Text style={styles.profileCompleteNoticeText}>Click here to complete your profile in order to be eligible for jobs!</Text>
            </View>
            <View>
            <FontAwesome5 name="check-circle" size={30} />
            </View>
          </TouchableOpacity>
        </View>
        : <Text></Text>
      }
      <ScrollView>
        <View style={styles.projectCard}>
          <TouchableOpacity>
            <FlatList
              style={{ width: "100%" }}
              data={availableProjects}
              // showsVerticalScrollIndicator={true}
              keyExtractor={item => item.key}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      elevation: 8,
                      borderRadius: 15,
                      backgroundColor: "#092455",
                      marginBottom: 15,
                      padding: 20
                    }}
                  >
                    <TouchableHighlight
                      onPress={() =>
                        props.navigation.navigate(
                          "JobDetailsScreen",
                          {
                            ...item
                          }
                        )
                      }
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
                        {props.listOfClientProfiles.find((x) => x.userID === item.clientID) ? (
                          <Text style={{ color: "white", fontWeight: "800" }}>
                            Posted by: { props.listOfClientProfiles.find((x) => x.userID === item.clientID).firstName}{" "}{props.listOfClientProfiles.find((x) => x.userID === item.clientID).lastName}
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
};

const styles = StyleSheet.create({
  projectCard: {
    width: 380
  },
  clientText: {
    fontSize: 30,
    color: "darkblue",
    textAlign: "center"
  },
  ClientProjectListTextWrapper: {
    marginBottom: 20
  },
  projectListWrapper: {
    alignItems: "center",
    marginTop: 10
  },
  profileCompleteNotice: {
    flexDirection: 'row',
    top: 0,
    bottom: 0,
    borderWidth: 2,
    width: 270,
    height: 120,
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    position: "absolute",
    backgroundColor: 'white',
    zIndex: 0
  },
  textRow:{
    marginRight: 10
  },
  profileCompleteNoticeWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
  profileCompleteNoticeText: {
    fontSize: 15
  }
});

function mapStateToProps(state) {
  const listOfProjects = _.map(state.projectsList.projectsList, (val, key) => {
    return {
      ...val,
      key: key
    };
  });
  console.log("These are projects: ", listOfProjects);
  const listOfClientProfiles = _.map(state.clientProfilesList.clientProfilesList, (val, key) => {
    return {
      ...val,
      key: key
    };
  });
  const listOfPilotProfiles = _.map(state.pilotProfilesList.pilotProfilesList, (val, key) => {
    return {
      ...val,
      key: key
    };
  });
  return {
    listOfProjects,
    listOfClientProfiles,
    listOfPilotProfiles

  };
}

export default connect(mapStateToProps, { getProjects, getClientProfiles, getPilotProfiles })(
  JobListScreen
);
