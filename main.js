window.addEventListener("scroll", function(){
    const header = this.document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
});

//portfolio model
const portfolioModels = document.querySelectorAll(".portfolio-model");
const imgCards = document.querySelectorAll(".img-card");
const portfolioCloseBtns = document.querySelectorAll(".portfolio-close-btn");
var portfolioModel = function(modelClick){
    portfolioModels[modelClick].classList.add("active");
}

imgCards.forEach((imgCard, i) => {
    imgCard.addEventListener("click", () =>{
        portfolioModel(i);
    });
});

portfolioCloseBtns.forEach((portfolioCloseBtn) => {
    portfolioCloseBtn.addEventListener("click", () =>{
        portfolioModels.forEach((portfolioModelView) =>{
            portfolioModelView.classList.remove("active");
        });
    });
});

//dark/light theme
const themeBtn = document.querySelector(".theme-btn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    themeBtn.classList.toggle("sun");

    localStorage.setItem("saved-theme", getCurrentTheme());
    localStorage.setItem("saved-icon", getCurrentIcon());
});

const getCurrentTheme = () => document.body.classList.contains('dark-theme') ? "dark" : "light";
const getCurrentIcon = () => themeBtn.classList.contains("sun") ? "sun" : "moon";

const savedTheme = localStorage.getItem("saved-theme");
const savedIcon = localStorage.getItem("saved-icon");

if(savedTheme){
    document.body.classList[savedTheme === "dark" ? "add" : "remove"]("dark-theme");
    themeBtn.classList[savedIcon === "sun" ? "add" : "remove"]("sun");
}

//scroll top button
const scrollToTopBtn = document.querySelector(".scrollToTop-btn");
window.addEventListener("scroll", function(){
    scrollToTopBtn.classList.toggle("active", this.window.scrollY > 500);
});

scrollToTopBtn.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

//navigation items active on scroll time
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const scrollY = window.pageYOffset;

    sections.forEach(current =>{
        let sectionHeight =current.offsetHeight;
        let sectionTop = current.offsetTop - 50;
        let id = current.getAttribute("id");

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector(".nav-items a[href*=" + id + "]").classList.add("active");
        }
        else{
            document.querySelector(".nav-items a[href*=" + id + "]").classList.remove("active");
        }
    })
});

//Animation
ScrollReveal({
    //reset: true,
    distance: '60px',
    duration: 2500,
    delay: 100
});

ScrollReveal().reveal('.home .info h2, .section-title-01, .section-title-02', {delay: 500, origin: 'left'});
ScrollReveal().reveal('.home .info h3, .home .info p, .about-info .btn', {delay: 600, origin: 'right'});
ScrollReveal().reveal('.home .info .btn', {delay: 500, origin: 'bottom'});
ScrollReveal().reveal('.media-icons , .contact-left li', {delay: 500, origin: 'left', interval: 200});
ScrollReveal().reveal('.home-img, .about-img', {delay: 500, origin: 'bottom'});
ScrollReveal().reveal('.about .description, .contact-right', {delay: 600, origin: 'right'});
ScrollReveal().reveal('.about .professional-list li', {delay: 500, origin: 'right', interval: 200});
ScrollReveal().reveal('.skills-description, .contact-left h2', {delay: 600, origin: 'left'});
ScrollReveal().reveal('.experience-card, .education, .portfolio .img-card', {delay: 600, origin: 'bottom', interval: 200});
ScrollReveal().reveal('footer .group', {delay: 500, origin: 'top', interval: 200});


//menu
const menuBtn = document.querySelector(".nav-menu-btn");
const closeBtn = document.querySelector(".nav-close-btn");
const navigation = document.querySelector(".navigation");
const navItems = document.querySelectorAll(".nav-items a");

menuBtn.addEventListener("click", () => {
    navigation.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    navigation.classList.remove("active");
});

navItems.forEach((navItem) => {
    navItem.addEventListener("click", () => {
        navigation.classList.remove("active");
    });
});

// --- Contact Form (FormSubmit.co AJAX) ---
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm && formMessage) {
    contactForm.addEventListener('submit', function(e) {
        
        e.preventDefault(); 

        const submitButton = contactForm.querySelector('.btn');
        submitButton.disabled = true;
        submitButton.innerHTML = 'Sending...';

        const formData = new FormData(contactForm);
        
        const dataObject = {};
        formData.forEach((value, key) => {
            dataObject[key] = value;
        });

        const formAction = contactForm.getAttribute('action');

        fetch(formAction, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'      
            },
            body: JSON.stringify(dataObject) 
        })
        .then(response => response.json()) 
        .then(data => {
            if (data.success == 'true' || data.success == true) {
                formMessage.innerHTML = "<span style='color: green;'>Message sent successfully!</span>";
                contactForm.reset(); 
            } else {
                formMessage.innerHTML = "<span style='color: red;'>Oops! Something went wrong. Please try again.</span>";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            formMessage.innerHTML = "<span style='color: red;'>Oops! Network error.</span>";
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
            
            setTimeout(() => {
                formMessage.innerHTML = '';
            }, 3000);
        });
    });
}
