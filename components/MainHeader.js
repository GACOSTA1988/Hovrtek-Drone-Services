import React, { useEffect } from "react";
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
import { getMessages } from '../actions/index';
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
  if (firebase.auth().currentUser && props.listOfMessages) {
    userID = firebase.auth().currentUser.uid;
    props.listOfMessages.forEach((message) => {
      if ((message.userTwoID === userID) && !message.read) {
        unreadMessages.push(message);
      }
    })
  }

  return (
    <View style={styles.MainHeaderWrapper}>
      <NotificationContext.Provider value={unreadMessages}>
        <Image source={hovrtekLogo} style={styles.hovrtekLogo} />
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
        <Notification />
      </NotificationContext.Provider>
    </View>
  );
};

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  MainHeaderWrapper: {
    ...Platform.select({
      ios: {
        marginTop: 18,
        marginBottom: 20,
        backgroundColor: "#092455",
        width: 425,
        height: 60,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 10,
        borderBottomColor: "grey",
      },
      android: {
        backgroundColor: "#092455",
        left: -16,
        // top: 5,
        alignSelf: "stretch",
        width: width,
        height: 80,
        justifyContent: "center"
      },
    }),
  },

  hovrtekLogo: {
    ...Platform.select({
      ios: {
        width: 170,
        height: 30,
        position: "absolute",
        left: 0,
        right: 10,
        top: 7,
        marginLeft: 20,
      },
      android: {
        width: 210,
        height: 40,
        position: "absolute",
        left: 10,
        top: '35%',
      },
    }),
  },

  hamburger: {
    ...Platform.select({
      ios: {
        alignSelf: "flex-end",
        marginLeft: 300,
        margin: 0,
      },
      android: {
        alignSelf: "flex-end",
        right: 10,
        top: 10,
      },
    }),
  }
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
