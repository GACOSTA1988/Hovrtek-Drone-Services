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
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import hovrtekLogo from "../../assets/hovrtek_logo.png";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import Notification from "./Notification";
import { getMessages } from "../../actions/messages.js";
import { connect } from "react-redux";
import _ from "lodash";
import * as firebase from "firebase";
import { NotificationContext } from "../../context";
import { HeaderContext } from "../../context";

const GlobalHeader = (props, { getMessages }) => {
  const navigation = useNavigation();

  useEffect(() => {
    props.getMessages();
  }, []);

  let userID = null;
  let unreadMessages = [];
  const [ noteVisible, setNoteVisible ] = useState(false);
  if (firebase.auth().currentUser && props.listOfMessages) {
    userID = firebase.auth().currentUser.uid;
    props.listOfMessages.forEach((message) => {
      if (message.userTwoID === userID && !message.read) {
        if (!unreadMessages.includes(message)) {
          unreadMessages.push(message);
        }
      }
    });
  }

  return (
    <View style={styles.MainHeaderWrapper}>
         <View style={props.isHome? styles.navIconLeftHidden : styles.navIconLeft} pointerEvents={props.isHome? 'none' : 'auto'}>
            <Ionicons
            style={styles.backIcon}
            onPress={() => {navigation.goBack()}}
            name="ios-arrow-back"
            size={45}
            color="white"
            resizeMode="contain"
            />
        </View>
        <View styles={styles.logoContainer}>
          <Image source={hovrtekLogo} style={styles.hovrtekLogo} />
        </View>
        <View style={props.isHome? styles.navIconRight : styles.navIconRightHidden} pointerEvents={props.isHome? 'auto' : 'none'}>
          {unreadMessages.length > 0 ? (
            <View style={styles.dot}>
              <Text />
            </View>
          ) : (
            <View />
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
        </View>
    </View>
  );
};

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  MainHeaderWrapper: {
    // backgroundColor: "#092455",
    // justifyContent: "center",
    // ...Platform.select({
    //   ios: {
    //     marginTop: 18,
    //     marginBottom: 20,
    //     width: 425,
    //     height: 60,
    //     flexDirection: "row",
    //     alignItems: "center",
    //     borderBottomWidth: 10,
    //     borderBottomColor: "grey",
    //   },
    //   android: {
    //     left: -16,
    //     alignSelf: "stretch",
    //     width: width,
    //     height: 80,
    //   },
    // }),
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    width: width,
    flex: 1,
  },
  hovrtekLogo: {
    // position: "absolute",
    ...Platform.select({
      ios: {
        width: 170,
        height: 30,
        // left: 0,
        // right: 10,
        // top: 7,
        // marginLeft: 20,
      },
      android: {
        width: 210,
        height: 40,
        // left: 10,
        // top: "35%",
      },
    }),
  },

  hamburger: {
    alignSelf: "flex-end",
    ...Platform.select({
      ios: {
        // marginLeft: 300,
        // margin: 0,
        marginRight: 15,
      },
      android: {
        // right: 10,
        // top: 10,
        marginRight: 15,
      },
    }),
  },
  dot: {
    ...Platform.select({
      ios: {
        margin: 5,
        position: "absolute",
        bottom: 10,
        right: 35,
      },
      android: {
        margin: 10,
        position: "absolute",
        right: 0,
        bottom: 6,
      },
    }),
    backgroundColor: "red",
    width: 10,
    height: 10,
    borderRadius: 90,
    zIndex: 2
  },
  // note: {
  //   ...Platform.select({
  //     ios: {
  //       top: 70,
  //       right: 20,
  //     },
  //     android: {
  //       top: 20,
  //       alignSelf: "center",
  //     },
  //   }),
  //   position: "absolute",
  //   backgroundColor: "white",
  //   borderRadius: 15,
  //   paddingLeft: 20,
  //   paddingRight: 15,
  //   paddingBottom: 20,
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.23,
  //   shadowRadius: 2.62,
  //   flexDirection: "row",
  // },
  messageText: {
    paddingTop: 20,
  },
  navIconLeft: {
    flex: 1,
    width: '25%',
  },
  navIconLeftHidden: {
    opacity: 0,
    flex: 1,
    width: '25%',
  },
  navIconRight: {
    flex: 1,
    width: '25%',
  },
  navIconRightHidden: {
    opacity: 0,
    flex: 1,
    width: '25%',
  },
  logoContainer: {
    flex: 1,
    width: '50%',
  },
  backIcon: {
    marginLeft: 15,
  }
});

function mapStateToProps(state) {
  const listOfMessages = _.map(state.messagesList.messagesList, (val, key) => {
    return {
      ...val,
      key: key,
    };
  });
  return {
    listOfMessages,
  };
}

export default connect(mapStateToProps, { getMessages })(GlobalHeader);
