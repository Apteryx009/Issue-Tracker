//










//Used to greet user
let userAction = document.querySelector('#DashHome')
//console.log(userAction);

// userAction.addEventListener('click', loadPage)

function loadPage(e) {
    window.location.href = "Bug-Tracker/HTML/userHome.html";
}



///// User Authentication /////

const auth = firebase.auth();
const db = firebase.firestore();

//console.log(firebase);

const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');
const whenSignedIn2 = document.getElementById('whenSignedIn2');

const signInBtn = document.getElementById('signInBtn');
const signUpBtn = document.getElementById('signUpBtn');
const signOutBtn = document.getElementById('signOutBtn');

const userDetails = document.getElementById('userDetails');

const errorDetails = document.getElementById('error_output')

//
const txtEmail = document.getElementById('email');
const txtPass = document.getElementById('password');




const provider = new firebase.auth.EmailAuthProvider();

//Might not work:
//signInBtn.onclick = () => auth.signInWithPopup(provider);

signInBtn.addEventListener('click', e => {

    //Clear Error field:
    //errorDetails.innerText = "";

    const email = txtEmail.value;
    const pass = txtPass.value;

    //console.log(email);
    //console.log(pass);

    console.log('hola');


    //IK this looks odd, but it runs perfectly and gives zero bugs
    const promise = auth.signInWithEmailAndPassword(email, pass).then(cred => {
       
            //This code below will be called AFTER the catach below
            localStorage.setItem('userUID', JSON.stringify(cred.user.uid));
            snackbar.innerText = "Sucess!"
            showAlert();
            setTimeout(function () { loadPage(); }, 2000);

            

        });
      //errorDetails.innerText = e.message  
    promise.catch( e =>{
        snackbar.innerText = e.message;
        showAlert();
       
    });
});

    // function saveToFile(userId){

    //     //If error, prevents data from being saved
    //     const finished = (error) => {
    //         if(error){
    //             console.error(error);
    //             return;
    //         }
    //     }

    //    // const fs = require('fs');
    //     //const jsonData = JSON.stringify(userId);
    //     alert(userId);
    //     //fs.writeFile('User/user.json', jsonData, finished)
    // }


    signUpBtn.addEventListener('click', e => {
        window.location.href = "Bug-Tracker/HTML/signUp.html";
    });






    signOutBtn.addEventListener('click', e => {
        localStorage.removeItem('userUID');
        auth.signOut();
    });




    auth.onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            // signed in
            console.log(firebaseUser);
            whenSignedIn.hidden = false;
            whenSignedOut.hidden = true;
            whenSignedIn2.hidden = false; whenSignedIn2.innerHTML = "Sucess!";
            setTimeout(function () { loadPage(); }, 2000);
            // userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`;
        } else {
            // not signed in
            whenSignedIn2.innerHTML = "";
            console.log('not signed in');
            whenSignedIn.hidden = true;
            whenSignedOut.hidden = false;
            userDetails.innerHTML = '';
        }
    });

    
//Snackbar
const snackbar = document.getElementById('snackbar')

function showAlert() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}


const demoAdmin = document.getElementById('demoAdminBtn');
//Demo Admin button funcdtionality
demoAdmin.addEventListener('click', e => {

    //Clear Error field:
    //errorDetails.innerText = "";

    const email = "adminDemo27@gmail.com";
    const pass = "adminPassword";

    //IK this looks odd, but it runs perfectly and gives zero bugs
    const promise = auth.signInWithEmailAndPassword(email, pass).then(cred => {
       
            //This code below will be called AFTER the catach below
            localStorage.setItem('userUID', JSON.stringify(cred.user.uid));
            snackbar.innerText = "Sucess!"
            showAlert();
            setTimeout(function () { loadPage(); }, 2000);

            

        });
      //errorDetails.innerText = e.message  
    promise.catch( e =>{
        snackbar.innerText = e.message;
        showAlert();
       
    });
});