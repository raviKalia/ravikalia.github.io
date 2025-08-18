// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
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

// Enhanced Navbar Background and Active Tab Detection on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;
    
    // Enhanced header shadow effects
    if (scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08)';
        navbar.style.backdropFilter = 'blur(20px) saturate(180%)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.3)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
    }
    
    // Active tab detection based on scroll position
    updateActiveNavLink();
});

// Function to update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Offset for navbar height
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        // Check if section is in viewport
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    // Special case for hero section at the top
    if (scrollY < 100) {
        currentSection = 'home';
    }
    
    // Update active class on navigation links
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simple form validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        alert('Thank you for your message! I\'ll get back to you soon.');
        contactForm.reset();
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .about-content, .contact-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing Effect for Hero Subtitle (Optional Enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect on page load
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        typeWriter(subtitle, originalText, 50);
    }
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Dynamic Project Filtering (Future Enhancement)
const projectTags = document.querySelectorAll('.project-tags span');
projectTags.forEach(tag => {
    tag.addEventListener('click', () => {
        const filter = tag.textContent.toLowerCase();
        const projects = document.querySelectorAll('.project-card');
        
        projects.forEach(project => {
            const projectTags = project.querySelectorAll('.project-tags span');
            const hasTag = Array.from(projectTags).some(t => 
                t.textContent.toLowerCase().includes(filter)
            );
            
            if (hasTag || filter === 'all') {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    });
});

// Lazy Loading for Images
const images = document.querySelectorAll('img');
const imageOptions = {
    threshold: 0,
    rootMargin: '0px 0px 50px 0px'
};

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
}, imageOptions);

images.forEach(img => imageObserver.observe(img));

// Performance Optimization - Debounce Scroll Events
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

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Scroll-based animations or calculations
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScroll);

// Accessibility Improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

// Project Popup Functionality
const projectData = {
    yourspot: {
        title: "Mood Board",
        category: "Web Application",
        image: "./Assets/art board.png",
        description: "A Mood board is a visual representation of your ideas and inspiration.",
        features: [
            "User authentication and secure accounts",
            "Advanced search and filtering system",
            "Real-time messaging between users",
            "Profile management and portfolio showcase",
            "Payment integration and transaction handling",
            "Responsive design for all devices"
        ],
        technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Stripe API"]
    },
    color: {
        title: "Color Design System",
        category: "Design System",
        image: "./Assets/Color.png",
        description: "Comprehensive color palette and design system for modern web applications with accessibility considerations and brand consistency guidelines.",
        features: [
            "WCAG compliant color combinations",
            "Semantic color naming system",
            "Dark and light theme variations",
            "Brand color guidelines",
            "Color psychology considerations",
            "Export formats for developers"
        ],
        technologies: ["Design", "Color Theory", "Accessibility", "Branding"]
    },
    mobabout: {
        title: "Mobile About Page",
        category: "Mobile Design",
        image: "./Assets/Mob-About.png",
        description: "Mobile-first design for about page with clean layout and intuitive user experience optimized specifically for mobile devices and touch interactions.",
        features: [
            "Mobile-first responsive design",
            "Touch-friendly interface elements",
            "Optimized loading performance",
            "Gesture-based navigation",
            "Progressive web app features",
            "Cross-platform compatibility"
        ],
        technologies: ["Mobile Design", "UI/UX", "Responsive", "Mobile First"]
    },
    project1: {
        title: "Adobe Illustrator",
        category: "Web Design",
        image: "./Assets/project-1.png",
        description: "Feature-rich web application with modern interface design and powerful functionality for enhanced user experience and productivity.",
        features: [
            "Modern and intuitive user interface",
            "Real-time data synchronization",
            "Advanced search and filtering",
            "User role management",
            "API integration capabilities",
            "Performance optimized architecture"
        ],
        technologies: ["Adobe Illustrator", "Web Design", "UI/UX", "Responsive Design"]
    },
    branding: {
        title: "Personal Branding",
        category: "Branding",
        image: "./Assets/Ravi_Branding.png",
        description: "Complete branding package including logo design, color schemes, typography, and brand guidelines for professional identity and recognition.",
        features: [
            "Logo design and variations",
            "Brand color palette",
            "Typography guidelines",
            "Brand voice and messaging",
            "Application guidelines",
            "Digital and print assets"
        ],
        technologies: ["Branding", "Logo Design", "Identity", "Graphics", "adobe Illustrator"]
    },
    businesscard: {
        title: "Business Card Design",
        category: "Print Design",
        image: "./Assets/Ravi_Business_card.png",
        description: "Professional business card design with modern aesthetics, clear information hierarchy, and memorable visual impact for networking success.",
        features: [
            "Professional layout design",
            "Clear information hierarchy",
            "Brand consistency",
            "Print-ready specifications",
            "Multiple format variations",
            "QR code integration"
        ],
        technologies: ["Print Design", "Branding", "Graphics", "Layout", "Adobe Illustrator"]
    },
    resume: {
        title: "Resume Design",
        category: "Print Design",
        image: "./Assets/resume.png",
        description: "Clean and professional resume design with modern typography, effective information layout, and ATS-friendly formatting for career success.",
        features: [
            "ATS-friendly formatting",
            "Modern typography system",
            "Clear section organization",
            "Professional color scheme",
            "Multiple format exports",
            "Easy customization options"
        ],
        technologies: ["Print Design", "Typography", "Layout", "Professional","microsoft Word"]
    },
    rkui: {
        title: "RK UI Component Library",
        category: "UI Kit",
        image: "./Assets/rkui.png",
        description: "Comprehensive UI component library with modern design patterns, reusable components, and consistent design system for web applications.",
        features: [
            "50+ reusable components",
            "Consistent design system",
            "Accessibility compliant",
            "Theme customization",
            "Documentation and examples",
            "Framework agnostic"
        ],
        technologies: ["UI Kit", "Components", "Design System", "Adobe XD", "Figma"]
    },
    uxkit: {
        title: "UX Design Kit",
        category: "UX Design",
        image: "./Assets/uxkit.png",
        description: "Complete UX design toolkit with wireframes, user flows, design patterns, and templates for creating exceptional user experiences.",
        features: [
            "Wireframe templates",
            "User flow diagrams",
            "Design pattern library",
            "Usability testing templates",
            "Persona development tools",
            "Journey mapping resources"
        ],
        technologies: ["UX Design", "Wireframes", "User Flow", "Figma"]
    }
};

