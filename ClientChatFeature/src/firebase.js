import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyDBEgz7osKk9pLQRvPqTFQoWdGG6yOwO6s",
    authDomain: "ms-teams-d7fce.firebaseapp.com",
    projectId: "ms-teams-d7fce",
    storageBucket: "ms-teams-d7fce.appspot.com",
    messagingSenderId: "434418012304",
    appId: "1:434418012304:web:24b866fde8e79091634815"
  }).auth();