import React, {useState, useEffect} from "react";
import MapView, {Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { getProjects } from "../../actions/projects";
import { connect } from "react-redux";
import _ from "lodash";
import * as firebase from "firebase";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import mapStyles from "../../assets/mapStyles.json";
import { getDistance } from 'geolib';

function MapComponent(props){ 

  const [initialCoordinates, setInitialCoordinates] = useState([45.5236111, -122.675])

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
      if(!project.locationCoordinates){
        return project.locationCoordinates = [45.5236111, -122.675]
      } 
      availableProjects.push(project);
    }
  });    

  function distanceAway(distanceinMeters){
    let distance;
    let distanceInFeet = distanceinMeters * 3.28084;
    if (distanceInFeet < 1000) {
      let distanceCalc = distanceInFeet.toFixed(0)
      distance = distanceCalc + " feet away";
    } else {
      let distanceCalc = (distanceInFeet / 5280).toFixed(1)
      distance = distanceCalc + " miles away";
    }
    return distance
  };

  const mappedMarkers = availableProjects.map((project, index) => {
    const coords = {latitude: project.locationCoordinates[0], longitude: project.locationCoordinates[1]};
    let distanceinMeters = getDistance(
      {latitude: initialCoordinates[0],longitude: initialCoordinates[1]},
      {latitude: project.locationCoordinates[0],longitude: project.locationCoordinates[1]}
    );
    let distanceFromPin = distanceAway(distanceinMeters)
    return (
      <MapView.Marker
        key={index}
        coordinate={coords}        
      >
        <Callout onPress={() => props.navigation.navigate("JobDetailsScreen", {...availableProjects[index]})}>
          <TouchableOpacity activeOpacity={0.3} style={styles.touchableContainer}>
          <View style={styles.popOutContainer}>
            <View style={styles.popOutTextBoxes}>
              <Text style={styles.projectHeaderText}>{project.location}</Text>
            </View>
            <View style={styles.popOutTextBoxes}>
              <Text style={styles.distanceText}>{distanceFromPin}</Text>
            </View>
            <View style={styles.popOutTextBoxes}>
              <Text>{project.recording}</Text>
            </View>
          </View>
          </TouchableOpacity>
        </Callout>
      </MapView.Marker>
    );
  })

  return (
    <MapView
      style={{flex: 1}}
      customMapStyle={mapStyles}
      provider={PROVIDER_GOOGLE}
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
  popOutContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  popOutTextBoxes: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  projectHeaderText: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  distanceText: {
    fontSize: 12,
    fontWeight: "200",
    marginBottom: 5,
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
  