function openProjectPopup(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalFeatures = document.getElementById('modalFeatures');
    const modalTags = document.getElementById('modalTags');

    // Populate modal content
    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category;
    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalDescription.textContent = project.description;

    // Populate features
    modalFeatures.innerHTML = '';
    project.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        modalFeatures.appendChild(li);
    });

    // Populate technologies
    modalTags.innerHTML = '';
    project.technologies.forEach(tech => {
        const span = document.createElement('span');
        span.textContent = tech;
        modalTags.appendChild(span);
    });

    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Add animation class
    setTimeout(() => {
        modal.querySelector('.modal-content').style.transform = 'translateY(0) scale(1)';
        modal.querySelector('.modal-content').style.opacity = '1';
    }, 10);
}

function closeProjectPopup() {
    const modal = document.getElementById('projectModal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Add closing animation
    modalContent.style.transform = 'translateY(50px) scale(0.95)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeProjectPopup();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const modal = document.getElementById('projectModal');
        if (modal.style.display === 'block') {
            closeProjectPopup();
        }
    }
});

// Full-size Image Modal Functions
function openImageModal(imageSrc, imageAlt) {
    const modal = document.getElementById('imageModal');
    const fullSizeImage = document.getElementById('fullSizeImage');
    
    fullSizeImage.src = imageSrc;
    fullSizeImage.alt = imageAlt;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add animation
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Add click handlers to all project images for full-size viewing
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers to project card images
    const projectImages = document.querySelectorAll('.project-image img');
    projectImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent project card click
            openImageModal(img.src, img.alt);
        });
    });
    
    // Add click handlers to blog post images
    const blogImages = document.querySelectorAll('.post-image img');
    blogImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            openImageModal(img.src, img.alt);
        });
    });
    
    // Add click handlers to any other images that should be viewable in full size
    const otherImages = document.querySelectorAll('.hero-logo, .about-avatar img');
    otherImages.forEach(img => {
        if (img) {
            img.style.cursor = 'pointer';
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                openImageModal(img.src, img.alt);
            });
        }
    });
});

// Close image modal when clicking outside the image
document.addEventListener('DOMContentLoaded', () => {
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                closeImageModal();
            }
        });
    }
});

// Close image modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const imageModal = document.getElementById('imageModal');
        if (imageModal && imageModal.style.display === 'block') {
            closeImageModal();
        }
    }
});

// Console Easter Egg
console.log(`
    ╔═══════════════════════════════════════╗
    ║  Welcome to Ravi Kumar's Portfolio!   ║
    ║  Let's build something amazing!       ║
    ╚═══════════════════════════════════════╝
    
    Contact: ravi@example.com
    GitHub: https://github.com/ravikumar
    LinkedIn: https://linkedin.com/in/ravikumar
`);
