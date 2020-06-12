import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import RadioForm from "react-native-simple-radio-button";

let radio_props = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];
const AirMapRadio = (props) => {
  const { airMap, setAirMap } = props;
  console.log("INSURED STATUS", airMap);

  let index = 0;
  const getIndexOfState = () => {
    if (airMap === "Yes") {
      index = 0;
    } else {
      index = 1;
    }
  };
  getIndexOfState();

  const setInitialStateToNo = (hasState) => {
    if (!hasState) {
      setAirMap("No");
    }
  };
  setInitialStateToNo(airMap);

  const renderRadioButton = () => {
    return (
      <View style={styles.radioButtonWrapper}>
        <RadioForm
          labelStyle={styles.radiobutton}
          animation={true}
          selectedButtonColor={"#092455"}
          labelColor={"#092455"}
          buttonColor={"#092455"}
          formHorizontal={true}
          radio_props={radio_props}
          initial={index}
          onPress={(value) => {
            setAirMap(value);
          }}
        />
      </View>
    );
  };

  return renderRadioButton();
};

const styles = StyleSheet.create({
  radioButtonWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  radiobutton: {
    paddingRight: 25,
  },
});

export default AirMapRadio;