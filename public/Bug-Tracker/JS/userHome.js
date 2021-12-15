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

      menuIcon.addEventListener('click', function() {
        toggle(aside, 'active');
      });

      asideClose.addEventListener('click', function() {
        toggle(aside, 'active');
      });
  

    // document.addEventListener('DOMContentLoaded', function () {
    //     chart1();
    // }, false);

    // function chart1(){
    //   let myChart = document.getElementsById('chart1').getContext('2d');

    //   let  userChart = new Chart(myChart, )
    // }