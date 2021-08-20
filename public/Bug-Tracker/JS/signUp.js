
const signUpBtn = document.getElementById('signUpBtn');
const home = document.getElementById('home');
const userDetails = document.getElementById('userDetails');
const signOutBtn = document.getElementById('signOutBtn');
const errorDetails = document.getElementById('error_output')

//
const txtEmail = document.getElementById('email');
const txtPass = document.getElementById('password');

alert('sd')
const auth = firebase.auth();
const db = firebase.firestore();

signUpBtn.addEventListener('click', e => {

    errorDetails.innerText = "";
    const email = txtEmail.value;
    console.log(txtEmail.value) //EMPTY string?
    const pass = txtPass.value;

    //console.log(email);
    //console.log(pass);

    const promise = auth.createUserWithEmailAndPassword(email, pass).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            bio: 'a'

        }).then(() => {
            //This code below will be called AFTER the catach below
            localStorage.setItem('userUID', JSON.stringify(cred.user.uid));

        });


    })
    promise.catch(e => errorDetails.innerText = e.message);
    //alert('Good');
});



home.addEventListener('click', e => {
    window.location.href = "../../index.html";

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


//For the alert
