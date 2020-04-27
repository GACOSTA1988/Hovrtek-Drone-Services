import React, { useState } from 'react';
import { View, Button, Platform, TouchableOpacity, StyleSheet, Text } from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment'

const DatePicker = () => {
    const [date, setDate] = useState(new Date());
    const [chosenDate, setChosenDate] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    console.log('CHOSEN DATE', chosenDate)
    console.log('DATE', date)
    console.log(isVisible)

    const handlePicker = (datetime) => {
        setIsVisible(false)
        setChosenDate(moment(datetime).format('MMMM, do YYYY'))
    }

    const hidePicker = () => {
        setIsVisible(false)
    }

    const showPicker = () => {
        setIsVisible(true)
    }

    return (
        <View style={styles.pickerWrapper}>
            { chosenDate ?
                <View>
                    <Text>   You have picked:</Text> 
                    <Text style={styles.datePicked}>{chosenDate}</Text>
                </View>
                : 
                <Text></Text>}
            
            {/* <Text style={styles.datePicked}>{chosenDate} </Text> */}
            <TouchableOpacity style={styles.button} onPress={showPicker}>
                { chosenDate ? 
                <Text style={styles.buttonText}>Pick a Different Date</Text> :
                <Text style={styles.buttonText}>Pick Date</Text>
            }

                <DateTimePicker
                isVisible={isVisible}
                onConfirm={handlePicker}
                onCancel={hidePicker}
                mode={'date'}
                value={date}
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
        marginBottom: 30
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    },
    pickerWrapper: {
        alignItems: 'center'
    },
    datePicked: {
        fontSize: 20
    }

});

export default DatePicker;