// ===================================
// GLOBAL CONFIGURATION
// ===================================

const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -10px 0px"
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, revealOptions);

// Initialize Random Scatter Variables
function initScatter() {
    // Target all reveal elements and specific component classes
    const revealElements = document.querySelectorAll('.reveal, .highlight-card, .project-card, .skill-domain, .timeline-item, .cert-card, .leadership-card, .achievement-card, .contact-card');
    revealElements.forEach(el => {
        const randomX = (Math.random() - 0.5) * 120;      // -60px to 60px
        const randomY = 60 + Math.random() * 80;         // 60px to 140px
        const randomRotate = (Math.random() - 0.5) * 30; // -15deg to 15deg
        const randomScale = 0.7 + Math.random() * 0.2;   // 0.7 to 0.9

        el.style.setProperty('--distort-x', `${randomX}px`);
        el.style.setProperty('--distort-y', `${randomY}px`);
        el.style.setProperty('--distort-rotate', `${randomRotate}deg`);
        el.style.setProperty('--distort-scale', `${randomScale}`);
    });
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
    initScatter();
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Parallax Engine
    const parallaxElements = document.querySelectorAll('.parallax-element');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateParallax() {
        lastScrollY = window.scrollY;
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallaxSpeed) || 0;
            const yOffset = lastScrollY * speed;
            el.style.transform = `translate3d(0, ${yOffset}px, 0)`;
        });
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });

    // Rest of initialization...
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    setTimeout(showGreeting, 2000);

    console.log('Kinetic Bloom v2 Active 🌌(Level-Locked)');
});

// ===================================
// THEME MANAGEMENT
// ===================================

const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle ? themeToggle.querySelector('svg') : null;

// Check saved theme
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-theme');
    body.classList.remove('dark-theme');
    updateThemeIcon(true);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        body.classList.toggle('dark-theme');

        const isLight = body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        updateThemeIcon(isLight);
    });
}

function updateThemeIcon(isLight) {
    if (!themeIcon) return;
    if (isLight) {
        // Moon icon for light mode (to switch back to dark)
        themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    } else {
        // Sun icon for dark mode
        themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
    }
}

// ===================================
// MOBILE NAVIGATION
// ===================================

const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// ===================================
// PROJECT FILTERING
// ===================================

const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    });
});

// ===================================
// PROJECT MODALS
// ===================================

