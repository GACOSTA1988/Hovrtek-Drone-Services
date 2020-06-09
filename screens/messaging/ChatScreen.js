import React, { useState, useEffect, useContext, useRef } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TextInput,
  FlatList,
  TouchableHighlight,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Container,
  Alert,
} from "react-native";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getMessages, postMessages, readMessage } from "../../actions/messages";
import * as firebase from "firebase";
import _ from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import moment from "moment";

function ChatScreen(props, { getMessages, postMessages, readMessage }) {
  const navigation = useNavigation();

  const [body, setBody] = useState("");
  const listRef = useRef(null);

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
        conversation.push(message);
      } else if (
        message.userOneID === recipient.userID &&
        message.userTwoID === sender.uid
      ) {
        conversation.push(message);
      }
    });
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
    <View style={styles.container}>
      <KeyboardAwareScrollView 
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
                <View style={styles.messagingContainer}>
                  <View>
                    {item.isNewTimestamp ? (
                      <View>
                        <Text>NEW Message sent at: {item.isNewTimestamp}</Text>
                        <Text>Is this a new timestamp: {item.isNewTimestamp}</Text>
                      </View>
                    ) : (
                      <Text>OLD Message sent at: {item.timestamp}</Text>
                    )}
                    <Text>Message body: {item.body} </Text>
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
      </KeyboardAwareScrollView>
      <View style={styles.writeContainer}>
        <TextInput
          multiline={true}
          // onContentSizeChange={(event) => {
          // setInputHeight(100) }}
          placeholder="Send message..."
          placeholderTextColor="grey"
          value={body}
          onChangeText={setBody}
          enablesReturnKeyAutomatically={true}
          onFocus={() => readMessages()}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    // flex: 1,
  },
  messagesScroll: {
    // flex: 1,
    // height: "80%",
    backgroundColor: "white",
    padding: 10,
    marginBottom: 70
  },
  keyClosedContainer: {
    marginTop: "90%",
    // backgroundColor: "lightgray",
  },
  messagingContainer: {
    borderRadius: 15,
    backgroundColor: "#3E90D0",
    marginVertical: 15,
    padding: 20
  },
  messagesList: {
    width: "100%",
    marginTop: 20,
  },
  writeContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    },
  input: {
    width: "80%",
    borderWidth: 2,
    borderRadius: 20,
    height: 45,
    borderColor: "#092455",
    padding: 10,
    margin: 10
  },
  plus: {
    color: "#092455",
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
