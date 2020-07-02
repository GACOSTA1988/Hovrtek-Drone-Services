import React, { useState, useContext } from "react";
import {
  View,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import {
  PassSetFaaLicenseExp,
  PassFaaLicenseExpState,
} from "../../screens/pilot/PilotProfileSetupPageOneScreen";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

const DatePicker = (props) => {

  const { setIsModalActive } = props

  const setFaaLicenseExp = useContext(PassSetFaaLicenseExp);
  const faaLicenseExp = useContext(PassFaaLicenseExpState);

  const [date, setDate] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);

  const handlePicker = (datetime) => {
    setIsVisible(false);
    setIsModalActive(false);
    setFaaLicenseExp(moment(datetime).format("MMMM, DD  YYYY"));
  };

  const hidePicker = () => {
    setIsVisible(false);
    setIsModalActive(false);
  };

  const showPicker = () => {
    setIsVisible(true);
    setIsModalActive(true);
  };

  return (
    <View style={styles.pickerWrapper}>
      <TouchableOpacity style={styles.button} onPress={showPicker}>
        {faaLicenseExp ? (
          <Text style={styles.buttonText}>{faaLicenseExp}</Text>
        ) : (
          <Text style={styles.buttonText}>Pick a Date</Text>
        )}

        <DateTimePicker
          isVisible={isVisible}
          onConfirm={handlePicker}
          onCancel={hidePicker}
          mode={"date"}
          value={date}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 250,
    height: 50,
    backgroundColor: "#DDE2E4",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: "#161616",
    fontSize: 20,
  },
  pickerWrapper: {
    alignItems: "center",
  },
  datePicked: {
    fontSize: 20,
    color: "#DDE2E4"
  },
});

export default DatePicker;
