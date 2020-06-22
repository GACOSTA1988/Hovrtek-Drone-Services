import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Dimensions,
  Switch,
  Image,
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
import { TouchableOpacity } from "react-native-gesture-handler";

const GlobalHeader = (props, { getMessages }) => {
  const [isEnabled, setIsEnabled] = useState(props.isMap ?? false);
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
  
  function toggleSwitch (value){
    if(value){
      navigation.navigate("MapComponent")
    } else {
      navigation.navigate("JobListScreen")
      setIsEnabled(value)
    }
  }

  return (
    <View style={styles.MainHeaderWrapper}>
         <View style={props.isMappable ? styles.navIconLeft : props.isSplash ? styles.navIconLeftHidden : props.isHome ? styles.navIconLeftHidden : styles.navIconLeft} pointerEvents={props.isMappable ? "auto" : props.isSplash ? "none" : props.isHome? 'none' : 'auto'}>
            {props.isMappable ? 
            <View style={{flexDirection:"row", flex:1, alignItems:"center", }}>
            <Ionicons name="md-globe" size={25} color="#DDE2E4" style={{marginHorizontal: 1,}}/>       
            <Switch
            trackColor={{ false: "#464646", true: "darkgrey" }}
            thumbColor={isEnabled ? "#DDE2E4" : "#DDE2E4"}
            onValueChange={toggleSwitch}
            ios_backgroundColor={"rgba(221,226,228, 0.2)"}
            value={isEnabled}
            style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
            />
            </View>
            :
            <Ionicons
            style={styles.backIcon}
            onPress={() => {navigation.goBack()}}
            name="ios-arrow-back"
            size={45}
            color="#DDE2E4"
            resizeMode="contain"
            />
            }
        </View>
        <View styles={styles.logoContainer}>
          {props.subheaderTitle ? 
            <Text style={{fontSize: 30, fontWeight: "200", color: "white", }}>{props.subheaderTitle}</Text> 
          :
          <Image source={hovrtekLogo} style={styles.hovrtekLogo} />
          }
        </View>
        <View style={props.isSplash ? styles.navIconRightHidden : props.isHome? styles.navIconRight : styles.navIconRightHidden} pointerEvents={ props.isSplash ? "none" :props.isHome? 'auto' : 'none'}>
          <Ionicons
          style={styles.hamburger}
          onPress={() => {
            navigation.dispatch(DrawerActions.toggleDrawer());
          }}
          name="ios-menu"
          size={45}
          color="#DDE2E4"
          resizeMode="contain"
          /> 
        </View>
    </View>
  );
};

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  MainHeaderWrapper: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    width: width - 35,
    flex: 1,
  },
  hovrtekLogo: {
    ...Platform.select({
      ios: {
        width: 170,
        height: 30,
      },
      android: {
        width: 170,
        height: 30,
      },
    }),
  },
  hamburger: {
    alignSelf: "flex-end",
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