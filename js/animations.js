// Smooth Scroll and Animation Effects

// GSAP ScrollTrigger registration
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Reveal animations on scroll
function initScrollAnimations() {
    // Reveal elements on scroll - REMOVED project-card to prevent flickering
    const revealElements = document.querySelectorAll('.section-header, .skill-category, .stat-item, .about-text p');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
}

// GSAP Animations
function initGSAPAnimations() {
    if (typeof gsap === 'undefined') return;

    // Hero text animation
    gsap.timeline()
        .from('.hero-greeting', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: 0.5
        })
        .from('.hero-title', {
            opacity: 0,
            y: 30,
            duration: 0.8
        }, '-=0.4')
        .from('.hero-subtitle', {
            opacity: 0,
            y: 30,
            duration: 0.8
        }, '-=0.4')
        .from('.hero-description', {
            opacity: 0,
            y: 30,
            duration: 0.8
        }, '-=0.4')
        .from('.hero-buttons', {
            opacity: 0,
            y: 30,
            duration: 0.8
        }, '-=0.4')
        .from('.hero-scroll', {
            opacity: 0,
            duration: 1
        }, '-=0.2');

    // Removed project card animations to prevent flickering

    // Skills animation
    gsap.utils.toArray('.skill-item').forEach((skill, i) => {
        gsap.from(skill, {
            scrollTrigger: {
                trigger: skill,
                start: 'top bottom-=50',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            delay: i * 0.05
        });
    });

    // Stats counter animation
    gsap.utils.toArray('.stat-number').forEach(stat => {
        const endValue = parseInt(stat.textContent);
        gsap.from(stat, {
            scrollTrigger: {
                trigger: stat,
                start: 'top bottom-=50',
                toggleActions: 'play none none reverse'
            },
            textContent: 0,
            duration: 2,
            ease: 'power1.inOut',
            snap: { textContent: 1 },
            onUpdate: function() {
                stat.textContent = Math.ceil(stat.textContent) + '+';
            }
        });
    });
}

// Parallax effect on mouse move
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 5;
            const x = mouseX * speed;
            const y = mouseY * speed;

            gsap.to(el, {
                x: x,
                y: y,
                duration: 1,
                ease: 'power2.out'
            });
        });
    });
}

// Magnetic button effect
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.btn');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// Cursor trail effect
function initCursorTrail() {
    const trail = [];
    const trailLength = 20;

    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: ${6 - i * 0.2}px;
            height: ${6 - i * 0.2}px;
            background: rgba(99, 102, 241, ${0.5 - i * 0.02});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }

    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        let x = mouseX;
        let y = mouseY;

        trail.forEach((dot, index) => {
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';

            const nextDot = trail[index + 1] || trail[0];
            x += (nextDot.offsetLeft - x) * 0.3;
            y += (nextDot.offsetTop - y) * 0.3;
        });

        requestAnimationFrame(animateTrail);
    }

    // Only enable on desktop
    if (window.innerWidth > 768) {
        animateTrail();
    }
}

// Smooth anchor scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const offset = 80; // Navbar height
                const targetPosition = target.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize all animations
function initAnimations() {
    initScrollAnimations();
    initGSAPAnimations();
    initParallax();
    initMagneticButtons();
    initSmoothScroll();

    // Optional: Add cursor trail for desktop
    if (window.innerWidth > 1024) {
        // initCursorTrail(); // Uncomment if you want cursor trail
    }
}

// Start animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initAnimations);