const projectData = {
    'sign-language': {
        title: 'Sign Language recognition using ML',
        category: 'Major Project • AI/ML',
        image: 'file:///C:/Users/Rudra%20Gupta/.gemini/antigravity/brain/96765972-f4a8-4a18-b95a-6f15bd48b19d/uploaded_media_1769611443602.jpg',
        description: 'A cutting-edge computer vision system designed to bridge the communication gap for the hearing and speech impaired. This project uses YOLOv8 to detect and translate hand gestures into text in real-time.',
        points: [
            'Achieved 95%+ accuracy in static gesture recognition',
            'Implemented high-speed inference on edge devices',
            'Custom dataset of 50+ common sign language gestures',
            'Integrated with a user-friendly web interface for live translation'
        ]
    },
    'violence-detection': {
        title: 'Violence Detection System',
        category: 'AI/ML Security',
        image: 'file:///C:/Users/Rudra%20Gupta/.gemini/antigravity/brain/96765972-f4a8-4a18-b95a-6f15bd48b19d/security_detection_cover_1769606606755.png',
        description: 'An advanced security solution that uses a hybrid CNN-LSTM architecture to identify violent behavior in video surveillance streams instantly.',
        points: [
            'Analyzes temporal patterns across frames using LSTM',
            'Reduced false-positive rates by 40% compared to baseline CNNs',
            'Supports multi-camera stream processing',
            'Automated alert system integration for security teams'
        ]
    },
    'heart-disease': {
        title: 'Heart Disease Prediction',
        category: 'Healthcare AI',
        image: 'file:///C:/Users/Rudra%20Gupta/.gemini/antigravity/brain/96765972-f4a8-4a18-b95a-6f15bd48b19d/uploaded_media_1769611819506.png',
        description: 'A reliable diagnostic assistant that evaluates patient data to assess the risk of cardiovascular diseases using machine learning classification algorithms.',
        points: [
            'Utilized Random Forest and XGBoost for robust classification',
            'Featured importance analysis to identify key risk factors',
            'Cleaned and pre-processed complex clinical datasets',
            'Responsive dashboard for medical professionals'
        ]
    },
    'ml-benchmarking': {
        title: 'ML Algorithm Comparison',
        category: 'Research AI',
        image: 'file:///C:/Users/Rudra%20Gupta/.gemini/antigravity/brain/96765972-f4a8-4a18-b95a-6f15bd48b19d/uploaded_media_0_1769613722621.png',
        description: 'A research-focused project comparing various machine learning models to help developers choose the best algorithm for specific tasks based on performance metrics.',
        points: [
            'Benchmarks Accuracy, Precision, Recall, and F1-Score',
            'Evaluates computational overhead and training time',
            'Includes visual confusion matrices and ROC curves',
            'Supports both supervised and unsupervised learning comparison'
        ]
    },
    'codepath': {
        title: 'CodePath Learning Platform',
        category: 'Web Development',
        image: 'file:///C:/Users/Rudra%20Gupta/.gemini/antigravity/brain/96765972-f4a8-4a18-b95a-6f15bd48b19d/uploaded_media_1769617393955.png',
        description: 'An interactive coding platform built to foster community learning, featuring a browser-based editor and progress tracking for various technical tracks.',
        points: [
            'Real-time code execution environment',
            'Responsive UI/UX designed with modern CSS/JS',
            'Interactive curriculum management',
            'Community-driven peer review system'
        ]
    },
    'food-machine': {
        title: 'Raj Food Machine Automation',
        category: 'Engineering Hardware',
        image: 'file:///C:/Users/Rudra%20Gupta/.gemini/antigravity/brain/96765972-f4a8-4a18-b95a-6f15bd48b19d/food_machine_cover_1769606455271.png',
        description: 'Industrial automation project for food processing machinery, focusing on precision heat control and automated sorting logic.',
        points: [
            'PID control loops for high-precision temperature stability',
            'Integrated load sensors for automated weight sorting',
            'Industrial-grade Motherboard and Wiring configuration',
            'Hardware-software integration for full machine lifecycle'
        ]
    },
    'device-recommendation': {
        title: 'Laptop & Mobile Recommendation',
        category: 'Data Science',
        image: 'file:///C:/Users/Rudra%20Gupta/.gemini/antigravity/brain/96765972-f4a8-4a18-b95a-6f15bd48b19d/uploaded_media_1769612034114.png',
        description: 'A personalized engine that scores devices based on user preferences and technical specifications to provide the best hardware match.',
        points: [
            'Dynamic scoring algorithm based on hardware benchmarks',
            'Extensive database of latest mobile and laptop specs',
            'Filters for budget, performance, and portability',
            'Visualization of feature comparisons'
        ]
    }
};

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const modalImage = document.getElementById('modal-image');
const modalDesc = document.getElementById('modal-description');
const modalPoints = document.getElementById('modal-points');

function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;
    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalImage.src = data.image;
    modalDesc.textContent = data.description;
    modalPoints.innerHTML = '';
    data.points.forEach(point => {
        const li = document.createElement('li');
        li.textContent = point;
        modalPoints.appendChild(li);
    });
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 400);
}

projectCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => openModal(card.dataset.projectId));
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ===================================
// AI ASSISTANT (TECHPAL)
// ===================================
const aiSpeech = document.getElementById('ai-speech-bubble');
const aiAssistant = document.getElementById('ai-robot');

function showBotMenu() {
    if (!aiSpeech) return;
    let menu = aiSpeech.querySelector('.bot-menu');
    if (!menu) {
        menu = document.createElement('div');
        menu.className = 'bot-menu';
        const options = [
            { label: 'About Me', target: '#about' },
            { label: 'My Projects', target: '#projects' },
            { label: 'Tech Skills', target: '#skills' },
            { label: 'Contact', target: '#contact' }
        ];
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'bot-menu-btn';
            btn.textContent = opt.label;
            btn.onclick = (e) => {
                e.stopPropagation();
                const target = document.querySelector(opt.target);
                if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
                aiSpeech.classList.remove('visible');
            };
            menu.appendChild(btn);
        });
        aiSpeech.appendChild(menu);
    }
}

