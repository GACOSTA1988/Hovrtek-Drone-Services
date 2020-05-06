import React, { useState, useEffect } from "react";
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
} from "react-native";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  Alert,
  AntDesign,
} from "@expo/vector-icons";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getMessages, postMessages } from "../../actions/index";
import * as firebase from "firebase";
import _ from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
      if (
        (message.userOneID === sender.uid &&
          message.userTwoID === recipient.userID) ||
        (message.userOneID === recipient.userID &&
          message.userTwoID === sender.uid)
      ) {
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
  };

  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
        height: "100%",
        backgroundColor: "lightgray",
      }}
    >
      <FlatList
        style={{ width: "100%", marginTop: 20 }}
        data={conversation}
        keyExtractor={(item) => item.key}
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
                <Text>Message sent at: {item.timestamp}</Text>
                <Text>Message body: {item.body} </Text>
              </View>
            </View>
          );
        }}
      />

      <View
        style={{
          backgroundColor: "lightgray",
          marginTop: 10,
          marginBottom: 40,
          alignItems: "center",
        }}
      >
        <TextInput
          placeholder=" Send message..."
          placeholderTextColor="grey"
          value={body}
          onChangeText={setBody}
          style={{
            width: "80%",
            borderWidth: 4,
            backgroundColor: "white",
            borderRadius: 20,
            height: 45,
            marginBottom: 10,
            marginTop: 20,
          }}
        />
        <AntDesign
          style={{
            position: "absolute",
            top: "18%",
            right: "15%",
            color: "#092455",
          }}
          name="plus"
          size={25}
          onPress={send}
        />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.pop()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  // keyOpenContainer: {
  //   marginBottom: "50%",
  //   height: "50%",
  // },
  // input: {},
  keyClosedContainer: {
    marginTop: "90%",
    backgroundColor: "lightgray",
  },
  backButton: {
    marginTop: 20,
    marginBottom: 40,
    width: 60,
    height: 30,
    backgroundColor: "#092455",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    color: "white",
    textAlign: "center",
    // marginBottom: 40,
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

export default connect(mapStateToProps, { getMessages, postMessages })(
  ChatScreen
);
