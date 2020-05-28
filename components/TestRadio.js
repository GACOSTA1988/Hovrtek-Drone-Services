import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";

let radio_props = [
  { label: "No", value: "No" },
  { label: "Yes", value: "Yes" },
];
const TestRadio = () => {
  const [testRadioAnswer, setTestRadioAnswer] = useState("No");
  console.log("YES OR NOW", testRadioAnswer)

  return (
    <View style={styles.radioButtonWrapper}>
      <View style={styles.radioButtonWrapper}>
        <Text>
          This is a test question that you are suppose to answer either a yes or
          a no.
        </Text>
      </View>
      <RadioForm formHorizontal={true} animation={true}>
        {/* To create radio buttons, loop through your array of options */}
        {radio_props.map((obj, i) => (
          <RadioButton labelHorizontal={true} key={i}>
            {/*  You can set RadioButtonLabel before RadioButtonInput */}
            <RadioButtonInput
              obj={obj}
              index={i}
              isSelected={testRadioAnswer === i}
              onPress={(value) => {
                setTestRadioAnswer(value);
              }}
              borderWidth={1}
              buttonInnerColor={"#e74c3c"}
              buttonOuterColor={testRadioAnswer === i ? "#2196f3" : "#000"}
              buttonSize={40}
              buttonOuterSize={80}
              buttonStyle={{}}
              buttonWrapStyle={{ marginLeft: 10 }}
            />
            <RadioButtonLabel
              obj={obj}
              index={i}
              labelHorizontal={true}
              onPress={(value) => {
                setTestRadioAnswer(value);
              }}
              labelStyle={{ fontSize: 20, color: "#2ecc71" }}
              labelWrapStyle={{}}
            />
          </RadioButton>
        ))}
      </RadioForm>
      {/* <RadioForm
        style={styles.radioButton}
        animation={true}

        formHorizontal={true}
        radio_props={radio_props}
        initial={"No"}
        onPress={(value) => {
          setTestRadioAnswer(value);
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
radioButtonWrapper: {
    alignContent: 'center',
    justifyContent: 'center'
}
});

export default TestRadio;
