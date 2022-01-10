// let createNewTicket = document.querySelector('#createNewTicket');
// let displayProjectName = document.querySelector('#displayProjectName');
// let projectName = localStorage.getItem("loadProject");
// const auth = firebase.auth();
// const db = firebase.firestore();




// //put project name inside html "header"
// displayProjectName.innerHTML = `List of all ticket history for project ${projectName}. Please click on ticket to see further details. `;

// document.addEventListener('DOMContentLoaded', function () {
//     loadTicketDetails();
// }, false);

// createNewTicket.addEventListener('click', loadPage)

// function loadPage(e) {

//     window.location.href = "../HTML/createTicket.html";
// }

// //Will hold count of each ticket such that
// //we have use this to reference a specific ticket later 
// let counter = 0;

// //Get and display all tickets and their details for requested project.
// function loadTicketDetails() {
//     projectName = localStorage.getItem("loadProject");
//     console.log(projectName);
//     db.collection('projects').doc(projectName).collection("projectTickets").get().then(function (querySnapshot) {
//         querySnapshot.docs.forEach(function (doc) {
//             //Delete discard
//             deleteDiscard(doc);
//             //Update UI
//             renderDoc(doc)
//             //Keep count of tickets

//             if(doc.id != 'discard'){
//                 counter++;
//             }
          
//             console.log(counter);
//         });
//     });

// }


// //Update and display to UI
// function renderDoc(doc) {
//     var certainField01 = doc.data();




//     if(doc.id == 'discard'){
//         //do nothing
//     }

//     else {


//     //Update UI to show each ticket of project
//     const projectNode = document.createElement('div');

//     //This will give each div a unique id
//     projectNode.setAttribute("id", counter);

//     const container = document.querySelector('.result__container')
//     projectNode.innerHTML = `
//      <div class="issue__properties">
//     <div class="issue__entry"><span style="background-color: #f45e51">bug</span></div>
//     <div class="subject__entry" title="${certainField01.subject}"><span style="white-space: pre-line">${certainField01.subject}</span></div>
//     <div class="asignee__entry"><span>${certainField01.assignee}</span></div>
//     <div class="status__entry"><span style="background-color: #f45e51">${certainField01.ticketStatus}</span></div>
//     <div class="category__entry"><span>${certainField01.Category}</span></div>
//     <div class="priority__entry"><span>${certainField01.priority}</span></div>
//     <div class="created__entry"><span>${certainField01.CreatedAt}</span></div>
//     <div class="due-date__entry"><span>${certainField01.userDate}</span></div>
//     <div class="registered__entry"><span>${certainField01.SubmitterName}</span></div>
    
//     </div> 
//     `;

//     //Sets value equal to specific ticket number we want to get later on
//     // projectNode.value = doc.data().where('NumTickets', '=', '10');

//     //This will collect project name that user clicked so that we may load 
//     //tickets of that project. Furthermore, it will direct user
//     //to new page. 
//     projectNode.addEventListener('click', function () {
//         localStorage.setItem('loadTicket', projectNode.id)
//         window.location.href = "../HTML/projectTickets.html";
//         console.log(projectNode.value)
//     });

//     //Refresh page to show new project that has been added

//     container.appendChild(projectNode);
// }
// }






// //Delete a discard doc

// function deleteDiscard(doc) {


//     if (doc.id == 'discard') {


//         var discard = db.collection('projects').doc('discard');
//         discard.get().then(function (querySnapshot) {
//             doc.ref.delete();


//         });
       
//     }
// }


// function executeIfMaxWidth750 () {
//     if (window.matchMedia('(max-width: 750px)').matches) {
//         window.location.replace("projectTicketsMainMobile.html");
//     }
//   }
  
//   // call initially
//   executeIfMaxWidth750();
  
//   // add handler for resize
//   window.addEventListener('resize', executeIfMaxWidth750);
//   //window.addEventListener('size', executeIfMaxWidth750);
//   //executeIfMaxWidth750();

window.location.href = "../HTML/userTickets.html";