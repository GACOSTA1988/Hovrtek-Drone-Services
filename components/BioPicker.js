import React, { useState, useContext } from "react";
import {
  Text,
  View,
  Button,
  Modal,
  StyleSheet,
  Picker,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import {
  PassSetPersonalBio,
  PassPersonalBioState,
} from "../screens/pilot/PilotProfileSetupPageOneScreen";
import { useNavigation } from "@react-navigation/native";
import { APP_STRINGS } from "../constants/index";

//REFACTORED with APP_STRINGS and TURNARY VIA FRANKS SPECIFICATIONS

const {
  openModal,
  workExperienceSet,
  setWorkExperience,
  choose,
  briefSummary,
} = APP_STRINGS;

const BioPicker = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const setPersonalBio = useContext(PassSetPersonalBio);
  const personalBio = useContext(PassPersonalBioState);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const renderPersonalBioButton = (buttonText = "") => {
    const title = APP_STRINGS.openModal;
    return (
      <TouchableOpacity style={styles.button} onPress={openModal} title={title}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    );
  };

  const renderPersonalBio = (hasPersonalBio = false) => {
    return hasPersonalBio
      ? renderPersonalBioButton(APP_STRINGS.workExperienceSet)
      : renderPersonalBioButton(APP_STRINGS.setWorkExperience);
  };

  const renderTextInput = (bio, setBio) => {
    return (
      <View>
        <TextInput style={styles.input} onChangeText={setBio} value={bio} />
      </View>
    );
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
            <Text style={styles.modalText}>{APP_STRINGS.briefSummary}</Text>
          </View>

          {renderTextInput(personalBio, setPersonalBio)}

          <View styles={styles.cancelWrapper}>
            <Button onPress={closeModal} title={APP_STRINGS.choose} />
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
  input: {
    marginTop: 20,
    height: 90,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
  },
});

export default BioPicker;
