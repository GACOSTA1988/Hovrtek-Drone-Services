import React, { useState, Component } from "react";
import { Dropdown } from "react-native-material-dropdown";

function AirDropPicker() {
  const [dataPicker, setDataType] = useState("");
  let data = [
    {
      value: "YES",
    },
    {
      value: "NO",
    },
  ];

  return <Dropdown label="TEST" data={data} />;
}
export default AirDropPicker;
