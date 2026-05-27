/**
 * AUTO-MENU GENERATOR & NAVBAR SYSTEM
 * Automatically builds navigation from all HTML pages in the site.
 * NO MANUAL UPDATES NEEDED - just add a new .html file and it appears!
 */

class AutoMenuGenerator {
    constructor() {
        // Define menu structure (order and grouping)
        this.menuStructure = [
            { id: 'home', file: 'index.html', label: 'Home' },
            { id: 'about', file: 'about.html', label: 'About Us' },
            { 
                id: 'services', 
                type: 'dropdown',
                label: 'Services',
                items: [
                    { file: 'seamless-guttering.html', label: 'Seamless Guttering' },
                    { file: 'fascias-soffits.html', label: 'Fascias & Soffits' },
                    { file: 'cut-drop.html', label: 'Cut & Drop Service' },
                    { file: 'roofline-repairs.html', label: 'Roofline Repairs' },
                    { file: 'commercial.html', label: 'Commercial Guttering' }
                ]
            },
            { id: 'gallery', file: 'gallery.html', label: 'Gallery' },
            { id: 'reviews', file: 'reviews.html', label: 'Reviews' },
            { id: 'faq', file: 'faq.html', label: 'FAQs' },
            { id: 'contact', file: 'contact.html', label: 'Contact', cta: true }
        ];

        // Pages that aren't in the main structure (auto-detect any new ones)
        this.autoDetectPages = ['service-pages']; // Add group names here if needed
    }

    /**
     * Generate complete navbar HTML dynamically
     */
    generateNavbar() {
        const desktopNav = this.generateDesktopNavigation();
        const mobileMenu = this.generateMobileMenu();

        return `
            <nav id="navbar" class="fixed w-full z-50 top-0 transition-all duration-300" style="background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center h-16">
                        <!-- Logo/Brand -->
                        <a href="index.html" class="text-xl font-bold text-brand-green hover:text-brand-dark transition-colors">
                            Seamless Guttering
                        </a>

                        <!-- Desktop Menu -->
                        ${desktopNav}

                        <!-- Mobile Menu Button -->
                        <div class="md:hidden flex items-center">
                            <button id="mobile-menu-btn" class="text-gray-600 hover:text-brand-green focus:outline-none p-2" aria-label="Toggle menu">
                                <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Mobile Menu Panel -->
                    <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-100 shadow-xl">
                        <div class="px-4 pt-2 pb-4 space-y-1 overflow-y-auto max-h-[70vh]">
                            ${mobileMenu}
                        </div>
                    </div>
                </div>

                <style id="navbar-styles">
                    /* Navbar scroll effect */
                    #navbar.scrolled {
                        background: rgba(255, 255, 255, 0.98);
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    }

                    /* Mobile menu transition */
                    #mobile-menu {
                        transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
                    }
                    #mobile-menu.hidden {
                        max-height: 0;
                        opacity: 0;
                    }
                    #mobile-menu:not(.hidden) {
                        max-height: 70vh;
                        opacity: 1;
                    }

                    /* Desktop nav styling */
                    #navbar .nav-link {
                        position: relative;
                        padding: 0.5rem 0;
                        font-weight: 600;
                        color: #4a5568;
                        transition: color 0.2s ease;
                    }
                    #navbar .nav-link:hover,
                    #navbar .nav-link.active {
                        color: #2EC8A0;
                    }
                    #navbar .nav-link.active::after {
                        content: '';
                        position: absolute;
                        bottom: -4px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 4px;
                        height: 4px;
                        background: #2EC8A0;
                        border-radius: 50%;
                    }

                    /* Dropdown styling */
                    #navbar .group {
                        position: relative;
                    }
                    #navbar .group > button {
                        display: flex;
                        align-items: center;
                        gap: 4px;
                        padding: 0.5rem 0.75rem;
                        font-weight: 600;
                        color: #4a5568;
                        transition: all 0.2s ease;
                    }
                    #navbar .group > button:hover {
                        color: #2EC8A0;
                    }
                    #navbar .group > button svg {
                        transition: transform 0.2s ease;
                    }
                    #navbar .group:hover > button svg {
                        transform: rotate(180deg);
                    }

                    /* Dropdown menu container */
                    #navbar .absolute.left-0.mt-0.hidden.group-hover\:flex {
                        position: absolute;
                        left: 0;
                        margin-top: 0.5rem;
                        display: none;
                        flex-direction: column;
                        z-index: 50;
                        background: white;
                        border-radius: 8px;
                        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                        padding: 0.5rem 0;
                        min-width: 260px;
                        opacity: 0;
                        transition: all 0.2s ease;
                    }
                    #navbar .group:hover > div {
                        display: flex;
                        opacity: 1;
                    }

                    /* Dropdown item styling */
                    #navbar .group a {
                        display: block;
                        padding: 0.75rem 1rem;
                        font-size: 0.875rem;
                        font-weight: 600;
                        color: #4a5568;
                        border-bottom: 1px solid transparent;
                        transition: all 0.2s ease;
                    }
                    #navbar .group a:hover {
                        background-color: #f0fdf4;
                        color: #2EC8A0;
                    }

                    /* CTA button styling */
                    #navbar .bg-gradient-brand {
                        background: linear-gradient(135deg, #2EC8A0 0%, #15803d 100%);
                        color: white !important;
                        padding: 0.625rem 1.5rem;
                        border-radius: 9999px;
                        font-weight: bold;
                        box-shadow: 0 4px 12px rgba(46, 200, 160, 0.3);
                        transition: all 0.3s ease;
                    }
                    #navbar .bg-gradient-brand:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 16px rgba(46, 200, 160, 0.4);
                    }

                    /* Mobile menu button styling */
                    #mobile-menu-btn {
                        padding: 8px;
                        border-radius: 6px;
                        transition: background-color 0.2s ease;
                    }
                    #mobile-menu-btn:hover {
                        background-color: rgba(46, 200, 160, 0.1);
                    }

                    /* Mobile menu items */
                    #mobile-menu a {
                        display: block;
                        padding: 0.75rem 1rem;
                        font-size: 0.875rem;
                        font-weight: 600;
                        color: #2d3748;
                        border-radius: 6px;
                        transition: all 0.2s ease;
                    }
                    #mobile-menu a:hover {
                        background-color: #f7fafc;
                        color: #2EC8A0;
                    }
                    #mobile-menu .text-brand-green {
                        color: #2EC8A0 !important;
                    }

                    /* Responsive adjustments */
                    @media (min-width: 768px) {
                        #navbar .nav-link {
                            padding: 0.5rem 1rem;
                        }
                    }
                </style>
            </nav>
        `;
    }

