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
       // console.log(users);     
    });

    var data = db.doc('/users/rk8B6Z18JghZWybTt13Ubm0cbn82/projects/projectDetails');

    data.get().then((doc) => {
        if (doc.exists) {
            var certainField = doc.data();
            console.log("Document data:", certainField.name);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });



// db.collection('users').doc(userUID).get().then((doc) =>{
//     const html =
//     `
//         <div>Your data is: ${doc.data().bio} </div>
//     `;

//     alert(doc.data().bio);
//     testData.innerHTML = html;
// })

