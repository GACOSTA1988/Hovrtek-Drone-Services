import React, {useState, useEffect} from "react";
import MapView from 'react-native-maps';
import {getPilotProfile} from "../../actions/pilotProfiles"
import * as firebase from "firebase";
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
  } from "react-native";

const initialMarkers = [
    {
        latitude: 45.520288,          
        longitude: -122.625083,          
        latitudeDelta: 0.0922,          
        longitudeDelta: 0.0421,
        jobName: "Laurelhurst Park",
        jobDescription: "Film some shenaningans in the park" 
      },
      {
        latitude: 45.520745,          
        longitude: -122.67769,          
        latitudeDelta: 0.0922,          
        longitudeDelta: 0.0421,
        jobName: "Epicodus",
        jobDescription: "Drone video of downtown Portland" 
      }
]

export default function MapComponent(){ 
    const [initialCoordinates, setInitialCoordinates] = useState([45.5236111, -122.675])
    useEffect(() => {
        let id = firebase.auth().currentUser.uid
        let result = firebase.database().ref("/pilotProfiles")
        let profile = result.orderByChild("userID").equalTo(id)
        profile.once("value", (snapshot) => {
            let response = Object.entries(snapshot.val())
            let nestedProperties = Object.entries(response[0][1])
            let array = nestedProperties.filter(property => property[0] === "pilotCoordinates")
            let theCoords = array[0][1]
            console.log("the coords:", theCoords)
            setInitialCoordinates(theCoords)
          });
    }, [])
    const [markers, setMarkers] = useState(initialMarkers)

    const mappedMarkers = markers.map((marker, index) => {
        const coords = {
            latitude: marker.latitude,
            longitude: marker.longitude,
        };
        return (
            <MapView.Marker
                key={index}
                coordinate={coords}
                title={marker.jobName}
                description={marker.jobDescription}
            />
        );
    })

    return (
        <MapView
        style={{
            flex: 1
            }}
            region={{
                latitude: initialCoordinates[0],          
                longitude: initialCoordinates[1],          
                latitudeDelta: 0.0922,          
                longitudeDelta: 0.0421    
            }}
            >
            {mappedMarkers}
        </MapView>
    );
}

const styles = StyleSheet.create({
    backButton: {
      alignSelf: "center",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#092455",
      width: 60,
      height: 30,
      position: 'absolute', 
      bottom: 20,
      zIndex: 1,
    }, 
    backButtonText: {
        fontSize: 20,
        fontWeight: "600",
        color: "white",
    },
  });