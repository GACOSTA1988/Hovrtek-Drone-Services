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
    // change message to read
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
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
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
                padding: 20
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
        <TextInput
          placeholder="Send message..."
          placeholderTextColor="grey"
          value={body}
          onChangeText={setBody}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={send}>
          <Text>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.pop()}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  input: {
    width: "100%"
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
