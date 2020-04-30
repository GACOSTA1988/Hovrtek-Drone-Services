  // RADIO BUTTON STUFF

import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel,
} from "react-native-simple-radio-button";

  let radio_props = [
    { label: "Yes", value: 0 },
    { label: "No", value: 1 },
  ];

const [light, setLight] = useState(1);

<RadioForm
    formHorizontal={true}
    labelHorizontal={true}
    buttonColor={"#092455"}
    selectedButtonColor={"#092455"}
    radio_props={radio_props}
    initial={1}
    onPress={setLight}
/>