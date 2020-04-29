import React, { useState, useEffect } from "react";
import { TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TextInput,
  FlatList,
  TouchableHighlight
  } from "react-native";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { getProjects, getClientProfiles } from "../../actions/index";
// import * as firebase from 'firebase';
import _ from "lodash";

function JobListScreen(props, { getProjects, getClientProfiles }) {

  const navigation = useNavigation();

  useEffect(() => {
    props.getProjects();
    props.getClientProfiles();
  }, []);

  return (
    <View style={styles.projectListWrapper}>
      <ScrollView>
        <View style={styles.projectCard}>
          <TouchableOpacity>
            <FlatList
              style={{ width: "100%" }}
              data={props.listOfProjects}
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
                        { props.listOfClientProfiles.find((x) => x.userID === item.clientID) ? (
                          <Text style={{ color: "white", fontWeight: "800" }}>
                          Posted by: { props.listOfClientProfiles.find((x) => x.userID === item.clientID).clientName }{" "}
                          </Text>
                        ) : (
                          <Text>Posted by:</Text>
                        )}
                        { item.pilotID ? (
                          <Text style={{ color: "white", fontWeight: "800" }}>
                          No Longer Available
                          </Text>
                        ) : (
                          <TouchableHighlight
                          onPress={() =>
                            props.navigation.navigate(
                              "AcceptJobScreen",
                              {
                                ...item
                              }
                            )
                          }
                          >
                            <Text style={{ color: "white", fontWeight: "800" }}>
                          Accept Job
                            </Text>
                          </TouchableHighlight>
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
  }
});

function mapStateToProps(state) {
  const listOfProjects = _.map(state.projectsList.projectsList, (val, key) => {
    return {
      ...val,
      key: key
    };
  });
  const listOfClientProfiles = _.map(state.clientProfilesList.clientProfilesList, (val, key) => {
    return {
      ...val,
      key: key
    };
  });
  return {
    listOfProjects,
    listOfClientProfiles
  };
}

export default connect(mapStateToProps, { getProjects, getClientProfiles })(
  JobListScreen
);
