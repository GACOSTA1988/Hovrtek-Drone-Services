import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { NotificationContext } from "../context";

const Notification = () => {

  const noteContext = useContext(NotificationContext);
  const messages = noteContext[0];
  const visible = noteContext[1];

  if (visible) {
    return (
      <View style={styles.note}>
        <TouchableOpacity
          onPress={() => Alert.alert("pressed")}
        >
          <Text style={styles.messageText}>You have {messages.length} new messages</Text>
        </TouchableOpacity>
      </View>
    )
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  note: {
    ...Platform.select({
      ios: {
        top: 70,
        right: 20
      },
      android: {
        top: 20,
        alignSelf: "center"
      }
    }),
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 15,
    paddingLeft: 20,
    paddingRight: 15,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    flexDirection: "row"
  },
  messageText: {
    paddingTop: 20
    // left: 10,
    // color: "white"
  },
  ex: {
    paddingLeft: 10,
    paddingBottom: 20,
    paddingTop: 10
  }
})

export default Notification;
