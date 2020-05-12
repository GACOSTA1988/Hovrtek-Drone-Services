import React from "react";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import ClientHomeStackNavigator from '../../navigation/ClientHomeStackNavigator'

const GoHome = (props) => {
    const navigation = useNavigation();

    return navigation.navigate(ClientHomeStackNavigator);

}

export default GoHome;
