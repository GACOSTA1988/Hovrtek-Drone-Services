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
} from "../screens/client/NewProjectScreenOne";
import { useNavigation } from "@react-navigation/native";
import { APP_STRINGS } from "../constants/index";

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

  // const renderLocationButton = (buttonText = "") => {
  //   return (
  //     <TouchableOpacity style={styles.button} onPress={openModal}>
  //       <Text style={styles.buttonText}>{buttonText}</Text>
  //     </TouchableOpacity>
  //   );
  // };

  // const renderLocation = (hasLocationState) => {
  //   setLocation(hasLocationState);
  //   return hasLocationState
  //     ? renderLocationButton(locationState)
  //     : renderLocation(APP_STRINGS.pleaseSetLocation);
  // };

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
            <Text style={styles.modalText}>{APP_STRINGS.whereIsTheLocation}</Text>
          </View>
          <View>
            <TextInput
              style={{
                height: 30,
                borderColor: "gray",
                borderWidth: 1,
              }}
              onChangeText={setLocation}
              value={locationState}
            />
          </View>
          <View styles={styles.cancelWrapper}>
            <Button onPress={closeModal} title="choose"></Button>
          </View>
        </View>
      </Modal>

      {locationState ? (
        <TouchableOpacity
          style={styles.button}
          onPress={openModal}
          title={"Open modal"}
        >
          <Text style={styles.buttonText}>{locationState}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={openModal}
          title={"Open modal"}
        >
          <Text style={styles.buttonText}>{APP_STRINGS.pleaseSetLocation}</Text>
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
    fontSize: 20,
  },
});

export default ClientLocationPicker;
