import React, { useState } from 'react';
import { View, Button, Platform, TouchableOpacity, StyleSheet, Text } from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";


const DatePicker = () => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const handlePicker = () => {
        setIsVisible(false)
    }

    const hidePicker = () => {
        setIsVisible(false)
    }

    const showPicker = () => {
        setIsVisible(true)
    }



    

    return (
        <View style={styles.pickerWrapper}>
            <TouchableOpacity style={styles.button} onPress={showPicker}>
                <Text style={styles.buttonText}>Pick Date</Text>
                <DateTimePicker
                isVisible={isVisible}
                onConfirm={handlePicker}
                onCancel={hidePicker}
                />
            </TouchableOpacity>
       
       

        </View>
    );
};


const styles = StyleSheet.create({
    button: {
        width: 250,
        height: 50,
        backgroundColor: "#092455",
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    },
    pickerWrapper: {
        alignItems: 'center'
    }

});

export default DatePicker;