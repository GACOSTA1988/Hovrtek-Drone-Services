import React, { useState, useContext } from "react";
import {
  Text,
  View,
  Button,
  Modal,
  StyleSheet,
  Picker,
  TouchableOpacity,
} from "react-native";
import {
  PassSetYearsOfExperience,
  PassYearsOfExperienceState,
} from "../screens/pilot/PilotProfileSetupPageOneScreen";
import { APP_STRINGS } from "../constants/index";

//REFACTORED with APP_STRINGS and TURNARY VIA FRANKS SPECIFICATIONS

const DroneExperiencePicker = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const setYearsOfExperience = useContext(PassSetYearsOfExperience);
  const yearsOfExperience = useContext(PassYearsOfExperienceState);

  console.log("YEARS OF EXPERIENCE", yearsOfExperience);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const renderYearsOfExperienceButton = (buttonText = "") => {
    return (
      <TouchableOpacity style={styles.button} onPress={openModal}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    );
  };

  const renderYearsOfExperience = (hasYearsOfExperience = false) => {
    return hasYearsOfExperience
      ? renderYearsOfExperienceButton(yearsOfExperience)
      : renderYearsOfExperienceButton(
          setYearsOfExperience("No Years of Experience"),
        );
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
            <Text style={styles.modalText}>{APP_STRINGS.yearsExperience}</Text>
          </View>
          <View>
            <Picker
              selectedValue={yearsOfExperience}
              onValueChange={(yearsOfExperience, itemIndex) =>
                setYearsOfExperience(yearsOfExperience)
              }
            >
              <Picker.Item
                label="No Years of Experience"
                value="No Years of Experience"
              />
              <Picker.Item label="Less than 1" value="Less than 1" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
              <Picker.Item label="9" value="9" />
              <Picker.Item label="10" value="10" />
              <Picker.Item label="More than 10" value="More than 10" />
            </Picker>
          </View>
          <View styles={styles.cancelWrapper}>
            <Button onPress={() => closeModal()} title={"Choose"}></Button>
          </View>
        </View>
      </Modal>

      {renderYearsOfExperience(yearsOfExperience)}
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

export default DroneExperiencePicker;
