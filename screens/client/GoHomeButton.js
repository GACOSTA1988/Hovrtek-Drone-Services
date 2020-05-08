import React from "react";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import HomeStackNavigator from '../../navigation/HomeStackNavigator'

const GoHome = (props) => {
    const navigation = useNavigation();

    return navigation.navigate(HomeStackNavigator);

}

export default GoHome;
