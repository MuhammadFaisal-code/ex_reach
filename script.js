// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        hamburger.classList.remove('open');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Testimonial Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.testimonial-nav-btn');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

dots.forEach(dot => {
    dot.addEventListener('click', function() {
        showSlide(parseInt(this.getAttribute('data-slide')));
    });
});

// Auto slide change
setInterval(() => {
    showSlide(currentSlide + 1);
}, 6000);

// Form Validation and Preparation for WhatsApp
const form = document.getElementById('quoteForm');
const inputs = form.querySelectorAll('input, textarea');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[\d\s-]{10,}$/;

function showError(input, message) {
    const error = input.nextElementSibling;
    error.textContent = message;
    error.style.display = 'block';
    input.classList.add('error');
}

function clearErrors() {
    inputs.forEach(input => {
        const error = input.nextElementSibling;
        error.style.display = 'none';
        input.classList.remove('error');
    });
}

// Redirect to WhatsApp with form data
form.addEventListener('submit', function(e) {
    e.preventDefault();
    clearErrors();
    let valid = true;

    if (!form.name.value.trim()) {
        showError(form.name, 'Please enter your name.');
        valid = false;
    }

    if (!form.email.value.trim() || !emailRegex.test(form.email.value)) {
        showError(form.email, 'Please enter a valid email address.');
        valid = false;
    }

    if (form.phone.value.trim() && !phoneRegex.test(form.phone.value)) {
        showError(form.phone, 'Please enter a valid phone number.');
        valid = false;
    }

    if (!form.message.value.trim()) {
        showError(form.message, 'Please enter your message.');
        valid = false;
    }

    if (valid) {
        const name = encodeURIComponent(form.name.value.trim());
        const email = encodeURIComponent(form.email.value.trim());
        const phone = encodeURIComponent(form.phone.value.trim());
        const service = encodeURIComponent(form.service.value.trim());
        const message = encodeURIComponent(form.message.value.trim());
        const whatsappURL = `https://wa.me/923182741279?text=Hello%20Ex-Reach%20Team,%20I%20would%20like%20a%20quote.%20Name:%20${name}%20Email:%20${email}%20Phone:%20${phone}%20Service:%20${service}%20Message:%20${message}`;
        window.open(whatsappURL, '_blank');
        form.reset();
    }
});

// Keyboard Navigation for Accessibility
document.querySelectorAll('.nav-links a, .btn, .testimonial-nav-btn').forEach(element => {
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});