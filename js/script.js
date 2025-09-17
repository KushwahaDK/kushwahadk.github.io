// Minimalistic Portfolio JavaScript
// Clean and simple interactions

document.addEventListener('DOMContentLoaded', function () {
    initMobileNavigation();
    initSmoothScrolling();
    initActiveNavigation();
    initAnimations();
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navMenu) return;

    // Toggle menu
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        animateHamburger(navToggle, navMenu.classList.contains('active'));
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            animateHamburger(navToggle, false);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            animateHamburger(navToggle, false);
        }
    });
}

// Animate hamburger menu
function animateHamburger(toggle, isOpen) {
    const spans = toggle.querySelectorAll('span');

    spans.forEach((span, index) => {
        if (isOpen) {
            if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 60;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Active Navigation
function initActiveNavigation() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollPos = window.pageYOffset + 100;
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
}

// No animations - load all components at once
function initAnimations() {
    // All elements are visible by default - no fade-in effects

    // Tech tag hover effects
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-2px)';
        });

        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0)';
        });
    });
}

// Console message
console.log(`
🚀 Deepak's Minimalistic Portfolio
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Vanilla JavaScript
• Dark Theme
• Minimal Design
• Mobile Optimized

Contact: deepakkushwaha818@gmail.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// Simple utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.getElementById('nav-toggle');

    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        if (navToggle) animateHamburger(navToggle, false);
    }
}, 250));

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.getElementById('nav-toggle');

        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) animateHamburger(navToggle, false);
        }
    }
});

// Performance optimization - Preload critical resources
function preloadCriticalResources() {
    const criticalResources = [
        { href: 'images/Image.jpg', as: 'image' }
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
preloadCriticalResources(); 