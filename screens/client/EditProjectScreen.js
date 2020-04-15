import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { editProject } from "../../actions/index";
import { connect } from "react-redux";

class EditProjectScreen extends Component {
  state = {
    title: this.props.route.params.title,
    content: this.props.route.params.content,
    key: this.props.route.params.key
  };

  submit = () => {
    this.props.editProject(
      this.state.title,
      this.state.content,
      this.state.key
    );

    this.setState({
      title: "",
      content: "",
      key: ""
    });

    this.props.navigation.navigate("ProjectListScreen");
  };

  render() {
    console.log("00000000000000000", this.props.route.params.title);
    return (
      <View style={styles.container}>
        <Text>Post</Text>
        <TextInput
          style={{
            marginTop: 20,
            height: 40,
            borderColor: "gray",
            borderWidth: 1
          }}
          placeholder="title"
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
        />
        <TextInput
          style={{
            marginTop: 20,
            height: 90,
            borderColor: "gray",
            borderWidth: 1
          }}
          placeholder="content"
          onChangeText={content => this.setState({ content })}
          value={this.state.content}
        />
        <Button title="Submit" onPress={this.submit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#fff"
  }
});

export default connect(null, { editProject })(EditProjectScreen);
