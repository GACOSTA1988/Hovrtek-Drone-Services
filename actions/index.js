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

export function postProfiles(name, overview, equipment, availability) {
  console.log("index.js line 41. got to post profiles. this is overview: ", overview);
  return dispatch => {
    firebase
      .database()
      .ref("/profiles")
      .push({ name, overview, equipment, availability });
  };
}
