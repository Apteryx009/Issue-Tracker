const auth = firebase.auth();
const db = firebase.firestore();


// document.addEventListener('DOMContentLoaded', function () {
//   getSubmitterName();
// }, false);


document.addEventListener('DOMContentLoaded', function () {

}, false);

let userEmail;
let userRoleGeneral;
let nameOfGivenUser;
let userGroup;
let userProjects;

let Submitter002 = localStorage.getItem('userUID');
Submitter002 = Submitter002.replace(/['"]+/g, '');
console.log( Submitter002)
//OK


//Get name of Submitter
function getSubmitterName(){
    //Get name of Submitter
    db.collection('users').get().then(function (querySnapshot) {
        querySnapshot.docs.forEach(function (doc) {
          // console.log('1huh')
         // console.log( doc.id)
            if(doc.id == Submitter002){
              console.log('huh')
              if(doc.data()){
                console.log('it worked')
                setHTMLFields(doc.data().name,doc.data().role1, doc.data().email, doc.data().projects)
                userEmail = doc.data().email;
                nameOfGivenUser = doc.data().name;
                userRoleGeneral = doc.data().role1;
                localStorage.setItem('SubmitterName', doc.data().name)
              }
            }
            console.log(userEmail + nameOfGivenUser + userRoleGeneral)
        });
    });

    
}

function setHTMLFields(name, role, email, projects){
  let nameTag = document.getElementById("nameTag");
  let roleTag = document.getElementById("roleTag");
  let emailTag = document.getElementById("emailTag");
  let groupsTag = document.getElementById("groupsTag");
  let projectsTag = document.getElementById("projectsTag");

  console.log(nameOfGivenUser + "sdf")
  nameTag.innerText = name;
  roleTag.innerText = role
  emailTag.innerText = email
  projectsTag.innerText = projects

}


console.log("hello " +  localStorage.getItem("nameOfUser"))


//Mobile menu dashboard
    const menuIcon = document.querySelector('.menu-icon');
    const aside = document.querySelector('.aside');
    const asideClose = document.querySelector('.aside_close-icon');

    function toggle(el, className) {
      //Basically just do the oppsite.
      if (el.classList.contains(className)) {
        el.classList.remove(className);
      } else {
        el.classList.add(className);
      }
    }

    menuIcon.addEventListener('click', function() {
      toggle(aside, 'active');
    });

    asideClose.addEventListener('click', function() {
      toggle(aside, 'active');
    });
    

    //Display user avavatar
  //  document.getElementById("card1").innerHtml = randomAvatarGenerator.getRandomAvatar(8);

    // //Display name of user
    // const userNameMain = document.querySelector('#userNameMain');
    // userNameMain.innerHTML = localStorage.getItem("nameOfUser");
    // let ourUID = localStorage.getItem('userUID');
    // function getName(){
    //   //Get name of Submitter
    //   db.collection('users').get().then(function (querySnapshot) {
    //       querySnapshot.docs.forEach(function (doc) {
    //            if(doc.id == ourUID){
    //             console.log(doc.id)
    //             console.log(ourUID)
    //               localStorage.setItem('currentUserName', doc.data().name)
    //               console.log( doc.data().name)
    //               console.log("hi")
    //            }
    //           //console.log("hi")
    //       });
    //   });
// }



   //Button such that user may email support
    // const report = document.querySelector('#report');
    // report.addEventListener('click', function() {
     
    // });

    // getName()


    getSubmitterName();
    //setHTMLFields();