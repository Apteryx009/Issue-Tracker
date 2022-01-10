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
    let userUID01 = userUID.replace(/['"]+/g, '')


    console.log("test")

    //TODO********, display tickets for user where they assigned them, have been assigned.
    
    //Display tickets user has been assigned
    console.log(projectName);
    db.collectionGroup("projectTickets").where("asigneeUID", "==", userUID01)
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

    console.log("test")


    if(doc.id == 'discard'){
        //do nothing
    }

   

      
        
    //Update UI to show each ticket of project
    const projectNode = document.createElement('div');

    //This will give each div a unique id
    projectNode.setAttribute("id", counter);

  
    const container = document.querySelector('.result__container')
    projectNode.innerHTML = `
     <div class="issue__properties">
    <div class="issue__entry"><span style="background-color: #f45e51">bug</span></div>
    <div  id="crop" class="subject__entry" title="${certainField01.subject}"><span style="white-space: pre-line">${certainField01.subject}</span></div>
    <div class="asignee__entry"><span>${certainField01.assignee}</span></div>
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







//Delete a discard doc

function deleteDiscard(doc) {


    if (doc.id == 'discard') {


        var discard = db.collection('projects').doc('discard');
        discard.get().then(function (querySnapshot) {
            doc.ref.delete();


        });
       
    }
}


function executeIfMinWidth750 () {
    if (window.matchMedia('(min-width: 750px)').matches) {
        window.location.replace("projectTicketsMain.html");
    }
  }
  
  // call initially
  executeIfMinWidth750();
  
  // add handler for resize
  window.addEventListener('resize', executeIfMinWidth750);


  //Mobile menu dashboard
  //DashBoard
      const menuIcon = document.querySelector('.menu-icon');
      const aside = document.querySelector('.aside');
      const asideClose = document.querySelector('.aside_close-icon');

      function toggle(el, className) {
        //Basically just do the oppsite.
        if (el.classList.contains(className)) {
          el.classList.remove(className);
        } else {
          el.classList.add(className);
        }
      }

      menuIcon.addEventListener('click', function() {
        toggle(aside, 'active');
      });

      asideClose.addEventListener('click', function() {
        toggle(aside, 'active');
      });