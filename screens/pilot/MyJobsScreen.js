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
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { getProjects } from "../../actions/projects";
import * as firebase from 'firebase';
import _ from "lodash";

function MyJobsScreen(props, { getProjects }) {

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
      <View style={styles.scrollViewWrapper}>
        <Text style={styles.pilotText}>My Jobs</Text>
        <ScrollView
         style={styles.scrollContainer}
         showsVerticalScrollIndicator={false} 
         >
          <View style={styles.projectCard}>
              <FlatList
                style={{ width: "100%" }}
                data={listOfMyProjects}
                // showsVerticalScrollIndicator={true}
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
                          })
                        }
                      >
                        <View className={styles.jobWrapper}>
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
                    </View>
                  );
                }}
              />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  projectCard: {
    width: "100%",
  },
  projectListWrapper: {
    alignItems: "center",
    marginTop: 13,
  },
  scrollContainer: {
    width: "100%",
  },
  scrollViewWrapper: {
    alignItems: "center",
    width: "100%",
    padding: 12,
  },
  pilotText: {
    fontSize: 30,
    color: "#092455",
    marginBottom: 14,
  },
});

function mapStateToProps(state) {
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
  MyJobsScreen
);
