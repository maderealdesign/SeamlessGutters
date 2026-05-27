/**
 * MENU LOADER & ACTIVE STATE MANAGER
 * Uses AutoMenuGenerator for dynamic menu rendering
 */

document.addEventListener('DOMContentLoaded', () => {
    // Import the auto-menu generator (loaded as separate file)
    
    // Run after DOM is ready and menu is injected
    setTimeout(() => {
        const generator = new AutoMenuGenerator();
        
        // Re-highlight active items (in case they weren't set correctly on initial load)
        generator.highlightActiveItem();
        
        // Re-initialize mobile menu toggle
        generator.initMobileMenu();
    }, 100);

    // Global Scroll Reveal Animations
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
