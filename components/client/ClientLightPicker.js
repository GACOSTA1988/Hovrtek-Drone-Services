import React, { useState, useContext } from "react";
import {
  Text,
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
import {
  PassSetLight,
  PassLightState,
} from "../../screens/client/NewProjectScreenOne";
import RadioForm from "react-native-simple-radio-button";
import { APP_STRINGS } from "../../constants/index";

const ClientLightPicker = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { setIsModalActive } = props

  const setLight = useContext(PassSetLight);
  const light = useContext(PassLightState);

  let radio_props = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  const closeModal = () => {
    setIsModalVisible(false);
    setIsModalActive(false);
  };

  const renderTextInput = () => {
    return (
      <View>
        <TextInput
          multiline={true}
          autoFocus={true}
          style={styles.input}
          onChangeText={setLight}
          value={light}
        />
      </View>
    );
  };

  return (
    <View>
    <RadioForm
      labelStyle={styles.radiobutton}
      animation={true}
      selectedButtonColor={"#a8acab"}
      selectedLabelColor={"#a8acab"}
      labelColor={"#a8acab"}
      buttonColor={"#a8acab"}
      // formHorizontal={true}
      buttonSize={15}
      radio_props={radio_props}
      initial={1}
      onPress={(value) => {
        setIsModalVisible(value);
        setIsModalActive(value);
      }}
      />
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType={"slide"}
        onRequestClose={closeModal}
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
          <TouchableOpacity style={styles.chatButton} onPress={closeModal}>
              <Text style={styles.chatText}>{APP_STRINGS.save}</Text>
            </TouchableOpacity>
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
    // backgroundColor: "#474A49",
    backgroundColor: "#161616",
    borderColor: "#DDE2E4",
    borderWidth: 1,
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
    color: "#DDE2E4"
  },
  radiobutton: {
    paddingRight: '5%',
  },
  input: {
    marginTop: 20,
    height: 90,
    borderColor: "#DDE2E4",
    borderWidth: 1,
    marginBottom: 20,
    padding: 5,
    color: "#DDE2E4"
  },
  modalShowing: {
    opacity: .5,
  },
  chatText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#DDE2E4",
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

export default ClientLightPicker;
