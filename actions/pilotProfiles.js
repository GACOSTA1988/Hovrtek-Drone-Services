import firebase from "../firebase";

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
  pilotCoordinates,
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
      pilotCoordinates,
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
