
   
let labels1 = ['yes', 'no']
let data1 = [30, 40]
let colors1 = ['#2675BB', '#26BB6A']
  
      let myChart2 = document.getElementById('myChart2').getContext('2d');

      let  userChart = new Chart(myChart2, {
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
    