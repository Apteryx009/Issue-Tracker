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

db.collection("users")
    .onSnapshot(function(querySnapshot) {
        let users = [];
        querySnapshot.forEach(function(doc) {
            users.push(doc.data());
        }); 
        console.log(users[1].bio);     
    });




// db.collection('users').doc(userUID).get().then((doc) =>{
//     const html =
//     `
//         <div>Your data is: ${doc.data().bio} </div>
//     `;

//     alert(doc.data().bio);
//     testData.innerHTML = html;
// })

