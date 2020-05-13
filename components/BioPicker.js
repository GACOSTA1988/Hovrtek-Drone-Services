import React, { useState, useContext } from "react";
import {
  Text,
  View,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  PassSetPersonalBio,
  PassPersonalBioState,
} from "../screens/pilot/PilotProfileSetupPageOneScreen";

const BioPicker = () => {
  const [ isModalVisible, setIsModalVisible ] = useState(false);

  const setPersonalBio = useContext(PassSetPersonalBio);
  const personalBio = useContext(PassPersonalBioState);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const renderPersonalBioButton = (buttonText = "") => {
    return (
      <TouchableOpacity style={styles.button} onPress={openModal} title={title}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    );
  };

  const renderPersonalBio = (hasPersonalBio = false) => {
    const title = "Open modal";

    return hasPersonalBio
      ? renderPersonalBioButton("Work Experience Set")
      : renderPersonalBioButton("Please Set Work Experience");
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.modalText}>
              Please Give Us a Brief Summary of Your Work Experience
            </Text>
          </View>
          <View>
            <TextInput
              style={{
                marginTop: 20,
                height: 90,
                borderColor: "gray",
                borderWidth: 1,
                marginBottom: 20,
              }}
              onChangeText={setPersonalBio}
              value={personalBio}
            />
          </View>
          <View styles={styles.cancelWrapper}>
            <Button onPress={closeModal} title="Choose" />
          </View>
        </View>
      </Modal>
      {renderPersonalBio(personalBio)}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: 300,
    justifyContent: "center",
    paddingTop: 10,
    padding: 10,
    backgroundColor: "#f5f5f5",
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
  },
  cancelWrapper: {},
  button: {
    width: 250,
    height: 50,
    backgroundColor: "#092455",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 30,
    color: "white",
  },
  buttonText: {
    color: "white",
  },
});

export default BioPicker;
