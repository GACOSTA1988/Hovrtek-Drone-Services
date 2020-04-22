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
import { getProjects } from "../../actions/index";
import * as firebase from 'firebase';
import _ from "lodash";

function JobListScreen(props, { getProjects }) {

  const navigation = useNavigation();
  const [drone, setDrone] = useState('');

  useEffect(() => {
    props.getProjects();
  }, []);

  const editProject = (e) => {
    e.preventDefault();
    navigation.navigate("JobListScreen");
    setDrone("");
  };

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
                      </View>
                    </TouchableHighlight>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginTop: 25
                      }}
                    >
                      <TouchableHighlight
                        onPress={() =>
                          props.navigation.navigate(
                            "EditProjectScreen",
                            {
                              ...item
                            }
                          )
                        }
                      >
                        <View style={{ marginRight: 15 }}>
                          <FontAwesome5
                            name="edit"
                            size={32}
                            color="#a9b8de"
                          />
                        </View>
                      </TouchableHighlight>
                      <TouchableHighlight
                        onPress={() => props.deleteProject(item.key)}
                      >
                        <View>
                          <MaterialCommunityIcons
                            name="delete"
                            size={32}
                            color="#a9b8de"
                          />
                        </View>
                      </TouchableHighlight>
                    </View>
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
  console.log("this is state", state);
  const listOfProjects = _.map(state.projectsList.projectsList, (val, key) => {
    return {
      ...val,
      key: key
    };
  });
  return {
    listOfProjects
  };
}

export default connect(mapStateToProps, { getProjects })(
  JobListScreen
);
