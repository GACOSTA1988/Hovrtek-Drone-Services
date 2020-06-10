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
import { useNavigation } from "@react-navigation/native";
import { APP_STRINGS } from "../constants/index";

//REFACTORED with APP_STRINGS and TURNARY VIA FRANKS SPECIFICATIONS

const {
  workExperienceSet,
  setWorkExperience,
  choose,
  briefSummary,
  slide
} = APP_STRINGS;

const BioPicker = (props) => {
  const { personalBio, setPersonalBio } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);


  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const renderPersonalBioButton = (buttonText = "") => {
    const title = openModal;
    return (
      <TouchableOpacity style={styles.button} onPress={openModal} title={title}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    );
  };

  const renderPersonalBio = (hasPersonalBio = false) => {
    return hasPersonalBio
      ? renderPersonalBioButton(workExperienceSet)
      : renderPersonalBioButton(setWorkExperience);
  };

  const renderTextInput = (bio, setBio) => {
    return (
      <View>
        <TextInput style={styles.input} onChangeText={setBio} value={bio} />
      </View>
    );
  };

  return (
    <View>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType={slide}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.modalText}>{briefSummary}</Text>
          </View>

          {renderTextInput(personalBio, setPersonalBio)}

          <View styles={styles.cancelWrapper}>
            <TouchableOpacity style={styles.chatButton} onPress={closeModal}>
              <Text style={styles.chatText}>{APP_STRINGS.choose}</Text>
            </TouchableOpacity> 
          </View>
        </View>
      </Modal>

      {renderPersonalBio(personalBio)}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: 330,
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
  chatText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
  },
  chatButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#092455",
    padding: 7,
    borderRadius: 5,
    margin: 20,
    height: '30%',
  },
});

export default BioPicker;
