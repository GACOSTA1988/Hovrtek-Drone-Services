import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import RadioForm from "react-native-simple-radio-button";

let radio_props = [
  { label: "No", value: "No" },
  { label: "Yes", value: "Yes" },
];
const TestRadio = () => {
  const [testRadioAnswer, setTestRadioAnswer] = useState("No");
  console.log("YES OR NOW", testRadioAnswer)

  return (
    <View style={styles.radioButtonWrapper}>
      <RadioForm
        formHorizontal={true}
        animation={true}
        initial={"No"}
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
        initial={"No"}
        onPress={(value) => {
          setTestRadioAnswer(value);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  radioButtonWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TestRadio;
