// Custom cursor with optimized performance
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

// Update mouse position
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Instant update for dot
    cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
});

// Smooth follow for outline using requestAnimationFrame
function animateOutline() {
    const distX = mouseX - outlineX;
    const distY = mouseY - outlineY;
    
    outlineX += distX * 0.15;
    outlineY += distY * 0.15;
    
    cursorOutline.style.transform = `translate(${outlineX - 15}px, ${outlineY - 15}px)`;
    
    requestAnimationFrame(animateOutline);
}
animateOutline();

// Expand cursor on hover
document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px) scale(1.5)`;
        cursorOutline.style.width = '45px';
        cursorOutline.style.height = '45px';
    });
    el.addEventListener('mouseleave', () => {
        cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px) scale(1)`;
        cursorOutline.style.width = '30px';
        cursorOutline.style.height = '30px';
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Add scroll animation to skill cards and project cards
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

document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
});

// Tech tags interactive effect
document.querySelectorAll('.tech-tag').forEach(tag => {
    tag.addEventListener('click', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1) rotate(0deg)';
        }, 200);
    });
});

// Project card click ripple effect
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

// Add ripple animation
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


// ALERTING 
// Stage alert animation and close functionality
const stageAlert = document.getElementById('stageAlert');
const closeAlert = document.getElementById('closeAlert');

if (stageAlert && closeAlert) {
    closeAlert.addEventListener('click', () => {
        stageAlert.classList.add('hidden');
        
        setTimeout(() => {
            stageAlert.style.display = 'none';
        }, 400);
    });

    // Add shake animation on scroll (to draw attention)
    let lastScroll = 0;
    let shakeTimeout;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100 && currentScroll > lastScroll && !alertClosed) {
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

    // Add shake keyframe
    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            25% { transform: translateX(-50%) translateY(-5px); }
            75% { transform: translateX(-50%) translateY(5px); }
        }
        
        @media (max-width: 768px) {
            @keyframes shake {
                0%, 100% { transform: translateX(0) translateY(0); }
                25% { transform: translateX(0) translateY(-5px); }
                75% { transform: translateX(0) translateY(5px); }
            }
        }
    `;
    document.head.appendChild(shakeStyle);
}

// FIN ALERTING 