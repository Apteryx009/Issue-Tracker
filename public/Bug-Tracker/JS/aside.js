//Used for sidebar

//TODO FIX FIRST SIDEBAR BUTTON

//Array of button on sidebar
let asideButtons = document.querySelectorAll('.aside_list-item');
console.log(asideButtons);

var nameObt = ['../../index.html', 'userHome.html', 'role.html', 'myProjects.html', 'blank', 'userTickets.html', 'blank']

//Note: If user is already on say userHome.html, then u won't see a different page when you click
//Dashbaord Home because it's already on that page. It will just refresh. 



for(let i =0;  i < asideButtons.length; i++){
 console.log(i);
 asideButtons[i].addEventListener('click', e=> {
    console.log(nameObt[i])
    window.location.href = `../HTML/${nameObt[i]}`;
 });
}

console.log(nameObt[0]);
