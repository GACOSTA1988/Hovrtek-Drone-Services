import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Header,
  Image,
  ShadowPropTypesIOS,
  Platform,
  Dimensions,
  TouchableOpacity,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import hovrtekLogo from "../assets/hovrtek_logo.png";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import Notification from './Notification';
import { getMessages } from '../actions/messages.js';
import { connect } from "react-redux";
import _ from "lodash";
import * as firebase from 'firebase';
import { NotificationContext } from "../context";

const MainHeader = (props, { getMessages }) => {
  const navigation = useNavigation();

  useEffect(() => {
    props.getMessages();
  }, []);

  let userID = null;
  let unreadMessages = [];
  const [noteVisible, setNoteVisible] = useState(false);
  if (firebase.auth().currentUser && props.listOfMessages) {
    userID = firebase.auth().currentUser.uid;
    props.listOfMessages.forEach((message) => {
      if ((message.userTwoID === userID) && !message.read) {
        if (!unreadMessages.includes(message)) {
          unreadMessages.push(message);
        }
      }
    })
    console.log("UNREAD MESSAGES", unreadMessages);
  }

  return (
    <View style={styles.MainHeaderWrapper}>
      <NotificationContext.Provider value={[unreadMessages, noteVisible]}>
        <Image source={hovrtekLogo} style={styles.hovrtekLogo} />
        {unreadMessages.length > 0 ? (
          <View style={styles.dot}><Text></Text></View>
        ) : (
          <View></View>
        )}
        {noteVisible ? (
          <View style={styles.note}>
            <TouchableOpacity
              onPress={() => setNoteVisible(false)}
            >
              <Text style={styles.messageText}>You have {unreadMessages.length} new messages</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}
        <Ionicons
          style={styles.hamburger}
          onPress={() => {
            navigation.dispatch(DrawerActions.toggleDrawer());
          }}
          name="ios-menu"
          size={45}
          color="white"
          resizeMode="contain"
        />
      </NotificationContext.Provider>
    </View>
  );
};

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  MainHeaderWrapper: {
    backgroundColor: "#092455",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        marginTop: 18,
        marginBottom: 20,
        width: 425,
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 10,
        borderBottomColor: "grey",
      },
      android: {
        left: -16,
        alignSelf: "stretch",
        width: width,
        height: 80,
      },
    }),
  },

  hovrtekLogo: {
    position: "absolute",
    ...Platform.select({
      ios: {
        width: 170,
        height: 30,
        left: 0,
        right: 10,
        top: 7,
        marginLeft: 20,
      },
      android: {
        width: 210,
        height: 40,
        left: 10,
        top: '35%',
      },
    }),
  },

  hamburger: {
    alignSelf: "flex-end",
    ...Platform.select({
      ios: {
        marginLeft: 300,
        margin: 0,
      },
      android: {
        right: 10,
        top: 10,
      },
    }),
  },
  dot: {
    backgroundColor: "red",
    margin: 5,
    width: 10,
    height: 10,
    position: "absolute",
    right: 35,
    borderRadius: 90
  },
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
  },
});

function mapStateToProps(state) {
  const listOfMessages = _.map(
    state.messagesList.messagesList,
    (val, key) => {
      return {
        ...val,
        key: key,
      };
    }
  );
  return {
    listOfMessages
  };
}

export default connect(mapStateToProps, { getMessages })(MainHeader);
