// Google Analytics Event Tracking

function initAnalytics() {
    // Check if gtag is available
    if (typeof gtag === 'undefined') {
        console.log('Google Analytics not loaded');
        return;
    }

    // Track project link clicks
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a');
        if (!target) return;

        // Track external project links
        if (target.classList.contains('project-link')) {
            const projectCard = target.closest('.project-card');
            const projectTitle = projectCard ? projectCard.querySelector('.project-title')?.textContent : 'Unknown';

            gtag('event', 'click', {
                event_category: 'Project',
                event_label: projectTitle,
                value: target.href
            });
        }

        // Track navigation clicks
        if (target.classList.contains('nav-link')) {
            gtag('event', 'click', {
                event_category: 'Navigation',
                event_label: target.textContent.trim()
            });
        }

        // Track contact links
        if (target.classList.contains('contact-item')) {
            const contactType = target.querySelector('span')?.textContent || 'Unknown';
            gtag('event', 'click', {
                event_category: 'Contact',
                event_label: contactType,
                value: target.href
            });
        }

        // Track hero buttons
        if (target.classList.contains('btn')) {
            gtag('event', 'click', {
                event_category: 'Button',
                event_label: target.textContent.trim(),
                value: target.href
            });
        }
    });

    // Track scroll depth
    let scrollDepths = [25, 50, 75, 100];
    let scrolledDepths = [];

    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;

        scrollDepths.forEach(depth => {
            if (scrollPercent >= depth && !scrolledDepths.includes(depth)) {
                scrolledDepths.push(depth);
                gtag('event', 'scroll', {
                    event_category: 'Engagement',
                    event_label: 'Scroll Depth',
                    value: depth
                });
            }
        });
    });

    // Track time on page
    let startTime = Date.now();

    window.addEventListener('beforeunload', function() {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        gtag('event', 'timing_complete', {
            event_category: 'Engagement',
            name: 'Time on Page',
            value: timeSpent
        });
    });

    console.log('Google Analytics tracking initialized');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initAnalytics);