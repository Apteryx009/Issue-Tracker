//DashBoard
const menuIcon = document.querySelector('.navbar-toggler-icon');
const aside = document.querySelector('.aside');
const asideClose = document.querySelector('.aside_close-icon');

const auth = firebase.auth();
const db = firebase.firestore();

//Vars to hold chart data collected from firebase

//Counters
let priorityAmtLow = 0, priorityAmtMed = 0, priorityAmtLowHigh = 0;

let statusOpen = 0, statusInProg = 0, statusResolved = 0, statusNeedMoreInfo = 0;

let typeFrontEnd = 0, typeBackEnd = 0, typeDesign = 0;

//End of Counters


function toggle(el, className) {
  //Basically just do the oppsite.
  if (el.classList.contains(className)) {
    el.classList.remove(className);
  } else {
    el.classList.add(className);
  }
}

menuIcon.addEventListener('click', function () {
  toggle(aside, 'active');
});

asideClose.addEventListener('click', function () {
  toggle(aside, 'active');
});



//I have an idea for how to organize the incoming flow of data:
//Instead of splitting into like 10 different functions to ping the db 10 different times for each stat,
//Creates 3 functions organizing by prioty, then branch off from there to see subsequent info

async function fillChart() {
  let promise = new Promise((resolve, reject) => {


  db.collectionGroup("projectTickets").where("priority", "==", "Medium") //Returns every priotity where it exists basically
    //This comparsion operator not might do what I want to
    .get()
    .then(function (querySnapshot) {

      querySnapshot.forEach(function (doc) {
        //Prioity counter
        priorityAmtMed++

        let Cag = doc.data().Category;
        let status = doc.data().ticketStatus;
        switch (Cag) {
          case "Back End":
            typeBackEnd++
            console.log("Back end!")
            break;
          case "Front End":
            typeFrontEnd++
            console.log("Front end!")
            break;
          case "Design":
            typeDesign++
            console.log("Design!")
            break;

        }

        //TODO: THESE EXACT DETAILS WILL NEED TO BE REDONE in switch statement!
        switch (status) {

          case "open":
            statusOpen++

            break;
          case "In Progress":
            console.log(doc.data().ticketStatus)
            statusInProg++

            break;
          case "Need More Info":
            console.log(doc.data().ticketStatus)
            statusNeedMoreInfo++
            break;
          case "Resolved":
            console.log(doc.data().ticketStatus)
            statusResolved++
            break;


          default:
            console.log(doc.data().ticketStatus)
            break;

        }


        // chart4()
        // console.log("hi");
        //   console.log("doc.data().priority", " => ", doc.data().priority);
        //   console.log("doc.data().priority", " => ", doc.data().Category);
        //   console.log(doc.data().ticketStatus)
        resolve('resolved');
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
   
   });

   let result = await promise; // wait until the promise resolves (*)
   alert(result); // "done!"

}





//We need to take data from firebase, put into the global vars, and use the global vars here instead.
function chart1() {
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Low', 'Medium', 'High'],
      datasets: [{
        label: 'Tickets by Priority',
        data: [12, 19, 3],
        backgroundColor: [

          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'

        ],
        borderColor: [

          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'

        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// function chart2(){
//   let labels1 = ['yes', 'no']
//   let data1 = [30, 40]
//   let colors1 = ['#2675BB', '#26BB6A']

//   let myChart2 = document.getElementById('myChart2').getContext('2d');

//   let chart2 = new Chart(myChart2, {
//     type: 'pie',
//     data: {
//       labels: labels1,
//       datasets: [{
//         data: data1,
//         backgroundColor: colors1
//       }]
//     },
//     options: {
//       title: {
//         text: "Tickets stuff",
//         display: true
//       }
//     }
//   });
// }

function chart3() {


  const ctx3 = document.getElementById('myChart3').getContext('2d');
  const myChart3 = new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: ['Open', 'In Progress', 'Resolved', "More Info Required"],
      datasets: [{
        label: 'Tickets Status',
        data: [12, 19, 3, 5],
        backgroundColor: [

          'rgba(54, 162, 235, 0.2)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'

        ],
        borderColor: [

          'rgba(54, 162, 235, 1)',
          'rgba(54, 162, 235, 4)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'

        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function chart4() {

  // await fillChart();
  let labels1 = ['Front-End', 'Back-End', "Design"]
  let data1 = [typeFrontEnd, typeBackEnd, typeDesign]
  let colors1 = ['#0F5B32', '#691688', '#52112F']

  let myChart4 = document.getElementById('myChart4').getContext('2d');

  let chart4 = new Chart(myChart4, {
    type: 'pie',
    data: {
      labels: labels1,
      datasets: [{
        data: data1,
        backgroundColor: colors1
      }]
    },
    options: {
      title: {
        text: "Projects by Category",
        display: true
      }
    }
  });

}


//for sidebar



chart1()
// chart2()
chart3()

fillChart()

