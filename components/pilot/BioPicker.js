import React, { useState, useContext } from "react";
import {
  Text,
  View,
  Keyboard,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  PassSetPersonalBio,
  PassPersonalBioState,
} from "../../screens/pilot/PilotProfileSetupPageOneScreen";
import { useNavigation } from "@react-navigation/native";
import { APP_STRINGS } from "../../constants/index";

//REFACTORED with APP_STRINGS and TURNARY VIA FRANKS SPECIFICATIONS

const {
  workExperienceSet,
  setWorkExperience,
  choose,
  briefSummary,
  slide
} = APP_STRINGS;

const BioPicker = (props) => {
  const { setIsModalActive } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const setPersonalBio = useContext(PassSetPersonalBio);
  const personalBio = useContext(PassPersonalBioState);


  const openModal = () => {
    setIsModalVisible(true);
    setIsModalActive(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setIsModalActive(false);
  };

  const renderPersonalBioButton = (buttonText = "") => {
    const title = openModal;
    return (
      <TouchableOpacity style={styles.button} onPress={openModal} title={title}>
        {personalBio ? (
          <Text style={styles.buttonText}>{personalBio}</Text>
        ) : (
          <Text style={styles.buttonText}>Brief Summary</Text>
        )}
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
        <TextInput
          multiline={true}
          style={styles.input}
          onChangeText={setBio}
          autoFocus={true}
          value={bio}
        />
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
    backgroundColor: "#161616",
    borderWidth: 2,
    borderColor: '#DDE2E4',
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
    color: "#DDE2E4",
    textAlign: "center"
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
    color: "#161616",
  },
  buttonText: {
    color: "#161616",
  },
  input: {
    marginTop: 20,
    height: 90,
    borderColor: "#DDE2E4",
    borderWidth: 1,
    marginBottom: 20,
    marginHorizontal: 20,
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
    height: '30%',
  },
});

export default BioPicker;
