import firebase from "../firebase";

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
  pilotID,
  locationCoordinates,
) {
  return () => {
    firebase
      .database()
      .ref("/projects")
      .push({ clientID, location, date, recording, light, pilotID, locationCoordinates, });
  };
}

export function deleteProject(key) {
  return () => {
    firebase.database().ref(`/projects/${key}`).remove();
  };
}

export function editProject(location, date, recording, locationCoordinates, key) {
  return () => {
    firebase
      .database()
      .ref(`/projects`)
      .child(key)
      .update({ location, date, recording, locationCoordinates });
  };
}

export function acceptJob(pilotID, key) {
  return () => {
    firebase.database().ref(`/projects`).child(key).update({ pilotID });
  };
}
