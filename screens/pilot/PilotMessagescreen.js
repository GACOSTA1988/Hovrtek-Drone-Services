import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { AuthContext } from "../../context";
import PilotHeader from '../../components/pilot/PilotHeader';

export const PilotMessage = ({ navigation }) => (
    <View style={styles.container}>
        <PilotHeader />
        <Text>The message form for pilots will be built here.</Text>
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
