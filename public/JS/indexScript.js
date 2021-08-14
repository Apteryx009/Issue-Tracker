// Firebase App (the core Firebase SDK) is always required and must be listed first
// import firebase from "../../node_modules/firebase";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/database";

let userAction = document.querySelector('#DashHome')
console.log(userAction);

userAction.addEventListener('click', loadPage)

function loadPage(e){
  window.location.href = "../HTML/userHome.html";

     
     console.log(app)
}

function emailAndPasscode(){
   const auth = firebase.auth();
   auth.signInWithEmailAndPassword(email, pass);
}