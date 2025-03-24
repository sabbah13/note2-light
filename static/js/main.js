document.addEventListener('DOMContentLoaded', function() {
    // Language toggle functionality
    const langButtons = document.querySelectorAll('.lang-btn');
    const currentLang = localStorage.getItem('language') || 'en';
    
    // Set initial language
    setLanguage(currentLang);
    
    // Add click event listeners to language buttons
    langButtons.forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        }
        
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
            
            // Update active class
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Save preference
            localStorage.setItem('language', lang);
        });
    });
    
    // Function to change language
    function setLanguage(lang) {
        const elements = document.querySelectorAll('[data-' + lang + ']');
        
        elements.forEach(element => {
            const translation = element.getAttribute('data-' + lang);
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Handle language-specific sections
        if (lang === 'ru') {
            // Show Russian-only elements
            const ruOnlyElements = document.querySelectorAll('[data-ru-only]');
            ruOnlyElements.forEach(el => el.style.display = 'block');
            
            // Hide English-only elements
            const enOnlyElements = document.querySelectorAll('[data-en-only]');
            enOnlyElements.forEach(el => el.style.display = 'none');
        } else {
            // For English
            const ruOnlyElements = document.querySelectorAll('[data-ru-only]');
            ruOnlyElements.forEach(el => el.style.display = 'none');
            
            const enOnlyElements = document.querySelectorAll('[data-en-only]');
            enOnlyElements.forEach(el => el.style.display = 'block');
        }
    }
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-link[href="#' + sectionId + '"]')?.classList.add('active');
            } else {
                document.querySelector('.nav-link[href="#' + sectionId + '"]')?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    function scrollHeader() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            header.style.height = '70px';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            header.style.height = 'auto';
        }
    }
    
    window.addEventListener('scroll', scrollHeader);
    
    // Animation on scroll (simple implementation)
    function revealOnScroll() {
        const elements = document.querySelectorAll('.info-card, .value-card, .feature, .industry, .pricing-plan, .step');
        const windowHeight = window.innerHeight;
        
        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial styles for animation elements
    const animationElements = document.querySelectorAll('.info-card, .value-card, .feature, .industry, .pricing-plan, .step');
    animationElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Call once on load
});
