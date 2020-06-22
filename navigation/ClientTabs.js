import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ClientHomeStackNavigator from "./ClientHomeStackNavigator";
import ClientProjectStackNavigator from "./ClientProjectStackNavigator";
import MessagingNavigation from './MessagingNavigation';
import { FontAwesome5, Entypo, FontAwesome } from '@expo/vector-icons';
import * as firebase from "firebase";
import { getMessages } from "../actions/messages";
import { connect } from "react-redux";
import _ from "lodash";
import { StyleSheet, View, Text } from "react-native";

function ClientTabs(props) {
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
          component={ClientHomeStackNavigator} 
          options={{
            tabBarIcon: ({color}) => (<FontAwesome name="plus" size={28} color={color} />),
          }}
          />
        <Tabs.Screen 
          name="Projects" 
          component={ClientProjectStackNavigator}
          options={{
            tabBarIcon: ({color}) => (<FontAwesome5 name="helicopter" size={22} color={color}/>)
          }} />
        <Tabs.Screen 
          name="Messages" 
          component={MessagingNavigation}
          options={unreadMessages.length > 0 ? {
            tabBarIcon: ({color}) => (
              <View>
                <View style={styles.outerDot}>
                  <View style={styles.innerDot}>
                    <Text />
                  </View>
                </View>
                <Entypo name="message" size={30} color={color} resizeMode="contain" style={styles.messageIcon}/>
              </View>  ) } : {
              tabBarIcon: ({color}) => (<Entypo name="message" size={30} color={color} />) } }
        />
      </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  innerDot: {
    ...Platform.select({
      ios: {
        position: "absolute",
        bottom: 2,
        right: 2,
      },
      android: {
        position: "absolute",
        right: 2,
        bottom: 2,
      },
    }),
    backgroundColor: "red",
    width: 10,
    height: 10,
    borderRadius: 90,
    zIndex: 3
  },
  outerDot: {
    ...Platform.select({
      ios: {
        position: "absolute",
        bottom: 18,
        right: -5,
      },
      android: {
        position: "absolute",
        right: -5,
        bottom: 9,
      },
    }),
    // backgroundColor: "#DDE2E4",
    width: 15,
    height: 15,
    borderRadius: 90,
    zIndex: 2
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
  getMessages })(ClientTabs);