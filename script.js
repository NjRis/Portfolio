// ========================================
// CUSTOM CURSOR 3D
// ========================================

const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (cursorDot) {
        cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    }
});

function animateOutline() {
    const distX = mouseX - outlineX;
    const distY = mouseY - outlineY;
    
    outlineX += distX * 0.15;
    outlineY += distY * 0.15;
    
    if (cursorOutline) {
        cursorOutline.style.transform = `translate(${outlineX - 15}px, ${outlineY - 15}px)`;
    }
    
    requestAnimationFrame(animateOutline);
}
animateOutline();

document.querySelectorAll('a, button, .skill-card, .project-card, .tech-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorDot && cursorOutline) {
            cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px) scale(1.5)`;
            cursorDot.style.boxShadow = '0 0 20px rgba(74, 158, 255, 0.8)';
            cursorOutline.style.width = '45px';
            cursorOutline.style.height = '45px';
            cursorOutline.style.boxShadow = '0 0 25px rgba(74, 158, 255, 0.5)';
        }
    });
    el.addEventListener('mouseleave', () => {
        if (cursorDot && cursorOutline) {
            cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px) scale(1)`;
            cursorDot.style.boxShadow = '0 0 10px rgba(74, 158, 255, 0.5)';
            cursorOutline.style.width = '30px';
            cursorOutline.style.height = '30px';
            cursorOutline.style.boxShadow = '0 0 15px rgba(74, 158, 255, 0.3)';
        }
    });
});

// ========================================
// PROGRESS INDICATOR
// ========================================

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});

// ========================================
// THEME TOGGLE
// ========================================

const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

// Load theme from localStorage
const currentTheme = localStorage.getItem('theme') || 'dark';
htmlEl.setAttribute('data-theme', currentTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const theme = htmlEl.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Animation
        themeToggle.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

// ========================================
// COMMAND PALETTE (⌘K / Ctrl+K)
// ========================================

const commandPalette = document.getElementById('commandPalette');
const commandInput = document.getElementById('commandInput');
const commandResults = document.getElementById('commandResults');

const commands = [
    { icon: '🏠', label: 'Accueil', description: 'Retour à la page d\'accueil', action: () => window.location.href = 'index.html' },
    { icon: '💼', label: 'Projets', description: 'Voir tous mes projets', action: () => window.location.href = 'projects.html' },
    { icon: '🎯', label: 'Compétences', description: 'Mes compétences techniques', action: () => window.location.href = 'skills.html' },
    { icon: '📅', label: 'Parcours', description: 'Ma timeline professionnelle', action: () => window.location.href = 'timeline.html' },
    { icon: '🛠️', label: 'Tech Stack', description: 'Technologies que je maîtrise', action: () => window.location.href = 'techstack.html' },
    { icon: '✉️', label: 'Contact', description: 'Me contacter', action: () => window.location.href = 'contact.html' },
    { icon: '🌓', label: 'Changer de thème', description: 'Basculer entre mode clair et sombre', action: () => themeToggle?.click() },
    { icon: '📄', label: 'Télécharger CV', description: 'Obtenir mon CV en PDF', action: () => window.location.href = 'doc/CV_6.pdf' },
];

// Open/close command palette
document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleCommandPalette();
    }
    if (e.key === 'Escape' && commandPalette?.classList.contains('active')) {
        toggleCommandPalette();
    }
});

function toggleCommandPalette() {
    if (commandPalette) {
        commandPalette.classList.toggle('active');
        if (commandPalette.classList.contains('active')) {
            commandInput?.focus();
            renderCommands(commands);
        } else {
            commandInput.value = '';
        }
    }
}

if (commandPalette) {
    commandPalette.addEventListener('click', (e) => {
        if (e.target === commandPalette) {
            toggleCommandPalette();
        }
    });
}

if (commandInput) {
    commandInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = commands.filter(cmd => 
            cmd.label.toLowerCase().includes(query) || 
            cmd.description.toLowerCase().includes(query)
        );
        renderCommands(filtered);
    });
}

