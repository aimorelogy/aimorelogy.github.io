// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Particle Animation
function createParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 2-6px
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 3}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Scroll Animations
function handleScrollAnimations() {
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

    // Observe elements for scroll animations
    document.querySelectorAll('.process-step-circular, .advantage-card, .partner-logo, .about-story, .about-vision, .contact-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    }
});

// Terminal typing animation
function typewriterEffect() {
    const codeLines = document.querySelectorAll('.code-line');
    let delay = 2000; // Start after 2 seconds

    codeLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.animation = 'none';
            
            // Add cursor effect
            const cursor = document.createElement('span');
            cursor.textContent = '|';
            cursor.style.animation = 'blink 1s infinite';
            cursor.style.color = 'var(--primary-color)';
            
            // Add and remove cursor
            line.appendChild(cursor);
            setTimeout(() => {
                if (cursor.parentNode) {
                    cursor.remove();
                }
            }, 1000);
        }, delay + (index * 500));
    });
}

// Blink animation for cursor
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Mouse parallax effect
function parallaxEffect() {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Move particles slightly based on mouse position
        document.querySelectorAll('.particle').forEach((particle, index) => {
            const speed = (index % 3 + 1) * 0.5;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        // Move terminal slightly
        const terminal = document.querySelector('.code-terminal');
        if (terminal) {
            const x = (mouseX - 0.5) * 10;
            const y = (mouseY - 0.5) * 10;
            terminal.style.transform = `translate(${x}px, ${y}px)`;
        }
    });
}

// Button hover effects
function addButtonEffects() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        btn.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        btn.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
    });
}

// Process step animation on scroll
function animateProcessSteps() {
    const processSteps = document.querySelectorAll('.process-step-circular');
    
    if (processSteps.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.transform = entry.target.style.transform.replace('scale(0)', 'scale(1)');
                        entry.target.style.opacity = '1';
                    }, index * 150);
                }
            });
        }, { threshold: 0.2 });
        
        processSteps.forEach((step, index) => {
            const originalTransform = getComputedStyle(step).transform;
            step.style.transform = originalTransform + ' scale(0)';
            step.style.opacity = '0';
            step.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(step);
        });
    }
}

// Card hover sound effect (visual feedback)
function addCardInteractions() {
    document.querySelectorAll('.advantage-card, .partner-logo, .contact-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}



// Page transition effect
function handlePageTransition() {
    const transition = document.querySelector('.page-transition');
    if (!transition) return;
    
    // Check if already initialized
    if (transition.dataset.transitionReady) return;
    transition.dataset.transitionReady = 'true';
    
    // Simple flag for preventing double execution
    let isTransitioning = false;
    
    // Hide transition when page loads
    function hideTransition() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        setTimeout(() => {
            transition.classList.add('hidden');
            isTransitioning = false;
        }, 1000);
    }
    
    // Hide on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hideTransition);
    } else {
        hideTransition();
    }
    
    // Handle clicks on navigation links
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href$=".html"]');
        if (!link || isTransitioning) return;
        
        const href = link.getAttribute('href');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Only transition if going to different page
        if (href && href !== currentPage) {
            e.preventDefault();
            isTransitioning = true;
            
            transition.classList.remove('hidden');
            
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        }
    });
}

