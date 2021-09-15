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

console.log("hello " +  localStorage.getItem("SubmitterName"))