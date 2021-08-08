//A test button which will load projectTickets.html at user request
let userAction = document.querySelector('#loadProjectTickets')
console.log(userAction);

userAction.addEventListener('click', loadPage)

function loadPage(e){
    console.log('ello chap');
    window.location.href = "../HTML/projectTickets.html";
}
