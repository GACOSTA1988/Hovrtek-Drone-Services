import React, { useEffect } from "react";
import { TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  TouchableHighlight
  } from "react-native";
  import { Entypo } from "@expo/vector-icons";
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { getProjects } from "../../actions/projects";
import { getClientProfiles } from "../../actions/clientProfiles";
import * as firebase from 'firebase';
import _ from "lodash";

function MyJobsScreen(props, { getProjects, getClientProfiles }) {

  useEffect(() => {
    props.getClientProfiles();
  }, []);

  const navigation = useNavigation();

  useEffect(() => {
    props.getProjects();
  }, []);

  let userID = null;
  if (firebase.auth().currentUser) {
    userID = firebase.auth().currentUser.uid;
  }
  const listOfMyProjects = [];
  props.listOfProjects.forEach((project) => {
    if (project.pilotID === userID) {
      listOfMyProjects.push(project);
    }
  });

  return (
    <View style={styles.projectListWrapper}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {listOfMyProjects.length < 1 ? <Text style={styles.emptyText}>( No accepted jobs yet )</Text> : null}
        <View style={styles.projectCard}>
            <FlatList
              style={styles.flatListStyles}
              data={listOfMyProjects}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => {
                return (
                  <View
                    style={styles.flatListContainer}
                  >
                    <TouchableHighlight 
                    style={styles.touchableContainer}
                    onPress={() => navigation.navigate("JobDetailsScreen", {...item,})}>
                      <View>
                        <View style={styles.textContainer}> 
                          <View style={styles.topRowDisplay}>
                            <Text style={styles.locationText}>
                              <Entypo name="location" size={14} color="#DDE2E4" /> {item.location}{" "}
                            </Text>
                            <Text style={styles.dateText}>
                              {item.date}
                            </Text>
                          </View>
                          <View style={styles.descriptionBox}>
                            <Text style={styles.descriptionText}>{item.recording}</Text>
                          </View>
                        </View>
                        {props.listOfClientProfiles.find(
                        (x) => x.userID === item.clientID,
                      ) ? (
                        <Text style={styles.pilotText}>
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
  );
};

const styles = StyleSheet.create({
  projectCard: {
    backgroundColor: "rgba(171, 205, 239, 0.2)",
    width: "100%",
  },
  projectListWrapper: {
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#161616"
  },
  scrollContainer: {
    backgroundColor: "#161616",
    width: "100%",
  },
  flatListContainer:{
    width: "100%",
    borderBottomWidth: 10,
    borderColor: "#161616",
  },
  flatListStyles:{ 
    borderTopWidth: 10, 
    borderColor: "#161616"
  },
  topRowDisplay:{
    flex: 1, 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: "#DDE2E4", 
    width: "100%", 
  },
  touchableContainer:{
    paddingTop: 20, 
    paddingHorizontal: 20, 
    width: "100%",
  },
  textContainer:{
    flex: 1, 
    flexDirection: "column", 
    justifyContent: "center", 
    alignItems:"center", 
    width: "100%"
  },
  pilotText:{ 
    color: "#DDE2E4", 
    fontWeight: "200", 
    alignSelf: "center", 
    fontSize: 12, 
    marginTop: 10, 
    marginBottom: 10, 
  },
  locationText:{ 
    color: "#DDE2E4", 
    fontWeight: "800", 
    fontSize: 13,  
  },
  descriptionBox:{
    backgroundColor: "rgba(221,226,228, 0.2)", 
    padding:10, width: "100%", 
    borderRadius: 5
  },
  dateText:{ 
    color: "#DDE2E4", 
    fontWeight: "800", 
    fontSize: 12, 
  },
  descriptionText:{ 
    color: "#DDE2E4", 
    fontWeight: "500", 
    fontSize: 14
  },
  emptyText:{ 
    color: "#DDE2E4", 
    fontSize: 14,
    textAlign: "center",
    padding: "15%"
  },
});

function mapStateToProps(state) {
  const listOfProjects = _.map(state.projectsList.projectsList, (val, key) => {
    return {
      ...val,
      key: key
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
  return {
    listOfClientProfiles,
    listOfProjects
  };
}

export default connect(mapStateToProps, { 
  getClientProfiles, 
  getProjects 
})(MyJobsScreen);
