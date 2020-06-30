import React, { useState, useContext } from "react";
import {
  Text,
  View,
  Modal,
  StyleSheet,
  Picker,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  PassSetRecording,
  PassRecordingState,
} from "../../screens/client/NewProjectScreenOne";
import { useNavigation } from "@react-navigation/native";
import { APP_STRINGS } from "../../constants";

const ClientRecordingPicker = (props) => {
  const { setIsModalActive } = props
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const setRecording = useContext(PassSetRecording);
  const recordingState = useContext(PassRecordingState);

  const openModal = () => {
    setIsModalVisible(true);
    setIsModalActive(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setIsModalActive(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType={"slide"}
        onRequestClose={() => closeModal()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.modalText}>What will you be recording?</Text>
          </View>
          <View>
            <TextInput
              style={styles.textInput}
              autoFocus={true}
              onChangeText={setRecording}
              value={recordingState}
              multiline={true}
            />
          </View>
          <TouchableOpacity style={styles.chatButton} onPress={closeModal}>
            <Text style={styles.chatText}>{APP_STRINGS.choose}</Text>
          </TouchableOpacity> 
        </View>
      </Modal>

      {recordingState ? (
        <TouchableOpacity
          style={styles.button}
          onPress={openModal}
          title={"Open modal"}
        >
          <Text style={styles.buttonText}>{recordingState}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={openModal}
          title={"Open modal"}
        >
          <Text style={styles.buttonText}>Please Set Recording</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: 300,
    justifyContent: "center",
    paddingTop: 10,
    padding: 10,
    // backgroundColor: "#474A49",
    backgroundColor: "#161616",
    borderColor: "#DDE2E4",
    borderWidth: 1,
    marginTop: 200,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    height: 50,
    width: 150,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 10,
    color: "#DDE2E4"
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: "#DDE2E4",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: "#161616",
    fontSize: 20,
  },
  textInput: {
    marginTop: 20,
    height: 30,
    borderColor: "#DDE2E4",
    borderWidth: 1,
    marginBottom: 20,
    padding: 5,
    color: "#DDE2E4"
  },
  chatText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#161616",
  },
  chatButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#DDE2E4",
    padding: 7,
    borderRadius: 5,
    margin: 20,
    height: '15%',
  }
});

export default ClientRecordingPicker;
