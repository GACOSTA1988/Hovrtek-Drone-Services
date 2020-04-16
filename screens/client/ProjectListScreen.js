import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  FlatList,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { getProjects, deleteProject } from "../../actions/index";
import _ from "lodash";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

class ProjectListScreen extends Component {
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    return (
      <View style={styles.projectListWrapper}>
        <ScrollView>
          <TouchableOpacity style={styles.ClientProjectListTextWrapper}>
            <Text style={styles.clientText}>Current Projects</Text>
          </TouchableOpacity>

          <View style={styles.projectCard}>
            <TouchableOpacity>
              <FlatList
                style={{ width: "100%" }}
                data={this.props.listOfProjects}
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
                          this.props.navigation.navigate(
                            "ProjectDetailsScreen",
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
                            this.props.navigation.navigate(
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
                          onPress={() => this.props.deleteProject(item.key)}
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
  }
}

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
    alignItems: "center"
  }
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

export default connect(mapStateToProps, { getProjects, deleteProject })(
  ProjectListScreen
);
