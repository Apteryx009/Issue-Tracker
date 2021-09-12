const auth = firebase.auth();
const db = firebase.firestore();


// var ref = firebase.database().ref("projects/");

// console.log(ref)

// let nameOfUser = getName(); 

// function getUserSpecificTickets(){
//     let ref = db.collection('projects').get().then(function (querySnapshot) {
//         querySnapshot.docs.forEach(function (doc) {
//             ref.child(doc.id).get().then(function (querySnapshot) {
//                 querySnapshot.docs.forEach(function (doc2) {
//                     console.log(doc2.id)
//                 });
//             });
//             ref = ref + doc.id;
//            console.log(ref) 
//         });
//     });
// }

// // function getSubCollection(){
// //     ref.collection('projectTickets').get().then(function (querySnapshot) {
// //         querySnapshot.docs.forEach(function (doc) {
           
            
// //            console.log( doc.data()) 
// //         });
// //     });
// // }

// getUserSpecificTickets()

let createNewTicket = document.querySelector('#createNewTicket');
let displayProjectName = document.querySelector('#displayProjectName');
let projectName = localStorage.getItem("loadProject");


//get name of user
function getName() {
    let nameOfUser;
    let userID = localStorage.getItem('userUID');

    //This is nessary to remove the double quotes around userUID
    userID = userID.replace(/['"]+/g, '');
    // console.log(userID)
    db.collection('users').get().then(function (querySnapshot) {
        querySnapshot.docs.forEach(function (doc) {
           if(doc.id == userID){
            nameOfUser = doc.data().name;
            localStorage.setItem('nameOfUser', nameOfUser);
           }
        });
    });
}



//put project name inside html "header"
displayProjectName.innerHTML = `List of all ticket history for project ${projectName}. Please click on ticket to see further details. `;



document.addEventListener('DOMContentLoaded', function () {
    loadTicketDetails01();
    
}, false);

 nameOfUser = getName();

 
 

createNewTicket.addEventListener('click', loadPage)

function loadPage(e) {

    window.location.href = "../HTML/createTicket.html";
}

//Will hold count of each ticket such that
//we have use this to reference a specific ticket later 
let counter = 0;

//Get and display all tickets and their details for requested project.
function loadTicketDetails01() {
    let nameOfUser = localStorage.getItem('nameOfUser')
    db.collectionGroup("projectTickets").where("assignee", "==", nameOfUser)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

}


//Update and display to UI
function renderDoc(doc) {
    var certainField01 = doc.data();




    if(doc.id == 'discard'){
        //do nothing
    }

    else {


    //Update UI to show each ticket of project
    const projectNode = document.createElement('div');

    //This will give each div a unique id
    projectNode.setAttribute("id", counter);

    const container = document.querySelector('.result__container')
    projectNode.innerHTML = `
     <div class="issue__properties">
    <div class="issue__entry"><span style="background-color: #f45e51">bug</span></div>
    <div class="subject__entry" title="${certainField01.subject}"><span style="white-space: pre-line">${certainField01.subject}</span></div>
    <div class="asignee__entry"><span>${certainField01.assignee}</span></div>
    <div class="status__entry"><span style="background-color: #f45e51">${certainField01.ticketStatus}</span></div>
    <div class="category__entry"><span>${certainField01.Category}</span></div>
    <div class="priority__entry"><span>${certainField01.priority}</span></div>
    <div class="created__entry"><span>${certainField01.CreatedAt}</span></div>
    <div class="due-date__entry"><span>${certainField01.userDate}</span></div>
    <div class="registered__entry"><span>${certainField01.assignee}</span></div>
    
    </div> 
    `;

    //Sets value equal to specific ticket number we want to get later on
    // projectNode.value = doc.data().where('NumTickets', '=', '10');

    //This will collect project name that user clicked so that we may load 
    //tickets of that project. Furthermore, it will direct user
    //to new page. 
    projectNode.addEventListener('click', function () {
        localStorage.setItem('loadTicket', projectNode.id)
        window.location.href = "../HTML/projectTickets.html";
        console.log(projectNode.value)
    });

    //Refresh page to show new project that has been added

    container.appendChild(projectNode);
}
}






//Delete a discard doc

function deleteDiscard(doc) {


    if (doc.id == 'discard') {


        var discard = db.collection('projects').doc('discard');
        discard.get().then(function (querySnapshot) {
            doc.ref.delete();


        });
       
    }
}


