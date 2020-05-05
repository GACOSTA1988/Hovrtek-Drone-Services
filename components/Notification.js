import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const Notification = (props) => {

  let message = "This is a notification!!!!!";
  if (props.route) {
    message = props.route.params.body;
  }

  if (message) {
    return (
      <View style={styles.note}>
        <TouchableOpacity>
          <Text style={styles.messageText}>{message}</Text>
        </TouchableOpacity>
      </View>
    )
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  note: {
    position: "absolute",
    top: 70,
    right: 10,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    // borderWidth: 1,
    // borderColor: "#092455",
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,

  },
  messageText: {
    // left: 10,
    // color: "white"
  }
})

export default Notification;
