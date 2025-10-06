// Main JavaScript file

// Typing animation texts
const typingTexts = [
    "Lead Full-Stack Engineer",
    "Application Architect",
    "React & Next.js Expert",
    "Cloud Solutions Architect",
    "AI Integration Specialist",
    "Technical Leadership"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

// Typing effect
function typeWriter() {
    const currentText = typingTexts[textIndex];
    const typingElement = document.getElementById('typingText');

    if (!typingElement) return;

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typingSpeed = 500; // Pause before new text
    } else {
        typingSpeed = isDeleting ? 50 : 100;
    }

    setTimeout(typeWriter, typingSpeed);
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const scrollIndicator = document.querySelector('.hero-scroll');
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
            // Hide scroll indicator when user starts scrolling
            if (scrollIndicator) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            }
        } else {
            navbar.classList.remove('scrolled');
            // Show scroll indicator when back at top
            if (scrollIndicator) {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        }
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// Hide loader
function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500);
    }
}

// Active nav link
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    images.forEach(img => imageObserver.observe(img));
}

// Filter projects
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter projects
                const category = btn.dataset.category;
                loadProjects(category);
            });
        });
    }
}

// Copy email to clipboard
function initEmailCopy() {
    const emailLink = document.querySelector('a[href^="mailto:"]');

    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            e.preventDefault();
            const email = emailLink.href.replace('mailto:', '');

            navigator.clipboard.writeText(email).then(() => {
                // Show tooltip
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = 'Email copied!';
                tooltip.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: var(--primary-color);
                    color: white;
                    padding: 10px 20px;
                    border-radius: 20px;
                    z-index: 1000;
                    animation: fadeInUp 0.3s;
                `;
                document.body.appendChild(tooltip);

                setTimeout(() => {
                    tooltip.remove();
                }, 2000);
            });
        });
    }
}

// Performance optimization - Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Initialize everything
function init() {
    // Start typing animation
    typeWriter();

    // Initialize navbar
    handleNavbarScroll();
    initMobileMenu();
    setActiveNavLink();

    // Load projects
    loadProjects();

    // Initialize other features
    initProjectFilters();
    initEmailCopy();
    lazyLoadImages();

    // Hide loader
    hideLoader();

    // Add scroll event throttling
    let ticking = false;
    function updateOnScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Update animations based on scroll
                ticking = false;
            });
            ticking = true;
        }
    }
    window.addEventListener('scroll', throttle(updateOnScroll, 100));

    console.log('Portfolio initialized successfully!');
}

// Start when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Handle page visibility (pause animations when tab is not visible)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations
        if (window.animationFrame) {
            cancelAnimationFrame(window.animationFrame);
        }
    } else {
        // Resume animations
        if (typeof animate === 'function') {
            animate();
        }
    }
});