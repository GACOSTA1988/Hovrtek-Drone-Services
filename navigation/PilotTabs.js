import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PilotHomeStackNavigator from "./PilotHomeStackNavigator";
import PilotJobsStackNavigator from "./PilotJobsStackNavigator";
import MessagingNavigation from './MessagingNavigation';
import { FontAwesome, FontAwesome5, Entypo } from '@expo/vector-icons';
import * as firebase from "firebase";
import { getMessages } from "../actions/messages";
import { connect } from "react-redux";
import _ from "lodash";
import { StyleSheet, View, Text } from "react-native";

function PilotTabs(props) {
  const Tabs = createBottomTabNavigator();

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
    <Tabs.Navigator tabBarOptions={{activeBackgroundColor: "#DDE2E4", inactiveBackgroundColor: "#161616", activeTintColor: "#161616", inactiveTintColor: "#DDE2E4", showLabel: false}}>
      <Tabs.Screen 
        name="Home" 
        component={PilotHomeStackNavigator} 
        options={{
          tabBarIcon: ({color}) => (<FontAwesome name="home" size={26} color={color} />),
        }}
        />
      <Tabs.Screen 
        name="Projects" 
        component={PilotJobsStackNavigator}
        options={{
          tabBarIcon: ({color}) => (<FontAwesome5 name="helicopter" size={22} color={color}/>)
        }} />
      <Tabs.Screen 
        name="Messages" 
        component={MessagingNavigation}
        options={unreadMessages.length > 0 ? {
          tabBarIcon: ({color}) => (
            <View>
              <View style={styles.dot}>
                <Text />
              </View>
              <Entypo name="message" size={30} color={color} resizeMode="contain" style={styles.messageIcon}/>
            </View>  ) } : {
            tabBarIcon: ({color}) => (<Entypo name="message" size={30} color={color} />) } }
      />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  dot: {
    ...Platform.select({
      ios: {
        position: "absolute",
        top: 4,
        right: -2,
      },
      android: {
        position: "absolute",
        right: -1,
        top: 4,
      },
    }),
    backgroundColor: "red",
    width: 10,
    height: 10,
    borderRadius: 90,
    zIndex: 3
  },
  msesageIcon: {
    flex: 1
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

export default connect(mapStateToProps, {
  getMessages })(PilotTabs);