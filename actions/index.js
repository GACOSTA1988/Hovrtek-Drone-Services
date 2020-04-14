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

export function postProjects(title, content) {
  return dispatch => {
    firebase
      .database()
      .ref("/projects")
      .push({ title, content });
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
  return dispatch => {
    firebase
      .database()
      .ref("/profiles")
      .push({ name, overview, equipment, availability });
  };
}
