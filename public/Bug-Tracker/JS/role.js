//Get elements from HTML
const groupDiv = document.getElementById('groupDiv');
const clearUsers01 = document.getElementById('clearUsers');
const clearRoles01 = document.getElementById('clearRoles');
const personDiv = document.getElementById('personDiv');
const roleDiv = document.getElementById('roleDiv');
const editRoleDiv = document.getElementById('editRoleDiv');

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
            renderDoc(doc, "list-group-item person .disabled", doc.data().userEmail, 'personList') //Display email
           
        });
    });

}

clearUsers01.addEventListener('click', e=> {
    clearUsers();
 
})

clearRoles01.addEventListener('click', e=> {
    console.log('t111est')
    clearRoles();
})


//When user click on a group let us say, then we need to highlight what they clicked on, keep the highlight, and display revleent users
let personClicked;

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
   //&& e.target.classList.contains('colorred')
if(e.target.classList.contains('colorred')){ //This if will prevent user list from showing up twice
    showUsers(e.target.id) //Only show people of specfied group selected by user

}


})

personDiv.addEventListener('click', e=> {
    e.target.classList.toggle("colorred");
    console.log("u clicked on " +  e.target.innerText)
    personClicked = e.target.innerText;

    //If we didn't add this, the roles would just keep displaying into a stack
    if(e.target.classList.contains("colorred")){
        clearRoles();
    }


    console.log("I want to show role")
    db.collection('groups').get().then(function (querySnapshot) {
        querySnapshot.docs.forEach(function (doc) {
            if(doc.data().userEmail == personClicked && e.target.classList.contains('colorred')){ //The second half of this statment prevents showing the role twice
                //Display Roles      
                renderDoc2(doc, "list-group-item role .disabled", 
                doc.data().role1, doc.data().role2, doc.data().role3, doc.data().role4, doc.data().role5,
                "roleShowList")      

            }
        });
    });


    //Add call to show roles
    //showRoles();
});

//Will show all roles of selected user
// function showRoles(){
//     //roleDiv

//     db.collection('users').get().then(function (querySnapshot) {
//         //console.log('hey99')
//         querySnapshot.docs.forEach(function (doc) {
//              if(doc.data().email == personClicked)
//             renderDoc(doc, "list-group-item person .disabled", doc.data().Role, 'roleShowList')
//         });
//     });
// }

function changeRoles(){
    //editRoleDiv

}



//Not in use, but might need to implement later
function getGroupNumber(e){
    let groupName =e.target.innerText;

    //  let fetchedGroupId = document.querySelectorAll(`#${groupName}`);


}


//Only shows users within group
function showUsers(groupNum){
    db.collection('groups').get().then(function (querySnapshot) {
        console.log('hey99')
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





function clearRoles(){
    console.log('test roles')
    var elements = document.getElementsByClassName("role");
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

// function to display all roles of user
function renderDoc2(doc, className, value, value2, value3, value4, valu5, list) { //Value is user email
    var ul = document.getElementById(list); //Give unorderd list (container)
   console.log(doc.data().userEmail) //Make sure able to retreive email

  //Push given roles into one array
  var a = [];
  a.push(value, value2, value3, value4, valu5);

  for(let z=0; z < 5; z++){
  let liElement = document.createElement('li'); //Create new li to tack on
  liElement.setAttribute('class', className); //Attach class to it (bootstrap id prob)
  liElement.setAttribute('id', doc.data().group);
  liElement.appendChild(document.createTextNode(a[z])); //Value of child element
  //let liElementText = document.createElement(doc.data().userEmail)
  let className01 = document.querySelector(className)
  ul.appendChild(liElement) //Append new child element
  }
}


group()
//person()
