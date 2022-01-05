//Get elements from HTML
const groupDiv = document.getElementById('groupDiv');
const clearUsers01 = document.getElementById('clearUsers');
const personDiv = document.getElementById('personDiv');
const roleDiv = document.getElementById('roleDiv');
const somethingDiv = document.getElementById('somethingDiv');

const auth = firebase.auth();
const db = firebase.firestore();
let groupNum01;

function group(){

    db.collection('groups').get().then(function (querySnapshot) {
        querySnapshot.docs.forEach(function (doc) {
            renderDoc(doc, "list-group-item .disabled", doc.id, "groupList")
        });
    });
    var div = document.getElementById("GroupDiv");
   
}


function person(){
    db.collection('groups').get().then(function (querySnapshot) {
        querySnapshot.docs.forEach(function (doc) {
            renderDoc(doc, "list-group-item person .disabled", doc.data().userEmail, 'personList')
        });
    });

}

clearUsers01.addEventListener('click', e=> {
    clearUsers();
 
})


//When user click on a group let us say, then we need to highlight what they clicked on, keep the highlight, and display revleent users

let gropuDiv = document.querySelector('#groupDiv');
groupDiv.addEventListener('click', e=> {
//  let exactGroup = e.target.innerText //This will get us the group name that user clicked on
//  //This will act as a toggle
//  if((!(e.target.class == "list-group-item list-group-item-warning"))){
//      e.target.class = "list-group-item list-group-item-warning"
//      console.log( e.target.class)
//  }
//  else{
//     e.target.class = "list-group-item list-group-item"
//     console.log( e.target.class)
//  }
//  //e.target.style.backgroundColor = "pink";
  
    e.target.classList.toggle("colorred");
    if(e.target.classList.contains("colorred")){
        clearUsers();
    }

   //Add call to function to get group number 
  // let groupNuum01 = getGroupNumber(e);
//    console.log(localStorage.getItem('groupNum') + "hey hey")
   
   showUsers(e.target.id) //Only show people of specfied group selected by user


})


//Not in use, but might need to implement later
function getGroupNumber(e){
    let groupName =e.target.innerText;

    //  let fetchedGroupId = document.querySelectorAll(`#${groupName}`);


}


//Only shows users within group
function showUsers(groupNum){
    db.collection('groups').get().then(function (querySnapshot) {
        console.log('hey')
        querySnapshot.docs.forEach(function (doc) {
            if(doc.data().group == groupNum)
            renderDoc(doc, "list-group-item person .disabled", doc.data().userEmail, 'personList')
        });
    });
}

function clearUsers(){
    console.log('test')
    var elements = document.getElementsByClassName("person");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
 
    
}

function Role(){

}

function something(){

}


function renderDoc(doc, className, value, list) { //Value is user email
    var ul = document.getElementById(list); //Give unorderd list (container)
   console.log(doc.data().userEmail) //Make sure able to retreive email

  


  let liElement = document.createElement('li'); //Create new li to tack on
  liElement.setAttribute('class', className); //Attach class to it (bootstrap id prob)
  liElement.setAttribute('id', doc.data().group);
  liElement.appendChild(document.createTextNode(value)); //Value of child element
  //let liElementText = document.createElement(doc.data().userEmail)
  let className01 = document.querySelector(className)
  ul.appendChild(liElement) //Append new child element
}


group()
//person()
