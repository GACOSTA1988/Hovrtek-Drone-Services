import firebase from "../firebase";

export function getProjects() {
  return dispatch => {
    firebase
      .database()
      .ref("/projects")
      .on("value", snapshot => {
        dispatch({
          type: "PROJECTS_FETCH",
          payload: snapshot.val()
        });
      });
  };
}

export function postProjects(location, date, recording, light) {
  return dispatch => {
    firebase
      .database()
      .ref("/projects")
      .push({ location, date, recording, light });
  };
}

export function getProfiles() {
  return dispatch => {
    firebase
      .database()
      .ref("/profiles")
      .on("value", snapshot => {
        dispatch({
          type: "PROFILES_FETCH",
          payload: snapshot.val()
        });
      });
  };
}

export function postProfiles(pilotFirstName, pilotLastName, pilotLocation, droneType, airMap, fourHundred, userID) {
  return dispatch => {
    firebase
      .database()
      .ref("/profiles")
      .push({ pilotFirstName, pilotLastName, pilotLocation, droneType, airMap, fourHundred, userID });
  };
}

export function deleteProject(key) {
  return dispatch => {
    firebase
      .database()
      .ref(`/projects/${key}`)
      .remove();
  };
}

export function editProject(location, date, recording, key) {
  return dispatch => {
    firebase
      .database()
      .ref(`/projects`)
      .child(key)
      .update({ location, date, recording });
  };
}
