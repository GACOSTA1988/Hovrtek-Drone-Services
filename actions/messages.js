import firebase from "../firebase";

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
