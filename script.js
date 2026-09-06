/**
 * Goutham M - Portfolio Website JavaScript
 * Interactive components: Mobile menu, typewriter text, active link highlighter, and mock contact form.
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. MOBILE MENU TOGGLE
    // ==========================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        // Close mobile menu when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    // ==========================================
    // 2. NAVBAR SCROLL EFFECT
    // ==========================================
    const navbar = document.getElementById('navbar');
    
    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Run once in case user loads page scrolled down
    // ==========================================
    // 3. TYPEWRITER EFFECT
    // ==========================================
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const words = JSON.parse(typewriterElement.getAttribute('data-words'));
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentText = '';
        const type = () => {
            // Index of current word
            const currentWord = words[wordIndex];
            if (isDeleting) {
                // Remove character
                currentText = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // Add character
                currentText = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            typewriterElement.textContent = currentText;
            // Type speed management
            let typeSpeed = isDeleting ? 40 : 80;
            // If word is completely typed
            if (!isDeleting && currentText === currentWord) {
                // Hold at the end of the word
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && currentText === '') {
                isDeleting = false;
                // Move to next word
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }
            setTimeout(type, typeSpeed);
        };
        // Start Typewriter
        setTimeout(type, 1000);
    }
    // ==========================================
    // 4. ACTIVE NAV LINK ON SCROLL (IntersectionObserver)
    // ==========================================
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    const observerOptions = {
        root: null,
        rootMargin: '-80px 0px -40% 0px', // Offset for navbar height
        threshold: 0
    };
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                
                navItems.forEach(item => {
                    if (item.getAttribute('href') === `#${activeId}`) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
        });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
    // ==========================================
    // 5. CONTACT FORM VALIDATION & MOCK SUBMIT
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('submit-btn');
    if (contactForm && formFeedback && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Clear previous feedback classes
            formFeedback.className = 'form-feedback hidden';
            
            // Get inputs
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            // Client side validation check
            if (!nameInput.value.trim() || !emailInput.value.trim() || !subjectInput.value.trim() || !messageInput.value.trim()) {
                showFeedback('Please fill out all fields.', 'error');
                return;
            }
            if (!validateEmail(emailInput.value.trim())) {
                showFeedback('Please enter a valid email address.', 'error');
                return;
            }
            // Simulate form submission
            submitBtn.disabled = true;
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
            setTimeout(() => {
                // Success feedback
                showFeedback('Thank you, Goutham has received your message!', 'success');
                
                // Reset Form
                contactForm.reset();
                
                // Reset Button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
            }, 1500);
        });
        // Email validation helper
        const validateEmail = (email) => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        };
        // UI Feedback helper
        const showFeedback = (message, type) => {
            formFeedback.textContent = message;
            formFeedback.classList.remove('hidden');
            formFeedback.classList.add(type);
        };
    }
});
/* 
   ==========================================================================
   DESIGN SYSTEM & CUSTOM PROPERTIES (Blue & White Professional Theme)
   ==========================================================================
*/
:root {
    /* Colors */
    --color-bg-primary: #ffffff;
    --color-bg-secondary: #f8fafc;
    --color-bg-tertiary: #f1f5f9;
    
    --color-text-main: #0f172a;       /* slate-900 */
    --color-text-muted: #475569;      /* slate-600 */
    --color-text-light: #64748b;      /* slate-500 */
    
    --color-primary: #2563eb;         /* Royal blue */
    --color-primary-dark: #1d4ed8;    /* Dark royal blue */
    --color-primary-light: #eff6ff;   /* Soft ice-blue */
    --color-accent: #0f62fe;          /* Cobalt blue */
    
    --color-border: #e2e8f0;          /* slate-200 */
    --color-border-hover: #cbd5e1;    /* slate-300 */
    
    /* Fonts */
    --font-heading: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    --font-body: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    
    /* Transitions */
    --transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    
    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
    --shadow-lg: 0 10px 15px -3px rgba(37, 99, 235, 0.04), 0 4px 6px -4px rgba(37, 99, 235, 0.04);
    --shadow-xl: 0 20px 25px -5px rgba(37, 99, 235, 0.06), 0 8px 10px -6px rgba(37, 99, 235, 0.06);
    
    /* Layout */
    --container-width: 1140px;
    --border-radius-sm: 6px;
    --border-radius-md: 12px;
    --border-radius-lg: 20px;
}
/* 
   ==========================================================================
   BASE RESET
   ==========================================================================
*/
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px; /* Offset for sticky navbar */
}
body {
    background-color: var(--color-bg-primary);
    color: var(--color-text-main);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
}
a {
    color: inherit;
    text-decoration: none;
    transition: var(--transition-fast);
}
button, input, textarea {
    font-family: inherit;
}
img, svg {
    max-width: 100%;
    height: auto;
    display: block;
}
/* 
   ==========================================================================
   REUSABLE UTILITIES & COMPONENTS
   ==========================================================================
*/
.container {
    width: 100%;
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 24px;
}
.section-padding {
    padding: 100px 0;
}
.bg-light {
    background-color: var(--color-bg-secondary);
}
.text-gradient {
    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
/* Section Header */
.section-header {
    text-align: center;
    margin-bottom: 60px;
}
.section-subtitle {
    display: inline-block;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--color-primary);
    margin-bottom: 8px;
}
.section-title {
    font-family: var(--font-heading);
    font-size: 36px;
    font-weight: 700;
    color: var(--color-text-main);
}
.title-underline {
    width: 60px;
    height: 4px;
    background-color: var(--color-primary);
    margin: 12px auto 0;
    border-radius: 2px;
}
/* Buttons */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 28px;
    font-size: 15px;
    font-weight: 600;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    transition: var(--transition-normal);
}
.btn-primary {
    background-color: var(--color-primary);
    color: #ffffff;
    border: 1px solid var(--color-primary);
    box-shadow: var(--shadow-sm);
}
.btn-primary:hover {
    background-color: var(--color-primary-dark);
    border-color: var(--color-primary-dark);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}
