import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList, Image } from "react-native";
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
  let listOfMyMessages = [];

  if (props.listOfPilotProfiles && props.listOfClientProfiles && props.listOfMessages) {
    listOfProfiles = props.listOfPilotProfiles.concat(props.listOfClientProfiles);
    props.listOfMessages.forEach((message) => {
      if ((message.userOneID === user.uid) || (message.userTwoID === user.uid)) {
        listOfMyMessages.push(message);
      }
    })
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

  // if (listOfMyMessages && listOfProfiles) {
  //   listOfProfiles.forEach((profile) => {
  //     listOfMessages.forEach((message) => {
  //       if ((message.userOneID === profile.userID) || (message.userTwoID === profile.userID)) {
  //
  //       }
  //     })
  //   })
  // }

  function goToChat(item) {
    props.navigation.navigate("ChatScreen", { ...item });
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
            <View style={{flexDirection: "row"}}>
              {item.profileImageUrl ? (
                <Image
                  source={{
                    uri: item.profileImageUrl
                  }}
                  style={styles.profilePic}
                />
              ) : (
                <Image
                source={{
                  uri: "https://thenypost.files.wordpress.com/2017/07/ameliaearhart.jpg?quality=90&strip=all&w=1200"
                }}
                style={styles.profilePic}
                />
              )}
              {item.pilotFirstName ? (
                <TouchableOpacity
                  style={styles.contact}
                  onPress={() => {goToChat(item)}}
                >
                  <Text style={styles.names}>{item.pilotFirstName}{" "}{item.pilotLastName}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.contact}
                  onPress={() => goToChat(item)}
                >
                  <Text style={styles.names}>{item.firstName}{" "}{item.lastName}</Text>
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
  },
  title: {
    marginTop: 40,
    fontSize: 30,
    textAlign: "center"
  },
  contact: {
    paddingTop: 30
  },
  names: {
    fontSize: 20,
    fontWeight: "bold"
  },
  profilePic: {
    height: 70,
    width: 70,
    borderRadius: 90,
    borderWidth: 4,
    borderColor: "#092455",
    margin: 15
  }

});

export default connect(mapStateToProps, { getMessages, getPilotProfiles, getClientProfiles })(MessagingScreen);