// Contact form handling with advanced validation
function handleContactForm() {
    const form = document.querySelector('.form');
    if (form) {
        // Add real-time validation
        const nameInput = form.querySelector('#name');
        const emailInput = form.querySelector('#email');
        const messageInput = form.querySelector('#message');
        
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Real-time validation feedback
        function addValidationFeedback(input, isValid, message) {
            removeValidationFeedback(input);
            
            const feedback = document.createElement('div');
            feedback.className = `validation-feedback ${isValid ? 'valid' : 'invalid'}`;
            feedback.textContent = message;
            input.parentNode.appendChild(feedback);
            
            input.style.borderColor = isValid ? 'var(--primary-color)' : 'var(--accent-color)';
        }
        
        function removeValidationFeedback(input) {
            const existing = input.parentNode.querySelector('.validation-feedback');
            if (existing) existing.remove();
            input.style.borderColor = 'var(--border-color)';
        }
        
        // Name validation
        nameInput.addEventListener('blur', () => {
            const name = nameInput.value.trim();
            if (name.length < 2) {
                addValidationFeedback(nameInput, false, 'Name must be at least 2 characters long');
            } else if (!/^[a-zA-Z\s]+$/.test(name)) {
                addValidationFeedback(nameInput, false, 'Name can only contain letters and spaces');
            } else {
                addValidationFeedback(nameInput, true, 'Valid name');
            }
        });
        
        // Email validation
        emailInput.addEventListener('blur', () => {
            const email = emailInput.value.trim();
            if (!emailRegex.test(email)) {
                addValidationFeedback(emailInput, false, 'Please enter a valid email address');
            } else {
                addValidationFeedback(emailInput, true, 'Valid email address');
            }
        });
        
        // Message validation
        messageInput.addEventListener('blur', () => {
            const message = messageInput.value.trim();
            if (message.length < 10) {
                addValidationFeedback(messageInput, false, 'Message must be at least 10 characters long');
            } else if (message.length > 1000) {
                addValidationFeedback(messageInput, false, 'Message cannot exceed 1000 characters');
            } else {
                addValidationFeedback(messageInput, true, 'Valid message');
            }
        });
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const project = formData.get('project');
            const message = formData.get('message').trim();
            
            // Comprehensive validation
            let isValid = true;
            let errors = [];
            
            // Name validation
            if (!name || name.length < 2) {
                errors.push('Please enter a valid name (at least 2 characters)');
                isValid = false;
            } else if (!/^[a-zA-Z\s]+$/.test(name)) {
                errors.push('Name can only contain letters and spaces');
                isValid = false;
            }
            
            // Email validation
            if (!email || !emailRegex.test(email)) {
                errors.push('Please enter a valid email address');
                isValid = false;
            }
            
            // Message validation
            if (!message || message.length < 10) {
                errors.push('Please enter a message (at least 10 characters)');
                isValid = false;
            } else if (message.length > 1000) {
                errors.push('Message cannot exceed 1000 characters');
                isValid = false;
            }
            
            // Check for spam patterns
            const spamPatterns = [
                /viagra|cialis|loan|lottery|winner|congratulations/gi,
                /\$\$\$|\$\d+/g,
                /click here|visit now|act now/gi
            ];
            
            const combinedText = `${name} ${email} ${message}`.toLowerCase();
            const hasSpamContent = spamPatterns.some(pattern => pattern.test(combinedText));
            
            if (hasSpamContent) {
                errors.push('Message appears to contain spam content');
                isValid = false;
            }
            
            if (!isValid) {
                showFormError(errors);
                return;
            }
            
            // If validation passes, submit form
            submitForm(form, { name, email, project, message });
        });
    }
}

function showFormError(errors) {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'form-errors';
    errorContainer.innerHTML = `
        <div class="error-header">
            <i class="fas fa-exclamation-triangle"></i>
            Please correct the following errors:
        </div>
        <ul>
            ${errors.map(error => `<li>${error}</li>`).join('')}
        </ul>
    `;
    
    // Remove existing error container
    const existing = document.querySelector('.form-errors');
    if (existing) existing.remove();
    
    // Insert at top of form
    const form = document.querySelector('.form');
    form.insertBefore(errorContainer, form.firstChild);
    
    // Scroll to errors
    errorContainer.scrollIntoView({ behavior: 'smooth' });
    
    // Remove after 10 seconds
    setTimeout(() => {
        if (errorContainer.parentNode) {
            errorContainer.remove();
        }
    }, 10000);
}

