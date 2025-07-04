// Portfolio Website JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Initialize all features
    initSmoothScrolling();
    initNavbarHighlighting();
    initScrollAnimations();
    // initTypingEffect(); // Disabled - using static pipe-separated text
    initParticleBackground();
    initProgressBars();
    initContactForm();
    initThemeToggle();
    initMobileScrollFix();
    initScrollProgressBar();

    // Add loading animations
    addLoadingAnimations();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const navbarCollapse = document.getElementById('navbarNav');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Auto-collapse mobile menu if it's open
                const isMenuOpen = navbarCollapse && navbarCollapse.classList.contains('show');

                if (isMenuOpen) {
                    const bootstrapCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bootstrapCollapse.hide();
                }

                // Calculate proper offset for mobile devices
                const navbar = document.querySelector('.navbar');
                const isMobile = window.innerWidth <= 768;

                // Get accurate navbar height and add mobile-specific offsets
                const navbarHeight = navbar.getBoundingClientRect().height;
                let additionalOffset = 0;

                if (isMobile) {
                    // Mobile devices need more offset due to navbar styling and potential browser UI
                    additionalOffset = 30;
                } else {
                    // Desktop devices need minimal offset
                    additionalOffset = 10;
                }

                const targetPosition = targetElement.offsetTop - navbarHeight - additionalOffset;

                // Function to perform scroll
                const performScroll = () => {
                    window.scrollTo({
                        top: Math.max(0, targetPosition),
                        behavior: 'smooth'
                    });
                };

                // Delay scroll if menu was open to allow collapse animation
                if (isMenuOpen) {
                    setTimeout(performScroll, 350);
                } else {
                    performScroll();
                }
            }
        });
    });
}

// Navbar active link highlighting
function initNavbarHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', function () {
        let current = '';
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll animations for elements
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.project-card, .skill-category, .timeline-item, .publication-item, .achievement-item'
    );

    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Typing effect for hero section
function initTypingEffect() {
    const roles = [
        'Lead Machine Learning Engineer',
        'AI Solutions Architect',
        'Cybersecurity AI Expert',
        'Research Scientist',
        'Technology Leader'
    ];

    const typewriterElement = document.querySelector('.hero-section h2');
    if (!typewriterElement) return;

    let currentRole = 0;
    let currentChar = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentText = roles[currentRole];

        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, currentChar - 1);
            currentChar--;
        } else {
            typewriterElement.textContent = currentText.substring(0, currentChar + 1);
            currentChar++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && currentChar === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentRole = (currentRole + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(typeWriter, typeSpeed);
    }

    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Particle background effect
function initParticleBackground() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';

    heroSection.appendChild(canvas);

    function resizeCanvas() {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            ctx.fill();
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}

// Progress bars for skills
function initProgressBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        const progressBar = bar.querySelector('.progress-fill');

        if (progressBar) {
            setTimeout(() => {
                progressBar.style.width = progress + '%';
            }, 500);
        }
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const formObject = {};

        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Show success message
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');

        // Reset form
        this.reset();
    });
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', function () {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Mobile scroll improvements
function initMobileScrollFix() {
    // Additional mobile-specific scroll behaviors
    let isMobile = window.innerWidth <= 768;

    // Update mobile detection on resize
    window.addEventListener('resize', function () {
        isMobile = window.innerWidth <= 768;
    });

    // Handle viewport changes that might affect scroll position
    window.addEventListener('orientationchange', function () {
        setTimeout(() => {
            // Recalculate scroll positions after orientation change
            const currentHash = window.location.hash;
            if (currentHash) {
                const targetElement = document.getElementById(currentHash.substring(1));
                if (targetElement) {
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar.getBoundingClientRect().height;
                    const additionalOffset = isMobile ? 30 : 10;
                    const targetPosition = targetElement.offsetTop - navbarHeight - additionalOffset;

                    window.scrollTo({
                        top: Math.max(0, targetPosition),
                        behavior: 'smooth'
                    });
                }
            }
        }, 500); // Allow time for orientation change to complete
    });

    // Improve mobile touch scrolling performance
    if (isMobile) {
        document.body.style.webkitOverflowScrolling = 'touch';
    }
}

// Add loading animations to elements
function addLoadingAnimations() {
    const elementsToAnimate = document.querySelectorAll(
        '.project-card, .skill-category, .timeline-item, .publication-item, .achievement-item'
    );

    elementsToAnimate.forEach((element, index) => {
        element.classList.add('loading');
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add custom cursor effect
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        opacity: 0;
    `;

    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function (e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '0.7';
    });

    document.addEventListener('mousedown', function () {
        cursor.style.transform = 'scale(0.8)';
    });

    document.addEventListener('mouseup', function () {
        cursor.style.transform = 'scale(1)';
    });
}

// Initialize performance monitoring
function initPerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', function () {
            const loadTime = performance.now();
            console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        });
    }
}

// Add scroll-to-top button
function initScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: black;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
    `;

    document.body.appendChild(scrollButton);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });

    scrollButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize all additional features
document.addEventListener('DOMContentLoaded', function () {
    // initCustomCursor(); // Disabled - removed blue circle cursor
    initPerformanceMonitoring();
    initScrollToTop();
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .navbar-nav .nav-link.active {
        color: var(--accent-color) !important;
    }
    
    .scroll-to-top:hover {
        background: var(--secondary-color);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }
`;
document.head.appendChild(style);

// Add scroll progress bar functionality
function initScrollProgressBar() {
    const progressEl = document.getElementById('scroll-progress');
    if (!progressEl) return;

    const navbar = document.querySelector('.navbar');

    function updatePosition() {
        const navHeight = navbar ? navbar.getBoundingClientRect().height : 0;
        progressEl.style.top = navHeight + 'px';
    }

    function updateBar() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressEl.style.width = progress + '%';
    }

    // Initial calculations
    updatePosition();
    updateBar();

    // Event listeners
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updateBar);
} 