const stickyNav = document.querySelector('.sticky-nav');
const left_scroll = document.querySelector(".live-matches__left-btn");
const right_scroll = document.querySelector(".live-matches__right-btn");
const carousel_track = document.querySelector(".live-matches__track");
const scroll_amount = 250;


const menuBtns = document.querySelectorAll('#menu-btn');
const searchBtns = document.querySelectorAll('#search-btn');
const closeBtns = document.querySelectorAll("#close-btn")


const sideMenu = document.querySelector('#side-menu');
const mainNav = document.querySelector('#main-nav');

let mainNavOffset = mainNav.offsetTop;

//Observer per aggiornare la posizione della navbar principale al cambio di layout
const resizeObserver = new ResizeObserver(() => {
  mainNavOffset = mainNav.offsetTop;
});
resizeObserver.observe(document.body);

//gestione dello scrolling della navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > mainNavOffset) {
        stickyNav.classList.remove('visually-hidden');
        document.querySelector(".header-top").style.borderWidth = 0;
        stickyNav.setAttribute("aria-hidden", "false");
        mainNav.classList.add('visually-hidden');
    } else {
        stickyNav.classList.add('visually-hidden');
        stickyNav.setAttribute("aria-hidden", "true");
        mainNav.classList.remove('visually-hidden');
    }
});



//scroll a sinistra e destra del carosello delle partite
left_scroll.addEventListener('click', () =>{
    carousel_track.scrollBy({left: -scroll_amount, behavior:"smooth"})
});
right_scroll.addEventListener('click', () =>{
    carousel_track.scrollBy({left: scroll_amount, behavior:"smooth"})
});


//gestione dei collapse del footer con bootstrap
document.addEventListener('hide.bs.collapse', event => {
    event.target
        .querySelectorAll('.collapse.show')
        .forEach(child => {
            bootstrap.Collapse.getOrCreateInstance(child).hide();
        });
});

//gestione dei bottoni per aprire/chiudere il menu
menuBtns.forEach(btn => {
    btn.addEventListener('click', openSideMenu)
});
searchBtns.forEach(btn => {
    btn.addEventListener('click', openSideMenu)
});
closeBtns.forEach(btn => {
    btn.addEventListener('click', closeSideMenu)
});
document.querySelector(".overlay").addEventListener('click', closeSideMenu);


//gestione del menu laterale
function openSideMenu(event){
    sideMenu.classList.remove('visually-hidden');    
    sideMenu.removeAttribute('inert');
    document.body.style.overflow = "hidden";            
    menuBtns.forEach(btn => {
        btn.setAttribute("aria-expanded", "true");
    });
    searchBtns.forEach(btn => {
        btn.setAttribute("aria-expanded", "true");
    });
}

function closeSideMenu(event){
    sideMenu.classList.add('visually-hidden');    
    sideMenu.setAttribute('inert', 'true');
    document.body.style.overflow = "scroll";
    menuBtns.forEach(btn => {
        btn.setAttribute("aria-expanded", "false");
    });
    searchBtns.forEach(btn => {
        btn.setAttribute("aria-expanded", "false");
    });
}



//Responsive Scripting
const mediaQueryMobile = window.matchMedia('(max-width: 767px)');
const headerMidMobile = document.querySelector('.header-mid.mobile')
const headerMidDesktop = document.querySelector('.header-mid.container-fluid')
const topAdv = document.querySelector('#top-adv');
let topAdvHidden = topAdv.classList.contains('visually-hidden');

const footerSectionTitles = document.querySelectorAll('.footer__menu__section > h3');
const footerSectionContent = document.querySelectorAll('.footer__menu__section > ul');

const bottomMenu = document.querySelector('#bottom-menu');

const sideMenuHeader = document.querySelector('#side-menu__header');
const sideMenuNav = document.querySelector('.sticky-nav-side');

const topNewsTopics = document.querySelectorAll('#top-news .news-card__topic');
const topNewsHeader = document.querySelector('#top-news .news-section__header');
const topNewsDesktopTopics = document.querySelectorAll('#top-news .news-card__title b');

const sectionDivider = document.querySelectorAll('.section-divider');
const articleDivider = document.querySelectorAll('.article-divider');

const frontSection = document.querySelector('.front-section');

function mobileLayout(isMobile) {    
    /* Gestione della ADV iniziale */
    if (isMobile) {
        topAdvHidden = topAdv.classList.contains('visually-hidden');
        if(topAdvHidden){
            topAdv.classList.remove('visually-hidden');
        }
        stickyNav.style.top = topAdv.offsetHeight+'px';
    } else {
        if (topAdvHidden) {
            topAdv.classList.add('visually-hidden');
        }
        stickyNav.style.top = '0';
    }


    //header
    headerMidMobile.classList.toggle('visually-hidden', !isMobile);
    headerMidDesktop.classList.toggle('visually-hidden', isMobile);
    if(!isMobile){
        if(!topAdv.classList.contains('visually-hidden')){ //Se ci sono le pubblicità deve avere un altro stile
            document.querySelector(".header-top").style.borderWidth = 1;
            stickyNav.style.boxShadow = "none";
        }
    }

    //Footer
    footerSectionContent.forEach(element => {
        element.classList.toggle('collapse',isMobile)
    });
    if(isMobile){
        let i = 0;
        footerSectionTitles.forEach(element => {
            element.setAttribute('data-bs-toggle', 'collapse');
            element.setAttribute('data-bs-target', '#a'+i);
            i+=1;
        });
        i = 0;
        footerSectionContent.forEach(element => {
            element.id = 'a'+i;
            i+=1;
        });
    }else{
        footerSectionTitles.forEach(element => {
            element.setAttribute('data-bs-toggle', '');
            element.setAttribute('data-bs-target', '');
        });
        footerSectionContent.forEach(element => {
            element.id = '';
        });
    }

    //Bottom menu
    bottomMenu.classList.toggle('visually-hidden', !isMobile);

    //Side Menu
    sideMenuHeader.classList.toggle('visually-hidden', isMobile)
    sideMenuNav.classList.toggle('visually-hidden', !isMobile)

    //Top news
    topNewsTopics.forEach(el => {
        el.classList.toggle('visually-hidden', !isMobile);
    });
    topNewsDesktopTopics.forEach(el => {
        el.classList.toggle('visually-hidden', isMobile);
    });
    topNewsHeader.classList.toggle('visually-hidden', !isMobile);

    //Section
    sectionDivider.forEach(el => {
        el.classList.toggle('section-divider', !isMobile);
    });
    articleDivider.forEach(el => {
        el.classList.toggle('article-divider', !isMobile);
    });
    frontSection.classList.toggle('visually-hidden', !isMobile);
}

mediaQueryMobile.addEventListener('change', e => mobileLayout(e.matches));
mobileLayout(mediaQueryMobile.matches);



