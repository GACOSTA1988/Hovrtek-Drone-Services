import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button
} from "react-native";
import { editProjects } from "../../actions/index";
import { connect } from "react-redux";

class EditProjectScreen extends Component {
  state = {
    title: "",
    content: ""
  };
  submit = () => {
    this.props.navigation.navigate("ProjectListScreen");
  };

  render() {
    return (
      <View style={styles.editProjectListWrapper}>
        <TouchableOpacity style={styles.editProjectListTextWrapper}>
          <Text style={styles.editProjectText}>Edit Project!!</Text>
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
          <Button title="Submit Updates!" onPress={this.submit} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  editProjectListWrapper: {
    alignItems: "center"
  },
  editProjectListForm: {
    backgroundColor: "darkgray",
    width: 380,
    borderWidth: 1,
    padding: 6
  },
  editProjectText: {
    fontSize: 30,
    color: "darkblue"
  },
  editProjectListTextWrapper: {
    marginBottom: 20
  }
});

export default connect(null, { editProjects })(EditProjectScreen);
