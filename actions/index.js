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
  userID,
  profileImageUrl,
  profileComplete
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
      profileImageUrl,
      profileComplete,
    });
  };
}

export function editPilotProfile(
  pilotLocation = "",
  personalBio = "",
  yearsOfExperience = "",
  faaLicenseExp = "",
  insuredStatus = "",
  travelStatus = "",
  droneType = "",
  airMap = "",
  fourHundred = "",
  profileComplete = "",
  profileImageUrl = "",
  key = ""
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
      profileComplete,
      profileImageUrl,
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

export function postClientProfiles(
  firstName,
  lastName,
  location,
  email,
  bio,
  industry,
  paymentType,
  profileImageUrl,
  userID
) {
  return (dispatch) => {
    firebase.database().ref("/clientProfiles").push({
      firstName,
      lastName,
      location,
      email,
      bio,
      industry,
      paymentType,
      profileImageUrl,
      userID
    });
  };
}

export function editClientProfile(
  firstName,
  lastName,
  location,
  bio,
  industry,
  paymentType,
  profileImageUrl,
  key
) {
  return (dispatch) => {
    firebase
      .database()
      .ref(`/clientProfiles`)
      .child(key)
      .update({
        firstName,
        lastName,
        location,
        bio,
        industry,
        paymentType,
        profileImageUrl,
      });
  };
}


// Messages functions

export function getMessages() {
  return (dispatch) => {
    firebase
      .database()
      .ref("/messages")
      .on("value", (snapshot) => {
        dispatch({
          type: "MESSAGES_FETCH",
          payload: snapshot.val(),
        });
      });
  };
}

export function postMessages(userOneID, userTwoID, timestamp, body) {
  return (dispatch) => {
    firebase
      .database()
      .ref("/messages")
      .push({ userOneID, userTwoID, timestamp, body });
  };
}
