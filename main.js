document.addEventListener('DOMContentLoaded', function() {
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

// Form validation and submission handling
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const inputs = contactForm.querySelectorAll('input:not([type="checkbox"]), textarea');

// Add input validation styles
inputs.forEach(input => {
    input.addEventListener('input', function() {
        validateInput(this);
    });

    input.addEventListener('blur', function() {
        validateInput(this);
    });
});

function validateInput(input) {
    const isValid = input.checkValidity();
    const isDirty = input.value.length > 0;
    
    if (isDirty) {
        if (isValid) {
            input.classList.remove('border-red-500');
            input.classList.add('border-green-500');
        } else {
            input.classList.remove('border-green-500');
            input.classList.add('border-red-500');
        }
    } else {
        input.classList.remove('border-red-500', 'border-green-500');
    }
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Basic validation for required fields
    let isValid = true;
    inputs.forEach(input => {
        if (input.hasAttribute('required') && input.value.trim() === '') {
            isValid = false;
            input.classList.add('border-red-500'); // Highlight empty required fields
        } else {
            input.classList.remove('border-red-500');
        }
    });

    if (!isValid) {
        formStatus.textContent = 'Please fill in all required fields.';
        formStatus.className = 'error';
        formStatus.style.display = 'block';
        return;
    }
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
    submitButton.disabled = true;
    
    // Show status div
    showFormStatus('Sending your message...', 'info');

    // Log form data for debugging
    const formData = new FormData(contactForm);
    console.log('Form data being sent:', {
        user_name: formData.get('user_name'),
        user_email: formData.get('user_email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    });

    try {
        console.log('Attempting to send email with EmailJS...');
        // Send email using EmailJS
        const response = await emailjs.sendForm(
            'service_aeuy70d',
            'template_zvtvomc',
            contactForm
        );
        console.log('EmailJS response:', response);

        // Show success message
        showFormStatus('Message sent successfully! I will get back to you soon.', 'success');
        contactForm.reset();
        
        // Reset input styles
        inputs.forEach(input => {
            input.classList.remove('border-red-500', 'border-green-500');
        });
    } catch (error) {
        // Show error message
        console.error('EmailJS error:', error);
        console.error('Error details:', {
            text: error.text,
            status: error.status,
            message: error.message
        });
        showFormStatus('Failed to send message. Please try again later.', 'error');
    } finally {
        // Reset button state
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    }
});

function showFormStatus(message, type) {
    const centralNotification = document.getElementById('centralNotification');
    const notificationMessage = document.getElementById('notificationMessage');
    const notificationAccent = document.getElementById('notificationAccent');

    // Clear previous classes and content for form-status (the old one)
    formStatus.textContent = '';
    formStatus.classList.add('hidden');

    // Set message and type for the new central notification
    notificationMessage.textContent = message;
    centralNotification.className = 'fixed inset-0 flex items-center justify-center p-4 z-[999] pointer-events-none opacity-0 transition-opacity duration-300'; // Reset classes
    notificationAccent.className = 'w-16 h-1 mx-auto rounded-full'; // Reset accent classes

    switch(type) {
        case 'success':
            centralNotification.classList.add('notification-success');
            break;
        case 'error':
            centralNotification.classList.add('notification-error');
            break;
        case 'info':
            centralNotification.classList.add('notification-info');
            break;
    }
    
    // Show the notification with animation
    centralNotification.classList.add('notification-show');

    // Hide notification after 4 seconds
    setTimeout(() => {
        centralNotification.classList.remove('notification-show');
        // Optional: clear message after fade out
        setTimeout(() => {
            notificationMessage.textContent = '';
            notificationAccent.className = 'w-16 h-1 mx-auto rounded-full'; // Reset accent classes
        }, 300); // Match transition duration
    }, 4000);
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
        
        const href = item.getAttribute('href');
        if (href && current && href.includes(current)) {
            item.classList.add('text-secondary');
            if (underline) {
                underline.classList.add('w-full');
                underline.classList.remove('w-0');
            }
        }
    });
});

// Navbar glass effect handling
const navBorder = document.getElementById('navBorder');
const mainNav = document.getElementById('mainNav'); // Assuming you have a main nav element with this ID
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu'); // Assuming you have a mobile menu element with this ID
let lastScroll = 0;

// Handle navbar scroll behavior with glass effect
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Adjust glass effect on scroll
    if (currentScroll > 0) {
        navBorder.style.transform = 'scaleX(1)';
        mainNav.style.background = 'rgba(255, 255, 255, 0.1)';
        mainNav.style.backdropFilter = 'blur(20px)';
    } else {
        navBorder.style.transform = 'scaleX(0)';
        mainNav.style.background = 'transparent';
        mainNav.style.backdropFilter = 'blur(0px)';
    }
    
    // Hide navbar when scrolling down, show when scrolling up with smooth animation
    if (currentScroll > lastScroll && currentScroll > 100) {
        mainNav.style.transform = 'translateY(-100%)';
    } else {
        mainNav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Mobile menu handling with glass effect
let isMenuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex', 'flex-col');
        mainNav.style.background = 'rgba(255, 255, 255, 0.1)'; // Apply glass effect when open
        mainNav.style.backdropFilter = 'blur(20px)';
    } else {
        mobileMenu.classList.remove('flex', 'flex-col');
        mobileMenu.classList.add('hidden');
        // Revert to scroll-based glass effect if menu is closed and not scrolled
        if (window.pageYOffset === 0) {
            mainNav.style.background = 'transparent';
            mainNav.style.backdropFilter = 'blur(0px)';
        }
    }
});

