import React, { useState, useContext } from "react";
import {
  View,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { PassSetDate } from "../../screens/client/NewProjectScreenOne";
import { PassDateState } from "../../screens/client/NewProjectScreenOne";
import { AntDesign } from '@expo/vector-icons';

const ClientDatePicker = (props) => {
  // Context Hook Stuff
  const setDateState = useContext(PassSetDate);
  const dateState = useContext(PassDateState);

  const [date, setDate] = useState(new Date());

  const [isVisible, setIsVisible] = useState(false);

  const { setIsModalActive } = props

  const handlePicker = (datetime) => {
    setIsVisible(false);
    setIsModalActive(false);
    setDateState(moment(datetime).format("MMMM, DD  YYYY"));
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
        {dateState ? (
          <Text style={styles.buttonText}>{dateState}</Text>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <AntDesign name="calendar" size={24} color="white" />
            <Text style={styles.buttonText}>Pick a date for your drone service</Text>
          </View>
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
    // width: 250,
    height: 50,
    backgroundColor: "#161616",
    borderRadius: 15,
    // alignItems: "center",
    justifyContent: "center",
    // marginTop: 10,
    // marginBottom: 30,
    paddingLeft: 10
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10
  },
  pickerWrapper: {
    // alignItems: "center",
  },
  datePicked: {
    fontSize: 20,
  },
});

export default ClientDatePicker;
