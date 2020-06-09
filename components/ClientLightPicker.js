import React, { useState, useContext } from "react";
import {
  Text,
  View,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
import {
  PassSetLight,
  PassLightState,
} from "../screens/client/NewProjectScreenOne";
import RadioForm from "react-native-simple-radio-button";

const ClientLightPicker = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const setLight = useContext(PassSetLight);
  const light = useContext(PassLightState);

  let radio_props = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  const renderTextInput = () => {
    return (
      <View>
        <TextInput
          style={styles.input} onChangeText={setLight} value={light}
        />
      </View>
    );
  };

  return (
    <View>
    <RadioForm
      labelStyle={styles.radiobutton}
      animation={true}
      selectedButtonColor={"#092455"}
      labelColor={"#092455"}
      buttonColor={"#092455"}
      formHorizontal={true}
      radio_props={radio_props}
      initial={1}
      onPress={(value) => {
        setIsModalVisible(value);
      }}
      />
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType={"slide"}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.modalText}>
              Enter light specifications:
            </Text>
          </View>
          <View>
              {renderTextInput()}
          </View>
          <View styles={styles.cancelWrapper}>
            <Button onPress={() => setIsModalVisible(false)} title={"Save"}></Button>
          </View>
        </View>
      </Modal>
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
  radiobutton: {
    paddingRight: '5%',
  }, 
  input: {
    marginTop: 20,
    height: 90,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 5,
  },
  modalShowing: {
    opacity: .5,
  }
});

export default ClientLightPicker;
