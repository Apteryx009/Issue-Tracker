let createNewTicket = document.querySelector('#createNewTicket');

createNewTicket.addEventListener('click', loadPage)

function loadPage(e) {

    window.location.href = "../HTML/createTicket.html";
}