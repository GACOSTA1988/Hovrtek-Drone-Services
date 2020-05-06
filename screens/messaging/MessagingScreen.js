import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList } from "react-native";
import { connect } from "react-redux";
import { getMessages } from "../../actions/messages";
import { getPilotProfiles } from "../../actions/pilotProfiles";
import { getClientProfiles } from "../../actions/clientProfiles";
import * as firebase from 'firebase';
import _ from "lodash";

function MessagingScreen(props, { getMessages, getPilotProfiles, getClientProfiles }) {

  useEffect(() => {
    props.getMessages();
    props.getPilotProfiles();
    props.getClientProfiles();
  }, []);

  let user = null;
  if (firebase.auth().currentUser) {
    user = firebase.auth().currentUser;
  }

  let contacts = [];
  let contact = null;
  let listOfProfiles = null;

  if (props.listOfPilotProfiles && props.listOfClientProfiles) {
    listOfProfiles = props.listOfPilotProfiles.concat(props.listOfClientProfiles);
    // console.log("LIST OF PROFILES", listOfProfiles);
  }

  if (props.listOfMessages && listOfProfiles) {
    props.listOfMessages.forEach((message) => {
      if (message.userOneID === user.uid) {
        contact = listOfProfiles.find((x) => x.userID === message.userTwoID);
        if (contact && !contacts.includes(contact)) {
          contacts.push(contact);
        }
      } else if (message.userTwoID === user.uid) {
        contact = listOfProfiles.find((x) => x.userID === message.userOneID);
        if (contact && !contacts.includes(contact)) {
          contacts.push(contact);
        }
      }
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Messaging Screen</Text>
      </View>
      {contacts ? (
        <FlatList
        data={contacts}
        keyExtractor={item => item.key}
        renderItem={({item}) => {
          return (
            <View>
            {item.pilotFirstName ? (
              <TouchableOpacity
                style={styles.contact}
                onPress={() => props.navigation.navigate("ChatScreen", { ...item })}
              >
                  <Text style={styles.contactText}>{item.pilotFirstName}{" "}{item.pilotLastName}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.contact}
                onPress={() => props.navigation.navigate("ChatScreen", { ...item })}
              >
                <Text>{item.firstName}{" "}{item.lastName}</Text>
              </TouchableOpacity>
            )}
            </View>
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
  const listOfClientProfiles = _.map(state.clientProfilesList.clientProfilesList, (val, key) => {
    return {
      ...val,
      key: key
    };
  });
  // console.log("LIST OF CLIENT PROFILES", listOfClientProfiles, "LIST OF PILOT PROFILES", listOfPilotProfiles);
  return {
    listOfMessages,
    listOfPilotProfiles,
    listOfClientProfiles
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
    fontSize: 30,
    backgroundColor: 'gray'
  },
  titleWrapper: {
    width: "100%",
    textAlign: 'center',


  },
  contact: {
    width: 250,
    height: 50,
    backgroundColor: "#092455",
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30
  },
  contactText: {
    color: 'white',
    fontSize: 20
  },

});

export default connect(mapStateToProps, { getMessages, getPilotProfiles, getClientProfiles })(MessagingScreen);
