//A test button which will load projectTickets.html at user request
let userAction = document.querySelector('#loadProjectTickets')
let userCreateTicket = document.querySelector('#createNewTicket')


let testData = document.querySelector('#testData')



userAction.addEventListener('click', loadPage)
userCreateTicket.addEventListener('click', loadPage2)

function loadPage(e){
    console.log('ello chap');
    window.location.href = "../HTML/projectTickets.html";
}

function loadPage2(e){
    console.log('ello chap2');
    window.location.href = "../HTML/createTicket.html";
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



function userDueDate(){
   
    setTimeout(1000);
    let dueDate = document.querySelector('#userFormDueDate')
    let datePicker = document.querySelector('#dueDatePicker')
    console.log(dueDate.value)

    if(dueDate.value == 'Yes')
    {
        datePicker.hidden = false;
    }

    else{
        datePicker.hidden = true;
    }
      
    
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