function mobileNav(){

const buttonNav = document.querySelector('.mobile-nav-btn'),
      navIcon = document.querySelector('.nav-icon'),
      navMobile = document.querySelector('.mobile-nav');


      buttonNav.onclick = function (){

        navMobile.classList.toggle('mobile-nav--open');
        navIcon.classList.toggle('nav-icon--active');
        // document.body.classList('no-scroll');
      };

}

export default mobileNav;