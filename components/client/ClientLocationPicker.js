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
  PassSetLocation,
  PassLocationState,
} from "../../screens/client/NewProjectScreenOne";
import { useNavigation } from "@react-navigation/native";
import { APP_STRINGS } from "../../constants/index";

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

  const renderTextInput = () => {
    return (
      <View>
        <TextInput
          style={styles.input}
          maxLength={26}
          onChangeText={setLocation}
          value={locationState}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType={APP_STRINGS.slide}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.modalText}>{APP_STRINGS.whereIsTheLocation}</Text>
          </View>
          {renderTextInput()}
          <View styles={styles.cancelWrapper}>
            <TouchableOpacity style={styles.chatButton} onPress={closeModal}>
              <Text style={styles.chatText}>{APP_STRINGS.choose}</Text>
            </TouchableOpacity> 
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
  }
});

export default ClientLocationPicker;
