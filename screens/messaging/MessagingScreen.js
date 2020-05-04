import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList } from "react-native";
import { connect } from "react-redux";
import { getMessages, getPilotProfiles } from "../../actions/index";
import * as firebase from 'firebase';
import _ from "lodash";

function MessagingScreen(props, { getMessages, getPilotProfiles }) {

  useEffect(() => {
    props.getMessages();
    props.getPilotProfiles();
  }, []);

  let user = null;
  if (firebase.auth().currentUser) {
    user = firebase.auth().currentUser;
  }

  let contacts = [];
  let contact = null;

  if (props.listOfMessages && (props.listOfPilotProfiles.length)) {
    props.listOfMessages.forEach((message) => {
      if (message.userOneID === user.uid) {
        contact = props.listOfPilotProfiles.find((x) => x.userID === message.userTwoID);
        console.log("message", message);
        if (contact && !contacts.includes(contact)) {
          contacts.push(contact);
        }
      } else if (message.userTwoID === user.uid) {
        contact = props.listOfPilotProfiles.find((x) => x.userID === message.userTwoID);
        if (contact && !contacts.includes(contact)) {
          contacts.push(contact);
        }
      }
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messaging Screen</Text>
      {contacts ? (
        <FlatList
        data={contacts}
        keyExtractor={item => item.key}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.contact}
              onPress={() => props.navigation.navigate("ChatScreen", { ...item })}
            >
              <Text>{item.pilotFirstName}{" "}{item.pilotLastName}</Text>
            </TouchableOpacity>
          )
        }}
        />
      ) : (
        <Text>No contacts yet</Text>
      )}
    </View>
  )
};

function mapStateToProps(state) {
  const listOfMessages = _.map(state.messagesList.messagesList, (val, key) => {
    return {
      ...val,
      key: key
    };
  });
  const listOfPilotProfiles = _.map(state.pilotProfilesList.pilotProfilesList, (val, key) => {
    return {
      ...val,
      key: key
    };
  });
  return {
    listOfMessages,
    listOfPilotProfiles
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginTop: 40,
    fontSize: 30
  },
  contact: {
    paddingTop: 40
  }

});

export default connect(mapStateToProps, { getMessages, getPilotProfiles })(MessagingScreen);
