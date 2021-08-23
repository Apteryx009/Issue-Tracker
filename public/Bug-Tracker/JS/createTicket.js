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

db.collection('users').get().then(function (querySnapshot)  {
    querySnapshot.docs.forEach(function(doc) {
        renderDoc(doc)
    });
});

function renderDoc(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    
    li.setAttribute('data-id', doc.id);
    console.log(doc.data().name)
    name.textContent = doc.data().name;

    li.appendChild(name);

}