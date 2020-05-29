import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import RadioForm from "react-native-simple-radio-button";

let radio_props = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];
const FourHundredRadio = (props) => {
  const { fourHundred, setFourHundred } = props;
  console.log("INSURED STATUS", fourHundred);

  let index = 0;
  const getIndexOfState = () => {
    if (fourHundred === "Yes") {
      index = 0;
    } else {
      index = 1;
    }
  };
  getIndexOfState();

  const setInitialStateToNo = (hasState) => {
    if (!hasState) {
      setFourHundred("No");
    }
  };
  setInitialStateToNo(fourHundred);

  const renderRadioButton = () => {
    return (
      <View style={styles.radioButtonWrapper}>
        <RadioForm
          formHorizontal={true}
          animation={true}
          initial={index}
          selectedButtonColor={"#092455"}
        ></RadioForm>
        <RadioForm
          style={styles.radioButton}
          animation={true}
          selectedButtonColor={"#092455"}
          labelColor={"#092455"}
          buttonColor={"#092455"}
          formHorizontal={true}
          radio_props={radio_props}
          initial={index}
          onPress={(value) => {
            setFourHundred(value);
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
});

export default FourHundredRadio;
