import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import {
  Ionicons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getMessages, postMessages, readMessage } from "../../actions/messages";
import * as firebase from "firebase";
import _ from "lodash";
import moment from "moment";

function ChatScreen(props, { getMessages, postMessages, readMessage }) {
  const navigation = useNavigation();

  const [body, setBody] = useState("");
  const listRef = useRef(null);
  const [behavior, setBehavior] = useState(null);

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

  let hour = 3.6e6;
  let oneDay = 86400000;
  // let yesterday = date - 1000 * 60 * 60 * 24 * 1;
  let currentTimestamp = new Date();
  let databaseTimestamp = null;
  props.listOfMessages.forEach((message) => {
    if (
      message.userOneID === sender.uid &&
      message.userTwoID === recipient.userID
    ) {
      databaseTimestamp = message.timestamp;
    }
  });

  let conversation = [];
  if (sender && recipient) {
    props.listOfMessages.forEach((message) => {
      if (
        message.userOneID === sender.uid &&
        message.userTwoID === recipient.userID
      ) {
        message.author = 'sender';
        conversation.push(message);
      } else if (
        message.userOneID === recipient.userID &&
        message.userTwoID === sender.uid
        ) {
          message.author = 'recipient';
          conversation.push(message);
        }
    });
    readMessages();
  }

  function readMessages() {
    conversation.forEach((message) => {
      if (
        message.userTwoID === sender.uid &&
        message.userOneID === recipient.userID
      ) {
        props.readMessage(true, message.key);
      }
    });
  }

  const send = (e) => {
    e.preventDefault();

    if (!body) {
      Alert.alert("Message is empty!");
      return;
    }

    let isNewTimestamp = false;
    let read = false;
    let userOneID = sender.uid;
    let userTwoID = recipient.userID;

    let timestamp = moment(new Date()).format("LLLL");

    // TIMESTAMP WITHOUT MOMENT FORMATTING
    // let timestamp = new Date()

    props.postMessages(
      userOneID,
      userTwoID,
      body,
      read,
      timestamp,
      isNewTimestamp
    );

    setBody("");
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS == 'ios' ? behavior : null}
      keyboardVerticalOffset={180}>
      <ScrollView 
        onKeyboardWillShow={() => setBehavior("padding")}
        onKeyboardWillHide={() => setBehavior(null)}
        ref={listRef}
        onLayout={() => listRef.current.scrollToEnd( {animated: false} )}
        onContentSizeChange={() => listRef.current.scrollToEnd()}
        style={styles.messagesScroll}>
          <FlatList
            style={styles.messagesList}
            data={conversation}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => {
              return (
                <View style={item.author === 'sender' ? styles.messagingContainer : styles.messagingContainerRecipient}>
                  <View style={styles.bodyContainer}>
                    <Text style={item.author === 'sender' ? styles.bodyText : styles.bodyTextRecipient}>{item.body}</Text>
                  </View>
                  <View style={styles.messageFooter}>
                    <Text style={styles.timestamp}>{item.timestamp}</Text>
                    {item.read ? (
                    <FontAwesome5
                      name="check-circle"
                      size={15}
                      style={{ textAlign: "right" }}
                    />
                    ) : (
                      // todo: filled in check circle when read, outline when not
                      <Text></Text>
                    )}
                  </View>
                </View>
              );
            }}
            />
          </ScrollView>

        <View style={styles.writeContainer}>
          <TextInput
            multiline={true}
            placeholder="Send message..."
            placeholderTextColor="#DDE2E4"
            value={body}
            onChangeText={setBody}
            enablesReturnKeyAutomatically={true}
            style={styles.input}
          />
          <Ionicons
            name="md-send"
            size={30}
            color="black"
            onPress={send}
          />
          <AntDesign
            style={styles.plus}
            name="plus"
            size={25}
          />
        </View>
    </KeyboardAvoidingView>
  );

}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  messagesScroll: {
    backgroundColor: 	"#161616",
    padding: 10,
  },
  messageFooter: {
    marginTop: 10,
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  bodyContainer: {
    margin: 5,
  },
  keyClosedContainer: {
    marginTop: "90%",
  },
  timestamp: {
    fontSize: 12,
  },
  bodyText: {
    fontWeight: "300",
    fontSize: 16,
    color: "#161616"
  },
  bodyTextRecipient: {
    fontWeight: "300",
    fontSize: 16,
    color: "#DDE2E4"
  },
  messagingContainer: {
    borderRadius: 15,
    backgroundColor: "#909695",
    marginVertical: 5,
    padding: 15,
    marginLeft: '15%',
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  messagingContainerRecipient: {
    borderRadius: 15,
    backgroundColor: "#474A49",
    marginVertical: 5,
    padding: 15,
    marginRight: '15%',
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  messagesList: {
    width: "100%",
    marginTop: 20,
    marginBottom: 10,
  },
  writeContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#161616", 
    },
  writeContainerKeyboardOpen: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
    },
  input: {
    width: "80%",
    borderWidth: 2,
    borderRadius: 20,
    height: 45,
    borderColor: "#DDE2E4",
    color: "#DDE2E4",
    margin: 10,
    paddingLeft: "3%",
    paddingTop: "3%", 
  },
  plus: {
    color: "#DDE2E4",
    margin: 5
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
  getMessages,
  postMessages,
  readMessage,
})(ChatScreen);