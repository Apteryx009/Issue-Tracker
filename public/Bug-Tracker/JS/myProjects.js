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
const setup = (user) => {
    db.collection('users').document(user.uid).get().then(doc => {
        const html = `
            <div>Logged in as ${user.email}</div>
            <div>${doc.data().bio}

        `;

        testData.innerHTML = html;
    })
}