.btn-secondary {
    background-color: transparent;
    color: var(--color-primary);
    border: 2.5px solid var(--color-primary);
}
.btn-secondary:hover {
    background-color: var(--color-primary-light);
    transform: translateY(-2px);
}
.btn-block {
    display: flex;
    width: 100%;
}
/* 
   ==========================================================================
   NAVIGATION BAR
   ==========================================================================
*/
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    z-index: 1000;
    background-color: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--color-border);
    transition: var(--transition-normal);
}
.navbar.scrolled {
    height: 70px;
    box-shadow: var(--shadow-sm);
}
.nav-container {
    max-width: var(--container-width);
    height: 100%;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.logo {
    font-family: var(--font-heading);
    font-size: 22px;
    font-weight: 700;
    color: var(--color-text-main);
    display: flex;
    align-items: center;
}
.logo-accent {
    color: var(--color-primary);
}
.nav-menu {
    display: flex;
    align-items: center;
    gap: 32px;
}
.nav-link {
    font-size: 15px;
    font-weight: 500;
    color: var(--color-text-muted);
    position: relative;
    padding: 8px 0;
}
.nav-link:hover {
    color: var(--color-primary);
}
.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--color-primary);
    transition: var(--transition-normal);
}
.nav-link:hover::after,
.nav-link.active::after {
    width: 100%;
}
.nav-link.active {
    color: var(--color-primary);
    font-weight: 600;
}
/* Mobile Toggle Hamburger */
.nav-toggle {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 24px;
    height: 18px;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 1001;
}
.nav-toggle .bar {
    width: 100%;
    height: 2px;
    background-color: var(--color-text-main);
    transition: var(--transition-normal);
}
/* 
   ==========================================================================
   HERO SECTION
   ==========================================================================
*/
.hero-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding-top: 80px;
    background-color: var(--color-bg-primary);
    overflow: hidden;
}
.hero-container {
    max-width: var(--container-width);
    width: 100%;
    margin: 0 auto;
    padding: 0 24px;
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    align-items: center;
    gap: 40px;
}
.hero-content {
    z-index: 2;
}
.hero-subtitle {
    display: inline-block;
    color: var(--color-primary);
    font-weight: 600;
    font-size: 15px;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 12px;
}
.hero-title {
    font-family: var(--font-heading);
    font-size: 54px;
    font-weight: 800;
    line-height: 1.15;
    margin-bottom: 16px;
    color: var(--color-text-main);
}
.hero-tagline {
    font-family: var(--font-heading);
    font-size: 24px;
    font-weight: 600;
    color: var(--color-text-muted);
    margin-bottom: 24px;
    min-height: 36px;
    display: flex;
    align-items: center;
}
.hero-description {
    font-size: 16px;
    color: var(--color-text-light);
    max-width: 520px;
    margin-bottom: 36px;
}
.hero-cta {
    display: flex;
    gap: 16px;
}
.hero-graphic {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
}
.graphic-wrapper {
    position: relative;
    width: 100%;
    max-width: 440px;
}
/* Animations for floating SVG elements */
.hero-svg {
    width: 100%;
    filter: drop-shadow(0 20px 30px rgba(37, 99, 235, 0.08));
}
.spin-slow {
    animation: spin 30s linear infinite;
    transform-origin: center;
}
.float-animation-1 {
    animation: float 4s ease-in-out infinite;
}
.float-animation-2 {
    animation: float 4.5s ease-in-out infinite alternate;
}
.float-animation-3 {
    animation: float 5s ease-in-out infinite 0.5s;
}
/* Scroll down indicator */
.scroll-down {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    text-align: center;
}
.scroll-down i {
    font-size: 20px;
    color: var(--color-text-light);
    cursor: pointer;
    transition: var(--transition-fast);
}
.scroll-down i:hover {
    color: var(--color-primary);
}
/* 
   ==========================================================================
   ABOUT ME SECTION
   ==========================================================================
*/
.about-grid {
    display: grid;
    grid-template-columns: 0.8fr 1.2fr;
    gap: 60px;
    align-items: center;
}
.about-image-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
}
.about-card {
    position: relative;
    background-color: var(--color-bg-primary);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    padding: 30px;
    z-index: 2;
    text-align: center;
    width: 100%;
    max-width: 320px;
    box-shadow: var(--shadow-md);
    transition: var(--transition-normal);
}
.about-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-xl);
    border-color: var(--color-primary);
}
.about-avatar-svg {
    width: 160px;
    margin: 0 auto 20px;
}
.about-card-info h3 {
    font-family: var(--font-heading);
    font-size: 20px;
    font-weight: 700;
    color: var(--color-text-main);
    margin-bottom: 4px;
}
.about-card-info p {
    font-size: 14px;
    color: var(--color-primary);
    font-weight: 600;
}
.about-card-shadow {
    position: absolute;
    top: 15px;
    left: 15px;
    width: 100%;
    height: 100%;
    border: 2px solid var(--color-primary-light);
    border-radius: var(--border-radius-md);
    z-index: 1;
    max-width: 320px;
}
.about-details {
    display: flex;
    flex-direction: column;
}
.about-heading {
    font-family: var(--font-heading);
    font-size: 26px;
    font-weight: 700;
    color: var(--color-text-main);
    margin-bottom: 20px;
}
.about-text {
    font-size: 16px;
    color: var(--color-text-muted);
    margin-bottom: 20px;
}
.info-badges-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;
    margin-top: 20px;
}
.info-badge {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background-color: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-sm);
    transition: var(--transition-normal);
}
.info-badge:hover {
    background-color: var(--color-bg-primary);
    border-color: var(--color-primary);
    box-shadow: var(--shadow-sm);
}
.badge-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-color: var(--color-primary-light);
    color: var(--color-primary);
    font-size: 18px;
    flex-shrink: 0;
}
.badge-text h4 {
    font-family: var(--font-heading);
    font-size: 14px;
    font-weight: 700;
    color: var(--color-text-main);
}
.badge-text p {
    font-size: 13px;
    color: var(--color-text-light);
}
/* 
   ==========================================================================
   SKILLS SECTION
   ==========================================================================
*/
.skills-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
}
.skill-category-card {
    background-color: var(--color-bg-primary);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    padding: 36px 30px;
    box-shadow: var(--shadow-sm);
    transition: var(--transition-normal);
}
.skill-category-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    border-color: var(--color-primary);
}
.category-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 24px;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--color-bg-secondary);
}
.category-icon {
    font-size: 20px;
    color: var(--color-primary);
}
.category-header h3 {
    font-family: var(--font-heading);
    font-size: 20px;
    font-weight: 700;
    color: var(--color-text-main);
}
.skills-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.skill-item {
    display: flex;
    flex-direction: column;
}
.skill-info {
    display: flex;
    align-items: center;
}
.skill-name {
    font-size: 15px;
    font-weight: 500;
    color: var(--color-text-muted);
    display: flex;
    align-items: center;
    gap: 10px;
    transition: var(--transition-fast);
}
.skill-logo {
    font-size: 18px;
    width: 20px;
    text-align: center;
}
/* Individual skill logo colors */
.python-color { color: #3776ab; }
.js-color { color: #f7df1e; background-color: #000; padding: 1px; border-radius: 2px; }
.cpp-color { color: #00599c; }
.java-color { color: #007396; }
.html-color { color: #e34f26; }
.react-color { color: #61dafb; }
.node-color { color: #339933; }
.bootstrap-color { color: #7952b3; }
.sql-color { color: #336791; }
.mongo-color { color: #47a248; }
.git-color { color: #f05032; }
.linux-color { color: #000000; }
.skill-category-card:hover .skill-name {
    color: var(--color-text-main);
}
/* 
   ==========================================================================
   PROJECTS SECTION
   ==========================================================================
*/
.projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
}
.project-card {
    background-color: var(--color-bg-primary);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    padding: 30px;
    box-shadow: var(--shadow-sm);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: var(--transition-normal);
}
.project-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    border-color: var(--color-primary);
}
.project-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
}
.project-folder-icon {
    font-size: 32px;
    color: var(--color-primary);
}
.project-links {
    display: flex;
    gap: 16px;
}
.project-links a {
    font-size: 20px;
    color: var(--color-text-light);
}
.project-links a:hover {
    color: var(--color-primary);
}
.project-body {
    margin-bottom: 24px;
}
.project-title {
    font-family: var(--font-heading);
    font-size: 20px;
    font-weight: 700;
    color: var(--color-text-main);
    margin-bottom: 12px;
}
.project-description {
    font-size: 14px;
    color: var(--color-text-muted);
    line-height: 1.6;
}
.project-footer {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}
.tech-tag {
    font-size: 12px;
    font-weight: 500;
    color: var(--color-primary);
    background-color: var(--color-primary-light);
    padding: 4px 10px;
    border-radius: 12px;
}
/* 
   ==========================================================================
   CONTACT SECTION
   ==========================================================================
*/
.contact-grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 50px;
}
.contact-info {
    display: flex;
    flex-direction: column;
}
.contact-heading {
    font-family: var(--font-heading);
    font-size: 26px;
    font-weight: 700;
    color: var(--color-text-main);
    margin-bottom: 20px;
}
.contact-text {
    font-size: 16px;
    color: var(--color-text-muted);
    margin-bottom: 36px;
}
.contact-details-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 40px;
}
.contact-detail-item {
    display: flex;
    align-items: center;
    gap: 16px;
}
.contact-detail-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background-color: var(--color-primary-light);
    color: var(--color-primary);
    font-size: 20px;
    flex-shrink: 0;
}
.contact-detail-content h4 {
    font-family: var(--font-heading);
    font-size: 14px;
    font-weight: 700;
    color: var(--color-text-main);
}
.contact-detail-content p, 
.contact-detail-content a {
    font-size: 15px;
    color: var(--color-text-muted);
}
.contact-detail-content a:hover {
    color: var(--color-primary);
}
.social-links-wrapper h4 {
    font-family: var(--font-heading);
    font-size: 15px;
    font-weight: 700;
    color: var(--color-text-main);
    margin-bottom: 16px;
}
.social-links {
    display: flex;
    gap: 14px;
}
.social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid var(--color-border);
    color: var(--color-text-muted);
    transition: var(--transition-normal);
}
.social-icon:hover {
    color: #ffffff;
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    transform: translateY(-2px);
}
/* Contact Form Wrapper */
.contact-form-wrapper {
    background-color: var(--color-bg-primary);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    padding: 40px;
    box-shadow: var(--shadow-sm);
}
.contact-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}
.form-label {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text-muted);
}
.form-control {
    width: 100%;
    padding: 12px 16px;
    font-size: 15px;
    border-radius: var(--border-radius-sm);
    border: 1px solid var(--color-border);
    background-color: var(--color-bg-secondary);
    color: var(--color-text-main);
    transition: var(--transition-normal);
    outline: none;
}
.form-control::placeholder {
    color: var(--color-text-light);
    opacity: 0.8;
}
.form-control:focus {
    border-color: var(--color-primary);
    background-color: var(--color-bg-primary);
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.08);
}
textarea.form-control {
    resize: vertical;
}
/* Form Feedback messages */
.form-feedback {
    font-size: 14px;
    font-weight: 500;
    padding: 10px;
    border-radius: var(--border-radius-sm);
    margin-top: 10px;
}
.form-feedback.success {
    background-color: #ecfdf5;
    color: #047857;
    border: 1px solid #a7f3d0;
}
.form-feedback.error {
    background-color: #fef2f2;
    color: #b91c1c;
    border: 1px solid #fecaca;
}
.hidden {
    display: none;
}
/* 
   ==========================================================================
   FOOTER SECTION
   ==========================================================================
*/
.footer {
    border-top: 1px solid var(--color-border);
    background-color: var(--color-bg-primary);
    padding: 50px 0 30px;
}
.footer-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
}
.footer-brand {
    text-align: center;
}
.footer-brand .logo {
    display: inline-block;
    margin-bottom: 8px;
}
.footer-brand p {
    font-size: 14px;
    color: var(--color-text-light);
}
.footer-links {
    display: flex;
    gap: 24px;
}
.footer-links a {
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-muted);
}
.footer-links a:hover {
    color: var(--color-primary);
}
.footer-bottom {
    text-align: center;
    width: 100%;
    padding-top: 20px;
    border-top: 1px solid var(--color-border);
}
.footer-bottom p {
    font-size: 13px;
    color: var(--color-text-light);
}
/* 
   ==========================================================================
   KEYFRAME ANIMATIONS
   ==========================================================================
*/
@keyframes float {
    0% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
}
@keyframes spin {
    100% { transform: rotate(360deg); }
}
.bounce {
    animation: bounce 2s infinite;
}
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-8px); }
    60% { transform: translateY(-4px); }
}
/* Typewriter animation styling cursor */
.cursor {
    display: inline-block;
    width: 2px;
    background-color: var(--color-primary);
    margin-left: 4px;
    animation: blink 0.75s step-end infinite;
}
@keyframes blink {
    from, to { background-color: transparent }
    50% { background-color: var(--color-primary); }
}
/* 
   ==========================================================================
   RESPONSIVE DESIGN BREAKPOINTS
   ==========================================================================
*/
@media (max-width: 992px) {
    .hero-title {
        font-size: 44px;
    }
    
    .skills-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .projects-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
@media (max-width: 768px) {
    .section-padding {
        padding: 70px 0;
    }
    
    /* Navigation Bar Mobile Layout */
    .nav-toggle {
        display: flex;
    }
    
    .nav-menu {
        position: fixed;
        top: 80px;
        left: -100%;
        width: 100%;
        height: calc(100vh - 80px);
        background-color: var(--color-bg-primary);
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding-top: 50px;
        gap: 36px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
        transition: var(--transition-normal);
        z-index: 999;
    }
    
    .nav-menu.active {
        left: 0;
    }
    
    /* Hamburger to X Transform */
    .nav-toggle.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .nav-toggle.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
    /* Hero Responsive */
    .hero-container {
        grid-template-columns: 1fr;
        text-align: center;
        padding-top: 40px;
        gap: 40px;
    }
    
    .hero-tagline {
        justify-content: center;
    }
    
    .hero-description {
        margin: 0 auto 30px;
    }
    
    .hero-cta {
        justify-content: center;
    }
    
    .hero-graphic {
        order: -1; /* Display graphic above content on mobile */
    }
    
    .graphic-wrapper {
        max-width: 320px;
    }
    
    /* About Me Responsive */
    .about-grid {
        grid-template-columns: 1fr;
        gap: 40px;
    }
    
    .about-image-wrapper {
        order: -1;
    }
    
    /* Skills Responsive */
    .skills-grid {
        grid-template-columns: 1fr;
    }
    
    /* Projects Responsive */
    .projects-grid {
        grid-template-columns: 1fr;
    }
    
    /* Contact Responsive */
    .contact-grid {
        grid-template-columns: 1fr;
        gap: 40px;
    }
}
