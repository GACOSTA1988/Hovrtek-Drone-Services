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
import { getProjects } from "../../actions/index";
import _ from "lodash";

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
            <Text> CURRENT PROJECTS </Text>
            <FlatList
              style={{ width: "100%" }}
              data={this.props.listOfProjects}
              keyExtractor={item => item.key}
              renderItem={({ item }) => {
                return (
                  <View>
                    <Text style={styles.testText}> {item.location} </Text>
                    <Text> {item.date} </Text>
                    <Text> {item.recording} </Text>
                    <Text> {item.light} </Text>
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

export default connect(mapStateToProps, { getProjects })(ProjectListScreen);
