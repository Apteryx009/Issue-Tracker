var date = (new Date()).toISOString().split('T')[0];
document.getElementById('date').innerHTML = date;

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function assignee() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

const db = firebase.firestore();

//Get names of all uses and append (create new <a> tags) into the dropdown we created 
// retrieve a collection

const userList = document.querySelector('#user-list');

//Filter through all user docs
db.collection('users').get().then(function (querySnapshot) {
    querySnapshot.docs.forEach(function (doc) {
        renderDoc(doc)
    });
});

//Displays name of all users
function renderDoc(doc) {
    let a = document.createElement('a');
    //In case we need to ref it later  
    a.setAttribute('data-id', doc.id);

    //Fill drop down menu with name of users
    a.textContent = doc.data().name;

    //Update UI
    const dropDownList = document.querySelector('#myDropdown');
    dropDownList.appendChild(a);
}