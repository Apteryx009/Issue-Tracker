//A test button which will load projectTickets.html at user request
let userAction = document.querySelector('#loadProjectTickets')
let userCreateTicket = document.querySelector('#createNewTicket')
let addProject = document.querySelector('#addProject')
let viewAllTickets = document.querySelector('#viewAllTickets')

// let viewAllTickets = document.querySelector('#????')
// let viewAllTickets = document.querySelector('#????')

let testData = document.querySelector('#testData')



userAction.addEventListener('click', loadPage)
userCreateTicket.addEventListener('click', loadPage2)
viewAllTickets.addEventListener('click', loadPage3)

addProject.addEventListener('click', submitNewProject)

function loadPage(e) {
    
    window.location.href = "../HTML/projectTickets.html";
}

function loadPage2(e) {
    
    window.location.href = "../HTML/createTicket.html";
}

function loadPage3(e) {
   
    window.location.href = "../HTML/projectTicketsMain.html";
}


const db = firebase.firestore();
const userUID = localStorage.getItem('userUID');

// db.collection("users")
//     .onSnapshot(function(querySnapshot) {
//         let users = [];
//         querySnapshot.forEach(function(doc) {
//             users.push(doc.data());
//         }); 
//        // console.log(users);     
//     });

var data = db.doc('/users/rk8B6Z18JghZWybTt13Ubm0cbn82/projects/projectDetails');


let ourData = document.getElementById('testData')

//testing
data.get().then((doc) => {
    if (doc.exists) {
        var certainField = doc.data();
        console.log("Document data:", certainField.name);
        ourData.innerText = certainField.name;
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});



function userDueDate() {

    setTimeout(1000);
    let dueDate = document.querySelector('#userFormDueDate')
    let datePicker = document.querySelector('#dueDatePicker')
    //console.log(dueDate.value)

    if (dueDate.value == 'Yes') {
        datePicker.hidden = false;
    }

    else {
        datePicker.hidden = true;
    }
}

function submitNewProject() {
    //console.log('test')
    //Collect info about new project
    let projectName01 = document.querySelector('#projectName01').value;
    let description = document.querySelector('#description')
    
    let userFormDueDate = document.querySelector('#datepicker')

    //TODO Add function to make sure user is not overwritting data of already exicting project

    let ifProjectExists;

    var docRef = db.collection("projects").doc(projectName01);


    
    //Makes sure user doesn't add a super long subject title
    // if (???.value.length > 51) {
    //     snackbar.innerText = 'Subject must be less than 50 charterers long';
    //     showAlert();
    // }


    docRef.get().then((doc) => {
        if (doc.exists) {
            snackbar.innerText = "Project Already Exists! Please select a different name.";
         showAlert()
            // console.log("Document data:", doc.data());
            // ifProjectExists = true;
            // console.log(ifProjectExists)
        } else {

            //This will fix the project names not showing up in dropdown.
            db.collection('projects').doc(projectName01).set({
                state: 'initialized'
            });

            //Firebase will not allow me to use "data".value inside our set function 
            //I have to only use a var when setting data in db,
            //this, we call the .value beforehand.
            let userDescription = description.value
            let dueDate = userFormDueDate.value;

            //Save Description and due date to db
            db.collection('projects').doc(projectName01).set({
                Description: userDescription,
                dueDate: dueDate
            });

            // doc.data() will be undefined in this case
            return db.collection('projects').doc(projectName01).collection('projectTickets').doc('discard').set({
                value: 'discard'
    
            }).then(() =>{
                snackbar.innerText = "New Project Created!";
                showAlert()
            });

           
           
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

   


    //If Document already exists
    // if (ifProjectExists) {
    //     //Display banner to user saying they cannot overwrite already existing project
    //     snackbar.innerText = "Project Already Exists! Please select a different name.";
    //     showAlert()
    // }

    // else {
    //     return db.collection('projects').doc(projectName01).collection('projectTickets').doc('discard').set({
    //         value: 'discard'

    //     }).then(() => {
    //         // snackbar.innerText = "New Project Created!";
    //         // showAlert()
    //     })
    // }

}





function showAlert() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}


// //dynamically Create and list projects that user has access to
// var listSub1 = document.querySelector('.listSub1');
// var projectName = document.createElement('a');
// projectName.setAttribute('class', 'list-group-item list-group-item-action list-group-item-danger');
// projectName.setAttribute("href", "https://www.reddit.com/");
// projectName.appendChild(document.createTextNode("data"));
// listSub1.appendChild(projectName);


// var data = db.doc(`/users/rk8B6Z18JghZWybTt13Ubm0cbn82/projects/projectDetails`);
// let size; //Amounts of projects a given user has
// db.doc("/users/rk8B6Z18JghZWybTt13Ubm0cbn82/projects").get().then(function(querySnapshot) {      
//     size = (querySnapshot.size); 
// });

// //TODO: To get element, I need it's ID, but to get ID, i need to save it when I create it. 
// //Thus, I need to focus on creating tickets for projectd before recieving it.

// function getProjectData(){

//     //For listSub1
//     for(let i =0; i < size; i++){
//       console.log(size)
//     }

// }

// getProjectData();