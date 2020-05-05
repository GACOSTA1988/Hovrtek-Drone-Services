import React, { useState, useEffect } from "react";
import { TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TextInput,
  FlatList,
  TouchableHighlight,
  Alert
  } from "react-native";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,

} from "@expo/vector-icons";
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { getMessages, postMessages } from "../../actions/index";
import * as firebase from 'firebase';
import _ from "lodash";
import { AntDesign } from "@expo/vector-icons";

function ChatScreen(props, { getMessages, postMessages }) {

  const navigation = useNavigation();

  const [body, setBody] = useState("");

  useEffect(() => {
    props.getMessages();
  }, []);

  let sender = null;
  if (firebase.auth().currentUser) {
    sender = firebase.auth().currentUser;
  }

  let recipient = null;
  if (props.route.params) {
    recipient = props.route.params;
  }

  let conversation = [];
  if (sender && recipient) {
    props.listOfMessages.forEach((message) => {
      if ((message.userOneID === sender.uid && message.userTwoID === recipient.userID) || (message.userOneID === recipient.userID && message.userTwoID === sender.uid)) {
        conversation.push(message);
      }
    });
  }

  const send = (e) => {
    e.preventDefault();

    if (!body) {
      Alert.alert("Message is empty!");
      return;
    }

    let timestamp = new Date();
    props.postMessages(sender.uid, recipient.userID, timestamp, body);
    setBody("");
  }


  return (
    <View>
      <View style={styles.inputBackButtoncontainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            autoCorrect={true}
            placeholder="Send message..."
            placeholderTextColor="grey"
            value={body}
            onChangeText={setBody}
            style={styles.input}
          />
          <AntDesign 
            style={styles.plusIcon} 
            name="plus" 
            size={25}
            onPress={send} 
          />
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.pop()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.ScrollView}>
        <FlatList
          inverted={true}
          style={{ width: "100%"}}
          data={conversation}
          keyExtractor={item => item.key}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  elevation: 8,
                  borderRadius: 15,
                  backgroundColor: "#3E90D0",
                  marginBottom: 15,
                  padding: 20,
                }}
              >
                <View>
                  <Text>
                    Message sent at: {item.timestamp}
                  </Text>
                  <Text>
                    Message body: {item.body}{" "}
                  </Text>
                </View>
              </View>
            );
          }}
        />
        <View>
        </View>
  
    <Text style={styles.dummy}>dummy</Text>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBackButtoncontainer: {
    alignItems: "center"
  },
  input: {
    marginTop: 30,
    width: "80%", 
    height:45,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: "lightgray"
  },
  inputWrapper:{
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30
  },
  plusIcon: {
    position: 'absolute',
    marginTop: 30,
    top: -27,
    right: 14,
    color: 'gray'
   
  },
  backButton: {
    marginTop: 20,
    marginBottom: 10,
    width: 60,
    height: 30,
    backgroundColor: "#092455",
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText:{
    color: 'white'
  },
  dummy: {
    marginTop: 200,
    color: "lightgray"
  }
});

function mapStateToProps(state) {
  const listOfMessages = _.map(state.messagesList.messagesList, (val, key) => {
    return {
      ...val,
      key: key
    };
  });
  return {
    listOfMessages
  };
}

export default connect(mapStateToProps, { getMessages, postMessages })(
  ChatScreen
);
