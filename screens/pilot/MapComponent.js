import React, {useState, useEffect} from "react";
import MapView, {Callout, Marker, CalloutSubview,} from 'react-native-maps';
import * as firebase from "firebase";
import { connect } from "react-redux";
import _ from "lodash";
import {
    StyleSheet,
    View,
    Text
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

    const availableProjects = [];
    props.listOfProjects.forEach((project) => {
        if (!project.pilotID) {
            console.log('project', project)
            if(!project.locationCoordinates){
              return project.locationCoordinates = [45.5236111, -122.675]
            } 
            availableProjects.push(project);
        }
      });
    

    const mappedMarkers = availableProjects.map((project, index) => {
        console.log("project", project)
        const coords = {
            latitude: project.locationCoordinates[0],
            longitude: project.locationCoordinates[1],
        };
        return (
            // <MapView.Marker
            //     key={index}
            //     coordinate={coords}
            //     title={marker.jobTitle}
            //     description={marker.jobDescription} 
            // >
            //   <Callout
            //       title={marker.jobTitle}
            //       description={marker.jobDescription} 
            //       onPress={() => props.navigation.navigate("JobDetailsScreen", {
            //   ...marker,
            //   })}
            //   >
            //   </Callout>
            // </MapView.Marker>

            <MapView.Marker
                key={index}
                coordinate={coords}
                title={project.location}
                description={project.recording} 
                onPress={() => props.navigation.navigate("JobDetailsScreen", {
                  ...availableProjects[index],
                  })}
            >
            </MapView.Marker>

            // <Marker coordinate={coords} key={index} >
            //   <View />
            //   <Callout 
            //   onPress={() => props.navigation.navigate("JobDetailsScreen", {
            //               ...marker,
            //             })}
            //             >
            //     <View>
            //       <Text>
            //         {marker.jobTitle}
            //       </Text>
            //       <Text>
            //         {marker.jobDescription}
            //       </Text>
            //     </View>
            //   </Callout>
            // </Marker>
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
  