function renderCommands(cmds) {
    if (!commandResults) return;
    
    commandResults.innerHTML = cmds.map((cmd, index) => `
        <div class="command-item" data-index="${index}">
            <span class="command-icon">${cmd.icon}</span>
            <div class="command-label">
                <strong>${cmd.label}</strong>
                <span>${cmd.description}</span>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.command-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            cmds[index].action();
            toggleCommandPalette();
        });
    });
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
});

// ========================================
// MOBILE HAMBURGER MENU
// ========================================

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks?.classList.remove('active');
    });
});

// ========================================
// SMOOTH SCROLLING
// ========================================

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

// ========================================
// SCROLL ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .experience-card, .language-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ========================================
// PARALLAX EFFECT
// ========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
});

// ========================================
// TECH TAGS INTERACTIVE
// ========================================

document.querySelectorAll('.tech-tag').forEach(tag => {
    tag.addEventListener('click', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1) rotate(0deg)';
        }, 200);
    });
});

// ========================================
// PROJECT CARD RIPPLE EFFECT
// ========================================

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(74, 158, 255, 0.4)';
        ripple.style.left = e.offsetX + 'px';
        ripple.style.top = e.offsetY + 'px';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'rippleEffect 0.6s ease-out';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// STAGE ALERT
// ========================================

const stageAlert = document.getElementById('stageAlert');
const closeAlert = document.getElementById('closeAlert');

if (stageAlert && closeAlert) {
    closeAlert.addEventListener('click', () => {
        stageAlert.classList.add('hidden');
        
        setTimeout(() => {
            stageAlert.style.display = 'none';
        }, 400);
    });

    let lastScroll = 0;
    let shakeTimeout;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100 && currentScroll > lastScroll && stageAlert.style.display !== 'none') {
            clearTimeout(shakeTimeout);
            
            stageAlert.style.animation = 'none';
            setTimeout(() => {
                stageAlert.style.animation = 'shake 0.5s ease';
            }, 10);
            
            shakeTimeout = setTimeout(() => {
                stageAlert.style.animation = '';
            }, 500);
        }
        
        lastScroll = currentScroll;
    });
}

// ========================================
// CONTACT FORM VALIDATION
// ========================================

const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectSelect = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    const submitBtn = contactForm.querySelector('.btn-submit');

    // Character counter
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', () => {
            const count = messageTextarea.value.length;
            charCount.textContent = count;
            
            if (count > 500) {
                messageTextarea.value = messageTextarea.value.substring(0, 500);
                charCount.textContent = '500';
            }
        });
    }

    // Real-time validation
    function validateField(input, errorId, validationFn) {
        const errorEl = document.getElementById(errorId);
        
        input.addEventListener('blur', () => {
            const error = validationFn(input.value);
            if (error) {
                input.classList.add('error');
                errorEl.textContent = error;
                errorEl.classList.add('show');
            } else {
                input.classList.remove('error');
                errorEl.classList.remove('show');
            }
        });

        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                const error = validationFn(input.value);
                if (!error) {
                    input.classList.remove('error');
                    errorEl.classList.remove('show');
                }
            }
        });
    }

    if (nameInput) {
        validateField(nameInput, 'nameError', (value) => {
            if (!value.trim()) return 'Le nom est requis';
            if (value.trim().length < 2) return 'Le nom doit contenir au moins 2 caractères';
            return null;
        });
    }

    if (emailInput) {
        validateField(emailInput, 'emailError', (value) => {
            if (!value.trim()) return 'L\'email est requis';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) return 'Email invalide';
            return null;
        });
    }

    if (subjectSelect) {
        validateField(subjectSelect, 'subjectError', (value) => {
            if (!value) return 'Veuillez sélectionner un sujet';
            return null;
        });
    }

    if (messageTextarea) {
        validateField(messageTextarea, 'messageError', (value) => {
            if (!value.trim()) return 'Le message est requis';
            if (value.trim().length < 10) return 'Le message doit contenir au moins 10 caractères';
            return null;
        });
    }

    // Form submission
    /*contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields
        const errors = [];
        if (!nameInput?.value.trim()) errors.push('nom');
        if (!emailInput?.value.trim()) errors.push('email');
        if (!subjectSelect?.value) errors.push('sujet');
        if (!messageTextarea?.value.trim()) errors.push('message');

        if (errors.length > 0) {
            alert('Veuillez remplir tous les champs requis');
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Hide form and show success message
            contactForm.style.display = 'none';
            successMessage.classList.add('show');

            // Reset form after 5 seconds
            setTimeout(() => {
                contactForm.style.display = 'flex';
                contactForm.reset();
                successMessage.classList.remove('show');
            }, 5000);
        }, 2000);
    });*/
    contactForm.addEventListener('submit', (e) => {
    // Laisse FormSubmit gérer l’envoi
    submitBtn.classList.add('loading');
});

}

// ========================================
// VERSION BADGE TOOLTIP
// ========================================

const versionBadge = document.getElementById('versionBadge');
if (versionBadge) {
    versionBadge.addEventListener('click', () => {
        alert('Portfolio v2.1.0\n\nNouvelles fonctionnalités :\n✨ Mode clair/sombre\n⌨️ Command Palette (⌘K)\n📊 Progress Indicator\n📅 Timeline Interactive\n✉️ Formulaire de contact\n🛠️ Tech Stack visuel');
    });
}

// ========================================
// INIT
// ========================================

console.log('%c👋 Salut ! Bienvenue sur mon portfolio', 'font-size: 20px; font-weight: bold; color: #4a9eff;');
console.log('%c💼 Iris NJIKAM - Développeuse FullStack & DevOps', 'font-size: 14px; color: #9a9a9a;');
console.log('%c⌨️ Appuyez sur Ctrl+K (ou ⌘K) pour ouvrir la palette de commandes', 'font-size: 12px; color: #4a9eff;');