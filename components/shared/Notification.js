import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { createContext } from "react";

const Notification = () => {
  const NotificationContext = createContext();
  const noteContext = useContext(NotificationContext);
  const messages = noteContext[0];
  const [ visible, setVisible ] = useState(noteContext[1]);

  if (visible) {
    return (
      <View style={styles.note}>
        <TouchableOpacity onPress={() => setVisible(false)}>
          <Text style={styles.messageText}>
            You have {messages.length} new messages
          </Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  note: {
    ...Platform.select({
      ios: {
        top: 70,
        right: 20,
      },
      android: {
        top: 20,
        alignSelf: "center",
      },
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
    flexDirection: "row",
  },
  messageText: {
    paddingTop: 20,
  },
  ex: {
    paddingLeft: 10,
    paddingBottom: 20,
    paddingTop: 10,
  },
});

export default Notification;