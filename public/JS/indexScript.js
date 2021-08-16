// Firebase App (the core Firebase SDK) is always required and must be listed first
// import firebase from "../../node_modules/firebase";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

const { default: firebase } = require("firebase");

//const { default: firebase } = require("firebase");

// /const { default: firebase } = require("firebase");



var firebaseConfig = {
  apiKey: "AIzaSyC_WJaKKVWuUfx-LFw4Y5EZaHXDUe74XEc",
  authDomain: "bug-tracker-e6006.firebaseapp.com",
  projectId: "bug-tracker-e6006",
  storageBucket: "bug-tracker-e6006.appspot.com",
  messagingSenderId: "551171540691",
  appId: "1:551171540691:web:f2ed9dd6fe17be16087626",
  measurementId: "G-CHWE3GTHH7"
};
// Initialize Firebase



if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

firebase.analytics();


//TODO FIX ERROR REAUIRE IS NOT DEFINED
//const { default: firebase } = require("firebase");

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/database";

//firebase.auth().onAuthStateChanged
let userAction = document.querySelector('#DashHome')
console.log(userAction);


firebase

userAction.addEventListener('click', loadPage)

function loadPage(e){
  //TODO ADD RELATIVE PATH
  window.location.href = "H:/Most stuffd/CodingProjects/BugTracker/1/public/HTML/userHome.html";

     
     console.log(app)
}

function emailAndPasscode(){
//    const auth = firebase.auth();
//    auth.signInWithEmailAndPassword(email, pass);
//    auth.createUserWithEmailAndPassword(email, pass);
//    auth.onAuthStateChanged(firebaseUser => {});
}