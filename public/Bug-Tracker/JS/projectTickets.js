//TODO: FIX bug where every bug is registed by dfgdfg.
const auth = firebase.auth();
const db = firebase.firestore();

let dataFields = document.querySelectorAll(".two");
console.log(dataFields);

let loadProject = localStorage.getItem("loadProject");
console.log(loadProject)

let loadTicket = localStorage.getItem('loadTicket');
console.log(loadTicket)

//Get Ticket document
db.collection('projects').doc(loadProject).collection('projectTickets').get()
    .then(function (querySnapshot) {
        // below is your loop
        querySnapshot.forEach(function (doc) {

            //Convert ticket num in db to int
            let loadTicketInt = parseInt(loadTicket)
           

            if(doc.data().NumTickets == (loadTicketInt +1)){
                renderDoc(doc);
                console.log('test')
            }

            console.log(doc.id, " => ",(loadTicket +1));
        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });


//Fills in data fields
function renderDoc(doc){
   dataFields[0].textContent =  doc.data().subject; 
   dataFields[1].textContent =  doc.data().description; 
   dataFields[2].textContent =  doc.data().SubmitterName; 
   dataFields[3].textContent =  doc.data().assignee; 
   dataFields[4].textContent =  doc.data().priority; 
   dataFields[5].textContent =  doc.data().Category; 
   dataFields[6].textContent =  doc.data().userDate; 
   dataFields[7].textContent =  doc.data().CreatedAt; 
}