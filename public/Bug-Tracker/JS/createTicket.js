var date = (new Date()).toISOString().split('T')[0];
document.getElementById('date').innerHTML = date;

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
// function assignee() {
//     document.getElementById("myDropdown").classList.toggle("show");
// }

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

const db = firebase.firestore();

//Get names of all uses and append (create new <a> tags) into the dropdown we created 
// retrieve a collection

//const userList = document.querySelector('#user-list');

//Filter through all user docs
db.collection('users').get().then(function (querySnapshot) {
    querySnapshot.docs.forEach(function (doc) {
        renderDoc(doc)
    });
});

//Displays name of all users
function renderDoc(doc) {
    let option = document.createElement('option');
    //In case we need to ref it later  
    option.setAttribute('data-id', doc.id);

    //Fill values with names of users
    option.setAttribute('value', doc.data().name);
    //Fill drop down menu with name of users
    option.textContent = doc.data().name;

    //Update UI
    const dropDownList = document.querySelector('#userFormNames');
    dropDownList.appendChild(option);
}


//Update drop down with name of all projects
db.collection('projects').get().then(function (querySnapshot) {
    querySnapshot.docs.forEach(function (doc) {
        renderDoc2(doc)
    });
});

//Displays name of all projects
function renderDoc2(doc) {
    console.log(doc)
    let option = document.createElement('option');
    //In case we need to ref it later  
    option.setAttribute('data-id', doc.id);

    //Fill values with names of users
    option.setAttribute('value', doc.id);
    //Fill drop down menu with name of users
    option.textContent = doc.id;

    //Update UI
    const dropDownList = document.querySelector('#projectNames');
    dropDownList.setAttribute('value', option)
    dropDownList.appendChild(option);
}



//Update UI and store data of 'Priority' of ticket
function showData() {
    // var theSelect = demoForm.demoSelect;
    var priority = document.getElementById("userFormNames");
    var priorityUser = priority.value;
    console.log(priorityUser)
}


//Popup
const snackbar = document.getElementById('snackbar')

//Vars to hold inputs of user
var nameUserSubmitted
var ticketType
var Category
var priority
var userDate
var description
var subject
var ProjectName
var Submitter


//This function gathers all data user has selected 
//or entered and send it to firebase database
function collectDataTicket() {
    //Just call .value on these to retrieve value user has entered
    nameUserSubmitted = document.getElementById("userFormNames");
    ticketType = document.getElementById("userForm");
    Category = document.getElementById("userForm2");
    priority = document.getElementById("userForm3");
    userDate = document.getElementById("datepicker");
    description = document.getElementById("description");
    subject = document.getElementById("subject");
    ProjectName = document.getElementById("projectNames");

    console.log(ProjectName.value + '  ayy')

    //If statement not needed because user will already be logged in
    Submitter = localStorage.getItem('userUID')

    //Checking if user inputted all data needed
    if (nameUserSubmitted.value != null && priority.value != "zilch" && ticketType.value != "zilch"
        && Category.value != "zilch" && userDate.value != ""
        && description.value != "" && description.value != null && subject.value != "") {
        snackbar.innerText = 'Ticket successfully added!';
        showAlert();
        saveToDb();
        setTimeout(function () { location.reload(); }, 3000);

    }

    else {
        snackbar.innerText = 'Please fill in all fields';
        showAlert();
    }


    addUserInputToDatabase();
    //TODO Add banner that tells user that ticket was succesuflly addded and refresh page
}

//Holds size of how many tickets there are
let size01;


let numOfTickets
//Sizes user inputs to a Ticket document inside firebase
function saveToDb() {
    
    //Gets size before remember 
     getSize()
   //Create new doc for the new ticket
    return db.collection('projects').doc(ProjectName.value).collection('projectTickets').doc().set({
        assignee: nameUserSubmitted.value,
        ticketType: ticketType.value,
        Category: Category.value,
        priority: priority.value,
        userDate: userDate.value,
        description: description.value,
        subject: subject.value,
        ProjectName: ProjectName.value,
        NumTickets: numOfTickets,
        Submitter: Submitter
       
    }).then(() => {

    })



}

//Gets and stores (in numOfTickets var) how many ticket documents there are in a given collection.
function getSize(){
    //Consider making this less resource intesnive. 
    console.log(ProjectName.value);
    db.collection('projects').doc(ProjectName.value).collection('projectTickets').get().then(snap => {
        size01 = snap.size // will return the collection size
        localStorage.setItem('numOfTickets', size01);
    });


    //Gets number of Tickets storaged in local storage
    let numOfProjectTickets = localStorage.getItem('numOfTickets');
    numOfTickets = numOfProjectTickets.toString();
    
}

const auth = firebase.auth();

function addUserInputToDatabase() {
    let theProjectName = ProjectName.value;
    console.log(theProjectName);
    return db.collection('projects').doc(ProjectName.value).set({
        value: 'b value'

    }).then(() => {

    })
}



function showAlert() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}