// Animated Greeting (from index.html, moved here)
const greetings = [
    "Hello", // English
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
    if (!animatedGreeting) return; // Ensure element exists

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
if (animatedGreeting) {
    typeGreeting();
}

// Smooth scroll for hero section (from index.html, moved here)
const heroSection = document.getElementById('hero');
if (heroSection) {
    const observerOptionsHero = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerHero = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observerHero.unobserve(entry.target);
            }
        });
    }, observerOptionsHero);

    observerHero.observe(heroSection);
}

// Certificate Modal functionality
const certificateModal = document.getElementById('certificateModal');
const modalImage = document.getElementById('modalImage');
const closeModalBtn = document.getElementById('closeModal');
const certificatesGrid = document.getElementById('certificatesGrid');

if (certificatesGrid) {
    certificatesGrid.addEventListener('click', (e) => {
        const clickedItem = e.target.closest('.certificate-item img');
        if (clickedItem) {
            const fullSrc = clickedItem.getAttribute('data-fullsrc');
            if (fullSrc) {
                modalImage.src = fullSrc;
                
                // Get the position and size of the clicked thumbnail
                const rect = clickedItem.getBoundingClientRect();

                // Set initial transform for the modal image to match the thumbnail
                // We apply it to the modal's inner div, not the modal itself, for better control
                const modalContent = certificateModal.querySelector('div');

                // Calculate scale and position to match the thumbnail
                const scaleX = rect.width / modalImage.offsetWidth;
                const scaleY = rect.height / modalImage.offsetHeight;
                const translateX = rect.left - modalContent.getBoundingClientRect().left + (rect.width - modalImage.offsetWidth) / 2; // Adjust for centering
                const translateY = rect.top - modalContent.getBoundingClientRect().top + (rect.height - modalImage.offsetHeight) / 2; // Adjust for centering

                modalContent.style.transition = 'none'; // Disable transition for initial positioning
                modalContent.style.transform = `translate(${translateX}px, ${translateY}px) scaleX(${scaleX}) scaleY(${scaleY})`;
                modalContent.style.opacity = '0'; // Start hidden
                certificateModal.classList.add('show-modal'); // Make modal visible but content still scaled/hidden

                // Force reflow to ensure initial transform is applied
                void modalContent.offsetWidth;

                // Animate to final state
                modalContent.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'; // Smooth transition
                modalContent.style.transform = 'translateY(0) scale(1)';
                modalContent.style.opacity = '1';
            }
        }
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        certificateModal.classList.remove('show-modal');
        // Reset modal content transform after closing for next opening
        const modalContent = certificateModal.querySelector('div');
        modalContent.style.transition = 'none';
        modalContent.style.transform = 'scale(0.9) translateY(-4px)'; // Default hidden state
        modalContent.style.opacity = '0';
    });
}