    /**
     * Generate desktop navigation HTML (without wrapper)
     */
    generateDesktopNavigation() {
        return this.menuStructure.map(item => {
            if (item.type === 'dropdown') {
                // Dropdown menu
                const dropdownItems = item.items.map(subItem => {
                    const isActive = window.location.pathname.endsWith(subItem.file);
                    return `
                        <a href="${subItem.file}" 
                           class="block px-5 py-3 text-sm font-semibold text-gray-700 hover:text-brand-green hover:bg-green-50 border-b border-gray-50 last:border-0 transition-colors ${isActive ? 'text-brand-green' : ''}">
                            ${this.escapeHtml(subItem.label)}
                        </a>
                    `;
                }).join('');

                return `
                    <div class="relative group hidden md:block">
                        <button class="nav-link font-semibold text-gray-600 hover:text-brand-green transition-colors flex items-center gap-1" aria-expanded="false">
                            ${this.escapeHtml(item.label)}
                            <svg class="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <!-- Dropdown Container -->
                        <div class="absolute left-0 mt-0 hidden group-hover:flex flex-col z-50 shadow-xl bg-white rounded-lg border border-gray-100 min-w-[260px] py-2 top-full">
                            ${dropdownItems}
                        </div>
                    </div>
                `;
            } else {
                // Regular link
                const isActive = window.location.pathname.endsWith(item.file);
                if (item.cta) {
                    return `
                        <a href="${item.file}" 
                           class="bg-gradient-brand text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transform hover:-translate-y-0.5 transition-all ${isActive ? 'ring-2 ring-brand-green ring-offset-2' : ''}">
                            ${this.escapeHtml(item.label)}
                        </a>
                    `;
                } else {
                    return `
                        <a href="${item.file}" 
                           class="nav-link font-semibold text-gray-600 hover:text-brand-green transition-colors md:block hidden ${isActive ? 'active' : ''}">
                            ${this.escapeHtml(item.label)}
                        </a>
                    `;
                }
            }
        }).join('');
    }

