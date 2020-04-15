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

export function deleteProject(key) {
  return dispatch => {
    firebase
      .database()
      .ref(`/projects/${key}`)
      .remove();
  };
}

export function editProject(title, content, key) {
  return dispatch => {
    firebase
      .database()
      .ref(`/projects`)
      .child(key)
      .update({ title, content });
  };
}