function submitForm(form, data) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Check if EmailJS is available
    if (typeof emailjs === 'undefined') {
        // Fallback: Create mailto link
        const subject = `Contact from ${data.name} - ${data.project || 'General Inquiry'}`;
        const body = `Name: ${data.name}\nEmail: ${data.email}\nProject Type: ${data.project || 'Not specified'}\n\nMessage:\n${data.message}`;
        const mailtoLink = `mailto:info@aimorelogy.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        window.open(mailtoLink);
        
        showSuccessMessage('Your email client has been opened. Please send the email to complete your message.');
        form.reset();
        form.querySelectorAll('.validation-feedback').forEach(el => el.remove());
        form.querySelectorAll('input, select, textarea').forEach(el => {
            el.style.borderColor = 'var(--border-color)';
        });
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        return;
    }
    
    // EmailJS configuration (you need to set these up)
    const serviceID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
    const templateID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID
    const userID = 'YOUR_USER_ID'; // Replace with your EmailJS user ID
    
    // If EmailJS is not configured, use mailto fallback
    if (serviceID === 'YOUR_SERVICE_ID') {
        const subject = `Contact from ${data.name} - ${data.project || 'General Inquiry'}`;
        const body = `Name: ${data.name}\nEmail: ${data.email}\nProject Type: ${data.project || 'Not specified'}\n\nMessage:\n${data.message}`;
        const mailtoLink = `mailto:info@aimorelogy.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        window.open(mailtoLink);
        
        showSuccessMessage('Your email client has been opened. Please send the email to complete your message.');
        form.reset();
        form.querySelectorAll('.validation-feedback').forEach(el => el.remove());
        form.querySelectorAll('input, select, textarea').forEach(el => {
            el.style.borderColor = 'var(--border-color)';
        });
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        return;
    }
    
    // Send email using EmailJS
    emailjs.send(serviceID, templateID, {
        from_name: data.name,
        from_email: data.email,
        project_type: data.project || 'Not specified',
        message: data.message,
        to_email: 'info@aimorelogy.com'
    }, userID)
    .then(() => {
        showSuccessMessage();
        form.reset();
        form.querySelectorAll('.validation-feedback').forEach(el => el.remove());
        form.querySelectorAll('input, select, textarea').forEach(el => {
            el.style.borderColor = 'var(--border-color)';
        });
    })
    .catch((error) => {
        console.error('EmailJS error:', error);
        showFormError(['Failed to send message. Please try again or contact us directly at info@aimorelogy.com']);
    })
    .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

function showSuccessMessage(customMessage = null) {
    const successContainer = document.createElement('div');
    successContainer.className = 'form-success';
    
    const defaultMessage = 'Thank you for your message. We will get back to you within 24 hours.';
    const message = customMessage || defaultMessage;
    
    successContainer.innerHTML = `
        <div class="success-content">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h4>Message Sent Successfully!</h4>
            <p>${message}</p>
        </div>
    `;
    
    const form = document.querySelector('.form');
    form.insertBefore(successContainer, form.firstChild);
    
    // Remove after 8 seconds
    setTimeout(() => {
        if (successContainer.parentNode) {
            successContainer.remove();
        }
    }, 8000);
}

// Performance optimization for scroll events
let ticking = false;

function updateScrollAnimations() {
    // Update any scroll-based animations here
    ticking = false;
}

document.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollAnimations);
        ticking = true;
    }
});

// Resize handler for responsive adjustments
window.addEventListener('resize', () => {
    // Recreate particles if needed
    if (window.innerWidth !== window.lastWidth) {
        window.lastWidth = window.innerWidth;
        // You can add resize-specific logic here
    }
});

// Add dynamic typing effect to hero subtitle
function typeHeroSubtitle() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.opacity = '1';
        
        let index = 0;
        const typingSpeed = 50;
        
        function type() {
            if (index < text.length) {
                subtitle.textContent += text.charAt(index);
                index++;
                setTimeout(type, typingSpeed);
            }
        }
        
        setTimeout(type, 1500); // Start after title animation
    }
}

// Global initialization flag
let appInitialized = false;

// Initialize everything when DOM is loaded - SINGLE INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    // Prevent multiple initializations
    if (appInitialized) return;
    appInitialized = true;
    
    // Core functionality
    handlePageTransition();
    createParticles();
    handleScrollAnimations();
    handleContactForm();
    
    // Only run terminal effect on home page
    if (document.querySelector('.code-terminal')) {
        setTimeout(typewriterEffect, 1500);
    }
    
    // Initialize hero subtitle typing if exists
    if (document.querySelector('.hero-subtitle')) {
        setTimeout(typeHeroSubtitle, 0);
    }
    
    // Visual effects
    parallaxEffect();
    addButtonEffects();
    animateProcessSteps();
    addCardInteractions();
    
    // Contact button functionality
    const contactBtns = document.querySelectorAll('.btn-secondary, .btn[href="#about"]');
    contactBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (!btn.getAttribute('href')) {
                e.preventDefault();
                const aboutSection = document.querySelector('#about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}); 