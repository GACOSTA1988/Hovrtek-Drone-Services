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
  PassSetLocation,
  PassLocationState,
} from "../screens/client/NewProjectScreenOne";
import { useNavigation } from "@react-navigation/native";

const ClientLocationPicker = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const setLocation = useContext(PassSetLocation);
  const locationState = useContext(PassLocationState);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const renderClientLocationButton = (buttonText) => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={openModal}
        title={"Open modal"}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    );
  };

  const renderClientLocation = (hasClientLocation) => {
    return hasClientLocation
      ? renderClientLocationButton(locationState)
      : renderClientLocationButton("Please Set Location");
  };

  const renderTextInput = (location, setLocation) => {
    return (
      <View>
        <TextInput
          style={styles.input} onChangeText={setLocation} value={location}
        />
      </View>
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
            <Text style={styles.modalText}>
              Where is the location of your drone service?
            </Text>
          </View>
          {renderTextInput(location, setLocation)}
          <View styles={styles.cancelWrapper}>
            <Button onPress={closeModal} title={"Choose"} />
          </View>
        </View>
      </Modal>
      {renderClientLocation(locationState)}
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
    fontSize: 20,
  },
});

export default ClientLocationPicker;
