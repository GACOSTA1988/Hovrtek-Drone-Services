import {
    Text,
    View,
    StyleSheet,
    Button
} from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";


const NewProjectScreenThree = (props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.header}>There will likely be another question here.</Text>
            <View style={styles.saveAndContinueWrapper}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => props.navigation.navigate("NewProjectScreenOne")}
                    title={"Save and Continue"}
                >
                    <Text style={styles.saveAndContinueText}>Pretend to Complete Project, but will just take you back to New Project Form</Text>
                </TouchableOpacity>
            </View>
                <Button title="Back" onPress={() => props.navigation.goBack()} />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 100
    },
    header: {
        fontSize: 25
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    saveAndContinueWrapper: {
        width: 170,
        height: 80,
        borderWidth: 2,
        borderColor: "#092455",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    },
    saveAndContinueText: {
        fontSize: 15,
        color: "#092455",
    },
});

export default NewProjectScreenThree