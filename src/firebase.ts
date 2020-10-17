import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCXqjcRS5ramU55AbVcMbVWt0QdqZLSIU",
  authDomain: "toshitoma-react-app-firebase.firebaseapp.com",
  databaseURL: "https://toshitoma-react-app-firebase.firebaseio.com",
  projectId: "toshitoma-react-app-firebase",
  storageBucket: "toshitoma-react-app-firebase.appspot.com",
  messagingSenderId: "853672896301",
  appId: "1:853672896301:web:6b5a6d6911bd7356d955a4",
};

firebase.initializeApp(firebaseConfig);

window.firebase = firebase;

export const firestore = firebase.firestore();
export const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  return auth.signInWithPopup(provider);
};
export const signOutWithGoogle = () => {
  auth.signOut();
};

export default firebase;
