//Used for sidebar

//Array of button on sidebar
let asideButtons = document.querySelectorAll('.aside_list-item');
console.log(asideButtons);

asideButtons[0].addEventListener('click', toPage('userHome.html'))
// asideButtons.addEventListener('click')
// asideButtons.addEventListener('click')
// asideButtons.addEventListener('click')
// asideButtons.addEventListener('click')


//Function to take user to html page when they
//click on a certain button
function toPage(pageName)
{
    
    window.location.href = `../HTML/${pageName}`;
}