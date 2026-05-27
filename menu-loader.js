
document.addEventListener('DOMContentLoaded', () =&gt; {
    // 1. Fetch the decoupled menu
    fetch('menu.html')
        .then(response =&gt; response.text())
        .then(data =&gt; {
            const placeholder = document.getElementById('menu-placeholder');
            if (placeholder) {
                placeholder.innerHTML = data;
            }
            
            // Highlight active link intelligently
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';
            const navLinks = document.querySelectorAll('.nav-link, #mobile-menu a');
            navLinks.forEach(link =&gt; {
                const href = link.getAttribute('href');
                if (href === currentPath) {
                    link.classList.add('text-brand-green');
                    link.classList.remove('text-gray-600', 'text-gray-700');
                    
                    // If it's a dropdown item, also highlight parent "Services" tab
                    if(link.closest('.absolute')) {
                        const parentBtn = link.closest('.group').querySelector('button');
                        if(parentBtn) {
                            parentBtn.classList.add('text-brand-green');
                            parentBtn.classList.remove('text-gray-600');
                        }
                    }
                }
            });

            // Re-bind Mobile menu toggle
            const btn = document.getElementById('mobile-menu-btn');
            const menu = document.getElementById('mobile-menu');
            if (btn &amp;&amp; menu) {
                btn.addEventListener('click', () =&gt; {
                    menu.classList.toggle('hidden');
                });
            }

            // Navbar shadow transition on scroll
            const navbar = document.getElementById('navbar');
            if (navbar) {
                window.addEventListener('scroll', () =&gt; {
                    if (window.scrollY &gt; 10) {
                        navbar.classList.add('shadow-md', 'bg-white');
                        navbar.classList.remove('shadow-sm', 'bg-white/95');
                    } else {
                        navbar.classList.add('shadow-sm', 'bg-white/95');
                        navbar.classList.remove('shadow-md', 'bg-white');
                    }
                });
                window.dispatchEvent(new Event('scroll')); // Trigger initial check
            }
        })
        .catch(error =&gt; console.error('Error loading menu:', error));

    // 2. Global Scroll Reveal Animations (Moved here so it applies to ALL pages)
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries) =&gt; {
        entries.forEach((entry) =&gt; {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    // Initial check + delayed check for dynamically loaded components
    const initReveal = () =&gt; {
        document.querySelectorAll('.reveal:not(.observed)').forEach((element) =&gt; {
            element.classList.add('observed');
            observer.observe(element);
        });
    };
    
    initReveal();
    setTimeout(initReveal, 500); 
});
    