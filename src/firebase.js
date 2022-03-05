import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyD7Qz0U4hAx5C4kIwOUW5r5ihhq5yW7Om8",
  authDomain: "what-schat-d6079.firebaseapp.com",
  projectId: "what-schat-d6079",
  storageBucket: "what-schat-d6079.appspot.com",
  messagingSenderId: "798392068818",
  appId: "1:798392068818:web:5239d6575e576f382edb0b",
  measurementId: "G-1ECEJJ1DET"
}; 

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;