import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { AuthContext } from "../../context";
import PilotHeader from '../../components/pilot/PilotHeader';

export const PilotSignIn = ({ navigation }) => (
    <View style={styles.container}>
        <PilotHeader />
        <Text>Pilot Sign-In</Text>
        <Button title='Pilot Sign In' />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 5
    }
});