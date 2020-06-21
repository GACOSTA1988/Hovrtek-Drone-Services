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
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.projectCard}>
              <FlatList
                style={{ borderTopWidth: 10, borderColor: "#161616"}}
                data={listOfMyProjects}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        width: "100%",
                        borderBottomWidth: 10,
                        borderColor: "#161616",
                        backgroundColor: "rgb(35,35,36)"
                      }}
                    >
                      <TouchableHighlight 
                      style={{padding: 20, width: "100%"}}
                      onPress={() => navigation.navigate("JobDetailsScreen", {...item,})}>
                        <View>
                          <View style={{flex: 1, flexDirection: "column", justifyContent: "space-between", alignItems:"center", width: "100%"}}> 
                            <View style={{flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "100%", borderBottomWidth: 1, borderBottomColor: "#D9B08C", marginBottom: 10}}>
                              <Entypo name="location" size={14} color="#D9B08C" /> 
                              <View>
                                <Text style={{ color: "#DDE2E4", fontWeight: "800", fontSize: 13}}>{item.location}</Text>
                              </View>
                            </View>
                            <View>
                              <Text style={{ color: "white", fontWeight: "800", fontSize: 12}}>{item.date}</Text>
                            </View>
                            <View style={{backgroundColor: "rgba(217, 176, 140, 0.2)", padding:10, width: "100%", borderRadius: 5}}>
                              <Text style={{ color: "white", fontWeight: "500", fontSize: 14}}>{item.recording}</Text>
                            </View>
                          </View>
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
    backgroundColor: "rgb(35,35,36)",
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
