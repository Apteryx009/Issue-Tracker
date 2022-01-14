
const signUpBtn = document.getElementById('signUpBtn');
const home = document.getElementById('home');
const userDetails = document.getElementById('userDetails');
const signOutBtn = document.getElementById('signOutBtn');
const errorDetails = document.getElementById('error_output')
let groupBox = document.querySelector('#yesCreateGroup')
let groupName = document.querySelector('#groupName')
var roleValue = document.getElementById("roleValue");
//Get name of user
const name01 = document.getElementById('name')


//Popup
const snackbar = document.getElementById('snackbar')

//
const txtEmail = document.getElementById('email');
const txtPass = document.getElementById('password');

//alert('sd')
const auth = firebase.auth();
const db = firebase.firestore();


function loadPage(e) {
    window.location.href = "../../Bug-Tracker/HTML/userHome.html";
   

}



signUpBtn.addEventListener('click', e => {
    const userName = document.getElementById('name');
    //localStorage.setItem("nameUser", userName.textContent)
    //errorDetails.innerText = "";
    const email = txtEmail.value;
    console.log(txtEmail.value) //EMPTY string?
    const pass = txtPass.value;

    //console.log(email);
    //console.log(pass);

    //To check if user entered name
    userName.addEventListener('input', () => {
        userName.setCustomValidity('');
        userName.checkValidity();
        console.log(userName.checkValidity());

    });

    userName.addEventListener('invalid', () => {
        userName.setCustomValidity('Please fill in your Name.');
    })

    //If user did actully enter a name, this 
    //wil set a new field in our firebase database assioated with user
    if (userName.checkValidity() == true) {
       
         let newGroupName = groupName.value;
        console.log(newGroupName)
        let totalGroups01;

    
    
        // console.log("here is total groups" + totalGroups)

       
    

        const promise = auth.createUserWithEmailAndPassword(email, pass).then(cred => {

            var docRef = db.collection('totalGroups').doc('totalGroups');
            let ourVal;
            docRef.get().then(doc => {
                ourVal =  doc.data().totalGroups;
              localStorage.setItem('TotalGroups', doc.data().totalGroups ) //prespusses database already has data
            })
             
            console.log("ourVal is " + ourVal)
               
            
            //If I don't use local storage, totalgroups will always be undefined
            totalGroups01 = parseInt( localStorage.getItem('TotalGroups'))
            totalGroups01 += 1;
            console.log(typeof totalGroups01 + "   01")
            console.log( totalGroups01 + "   01")
            //console.log(parseInt( totalGroups01) + "   01")
            //totalGroups = totalGroups + 1; 
           // let increasedGroups =totalGroups + 1;

            //This is what was causing the bug
         //   I need to increment total Groups by 1
            db.collection('totalGroups').doc('totalGroups').set({
                totalGroups: totalGroups01
            });
    
    
            //The following will create a new group ,
            //and set data needed to initialize such group
            if(newGroupName != null){
            db.collection('groups').doc(newGroupName).set({
                 group: increasedGroups, // (must create function to fetch value)
                totalUsers: '1',
                roleGroup0: {
                    0: 'null',
                    1: 'null',
                    2: 'null',
                    3: 'null',
                    4: 'null'
                },
                totalRoleGroups: 1,
                totalUsers: 1,
                users: {
                    0: email
                }
    
            });
        };

            return db.collection('users').doc(cred.user.uid).set({
                name: name01.value,
                role1: roleValue.innerText,
                email: email,
               // group: not sure about num index on this

            }).then(() => {
                //This code below will be called AFTER the catach below
                localStorage.setItem('userUID', JSON.stringify(cred.user.uid));

            });


        });
        promise.catch(e =>{
            snackbar.innerText = e.message;
            showAlert();
        });
    } else{
        snackbar.innerText = "Please enter a name";
        showAlert()
    }

    
});



home.addEventListener('click', e => {
    window.location.href = "../../index.html";

});


signOutBtn.addEventListener('click', e => {
    localStorage.removeItem('userUID');
    auth.signOut();
});


auth.onAuthStateChanged(firebaseUser => {
    //This if might not be nessary


    if (firebaseUser) {
        // signed in
        console.log(firebaseUser);
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        // whenSignedIn2.hidden = false; whenSignedIn2.innerHTML = "Sucess!";
        snackbar.innerText = "Sucess! You are logged in!";
        showAlert()
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


//For the alert
function showAlert() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}




function roleValueChange(roleValue01){
    // var roleValue = document.getElementById("roleValue");
    roleValue.innerText = roleValue01;
    console.log(roleValue01)
}


//If user click yes on create new group
function createGroup(){
    setTimeout(1000);
    let newGroupName;

    let userdecsion = document.querySelector('#userCreateGroup')
    


    // if (userdecsion.value == 'Yes') {
    //     groupBox.hidden = false;
      
    // }

    // else {
    //     groupBox.hidden = true;
    // }



}