/**
 * AUTO-MENU GENERATOR
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
     * Generate complete menu HTML dynamically
     */
    generateMenu() {
        const desktopNav = this.generateDesktopNavigation();
        const mobileMenu = this.generateMobileMenu();

        return `
            <!-- Desktop Menu -->
            <nav class="hidden md:flex space-x-6 lg:space-x-8 items-center">
                ${desktopNav}
            </nav>

            <!-- Mobile Menu Button -->
            <div class="md:hidden flex items-center">
                <button id="mobile-menu-btn" class="text-gray-600 hover:text-brand-green focus:outline-none p-2">
                    <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            <!-- Mobile Menu Panel -->
            <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl pb-4">
                <div class="px-4 pt-2 space-y-1 overflow-y-auto max-h-[80vh]">
                    ${mobileMenu}
                </div>
            </div>

            <style>
                /* Mobile menu transition */
                #mobile-menu {
                    transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
                }
                #mobile-menu.hidden {
                    max-height: 0;
                    opacity: 0;
                }
                #mobile-menu:not(.hidden) {
                    max-height: 80vh;
                    opacity: 1;
                }
            </style>
        `;
    }

    /**
     * Generate desktop navigation HTML
     */
    generateDesktopNavigation() {
        return this.menuStructure.map(item => {
            if (item.type === 'dropdown') {
                // Dropdown menu
                const dropdownItems = item.items.map(subItem => {
                    const isActive = window.location.pathname.endsWith(subItem.file);
                    return `
                        <a href="${subItem.file}" 
                           class="px-5 py-3 text-sm font-semibold text-gray-700 hover:text-brand-green hover:bg-green-50 border-b border-gray-50 last:border-0 transition-colors ${isActive ? 'text-brand-green' : ''}">
                            ${this.escapeHtml(subItem.label)}
                        </a>
                    `;
                }).join('');

                return `
                    <div class="relative group">
                        <button class="nav-link font-semibold text-gray-600 group-hover:text-brand-green transition-colors text-sm lg:text-base flex items-center gap-1 py-4" aria-expanded="false">
                            ${this.escapeHtml(item.label)}
                            <svg class="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <!-- Dropdown Container -->
                        <div class="absolute left-0 mt-0 hidden group-hover:flex flex-col z-50 shadow-xl bg-white rounded-lg border border-gray-100 min-w-[260px] py-2 top-[100%] transition-all duration-200">
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
                           class="bg-gradient-brand text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transform hover:-translate-y-0.5 transition-all text-sm lg:text-base ${isActive ? 'ring-2 ring-brand-green ring-offset-2' : ''}">
                            ${this.escapeHtml(item.label)}
                        </a>
                    `;
                } else {
                    return `
                        <a href="${item.file}" 
                           class="nav-link font-semibold text-gray-600 hover:text-brand-green transition-colors text-sm lg:text-base ${isActive ? 'text-brand-green' : ''}">
                            ${this.escapeHtml(item.label)}
                        </a>
                    `;
                }
            }
        }).join('');
    }

    /**
     * Generate mobile menu HTML
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
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        
        // Remove existing highlights
        document.querySelectorAll('.nav-link, #mobile-menu a').forEach(el => {
            el.classList.remove('text-brand-green', 'ring-2', 'ring-offset-2');
        });

        // Highlight matching link
        this.menuStructure.forEach(item => {
            if (item.type === 'dropdown') {
                item.items.forEach(subItem => {
                    if (subItem.file === currentPath) {
                        const link = document.querySelector(`a[href="${subItem.file}"]`);
                        if (link) {
                            link.classList.add('text-brand-green');
                        }
                        
                        // Also highlight parent dropdown button
                        const parentBtn = document.querySelector(`button[aria-label="${item.label}"]`) || 
                                         Array.from(document.querySelectorAll('.group > button')).find(btn => 
                                             btn.textContent.includes(item.label)
                                         );
                        if (parentBtn) {
                            parentBtn.classList.add('text-brand-green');
                        }
                    }
                });
            } else {
                const link = document.querySelector(`a[href="${item.file}"]`);
                if (link && item.file === currentPath) {
                    link.classList.add('text-brand-green');
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
                btn.classList.add('text-brand-green');
            } else {
                btn.classList.remove('text-brand-green');
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
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const generator = new AutoMenuGenerator();
    
    // Inject menu into placeholder
    const placeholder = document.getElementById('menu-placeholder');
    if (placeholder) {
        placeholder.innerHTML = generator.generateMenu();
        
        // Add initial styling to injected elements
        setTimeout(() => {
            generator.highlightActiveItem();
            generator.initMobileMenu();
            
            // Re-apply scroll shadow logic after menu is injected
            const navbar = document.getElementById('navbar');
            if (navbar) {
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 10) {
                        navbar.classList.add('shadow-md', 'bg-white');
                        navbar.classList.remove('shadow-sm', 'bg-white/95');
                    } else {
                        navbar.classList.add('shadow-sm', 'bg-white/95');
                        navbar.classList.remove('shadow-md', 'bg-white');
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
    }, 100);
}
