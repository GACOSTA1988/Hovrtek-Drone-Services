import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";

import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import hovrtekLogo from '../../assets/hovrtek_logo.png';

function ClientSubheader(props) {
    const navigation = useNavigation();
    let clientID = null;
    if (firebase.auth().currentUser) {
        clientID = firebase.auth().currentUser.uid;
    }

    const continueButton = () => {
        navigation.navigate("NewProjectScreenOne");
    }


    return (
        <View style={styles.wrapper}>

            <View>
                <TouchableOpacity style={styles.topButtonWrapperLeft}
                    onPress={() => navigation.navigate('NewProjectScreenWelcome')}
                >
                    <Text style={styles.topButtonText}>Create New Project</Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity style={styles.topButtonWrapperRight}
                    onPress={() => navigation.navigate('ProjectListScreen')}
                >
                    <Text style={styles.topButtonText}>Projects</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    wrapper:{
        flexDirection: 'row'
    },

    topButtonWrapperLeft: {
        backgroundColor: "#092455",
        height: 40,
        width: 180,
        alignSelf: 'flex-start'
    }, 
    topButtonWrapperRight: {
        backgroundColor: "#092455",
        height: 40,
        width: 180,
        alignSelf: 'flex-start'
    }, 
    topButtonText: {
        color: 'white',
        paddingTop: 10
    }
});

export default ClientSubheader
