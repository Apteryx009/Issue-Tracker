//Used to greet user
let userAction = document.querySelector('#DashHome')
console.log(userAction);

userAction.addEventListener('click', loadPage)

function loadPage(e){
    window.location.href = "../HTML/userHome.html";
}



///// User Authentication /////

const auth = firebase.auth();

console.log(firebase);

const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');
const whenSignedIn2 = document.getElementById('whenSignedIn2');

const signInBtn = document.getElementById('signInBtn');
const signUpBtn = document.getElementById('signUpBtn');
const signOutBtn = document.getElementById('signOutBtn');

const userDetails = document.getElementById('userDetails');


//
const txtEmail = document.getElementById('email');
const txtPass = document.getElementById('password');




//Should be correct
const provider = new firebase.auth.EmailAuthProvider();

//Might not work:
//signInBtn.onclick = () => auth.signInWithPopup(provider);

signInBtn.addEventListener('click', e=> {
    const email = txtEmail.value;
    const pass = txtPass.value;

    //console.log(email);
    //console.log(pass);

    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});

signUpBtn.addEventListener('click', e=> {
    const email = txtEmail.value;
    const pass = txtPass.value;

    //console.log(email);
    //console.log(pass);

    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});

signOutBtn.addEventListener('click', e => {
    auth.signOut();
});

//signOutBtn.onclick = () => auth.signOut();



auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        // signed in
        console.log(firebaseUser);
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        whenSignedIn2.hidden = false; whenSignedIn2.innerHTML ="Sucess!";
       // userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`;
    } else {
        // not signed in
        whenSignedIn2.innerHTML ="";
        console.log('not signed in');
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = '';
    }
});

