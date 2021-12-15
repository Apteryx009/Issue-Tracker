//DashBoard
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

menuIcon.addEventListener('click', function () {
  toggle(aside, 'active');
});

asideClose.addEventListener('click', function () {
  toggle(aside, 'active');
});



function chart1(){
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

function chart2(){
  let labels1 = ['yes', 'no']
  let data1 = [30, 40]
  let colors1 = ['#2675BB', '#26BB6A']

  let myChart2 = document.getElementById('myChart2').getContext('2d');

  let chart2 = new Chart(myChart2, {
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
        text: "Tickets stuff",
        display: true
      }
    }
  });
}

function chart3(){
  

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

function chart4(){
  let labels1 = ['Front-End', 'Back-End', "Design"]
  let data1 = [5, 5, 3]
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


chart1()
chart2()
chart3()
chart4()

