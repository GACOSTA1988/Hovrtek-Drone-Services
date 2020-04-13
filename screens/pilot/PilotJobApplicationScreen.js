import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { AuthContext } from "../../context";
import PilotHeader from '../../components/pilot/PilotHeader';

export const PilotJobApplication = ({ navigation }) => (
    <View style={styles.container}>
        <PilotHeader />
        <Text>The job application form for pilot jobs will be displayed here.</Text>
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