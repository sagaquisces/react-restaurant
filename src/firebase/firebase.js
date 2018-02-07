import * as firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBJkjEBpcKIJesdlY-Mt_1WQEmoJUxLzog",
  authDomain: "react-restaurant-152eb.firebaseapp.com",
  databaseURL: "https://react-restaurant-152eb.firebaseio.com",
  projectId: "react-restaurant-152eb",
  storageBucket: "",
  messagingSenderId: "364463744385"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database()
const auth = firebase.auth()

export {
  db,
  auth,
}
