import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import { getProjects, deleteProject } from "../../actions/index";
import _ from "lodash";
import { Ionicons } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";


class ProjectListScreen extends Component {
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    return (
      <View style={styles.projectListWrapper}>
        <TouchableOpacity style={styles.ClientProjectListTextWrapper}>
          <Text style={styles.clientText}>Current Projects</Text>
        </TouchableOpacity>

        <View style={styles.projectCard}>
          <TouchableOpacity>
            <FlatList
              style={{ width: "100%" }}
              data={this.props.listOfProjects}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.key}
              renderItem={({ item }) => {
                return (
                  <View>

                    <Text> {item.location} </Text>
                    <Text> {item.date} </Text>
                    <Text> {item.recording} </Text>
                    <View>
                      <TouchableHighlight
                        onPress={() =>
                          this.props.navigation.navigate("EditProjectScreen", {
                            ...item
                          })
                        }
                      >
                        <View>
                          <Ionicons name="ios-pizza" size={32} color="green" />
                        </View>
                      </TouchableHighlight>
                      <TouchableHighlight
                        onPress={() => this.props.deleteProject(item.key)}
                      >
                        <View>
                          <Ionicons name="ios-pizza" size={32} color="red" />
                        </View>
                      </TouchableHighlight>
                    </View>

                  </View>
                );
              }}
            />
          </TouchableOpacity>
        </View>
     
      </View>
    );
  }
}

const styles = StyleSheet.create({
  projectCard: {
    backgroundColor: "darkgray",
    width: 380,
    borderWidth: 1,
    padding: 6
  },
  clientText: {
    fontSize: 30,
    color: "darkblue"
  },
  ClientProjectListTextWrapper: {
    marginBottom: 20
  },
  projectListWrapper: {
    alignItems: "center"
  },
  testText: {
    fontWeight: 'bold',
    fontSize: 17
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
