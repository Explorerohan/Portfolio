// Mobile menu toggle
const menuButton = document.querySelector('button.md\\:hidden');
const navLinks = document.querySelector('.hidden.md\\:flex');

menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('hidden');
    navLinks.classList.toggle('flex');
    navLinks.classList.toggle('flex-col');
    navLinks.classList.toggle('absolute');
    navLinks.classList.toggle('top-24');
    navLinks.classList.toggle('left-0');
    navLinks.classList.toggle('w-full');
    navLinks.classList.toggle('bg-primary/95');
    navLinks.classList.toggle('backdrop-blur-sm');
    navLinks.classList.toggle('p-6');
    navLinks.classList.toggle('space-y-6');
    navLinks.classList.toggle('shadow-lg');
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
    submitButton.disabled = true;
    
    // Show status div
    formStatus.classList.remove('hidden');
    formStatus.textContent = 'Sending your message...';
    formStatus.className = 'text-secondary';

    try {
        // Send email using EmailJS
        const response = await emailjs.sendForm(
            'service_aeuy70d', // We'll replace this with your actual service ID
            'template_zvtvomc',
            contactForm
        );

        // Show success message
        displayMessage('Message sent successfully! I will get back to you soon.', 'success');
        contactForm.reset();
    } catch (error) {
        // Show error message
        displayMessage('Failed to send message. Please try again later.', 'error');
        console.error('EmailJS error:', error);
    } finally {
        // Reset button state
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    }
});

// Function to display messages
function displayMessage(message, type) {
    const messageContainer = document.createElement('div');
    messageContainer.className = `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-6 rounded-lg shadow-xl text-white text-center text-lg font-semibold transform transition-all duration-300 ease-out opacity-0 scale-90`;

    if (type === 'success') {
        messageContainer.classList.add('bg-green-500');
    } else if (type === 'error') {
        messageContainer.classList.add('bg-red-500');
    }

    messageContainer.textContent = message;
    document.body.appendChild(messageContainer);

    // Animate in
    setTimeout(() => {
        messageContainer.classList.remove('opacity-0', 'scale-90');
        messageContainer.classList.add('opacity-100', 'scale-100');
    }, 10);

    // Animate out and remove after 3 seconds
    setTimeout(() => {
        messageContainer.classList.remove('opacity-100', 'scale-100');
        messageContainer.classList.add('opacity-0', 'scale-90');
        messageContainer.addEventListener('transitionend', () => messageContainer.remove(), { once: true });
    }, 3000);
}

// Dynamic skill tags animation
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 100}ms`;
    tag.classList.add('animate-fade-in');
});

// Project cards hover effect
const projectCards = document.querySelectorAll('.card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update URL without page reload
            history.pushState(null, null, targetId);
        }
    });
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        // Remove all active states
        item.classList.remove('text-secondary');
        const underline = item.querySelector('span');
        if (underline) {
            underline.classList.remove('w-full');
            underline.classList.add('w-0');
        }
        
        // Add active state to current section's link
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('text-secondary');
            const underline = item.querySelector('span');
            if (underline) {
                underline.classList.remove('w-0');
                underline.classList.add('w-full');
            }
        }
    });
});

// Greeting animation for hero section
const greetings = [
    "Hello",
    "नमस्ते", // Hindi
    "你好", // Chinese
    "こんにちは", // Japanese
    "안녕하세요", // Korean
    "Hola", // Spanish
    "Bonjour", // French
    "Guten Tag", // German
    "Ciao", // Italian
    "Olá", // Portuguese
    "Привет", // Russian
    "مرحبا", // Arabic
    "สวัสดี", // Thai
    "Xin chào", // Vietnamese
    "Merhaba" // Turkish
];

let currentGreetingIndex = 0;
let currentGreetingCharIndex = 0;
let isDeletingGreeting = false;
let greetingDelay = 100;
const animatedGreeting = document.querySelector('.animated-greeting');

function typeGreeting() {
    const currentGreeting = greetings[currentGreetingIndex];
    
    if (isDeletingGreeting) {
        // Remove characters
        animatedGreeting.textContent = currentGreeting.substring(0, currentGreetingCharIndex - 1);
        currentGreetingCharIndex--;
        greetingDelay = 50; // Faster when deleting
    } else {
        // Add characters
        animatedGreeting.textContent = currentGreeting.substring(0, currentGreetingCharIndex + 1);
        currentGreetingCharIndex++;
        greetingDelay = 150; // Slightly slower for non-Latin characters
    }

    // If greeting is complete
    if (!isDeletingGreeting && currentGreetingCharIndex === currentGreeting.length) {
        // Pause at the end
        greetingDelay = 2000;
        isDeletingGreeting = true;
    } else if (isDeletingGreeting && currentGreetingCharIndex === 0) {
        // Move to next greeting
        isDeletingGreeting = false;
        currentGreetingIndex = (currentGreetingIndex + 1) % greetings.length;
        greetingDelay = 500; // Pause before typing next greeting
    }

    setTimeout(typeGreeting, greetingDelay);
}

// Start the greeting animation when the page loads
window.addEventListener('load', typeGreeting); 