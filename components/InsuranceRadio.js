import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import RadioForm from "react-native-simple-radio-button";

let radio_props = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];
const InsuranceRadio = (props) => {
    const { insuredStatus, setInsuredStatus } = props;
    console.log("INSURED STATUS", insuredStatus);

  let index = 0
  const getIndexOfState = () => {
    if (insuredStatus === "Yes"){
      index = 0
    } else {
      index = 1
    }
  }
  getIndexOfState();

  const setInitialStateToNo = (hasState) => {
   if (!hasState){
     setInsuredStatus("No")
   }
  };
  setInitialStateToNo(insuredStatus);

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
              setInsuredStatus(value);
            }}
          />
        </View>
      );
    };

  return (
    renderRadioButton()
  )
};

const styles = StyleSheet.create({
  radioButtonWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default InsuranceRadio;
