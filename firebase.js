
import * as firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyCjR-9fPOfwA8KnYrGzOY4PhbpogxsN6fA",
    authDomain: "hovrtek-b384b.firebaseapp.com",
    databaseURL: "https://hovrtek-b384b.firebaseio.com",
    projectId: "hovrtek-b384b",
    storageBucket: "hovrtek-b384b.appspot.com",
    messagingSenderId: "666991965144",
    appId: "1:666991965144:web:04d61957d3641e6b3338ad"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;