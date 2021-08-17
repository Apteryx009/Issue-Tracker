//A test button which will load projectTickets.html at user request
let userAction = document.querySelector('#loadProjectTickets')
let userCreateTicket = document.querySelector('#createNewTicket')


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