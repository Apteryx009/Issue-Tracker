//TODO: FIX bug where every bug is registed by dfgdfg.
const auth = firebase.auth();
const db = firebase.firestore();

let dataFields = document.querySelectorAll(".two");
console.log("hi");

let addComment = document.getElementById("addComment");
let editBtn = document.getElementById("editBtn");
let saveBtn = document.getElementById("saveBtn");

editBtn.addEventListener('click', function () {
    let copyDataFields = dataFields;

    let textBoxArr = document.getElementById("card1").querySelectorAll(".form-control");
    console.log(textBoxArr)
    for (var i = 0; i < textBoxArr.length; i++) {
        textBoxArr[i].style.visibility = 'visible'
    }


});

saveBtn.addEventListener('click', function () {
    let textBoxArr = document.getElementById("card1").querySelectorAll(".form-control");
    let newValArr;
    //console.log(textBoxArr)
    for (var i = 0; i < textBoxArr.length; i++) {
        console.log( textBoxArr[i].value);
        textBoxArr[i].style.visibility = 'hidden'

        //Update UI
        if(textBoxArr[i].value){
            dataFields[i].textContent = textBoxArr[i].value;
        }
       
    }
  //  console.log(newValArr)

});



addComment.addEventListener('click', function () {
    CommentData();
});

//Get tickets that already exist
document.addEventListener('DOMContentLoaded', function () {
    getCommentData();
}, false);


let loadProject = localStorage.getItem("loadProject");
console.log(loadProject)

let loadTicket = localStorage.getItem('loadTicket');
console.log(loadTicket)

//Get Ticket document
db.collection('projects').doc(loadProject).collection('projectTickets').get()
    .then(function (querySnapshot) {
        // below is your loop
        querySnapshot.forEach(function (doc) {

            //Convert ticket num in db to int
            let loadTicketInt = parseInt(loadTicket)


            if (doc.data().NumTickets == (loadTicketInt + 1)) {
                renderDoc(doc);
                console.log('test')
            }

            console.log(doc.id, " => ", (loadTicket + 1));
        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });


//Fills in data fields
function renderDoc(doc) {
    dataFields[0].textContent = doc.data().subject;
    dataFields[1].textContent = doc.data().description;
    dataFields[2].textContent = doc.data().SubmitterName;
    dataFields[3].textContent = doc.data().assignee;
    dataFields[4].textContent = doc.data().priority;
    dataFields[5].textContent = doc.data().Category;
    dataFields[6].textContent = doc.data().userDate;
    dataFields[7].textContent = doc.data().CreatedAt;
    dataFields[8].textContent = doc.data().ticketStatus;
}

function renderDocEmpty() {
    dataFields[0].textContent = ""
    dataFields[1].textContent = ""
    dataFields[2].textContent = ""
    dataFields[3].textContent = ""
    dataFields[4].textContent = ""
    dataFields[5].textContent = ""
    dataFields[6].textContent = ""
    dataFields[7].textContent = ""
    dataFields[8].textContent = ""
}


let CommentSubmitterUID
let SubmitterName01
let TicketNum
let comment
var date

//Set ticket in db for project from user
function CommentData() {

    //Get UID of current user
    CommentSubmitterUID = localStorage.getItem('userUID')
    CommentSubmitterUID = CommentSubmitterUID.replace(/['"]+/g, '');

    getSubmitterName(CommentSubmitterUID);

    SubmitterName01 = localStorage.getItem('CommentSubmitterName');
    TicketNum = localStorage.getItem('loadTicket');

    //Collect user comment data
    comment = document.getElementById("userComment");
    comment = comment.value;
    console.log(comment + " " + SubmitterName01)

    //Get Date
    date = (new Date()).toISOString().split('T')[0];
    console.log(date)

    return db.collection('comments').doc(loadProject).collection('projectComments').doc().set({
        CommentSubmitter: SubmitterName01,
        date: date,
        comment: comment,
        ticketNum: TicketNum

    }).then(() => {
        window.location.reload();
    });
}

function getCommentData() {

    let TicketNum = localStorage.getItem('loadTicket');
    db.collection('comments').doc(loadProject).collection('projectComments').get()
        .then(function (querySnapshot) {
            // below is your loop
            querySnapshot.forEach(function (doc) {

                //Convert ticket num in db to int
                let loadTicketInt = parseInt(loadTicket)

                if (doc.data().ticketNum == TicketNum) {
                    //Call function to update UI with tickets in db
                    updateUI(doc.data().comment, doc.data().CommentSubmitter, doc.data().date);

                    //Testing
                    console.log(doc.id, " => ", doc.data().comment);
                }
            });
        });
}

function updateUI(comment1, name1, date1) {
    let commentDiv = document.getElementById('commentsDiv');
    const projectNode = document.createElement('div');

    projectNode.innerHTML = `
    <p>"${comment1}" -${name1}. ${date1}</p>
    <div class="dropdown-divider"></div>`;

    commentDiv.appendChild(projectNode);
}



//Get name of Submitter
function getSubmitterName(Submitter) {
    //Get name of Submitter
    db.collection('users').get().then(function (querySnapshot) {
        querySnapshot.docs.forEach(function (doc) {
            if (doc.id == Submitter) {
                localStorage.setItem('CommentSubmitterName', doc.data().name)
            }
        });
    });
}

