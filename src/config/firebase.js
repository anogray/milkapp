import firebase from "firebase"

const firebaseApp = firebase.initializeApp({

  apiKey: "AIzaSyDONyM3TQT9i5djvuxlA1osEs1JF2Vj-ps",
  authDomain: "milkapp-75f64.firebaseapp.com",
  projectId: "milkapp-75f64",
  storageBucket: "milkapp-75f64.appspot.com",
  messagingSenderId: "430268951864",
  appId: "1:430268951864:web:e9745aa80031948b04a5cd"

});

const db = firebaseApp.firestore();

export default db;

