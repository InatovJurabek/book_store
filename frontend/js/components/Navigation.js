class Navigation {
    constructor() {
        this.isMobileMenuOpen = false;
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupActiveLinks();
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (mobileMenuBtn && navMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });

            // Mobile menudagi linklar bosilganda menuni yopish
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (this.isMobileMenuOpen) {
                        this.toggleMobileMenu();
                    }
                });
            });

            // Tashqariga bosilganda menuni yopish
            document.addEventListener('click', (e) => {
                if (this.isMobileMenuOpen && 
                    !navMenu.contains(e.target) && 
                    !mobileMenuBtn.contains(e.target)) {
                    this.toggleMobileMenu();
                }
            });
        }
    }

    toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn i');
        
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        
        if (navMenu) {
            navMenu.classList.toggle('active');
        }
        
        if (mobileMenuBtn) {
            mobileMenuBtn.className = this.isMobileMenuOpen ? 
                'fas fa-times' : 'fas fa-bars';
        }
    }

    setupScrollEffects() {
        let lastScrollTop = 0;
        const navbar = document.querySelector('.navbar');

        if (navbar) {
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    // Pastga scroll qilganda navbar ni yashirish
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    // Yuqoriga scroll qilganda navbar ni ko'rsatish
                    navbar.style.transform = 'translateY(0)';
                }
                
                // Background opacity ni o'zgartirish
                if (scrollTop > 50) {
                    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                    navbar.style.backdropFilter = 'blur(10px)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                    navbar.style.backdropFilter = 'blur(10px)';
                }
                
                lastScrollTop = scrollTop;
            }, { passive: true });
        }
    }

    setupActiveLinks() {
        // URL bo'yicha active linklarni belgilash
        const currentHash = window.location.hash.substring(1) || 'home';
        this.setActiveLink(currentHash);

        // Hash o'zgarganda active linkni yangilash
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1) || 'home';
            this.setActiveLink(hash);
        });
    }

    setActiveLink(viewName) {
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
            const linkView = link.getAttribute('href').substring(1);
            if (linkView === viewName) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    updateCartCount(count) {
        const cartCounts = document.querySelectorAll('.cart-count');
        cartCounts.forEach(element => {
            element.textContent = count;
        });
    }
}