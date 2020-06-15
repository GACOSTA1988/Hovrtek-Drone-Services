import React, {useState, useEffect} from "react";
import MapView from 'react-native-maps';
import { getProjects } from "../../actions/projects";
import { connect } from "react-redux";
import _ from "lodash";
import * as firebase from "firebase";

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
    

  const mappedMarkers = availableProjects.map((project, index) => {
      const coords = {
        latitude: project.locationCoordinates[0],
        longitude: project.locationCoordinates[1],
      };
      return (
        <MapView.Marker
          key={index}
          coordinate={coords}
          title={project.location}
          description={project.recording} 
          onPress={() => props.navigation.navigate("JobDetailsScreen", {...availableProjects[index]})}
        >
        </MapView.Marker>
      );
  })

  return (
    <MapView
      style={{flex: 1}}
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
  