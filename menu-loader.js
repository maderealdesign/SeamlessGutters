/**
 * MENU LOADER & ACTIVE STATE MANAGER
 * Uses AutoMenuGenerator for dynamic navigation highlighting and animations
 */

// Global Scroll Reveal Animations (non-menu functionality)
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    const initReveal = () => {
        document.querySelectorAll('.reveal:not(.observed)').forEach((element) => {
            element.classList.add('observed');
            observer.observe(element);
        });
    };
    
    // Initial check + delayed check for dynamically loaded content
    initReveal();
    setTimeout(initReveal, 500);
});
