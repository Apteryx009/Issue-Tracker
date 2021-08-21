//










//Used to greet user
let userAction = document.querySelector('#DashHome')
//console.log(userAction);

userAction.addEventListener('click', loadPage)

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
    errorDetails.innerText = "";

    const email = txtEmail.value;
    const pass = txtPass.value;

    //console.log(email);
    //console.log(pass);

    console.log('hola');


    //IK this looks odd, but it runs perfectly and gives zero bugs
    const promise = auth.signInWithEmailAndPassword(email, pass).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            // name: ''

        }).then(() => {
            //This code below will be called AFTER the catach below
            localStorage.setItem('userUID', JSON.stringify(cred.user.uid));

        });
        //promise.catch(e => errorDetails.innerText = e.message);

        // promise.catch(e => console.log(e.message));





    });
    promise.catch(e => errorDetails.innerText = e.message);
})

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

    //Why
