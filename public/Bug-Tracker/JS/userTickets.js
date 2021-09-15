let createNewTicket = document.querySelector('#createNewTicket');
let displayProjectName = document.querySelector('#displayProjectName');
let projectName = localStorage.getItem("loadProject");
const auth = firebase.auth();
const db = firebase.firestore();




//put project name inside html "header"
displayProjectName.innerHTML = `List of all personal ticket history. Please click on ticket to see further details. `;

document.addEventListener('DOMContentLoaded', function () {
    loadTicketDetails();
}, false);

createNewTicket.addEventListener('click', loadPage)

function loadPage(e) {

    window.location.href = "../HTML/createTicket.html";
}

//Will hold count of each ticket such that
//we have use this to reference a specific ticket later 
let counter = 0;

//Get and display all tickets and their details for requested project.
function loadTicketDetails() {

    let userUID = localStorage.getItem("userUID")
    userUID = userUID.replace(/['"]+/g, '')

    //TODO********, display tickets for user where they assigned them, have been assigned.
    
    //Display tickets user has been assigned
    console.log(projectName);
    db.collectionGroup("projectTickets").where("asigneeUID", "==", userUID)
    .get()
    .then(function(querySnapshot) {
       
        querySnapshot.forEach(function(doc) {
            
            renderDoc(doc)
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    
    // let SubmitterUID = localStorage.getItem("SubmitterUID")
    // SubmitterUID = SubmitterUID.replace(/['"]+/g, '');
    // console.log(SubmitterUID);
    //Display tickets user has assigned to others
    db.collectionGroup("projectTickets").where("SubmitterUID", "==", userUID)
    .get()
    .then(function(querySnapshot) {
       
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
            renderDoc(doc)
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

}



//Update and display to UI
function renderDoc(doc) {
    var certainField01 = doc.data();
    backUpdoc = doc;



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
    <div class="registered__entry"><span>${certainField01.SubmitterName}</span></div>
    
    </div> 
    `;
     
    //If Mobile screen
    
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


//Mobile script. There will be too many divs for mobile users,
//Thus, show only what is nessary. 




let mobileDiv1 = document.querySelector('.result__container');
let mobileDiv2 = document.querySelector('.result__entry');

//target resize event


//Basically, if user resizes window to be small
//Switch to mobile page or vice versa
function executeIfMaxWidth750 (e) {
    if (window.matchMedia('(max-width: 750px)').matches) {
        window.location.replace("userTicketsMobile.html");
    }
  }
  
  // call initially
  executeIfMaxWidth750();
  
  // add handler for resize
  window.addEventListener('resize', executeIfMaxWidth750);