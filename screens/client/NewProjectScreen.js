import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button
} from "react-native";
import { postProjects } from "../../actions/index";
import { connect } from "react-redux";

class NewProjectScreen extends Component {
  state = {
    title: "",
    content: ""
  };
  submit = () => {
    this.props.postProjects(this.state.title, this.state.content);
    this.setState({
      title: "",
      content: ""
    });
    this.props.navigation.navigate("ProjectListScreen");
  };

  render() {
    return (
      <View style={styles.newProjectListWrapper}>
        <TouchableOpacity style={styles.newProjectListTextWrapper}>
          <Text style={styles.newProjectText}>Create a New Project</Text>
          <TextInput
            placeholder="title"
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
          />
          <TextInput
            placeholder="content"
            onChangeText={content => this.setState({ content })}
            value={this.state.content}
          />
          <Button title="Submit" onPress={this.submit} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  newProjectListWrapper: {
    alignItems: "center"
  },
  newProjectListForm: {
    backgroundColor: "darkgray",
    width: 380,
    borderWidth: 1,
    padding: 6
  },
  newProjectText: {
    fontSize: 30,
    color: "darkblue"
  },
  newProjectListTextWrapper: {
    marginBottom: 20
  }
});

export default connect(null, { postProjects })(NewProjectScreen);
