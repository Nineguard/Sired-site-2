// ==========================================
// SIRED - University Society JavaScript
// ==========================================

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.event-card, .gallery-item, .about-text, .features-list li').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
});

// Contact Form Handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;

        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Simulate form submission
        const button = this.querySelector('.cta-button');
        const originalText = button.textContent;

        button.textContent = 'Sending...';
        button.disabled = true;

        // Simulate sending
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
            button.textContent = originalText;
            button.disabled = false;
        }, 1500);
    });
}

// CTA Button Animation
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Remove existing ripple
        const existingRipple = this.querySelector('.ripple');
        if (existingRipple) existingRipple.remove();

        this.appendChild(ripple);
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Video autoplay on hover
const videoWrappers = document.querySelectorAll('.video-wrapper');
videoWrappers.forEach(wrapper => {
    wrapper.addEventListener('mouseenter', function () {
        const iframe = this.querySelector('iframe');
        if (iframe) {
            // Add autoplay parameter to iframe src
            const src = iframe.src;
            if (!src.includes('autoplay=1')) {
                iframe.src = src + (src.includes('?') ? '&' : '?') + 'autoplay=1';
            }
        }
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 1000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    // Add any post-load animations here
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Prevent page reload on form submit (for demo)
document.addEventListener('DOMContentLoaded', () => {
    console.log('SIRED website loaded successfully!');
});

// Add scroll reveal animation
const revealElements = document.querySelectorAll('.event-card, .gallery-item');
const revealOnScroll = () => {
    revealElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Check on page load

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}
