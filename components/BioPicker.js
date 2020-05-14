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

const BioPicker = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const setPersonalBio = useContext(PassSetPersonalBio);
  const personalBio = useContext(PassPersonalBioState);

  console.log("PERSONAL BIO", personalBio);
  console.log("SET PERSONAL BIO", setPersonalBio);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
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
            <Button onPress={closeModal} title={"Choose"}></Button>
          </View>
        </View>
      </Modal>

      {personalBio ? (
        <TouchableOpacity
          style={styles.button}
          onPress={openModal}
          title={"Open modal"}
        >
          <Text style={styles.buttonText}>Work Experience Set</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={openModal}
          title={"Open modal"}
        >
          <Text style={styles.buttonText}>Please Set Work Experience</Text>
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
