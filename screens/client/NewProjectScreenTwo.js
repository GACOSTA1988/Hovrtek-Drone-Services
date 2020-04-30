import {
    Text,
    View,
    StyleSheet,
    Button
} from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const NewProjectScreenTwo = (props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.header}>There will be some additional Questions here.</Text>


        <View style={styles.saveAndContinueWrapper}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => props.navigation.navigate("NewProjectScreenThree")}
                title={"Save and Continue"}
            >
                <Text style={styles.saveAndContinueText}>Pretend to save and continue</Text>
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
        height: 50,
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

export default NewProjectScreenTwo