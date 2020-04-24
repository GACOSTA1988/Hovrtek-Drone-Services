import firebase from "../firebase";

// Projects functions

export function getProjects() {
  return (dispatch) => {
    firebase
      .database()
      .ref("/projects")
      .on("value", (snapshot) => {
        dispatch({
          type: "PROJECTS_FETCH",
          payload: snapshot.val(),
        });
      });
  };
}

export function postProjects(
  clientID,
  location,
  date,
  recording,
  light,
  pilotID
) {
  return (dispatch) => {
    firebase
      .database()
      .ref("/projects")
      .push({ clientID, location, date, recording, light, pilotID });
  };
}

export function deleteProject(key) {
  return (dispatch) => {
    firebase.database().ref(`/projects/${key}`).remove();
  };
}

export function editProject(location, date, recording, key) {
  return (dispatch) => {
    firebase
      .database()
      .ref(`/projects`)
      .child(key)
      .update({ location, date, recording });
  };
}

export function acceptJob(pilotID, key) {
  return (dispatch) => {
    firebase.database().ref(`/projects`).child(key).update({ pilotID });
  };
}

// pilot profiles functions

export function getPilotProfiles() {
  return (dispatch) => {
    firebase
      .database()
      .ref("/pilotProfiles")
      .on("value", (snapshot) => {
        dispatch({
          type: "PILOT_PROFILES_FETCH",
          payload: snapshot.val(),
        });
      });
  };
}

export function postPilotProfiles(
  pilotFirstName,
  pilotLastName,
  pilotLocation,
  personalBio,
  yearsOfExperience,
  faaLicenseExp,
  insuredStatus,
  travelStatus,
  droneType,
  airMap,
  fourHundred,
  userID
) {
  return (dispatch) => {
    firebase.database().ref("/pilotProfiles").push({
      pilotFirstName,
      pilotLastName,
      pilotLocation,
      personalBio,
      yearsOfExperience,
      faaLicenseExp,
      insuredStatus,
      travelStatus,
      droneType,
      airMap,
      fourHundred,
      userID,
    });
  };
}

export function editPilotProfile(
  pilotLocation = "New",
  personalBio = "New",
  yearsOfExperience = "New",
  faaLicenseExp = "New",
  insuredStatus = "New",
  travelStatus = "New",
  droneType = "New",
  airMap = "New",
  fourHundred = "New",
  key = "New"
) {
  return (dispatch) => {
    firebase.database().ref(`/pilotProfiles`).child(key).update({
      pilotLocation,
      personalBio,
      yearsOfExperience,
      faaLicenseExp,
      insuredStatus,
      travelStatus,
      droneType,
      airMap,
      fourHundred,
    });
  };
}
// client profiles functions

export function getClientProfiles() {
  return (dispatch) => {
    firebase
      .database()
      .ref("/clientProfiles")
      .on("value", (snapshot) => {
        dispatch({
          type: "CLIENT_PROFILES_FETCH",
          payload: snapshot.val(),
        });
      });
  };
}

export function postClientProfiles(clientName, clientLocation, email, userID) {
  return (dispatch) => {
    firebase
      .database()
      .ref("/clientProfiles")
      .push({ clientName, clientLocation, email, userID });
  };
}