if (certificateModal) {
    // Close modal when clicking outside the image
    certificateModal.addEventListener('click', (e) => {
        if (e.target === certificateModal) {
            certificateModal.classList.remove('show-modal');
            // Reset modal content transform after closing for next opening
            const modalContent = certificateModal.querySelector('div');
            modalContent.style.transition = 'none';
            modalContent.style.transform = 'scale(0.9) translateY(-4px)'; // Default hidden state
            modalContent.style.opacity = '0';
        }
    });
}

// Add 'certificates' to navbar title updates
const updateNavbarTitleOriginal = typeof updateNavbarTitle !== 'undefined' ? updateNavbarTitle : null; // Store original for re-use if needed
updateNavbarTitle = () => {
    let activeSectionId = 'hero';

    // Get all sections again inside this function to ensure it's up-to-date after DOM changes
    const allSections = document.querySelectorAll('section[id]');

    for (let i = allSections.length - 1; i >= 0; i--) {
        const section = allSections[i];
        const rect = section.getBoundingClientRect();
        if (rect.top <= 25 && rect.bottom > 0) { // Adjusted condition to 25px from top for a very precise change before the heading is fully at the top
            activeSectionId = section.id;
            break;
        }
    }

    if (window.scrollY === 0) {
        activeSectionId = 'hero';
    }

    let titleText = '';
    switch (activeSectionId) {
        case 'hero':
            titleText = 'Rohan Rai';
            break;
        case 'projects':
            titleText = 'Projects';
            break;
        case 'certificates':
            titleText = 'Certificates';
            break;
        case 'skills':
            titleText = 'Skills';
            break;
        case 'contact':
            titleText = 'Contact';
            break;
        default:
            titleText = 'mySelf';
    }
    navbarTitle.textContent = titleText;
};

// Re-trigger observer and scroll listeners after DOMContentLoaded
document.addEventListener('scroll', updateNavbarTitle);
window.addEventListener('load', updateNavbarTitle);

// Certificate Story Timeline
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');
    const downloadBtn = document.getElementById('downloadCertificate');
    const viewButtons = document.querySelectorAll('.view-certificate-btn');

    // Make sure all timeline items are visible initially
    timelineItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    });

    // Intersection Observer for timeline items
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe each timeline item
    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Modal functionality
    function openModal(imageSrc) {
        modalImage.src = imageSrc;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        modalImage.style.animation = 'float 3s ease-in-out infinite';
    }

    function closeModalHandler() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalImage.style.animation = '';
    }

    // Event Listeners
    viewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.certificate-card');
            const image = card.querySelector('img');
            openModal(image.src);
        });
    });

    closeModal.addEventListener('click', closeModalHandler);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModalHandler();
    });

    // Download functionality
    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = modalImage.src;
        link.download = `certificate-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModalHandler();
        }
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#certificates"]').forEach(anchor => {
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

    // Enhanced hover effects for timeline markers
    timelineItems.forEach(item => {
        const marker = item.querySelector('.timeline-marker');
        const description = item.querySelector('.timeline-description');
        
        item.addEventListener('mouseenter', () => {
            marker.style.transform = 'translate(-50%, -50%) scale(1.5)';
            description.style.transform = 'translateY(-5px)';
        });

        item.addEventListener('mouseleave', () => {
            marker.style.transform = 'translate(-50%, -50%) scale(1)';
            description.style.transform = 'translateY(0)';
        });
    });

    // Parallax effect for certificate cards
    timelineItems.forEach(item => {
        const card = item.querySelector('.certificate-card');
        
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        item.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
});

}); 