function showGreeting() {
    if (aiSpeech) {
        aiSpeech.textContent = "Hi, I'm TechPal! How can I help you explore? 👋";
        aiSpeech.classList.add('visible');
        setTimeout(showBotMenu, 1000);
    }
}

if (aiAssistant) {
    aiAssistant.addEventListener('click', (e) => {
        e.stopPropagation();
        aiSpeech.textContent = "I can take you anywhere! Where to first? ✨";
        showBotMenu();
        aiSpeech.classList.add('visible');
    });
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.ai-assistant-container') && aiSpeech) aiSpeech.classList.remove('visible');
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (navbar) {
        navbar.style.background = window.scrollY > 50 ? 'rgba(0, 44, 78, 0.98)' : 'rgba(0, 44, 78, 0.95)';
        navbar.style.boxShadow = window.scrollY > 50 ? 'var(--shadow-md)' : 'none';
    }
});

// ===================================
// SCRAMBLE TEXT EFFECT
// ===================================
const scrambleChars = 'ABCDEFHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
function scrambleText(element, originalText) {
    let iterations = 0;
    const interval = setInterval(() => {
        element.innerText = originalText.split('').map((char, index) => {
            if (index < iterations) return originalText[index];
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }).join('');
        if (iterations >= originalText.length) clearInterval(interval);
        iterations += 1 / 3;
    }, 30);
}

const scrambleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.scrambled) {
            scrambleText(entry.target, entry.target.dataset.original);
            entry.target.dataset.scrambled = 'true';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.section-title, .hero-title').forEach(el => {
    el.dataset.original = el.innerText;
    scrambleObserver.observe(el);
    el.addEventListener('mouseenter', () => scrambleText(el, el.dataset.original));
});

// ===================================
// DYNAMIC THEME ENGINE (Scroll Color Shift)
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // ===================================
    // DYNAMIC BACKGROUND ON SCROLL
    // ===================================
    const sectionColors = {
        'home': '#002c4e',       // Deep Navy
        'about': '#003b66',      // Lighter Navy
        'projects': '#002c4e',   // Deep Navy
        'skills': '#003b66',     // Lighter Navy
        'experience': '#002c4e', // Deep Navy
        'certifications': '#003b66',
        'contact': '#002c4e'
    };

    const colorObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const color = sectionColors[sectionId];
                if (color) {
                    document.body.style.backgroundColor = color;
                    // Also update CSS variable for seamless transitions
                    document.documentElement.style.setProperty('--bg-color', color);
                }
            }
        });
    }, { threshold: 0.4 }); // Trigger when 40% visible

    document.querySelectorAll('section').forEach(section => {
        colorObserver.observe(section);
    });

    // ===================================
    // MODAL FUNCTIONS
    // ===================================
    const eduModal = document.getElementById('education-modal');
    const resumeModal = document.getElementById('resume-modal');

    window.openEducationModal = function (e) {
        if (e) e.preventDefault();
        if (eduModal) {
            eduModal.style.display = 'flex';
            setTimeout(() => eduModal.classList.add('active'), 50);
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeEducationModal = function () {
        if (eduModal) {
            eduModal.classList.remove('active');
            setTimeout(() => {
                eduModal.style.display = 'none';
                document.body.style.overflow = '';
            }, 400);
        }
    };

    window.openResumeModal = function (e) {
        if (e) e.preventDefault();
        if (resumeModal) {
            resumeModal.style.display = 'flex';
            setTimeout(() => resumeModal.classList.add('active'), 50);
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeResumeModal = function () {
        if (resumeModal) {
            resumeModal.classList.remove('active');
            setTimeout(() => {
                resumeModal.style.display = 'none';
                document.body.style.overflow = '';
            }, 400);
        }
    };

});
