/**
 * Goutham M - Portfolio Website JavaScript
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MOBILE MENU TOGGLE
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. NAVBAR SCROLL EFFECT
    const navbar = document.getElementById('navbar');
    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();

    // 3. TYPEWRITER EFFECT (WITH DIRECT FALLBACK WORDS)
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        let words = [
            "Computer Science Engineering Student", 
            "2nd Year CSE Student", 
            "Aspiring Developer", 
            "Tech Enthusiast"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentText = '';

        const type = () => {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                currentText = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            typewriterElement.textContent = currentText;

            let typeSpeed = isDeleting ? 40 : 80;

            if (!isDeleting && currentText === currentWord) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && currentText === '') {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        };

        setTimeout(type, 300);
    }

    // 4. ACTIVE NAV LINK ON SCROLL
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    const observerOptions = {
        root: null,
        rootMargin: '-80px 0px -40% 0px',
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

    // 5. CONTACT FORM VALIDATION
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm && formFeedback && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formFeedback.className = 'form-feedback hidden';

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            if (!nameInput.value.trim() || !emailInput.value.trim() || !subjectInput.value.trim() || !messageInput.value.trim()) {
                showFeedback('Please fill out all fields.', 'error');
                return;
            }

            submitBtn.disabled = true;
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

            setTimeout(() => {
                showFeedback('Thank you, Goutham has received your message!', 'success');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
            }, 1500);
        });

        const showFeedback = (message, type) => {
            formFeedback.textContent = message;
            formFeedback.classList.remove('hidden');
            formFeedback.classList.add(type);
        };
    }
});
