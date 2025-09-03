// Portfolio JavaScript Functionality

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Initialize scroll-based navigation highlighting
    initNavigationHighlighting();
    
    // Initialize fade-in animations
    initFadeInAnimations();
    
    // Initialize back to top button
    initBackToTopButton();
    
});

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
}

/**
 * Initialize active navigation highlighting based on scroll position
 */
function initNavigationHighlighting() {
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
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

/**
 * Initialize fade-in animations using Intersection Observer
 */
function initFadeInAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Initialize back to top button functionality
 */
function initBackToTopButton() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    });

    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Utility function to add scroll-based animations to elements
 * @param {string} selector - CSS selector for elements to animate
 * @param {string} animationClass - CSS class to add when in view
 */
function addScrollAnimation(selector, animationClass = 'visible') {
    const elements = document.querySelectorAll(selector);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(animationClass);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

/**
 * Form validation (if you add contact forms later)
 * @param {HTMLFormElement} form - Form element to validate
 */
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
    });

    return isValid;
}

/**
 * Show notification message
 * @param {string} message - Message to display
 * @param {string} type - Type of notification (success, error, info)
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 1050; max-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

/**
 * Lazy load images for better performance
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/**
 * Handle mobile menu interactions
 */
function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        // Close menu when clicking on a link
        navbarCollapse.addEventListener('click', function(e) {
            if (e.target.classList.contains('nav-link')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    }
}

/**
 * Add typing animation effect to hero text
 */
function initTypingAnimation() {
    const heroTitle = document.querySelector('#hero h1');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing animation after page loads
    setTimeout(typeWriter, 1000);
}

/**
 * Initialize all interactive features
 */
function initInteractiveFeatures() {
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click tracking for analytics (placeholder)
    document.addEventListener('click', function(e) {
        if (e.target.matches('[data-track]')) {
            const action = e.target.dataset.track;
            // Analytics tracking would go here
            console.log('Tracked action:', action);
        }
    });
}

/**
 * Handle page visibility changes
 */
function initPageVisibility() {
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            document.title = 'Come back! - Portfolio';
        } else {
            document.title = 'Portfolio - Full Stack Developer';
        }
    });
}

// Initialize mobile menu handling
initMobileMenu();

// Initialize interactive features
initInteractiveFeatures();

// Initialize page visibility handling
initPageVisibility();

// JavaScript for Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Animate progress bars when visible
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.tech-progress-bar');
                progressBars.forEach(bar => {
                    setTimeout(() => {
                        bar.style.width = bar.dataset.width;
                    }, 500);
                });
            }
        });
    }, observerOptions);

    const techStackCard = document.querySelector('.tech-stack-container');
    if (techStackCard) {
        progressObserver.observe(techStackCard);
    }

    // Skill badge tooltips
    document.querySelectorAll('.skill-badge').forEach(badge => {
        badge.addEventListener('mouseenter', function(e) {
            const tooltip = this.dataset.tooltip;
            if (tooltip) {
                const tooltipEl = document.createElement('div');
                tooltipEl.className = 'custom-tooltip';
                tooltipEl.textContent = tooltip;
                tooltipEl.style.cssText = `
                    position: absolute;
                    background: #333;
                    color: white;
                    padding: 8px 12px;
                    border-radius: 6px;
                    font-size: 12px;
                    z-index: 1000;
                    opacity: 0;
                    transition: opacity 0.3s;
                    pointer-events: none;
                    top: ${e.pageY - 40}px;
                    left: ${e.pageX - 30}px;
                `;
                document.body.appendChild(tooltipEl);
                setTimeout(() => tooltipEl.style.opacity = '1', 10);
                
                this.addEventListener('mouseleave', () => {
                    tooltipEl.remove();
                }, { once: true });
            }
        });
    });

    // Typing animation for title
    const title = document.getElementById('aboutTitle');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        title.classList.remove('typing-text');
        
        let i = 0;
        const typeInterval = setInterval(() => {
            title.textContent += text[i];
            i++;
            if (i === text.length) {
                clearInterval(typeInterval);
                title.classList.add('typing-text');
            }
        }, 100);
    }

    // Interactive card click effects
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Resume download function
function downloadResume() {
    // Add download logic here
    const button = document.querySelector('.resume-btn');
    button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Downloading...';
    
    setTimeout(() => {
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" 
                 viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                 class="me-2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7,10 12,15 17,10"></polyline>
                <line x1="12" x2="12" y1="15" y2="3"></line>
            </svg>
            Download Resume
        `;
        // Add actual download logic here
        console.log('Resume download triggered');
    }, 2000);
}