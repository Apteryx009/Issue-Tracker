//To hold graph data
const map1 = new Map();



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

// const auth = firebase.auth();
const db = firebase.firestore();

// const db = firebase.firestore();

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
    option.setAttribute('onclick', getUIDOfAssignee());

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

var projectName02;

//Update UI and store data of 'Priority' of ticket
function showData() {
    // var theSelect = demoForm.demoSelect;
    var priority = document.getElementById("userFormNames");
    var priorityUser = priority.value;

    projectName02 = document.getElementById("projectNames");
    console.log(priorityUser + "tes2St")
    localStorage.setItem("AsigneeFromTicket", priorityUser)
    console.log(projectName02.value + "test")
}

function appendProjectToUser() {
    let _assigneeUID = localStorage.getItem("assigneeUID");
    var refForUser = db.collection("users").doc(_assigneeUID);

    //This will get the document of the assignee
    db.collection('users').doc(_assigneeUID).get().then(function (doc) {
      let _role1 = doc.data().role1;
      let _name = doc.data().name;
      let _email = doc.data().email;

      overWriteDoc(doc, _role1, _name, _email)

      //This updates the document, the firebase update() function is not working
      //And thus I have to go throught his more painful way of updating
        // doc.ref().set({
        //     name: _name,
        //     email: _email,
        //     role1: _role1,
        //     projects: {
        //         0: projectName02
        //     }
        // })
            // console.log(doc.data().name + " hi") 
    });
}

//Might be broken
function overWriteDoc(doc ,_role1, _name, _email){
    db.collection('users').doc(doc.id).update({
            //   name: _name,
            // email: _email,
            // role1: _role1,
            // projects: {
            //     0: projectName02.value,
                
            //   }
            projects: firebase.firestore.FieldValue.arrayUnion(projectName02.value)



    });
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

//Name of user from db
let SubmitterName;


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

    console.log(subject.value.length)


    //Makes sure user doesn't add a super long subject title
    if (subject.value.length > 51) {
        snackbar.innerText = 'Subject must be less than 50 charterers long';
        showAlert();
    }

    else {
        //Checking if user inputted all data needed
        if (nameUserSubmitted.value != null && priority.value != "zilch" && ticketType.value != "zilch"
            && Category.value != "zilch" && userDate.value != ""
            && description.value != "" && description.value != null && subject.value != "") {
            snackbar.innerText = 'Ticket successfully added!';

            localStorage.setItem("TicketAsignee", nameUserSubmitted.value)

            map1.set(localStorage.getItem('SubmitterName'), nameUserSubmitted.value)
            createDataForGrapgh()
            console.log(map1)

            showAlert();
            saveToDb();
            appendProjectToUser() //HERE
            setTimeout(function () { location.reload(); }, 3000);

        }

        else {
            snackbar.innerText = 'Please fill in all fields';
            showAlert();
        }


        addUserInputToDatabase();
        //TODO Add banner that tells user that ticket was succesuflly addded and refresh page
    }
}

let assigneeUID;


//Get UID of assignee. This is useful because two assignees
//might share the same name
function getUIDOfAssignee() {

    //Gets UID of assignee
    $("#userFormNames").change(function () {
        assigneeUID = $(this).find(':selected').data("id");
        localStorage.setItem("assigneeUID", assigneeUID);
    });


}



//Holds size of how many tickets there are
let size01;


let numOfTickets
//Sizes user inputs to a Ticket document inside firebase
function saveToDb() {



    //Get UID of submitter
    Submitter = localStorage.getItem('userUID')
    Submitter = Submitter.replace(/['"]+/g, '');

    //Get UID of assignee
    let assigneeUID01 = localStorage.getItem('assigneeUID');

    getSubmitterName(Submitter);

    let SubmitterName01 = localStorage.getItem('SubmitterName');
    //  console.log(SubmitterName01 + "Submitter name")







    //UID of assignee
    // console.log(assigneeUID.value + "assignee UID")



    //Gets size before remember 
    getSize()
    //Create new doc for the new ticket
    return db.collection('projects').doc(ProjectName.value).collection('projectTickets').doc().set({
        assignee: nameUserSubmitted.value,
        asigneeUID: assigneeUID01,
        ticketType: ticketType.value,
        Category: Category.value,
        priority: priority.value,
        userDate: userDate.value,
        description: description.value,
        subject: subject.value,
        ProjectName: ProjectName.value,
        NumTickets: numOfTickets,
        SubmitterName: SubmitterName01,
        SubmitterUID: Submitter,
        CreatedAt: date,
        ticketStatus: 'open'

    }).then(() => {

    })



}

//Gets and stores (in numOfTickets var) how many ticket documents there are in a given collection.
function getSize() {
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
    return db.collection('projects').doc(ProjectName.value).update({
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

//Get name of Submitter
function getSubmitterName(Submitter) {
    //Get name of Submitter
    db.collection('users').get().then(function (querySnapshot) {
        querySnapshot.docs.forEach(function (doc) {
            if (doc.id == Submitter) {
                localStorage.setItem('SubmitterName', doc.data().name)
            }
        });
    });
}



//Function to create data for db that gives direction of who assigns and submits tickets

function createDataForGrapgh(){
   let x; let y = localStorage.getItem("SubmitterName")
   x = map1.get(localStorage.getItem("SubmitterName"))
   console.log(x);

   db.collection("GraphData").doc().set({
    Submitter: localStorage.getItem("SubmitterName"), 
    Asignee: localStorage.getItem("AsigneeFromTicket")
                     
            
  })
}