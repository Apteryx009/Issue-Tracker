//<link rel="stylesheet" href="../CSS/aside.css"></link>
class MyHeader extends HTMLElement {

  connectedCallback() {
    //alert(1)   

    this.innerHTML = `
      
       
        <div class="container-fluid px-0">
    <nav class="navbar navbar-expand-lg navbar-dark bg-black py-0 px-0"> <a class="navbar-brand" ><strong><i id="ticket-tracker">Ticket-Tracker</i></strong></a> 
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item"> <a class="nav-link" href="#">Home</a> </li>
                <li class="nav-item"> <a class="nav-link" href="#">Linkedin</a> </li>
                <li class="nav-item"> <a class="nav-link" href="#">Github</a> </li>
                
               
            </ul>
        </div>
    </nav>
</div>

    
        `
  }
}




class myFooter extends HTMLElement {
  connectedCallback() {
    //alert(1)      
    this.innerHTML = `
        <footer id="footer" class="bg-primary text-white text-center text-lg-start" >
        <!-- Grid container -->
        <div id='footersub1'  class="container p-4" style ="background-color: #E76F51;">
          <!--Grid row-->
          <div class="row">
            <!--Grid column-->
            <div id="subfooter" class="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 id="overviewh5" class="text-uppercase">Overview</h5>
      
              <p id="footerText">       
                Issue-Tracker is an IT service management solution with a user-friendly interface. Some key-features are: create and assign tickets, organizational structure filtered by group, project, or individual user, ability to edit user's tickets or user data, and a host of other features!
              </p>
            </div>
            <!--Grid column-->
      
            <!--Grid column-->
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 id="linksh5" class="text-uppercase">Links</h5>
      
              <ul class="list-unstyled mb-0">
                <li>
                  <a href="#!" class="text-white">Linkedin</a>
                </li>
                <li>
                  <a href="#!" class="text-white">Github</a>
                </li>
                <li>
           
              </ul>
            </div>
            <!--Grid column-->
      
            <!--Grid column-->
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
              <img src="../../flc_design2022051720247.png" class="img-fluid" alt="Responsive image">
              <!-- <h5 class="text-uppercase mb-0">Links</h5> -->
      
              <!-- <ul class="list-unstyled">
                <li>
                  <a href="#!" class="text-white">Link 1</a>
                </li>
                <li>
                  <a href="#!" class="text-white">Link 2</a>
                </li>
                <li>
                  <a href="#!" class="text-white">Link 3</a>
                </li>
                <li>
                  <a href="#!" class="text-white">Link 4</a>
                </li>
              </ul> -->
            </div>
            <!--Grid column-->
          </div>
          <!--Grid row-->
        </div>
        <!-- Grid container -->
      
        <!-- Copyright -->
        <div id="footersub3" class="text-center p-3" style="background-color: #E76F51;">
          &hearts; &hearts; &hearts;
          <a class="text-white" href="https://mdbootstrap.com/"></a>
        </div>
        <!-- Copyright -->
      </footer>
                    `
  }
}

class myAside extends HTMLElement {

  connectedCallback() {
    // <link rel="stylesheet" href="../CSS/aside.css"></link>
    //alert(1)      
    this.innerHTML = `
        <style>


        
        .aside {
            grid-area: aside;
            background-color: #2A9D8F;
          }
        
          
        /* flexing aside */
        .aside {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 200px;
            position: fixed;
            overflow-y: auto;
            z-index: 2;
            transform: translateX(-245px);
          }
          
          .aside.active {
            transform: translateX(0);
          }
          
          .aside_list {
            padding: 0;
            margin-top: 2rem;
            list-style-type: none;
          }
          
          .aside_list-item {
            padding: 15px 20px 20px 30px;
            color: #ddd;
            filter: grayscale(100%) opacity(0.7);
          transition: var(--transition-speed);
          }
          
          .aside_list-item:hover {
            filter: grayscale(0%) opacity(1);
             background: var(--bg-secondary);
            color: var(--text-secondary);
            cursor: pointer;
          }
        
        
          
        .aside_close-icon {
            position: absolute;
            visibility: visible;
            top: 20px;
            right: 20px;
            cursor: pointer;
          }
          
          /*Don't show the icon for closing the menu when on desktop the menu should 
          always be up */
          @media only screen and (min-width: 750px) {
            .aside_close-icon {
              display: none;
            }
          }
        
          @media only screen and (max-width: 750px) {
           footer {
             height: auto;
           }
           #subfooter{
             visibility: hidden;
           }
        
          }
        
          @media only screen and (min-width: 750px) {
            .grid-container {
              display: grid;
              grid-template-columns: 200px 1fr;
              grid-template-rows: 50px 1fr 0px;
              grid-template-areas:
                
                'aside main'
                'aside footer';
              height: 100vh;
            }
          
            /* The sidebar */
            .aside {
              display: flex;
              flex-direction: column;
              position: relative;
              transform: translateX(0);
            }
        }
        
        /* For footer */
        .footer-dark {
          padding:50px 0;
          color:#f0f9ff;
          background-color:#282d32;
        }
        
        .footer-dark h3 {
          margin-top:0;
          margin-bottom:12px;
          font-weight:bold;
          font-size:16px;
        }
        
        .footer-dark ul {
          padding:0;
          list-style:none;
          line-height:1.6;
          font-size:14px;
          margin-bottom:0;
        }
        
        .footer-dark ul a {
          color:inherit;
          text-decoration:none;
          opacity:0.6;
        }
        
        .footer-dark ul a:hover {
          opacity:0.8;
        }
        
        @media (max-width:767px) {
        
        
        
          .footer-dark .item:not(.social) {
            text-align:center;
            padding-bottom:20px;
          }
        }
        
        .footer-dark .item.text {
          margin-bottom:36px;
        }
        
        @media (max-width:767px) {
          .footer-dark .item.text {
            margin-bottom:0;
          }
        }
        
        .footer-dark .item.text p {
          opacity:0.6;
          margin-bottom:0;
        }
        
        .footer-dark .item.social {
          text-align:center;
        }
        
        @media (max-width:991px) {
          .footer-dark .item.social {
            text-align:center;
            margin-top:20px;
          }
        }
        
        .footer-dark .item.social > a {
          font-size:20px;
          width:36px;
          height:36px;
          line-height:36px;
          display:inline-block;
          text-align:center;
          border-radius:50%;
          box-shadow:0 0 0 1px rgba(255,255,255,0.4);
          margin:0 8px;
          color:#fff;
          opacity:0.75;
        }
        
        .footer-dark .item.social > a:hover {
          opacity:0.9;
        }
        
        .footer-dark .copyright {
          text-align:center;
          padding-top:24px;
          opacity:0.3;
          font-size:13px;
          margin-bottom:0;
        }
        </style>

        <aside class="aside">
        <div class="aside_close-icon">
          <strong>&times;</strong>
        </div>
        <ul class="aside_list">
          <li class="aside_list-item">User Login</li>
          <li class="aside_list-item">Dashboard Home</li>
          <li class="aside_list-item">User Management System</li>
          <li class="aside_list-item">Projects</li>
  
          <li class="aside_list-item">My Tickets</li>
          <li class="aside_list-item">User Profile</li>
        </ul>
      </aside>
        `
  }
}


customElements.define('my-header', MyHeader)
customElements.define('my-footer', myFooter)
customElements.define('my-aside', myAside)