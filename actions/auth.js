import firebase from "../firebase";

const user = firebase.auth().currentUser;

export function checkUser() {
  let [loggedIn, setLoggedIn] = useState(false);
  let [userType, setUserType] = useState(null);

  if (user) {
    setLoggedIn(true);
    setUserType(user.photoURL);
    console.log(user.photoURL);
  } else {
    setLoggedIn(false);
    setUserType(null);
  }
  console.log("user type: ", userType);
}
