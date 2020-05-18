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
  PassSetInsuredStatus,
  PassInsuredStatusState,
} from "../screens/pilot/PilotProfileSetupPageOneScreen";
import { APP_STRINGS } from "../constants";

//REFACTORED with APP_STRINGS and TURNARY VIA FRANKS SPECIFICATIONS

const ValidInsurancePicker = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const setInsuredStatus = useContext(PassSetInsuredStatus);
  const insuredStatus = useContext(PassInsuredStatusState);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const renderValidInsuranceButton = (buttonText = "") => {
    return (
        <TouchableOpacity
          style={styles.button}
          onPress={openModal}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
    )
}

// Refactored 
const renderValidInsurance = (hasValidInsurance = false) => {
  return hasValidInsurance
    ? renderValidInsuranceButton(insuredStatus)
    : renderValidInsuranceButton(setInsuredStatus(APP_STRINGS.no));
};

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType={"slide"}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.modalText}>Do you have valid insurance?</Text>
          </View>
          <View>
            <Picker
              selectedValue={insuredStatus}
              onValueChange={(insuredStatus, itemIndex) =>
                setInsuredStatus(insuredStatus)
              }
            >
              <Picker.Item label={APP_STRINGS.no} value={APP_STRINGS.no} />
              <Picker.Item label={APP_STRINGS.yes} value={APP_STRINGS.yes} />
            </Picker>
          </View>
          <View styles={styles.cancelWrapper}>
            <Button onPress={closeModal} title={"Choose"}></Button>
          </View>
        </View>
      </Modal>

      {renderValidInsurance(insuredStatus)}
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

export default ValidInsurancePicker;
