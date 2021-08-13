
let userAction = document.querySelector('#DashHome')
console.log(userAction);

userAction.addEventListener('click', loadPage)

function loadPage(e){
  window.location.href = "../HTML/userHome.html";

    // const app = firebase.app();
    // console.log(app)
}

