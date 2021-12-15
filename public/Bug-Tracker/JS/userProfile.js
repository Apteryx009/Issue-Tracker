const auth = firebase.auth();
const db = firebase.firestore();

getSubmitterName();

Submitter = localStorage.getItem('userUID');

//Get name of Submitter
function getSubmitterName(Submitter){
    //Get name of Submitter
    db.collection('users').get().then(function (querySnapshot) {
        querySnapshot.docs.forEach(function (doc) {
            if(doc.id == Submitter){
                localStorage.setItem('SubmitterName', doc.data().name)
            }
        });
    });
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

    //Display name of user
    const userNameMain = document.querySelector('#userNameMain');
    userNameMain.innerHTML = localStorage.getItem("nameOfUser");

    const report = document.querySelector('#report');
    report.addEventListener('click', function() {
     
    });