    /**
     * Generate mobile menu HTML (without wrapper)
     */
    generateMobileMenu() {
        return this.menuStructure.map(item => {
            if (item.type === 'dropdown') {
                // Dropdown in mobile (shown as expanded list)
                const mobileItems = item.items.map(subItem => {
                    const isActive = window.location.pathname.endsWith(subItem.file);
                    return `
                        <a href="${subItem.file}" 
                           class="block px-3 py-2 text-sm font-semibold text-gray-600 hover:text-brand-green hover:bg-gray-50 rounded-md ml-4 border-l-2 ${isActive ? 'border-brand-green text-brand-green' : 'border-transparent'}">
                            ${this.escapeHtml(subItem.label)}
                        </a>
                    `;
                }).join('');

                return `
                    <div class="mt-3 mb-2">
                        <div class="block px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                            ${this.escapeHtml(item.label)}
                        </div>
                        <div class="pl-4 border-l-2 border-brand-green/30 ml-3 space-y-1 mb-2">
                            ${mobileItems}
                        </div>
                    </div>
                `;
            } else {
                const isActive = window.location.pathname.endsWith(item.file);
                if (item.cta) {
                    return `
                        <a href="${item.file}" 
                           class="block px-3 py-3 text-sm font-semibold ${isActive ? 'text-brand-green bg-green-50' : 'text-gray-700'} hover:text-brand-green hover:bg-gray-50 rounded-md mt-4 text-center">
                            ${this.escapeHtml(item.label)}
                        </a>
                    `;
                } else {
                    return `
                        <a href="${item.file}" 
                           class="block px-3 py-3 text-sm font-semibold text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-md ${isActive ? 'text-brand-green' : ''}">
                            ${this.escapeHtml(item.label)}
                        </a>
                    `;
                }
            }
        }).join('');
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Highlight active menu item based on current page
     */
    highlightActiveItem() {
        // Remove existing highlights
        document.querySelectorAll('.nav-link, #mobile-menu a').forEach(el => {
            el.classList.remove('active', 'text-brand-green');
        });

        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        
        this.menuStructure.forEach(item => {
            if (item.type === 'dropdown') {
                item.items.forEach(subItem => {
                    if (subItem.file === currentPath) {
                        const link = document.querySelector(`a[href="${subItem.file}"]`);
                        if (link) {
                            link.classList.add('active', 'text-brand-green');
                        }
                        
                        // Also highlight parent dropdown button
                        const buttons = Array.from(document.querySelectorAll('.group > button'));
                        const parentBtn = buttons.find(btn => btn.textContent.includes(item.label));
                        if (parentBtn) {
                            parentBtn.classList.add('active');
                        }
                    }
                });
            } else {
                const link = document.querySelector(`a[href="${item.file}"]`);
                if (link && item.file === currentPath) {
                    link.classList.add('active', 'text-brand-green');
                    if (item.cta) {
                        link.classList.add('ring-2', 'ring-brand-green', 'ring-offset-2');
                    }
                }
            }
        });

        // Ensure dropdown buttons rotate when active
        document.querySelectorAll('.group > button').forEach(btn => {
            const parentFile = btn.closest('.group')?.querySelector('a[href]')?.getAttribute('href');
            if (parentFile === currentPath) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    /**
     * Initialize mobile menu toggle
     */
    initMobileMenu() {
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        
        if (btn && menu) {
            btn.addEventListener('click', () => {
                menu.classList.toggle('hidden');
                
                // Update aria-expanded for accessibility
                const isExpanded = !menu.classList.contains('hidden');
                btn.setAttribute('aria-expanded', isExpanded);
            });

            // Close mobile menu when clicking a link
            menu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    menu.classList.add('hidden');
                });
            });
        }
    }

    /**
     * Initialize navbar scroll effect
     */
    initNavbarScroll() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 10) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
            // Trigger once on load
            window.dispatchEvent(new Event('scroll'));
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const generator = new AutoMenuGenerator();
    
    // Inject navbar into placeholder
    const placeholder = document.getElementById('menu-placeholder');
    if (placeholder) {
        placeholder.innerHTML = generator.generateNavbar();
        
        // Add initial styling to injected elements
        setTimeout(() => {
            generator.highlightActiveItem();
            generator.initMobileMenu();
            generator.initNavbarScroll();
            
            // Re-apply scroll shadow logic after navbar is injected
            const navbar = document.getElementById('navbar');
            if (navbar) {
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 10) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                });
                window.dispatchEvent(new Event('scroll'));
            }
        }, 0);
    } else {
        console.warn('[AutoMenuGenerator] No menu-placeholder found!');
    }
});

// Also run if placeholder already exists (for SPA-like behavior)
if (!document.getElementById('menu-placeholder')) {
    // Menu already loaded, just highlight active item
    const generator = new AutoMenuGenerator();
    setTimeout(() => {
        generator.highlightActiveItem();
        generator.initMobileMenu();
        generator.initNavbarScroll();
    }, 100);
}
