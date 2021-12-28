//Get elements from HTML
const groupDiv = document.getElementById('groupDiv');
const personDiv = document.getElementById('personDiv');
const roleDiv = document.getElementById('roleDiv');
const somethingDiv = document.getElementById('somethingDiv');

const auth = firebase.auth();
const db = firebase.firestore();


function group(){
    db.collection('groups').get().then(function (querySnapshot) {
        querySnapshot.docs.forEach(function (doc) {
            renderDoc(doc, "list-group-item .disabled", doc.id, "groupList")
        });
    });
}


function person(){
    db.collection('groups').get().then(function (querySnapshot) {
        querySnapshot.docs.forEach(function (doc) {
            renderDoc(doc, "list-group-item .disabled", doc.data().userEmail, 'personList')
        });
    });

}


function Role(){

}

function something(){

}


function renderDoc(doc, className, value, list) {
    var ul = document.getElementById(list); //Give unorderd list (container)
   console.log(doc.data().userEmail) //Make sure able to retreive email
  let liElement = document.createElement('li'); //Create new li to tack on
  liElement.setAttribute('class', className); //Attach class to it (bootstrap id prob)
  liElement.appendChild(document.createTextNode(value)); //Value of child element
  //let liElementText = document.createElement(doc.data().userEmail)
  let className01 = document.querySelector(className)
  ul.appendChild(liElement) //Append new child element
}


group()
person()