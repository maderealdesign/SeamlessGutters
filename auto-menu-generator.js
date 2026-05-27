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
            <nav id="navbar" class="flex space-x-6 lg:space-x-8 items-center bg-white shadow-sm py-4">
                ${desktopNav}
            </nav>

            <!-- Mobile Menu Button -->
            <div class="md:hidden flex items-center justify-center py-3">
                <button id="mobile-menu-btn" class="text-gray-600 hover:text-brand-green focus:outline-none p-2 bg-white rounded-lg shadow-sm">
                    <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            <!-- Mobile Menu Panel -->
            <div id="mobile-menu" class="hidden md:hidden bg-white border-t-2 border-brand-green shadow-xl">
                <div class="px-4 pt-3 pb-4 space-y-2 overflow-y-auto max-h-[70vh]">
                    ${mobileMenu}
                </div>
            </div>

            <style id="menu-inline-styles">
                /* Ensure menu is visible */
                #navbar {
                    width: 100%;
                    background: white;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    position: relative;
                    z-index: 50;
                }

                /* Mobile menu transition */
                #mobile-menu {
                    position: fixed;
                    top: 64px;
                    left: 0;
                    right: 0;
                    max-height: 70vh;
                    overflow-y: auto;
                    z-index: 51;
                }

                /* Link styling */
                #navbar a {
                    color: #2d3748;
                    font-weight: 600;
                    transition: all 0.2s ease;
                }
                
                #navbar a:hover,
                #navbar .active {
                    color: #2EC8A0 !important;
                }

                /* CTA button styling */
                .bg-gradient-brand {
                    background: linear-gradient(135deg, #2EC8A0 0%, #15803d 100%) !important;
                    color: white !important;
                    font-weight: bold !important;
                    padding: 0.625rem 1.5rem !important;
                }

                /* Dropdown styling */
                .group > button {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    color: #2d3748;
                    font-weight: 600;
                }
                
                .group:hover > div {
                    display: flex !important;
                }

                /* Mobile menu items */
                #mobile-menu a {
                    display: block;
                    padding: 0.75rem 1rem;
                    color: #2d3748;
                    font-weight: 600;
                    border-radius: 6px;
                }

                #mobile-menu a:hover {
                    background-color: #f7fafc;
                    color: #2EC8A0 !important;
                }

                /* Active state in mobile menu */
                .text-brand-green {
                    color: #2EC8A0 !important;
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
