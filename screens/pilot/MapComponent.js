import React, {useState, useEffect} from "react";
import MapView from 'react-native-maps';
import * as firebase from "firebase";
import { connect } from "react-redux";
import _ from "lodash";
import {
    StyleSheet,
  } from "react-native";
import { getProjects } from "../../actions/projects";

const initialMarkers = [
    {
        latitude: 45.520288,          
        longitude: -122.625083,          
        latitudeDelta: 0.0922,          
        longitudeDelta: 0.0421,
        jobTitle: "Laurelhurst Park",
        jobDescription: "Film some shenaningans in the park" 
      },
      {
        latitude: 45.520745,          
        longitude: -122.67769,          
        latitudeDelta: 0.0922,          
        longitudeDelta: 0.0421,
        jobTitle: "Epicodus",
        jobDescription: "Drone video of downtown Portland" 
      }
]

function MapComponent(props, {getProjects}){ 

    const [initialCoordinates, setInitialCoordinates] = useState([45.5236111, -122.675])
    const [markers, setMarkers] = useState(initialMarkers)

    useEffect(() => {
        let id = firebase.auth().currentUser.uid
        let result = firebase.database().ref("/pilotProfiles")
        let profile = result.orderByChild("userID").equalTo(id)
        profile.once("value", (snapshot) => {
            let theCoords;
            snapshot.forEach(function(child) {
                let object = child.val()
                return theCoords = object.pilotCoordinates
              });
            setInitialCoordinates(theCoords)
          });
        props.getProjects()
    }, [])

    const availableProjectMarkers = [];
    props.listOfProjects.forEach((project) => {
        if (!project.pilotID) {
            console.log('project', project)
            let newMarker = {}
            //this if should only be necessary until all projects without coordinates are purged
            //or maybe then modified to catch if the geocoder fails and no coordinates were stored
            if(!project.locationCoordinates){
                return newMarker =  {
                    latitude: 45.520745,          
                    longitude: -122.67769,          
                    jobDescription: project.recording,
                    jobTitle: project.location,
                }
            } else {
            newMarker = {
                latitude: project.locationCoordinates[0],
                longitude: project.locationCoordinates[1],
                jobDescription: project.recording,
                jobTitle:  project.location,
            }
        }
  
        availableProjectMarkers.push(newMarker);
        console.log(newMarker)
      }
    });
    

    const mappedMarkers = availableProjectMarkers.map((marker, index) => {
        const coords = {
            latitude: marker.latitude,
            longitude: marker.longitude,
        };
        return (
            <MapView.Marker
                key={index}
                coordinate={coords}
                title={marker.jobTitle}
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

  function mapStateToProps(state) {
    const listOfProjects = _.map(state.projectsList.projectsList, (val, key) => {
      return {
        ...val,
        key: key,
      };
    });
    return {
    listOfProjects
    };
}

export default connect(mapStateToProps, {getProjects})(MapComponent);
  