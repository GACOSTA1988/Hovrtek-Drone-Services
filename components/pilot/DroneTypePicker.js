import React, { Component, useState, useContext } from "react";
import {
  Text,
  View,
  Modal,
  StyleSheet,
  Dimensions,
  Picker,
  TouchableOpacity,
} from "react-native";
import {
  PassSetDroneType,
  PassDroneTypeState,
} from "../../screens/pilot/PilotProfileSetupPageOneScreen";
import { APP_STRINGS } from "../../constants/index";

//REFACTORED with APP_STRINGS and TURNARY VIA FRANKS SPECIFICATIONS

const DroneTypePicker = (props) => {
  const { setIsModalActive } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickerValue, setPickerValue] = useState("Less than 1");

  const setDroneType = useContext(PassSetDroneType);
  const droneType = useContext(PassDroneTypeState);

  const openModal = () => {
    setIsModalVisible(true);
    setIsModalActive(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setIsModalActive(false);
  };

  const renderDroneTypePickerButton = (buttonText = "") => {
    return (
      <TouchableOpacity style={styles.button} onPress={openModal}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    );
  };

  // Refactored
  const renderDroneType = (droneTypeString) => {
    if (!droneTypeString) {
      setDroneType(APP_STRINGS.none);
    }
    return renderDroneTypePickerButton(droneType);
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType={APP_STRINGS.slide}
        onRequestClose={() => closeModal()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.modalText}>{APP_STRINGS.modelDrone}</Text>
          </View>
          <View>
            <Picker
              selectedValue={droneType}
              onValueChange={(droneType, itemIndex) => setDroneType(droneType)}
            >
              <Picker.Item label={APP_STRINGS.none} value={APP_STRINGS.none} color={"#DDE2E4"}/>
              <Picker.Item label="Power Lord 3000" value="Power Lord 3000" color={"#DDE2E4"} />
              <Picker.Item label="Power Lord 30001" value="Power Lord 30001" color={"#DDE2E4"} />
              <Picker.Item label="The Drone Zone" value="The Drone Zone" color={"#DDE2E4"} />
              <Picker.Item label="MegaDrone 12" value="MegaDrone 12" color={"#DDE2E4"} />
              <Picker.Item label="Sky Master 50" value="Sky Master 50" color={"#DDE2E4"} />
              <Picker.Item
                label="Lord of the Sky 21"
                value="Lord of the Sky 21"
                color={"#DDE2E4"}
              />
              <Picker.Item label="Flown Drone" value="Flown Drone"  color={"#DDE2E4"}/>
              <Picker.Item label="Drone Clone" value="Drone Clone"  color={"#DDE2E4"}/>
              <Picker.Item
                label="The Drone Zone Advanced"
                value="The Drone Zone Advanced"
                color={"#DDE2E4"}
              />
            </Picker>
          </View>
          <View styles={styles.cancelWrapper}>
          <TouchableOpacity style={styles.chatButton} onPress={closeModal}>
              <Text style={styles.chatText}>{APP_STRINGS.choose}</Text>
            </TouchableOpacity> 
          </View>
        </View>
      </Modal>

      {renderDroneType(droneType)}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: 360,
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
    marginTop: 40,
    color: "#DDE2E4"
  },
  cancelWrapper: {},
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
  }
});

export default DroneTypePicker;
