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

export function postProjects(location, date, recording) {
  return dispatch => {
    firebase
      .database()
      .ref("/projects")
      .push({ location, date, recording });
  };
}
