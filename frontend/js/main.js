class OnlineKitobApp {
    constructor() {
        this.currentView = 'home';
        this.books = [];
        this.categories = [];
        this.cart = new ShoppingCart();
        this.searchFilter = new SearchFilter();
        this.init();
    }

    async init() {
        await this.loadInitialData();
        this.setupEventListeners();
        this.setupNavigation();
        this.loadView('home');
    }

    async loadInitialData() {
        try {
            [this.books, this.categories] = await Promise.all([
                BookAPI.getBooks(),
                BookAPI.getCategories()
            ]);
            
            this.searchFilter.setBooks(this.books);
        } catch (error) {
            console.error('Dastlabki ma\'lumotlarni yuklashda xato:', error);
        }
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Search functionality
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchFilter.searchBooks(e.target.value);
            });
        }
    }

    setupNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const view = e.target.getAttribute('href').substring(1);
                
                // Update active state
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
                
                // Close mobile menu
                document.querySelector('.nav-menu').classList.remove('active');
                
                this.loadView(view);
            });
        });
    }

    async loadView(viewName) {
        this.currentView = viewName;
        const app = document.getElementById('app');
        
        // Loading state
        app.innerHTML = '<div class="loading">Yuklanmoqda...</div>';

        switch(viewName) {
            case 'home':
                await this.renderHome();
                break;
            case 'books':
                await this.renderBooks();
                break;
            case 'categories':
                await this.renderCategories();
                break;
            case 'cart':
                this.renderCart();
                break;
            case 'profile':
                this.renderProfile();
                break;
            default:
                await this.renderHome();
        }

        // Add fade-in animation
        app.classList.add('fade-in');
        setTimeout(() => app.classList.remove('fade-in'), 600);
    }

    async renderHome() {
        const app = document.getElementById('app');
        const featuredBooks = this.books.slice(0, 6); // First 6 books as featured
        
        app.innerHTML = `
            <div class="container">
                <section class="hero-section">
                    <h1>Kitoblar Olamiga Xush Kelibsiz</h1>
                    <p>Eng sara kitoblar to'plami. O'zingizga yoqadigan kitobni toping va sotib oling</p>
                    <button class="cta-button" onclick="app.loadView('books')">
                        Kitoblar Ko'rish
                    </button>
                </section>

                <section class="featured-books">
                    <h2>Tavsiya Etilgan Kitoblar</h2>
                    <div class="books-grid">
                        ${featuredBooks.map(book => this.renderBookCard(book)).join('')}
                    </div>
                </section>

                <section class="stats-section">
                    <div class="stats-grid">
                        <div class="stat-card">
                            <i class="fas fa-book"></i>
                            <h3>${this.books.length}+</h3>
                            <p>Kitoblar</p>
                        </div>
                        <div class="stat-card">
                            <i class="fas fa-list"></i>
                            <h3>${this.categories.length}+</h3>
                            <p>Kategoriyalar</p>
                        </div>
                        <div class="stat-card">
                            <i class="fas fa-users"></i>
                            <h3>1000+</h3>
                            <p>Mijozlar</p>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    async renderBooks() {
        const app = document.getElementById('app');
        
        app.innerHTML = `
            <div class="container">
                <div class="filters-section">
                    <div class="filter-group">
                        <select id="category-filter" class="filter-select">
                            <option value="">Barcha Kategoriyalar</option>
                            ${this.categories.map(cat => 
                                `<option value="${cat.id}">${cat.name}</option>`
                            ).join('')}
                        </select>
                        
                        <select id="price-filter" class="filter-select">
                            <option value="">Barcha Narxlar</option>
                            <option value="0-50000">50,000 so'm gacha</option>
                            <option value="50000-100000">50,000 - 100,000</option>
                            <option value="100000+">100,000+ so'm</option>
                        </select>
                        
                        <select id="sort-filter" class="filter-select">
                            <option value="">Saralash</option>
                            <option value="price_asc">Narx (Past → Yuqori)</option>
                            <option value="price_desc">Narx (Yuqori → Past)</option>
                            <option value="title_asc">Nomi (A-Z)</option>
                        </select>
                    </div>
                </div>

                <h2>Barcha Kitoblar</h2>
                <div id="books-container" class="books-grid">
                    ${this.books.map(book => this.renderBookCard(book)).join('')}
                </div>
            </div>
        `;

        // Setup filter event listeners
        this.setupFilters();
    }

    renderBookCard(book) {
        return `
            <div class="book-card" data-book-id="${book.id}">
                <div class="book-image">
                    <i class="fas fa-book fa-3x"></i>
                </div>
                <div class="book-title">${book.title}</div>
                <div class="book-author">${book.author || 'Noma\'lum muallif'}</div>
                <div class="book-price">${book.price ? book.price.toLocaleString() + ' so\'m' : 'Bepul'}</div>
                <div class="book-actions">
                    <button class="btn btn-primary" onclick="app.cart.addItem(${book.id})">
                        Savatga
                    </button>
                    <button class="btn btn-secondary" onclick="app.viewBookDetail(${book.id})">
                        Batafsil
                    </button>
                </div>
            </div>
        `;
    }

    setupFilters() {
        const categoryFilter = document.getElementById('category-filter');
        const priceFilter = document.getElementById('price-filter');
        const sortFilter = document.getElementById('sort-filter');

        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.searchFilter.filterByCategory(e.target.value);
            });
        }

        if (priceFilter) {
            priceFilter.addEventListener('change', (e) => {
                this.searchFilter.filterByPrice(e.target.value);
            });
        }

        if (sortFilter) {
            sortFilter.addEventListener('change', (e) => {
                this.searchFilter.sortBooks(e.target.value);
            });
        }
    }

    async viewBookDetail(bookId) {
        const book = await BookAPI.getBookDetail(bookId);
        if (book) {
            // Book detail modal yoki yangi sahifa render qilish
            this.renderBookDetail(book);
        }
    }

    renderBookDetail(book) {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="container">
                <button class="btn btn-secondary" onclick="app.loadView('books')">
                    <i class="fas fa-arrow-left"></i> Orqaga
                </button>
                
                <div class="book-detail">
                    <div class="book-detail-image">
                        <i class="fas fa-book-open fa-5x"></i>
                    </div>
                    <div class="book-detail-info">
                        <h1>${book.title}</h1>
                        <p class="book-author">${book.author || 'Noma\'lum muallif'}</p>
                        <p class="book-description">${book.description || 'Tavsif mavjud emas'}</p>
                        <div class="book-price">${book.price ? book.price.toLocaleString() + ' so\'m' : 'Bepul'}</div>
                        <button class="cta-button" onclick="app.cart.addItem(${book.id})">
                            Savatga Qo'shish
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    async renderCategories() {
        const app = document.getElementById('app');
        
        app.innerHTML = `
            <div class="container">
                <h2>Kitob Kategoriyalari</h2>
                <div class="categories-grid">
                    ${this.categories.map(category => `
                        <div class="category-card">
                            <i class="fas fa-folder fa-2x"></i>
                            <h3>${category.name}</h3>
                            <p>${category.books_count || 0} ta kitob</p>
                            <button class="btn btn-primary" onclick="app.filterByCategory(${category.id})">
                                Ko'rish
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderCart() {
        const app = document.getElementById('app');
        const cartItems = this.cart.getItems();
        
        app.innerHTML = `
            <div class="container">
                <h2>Shopping Cart</h2>
                ${cartItems.length === 0 ? `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-cart fa-3x"></i>
                        <h3>Savat Bo'sh</h3>
                        <p>Kitob qo'shish uchun kitoblar bo'limiga o'ting</p>
                        <button class="cta-button" onclick="app.loadView('books')">
                            Kitoblar Sahifasi
                        </button>
                    </div>
                ` : `
                    <div class="cart-items">
                        ${cartItems.map(item => `
                            <div class="cart-item">
                                <div class="item-info">
                                    <h4>${item.title}</h4>
                                    <p>${item.price.toLocaleString()} so'm</p>
                                </div>
                                <div class="item-quantity">
                                    <button onclick="app.cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                                    <span>${item.quantity}</span>
                                    <button onclick="app.cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                                </div>
                                <div class="item-total">
                                    ${(item.price * item.quantity).toLocaleString()} so'm
                                </div>
                                <button class="btn btn-secondary" onclick="app.cart.removeItem(${item.id})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <div class="cart-total">
                        <h3>Jami: ${this.cart.getTotal().toLocaleString()} so'm</h3>
                        <button class="cta-button" onclick="app.checkout()">
                            Buyurtma Berish
                        </button>
                    </div>
                `}
            </div>
        `;
    }

    renderProfile() {
        const app = document.getElementById('app');
        
        app.innerHTML = `
            <div class="container">
                <div class="profile-section">
                    <h2>Foydalanuvchi Profili</h2>
                    <div class="profile-card">
                        <div class="profile-avatar">
                            <i class="fas fa-user fa-3x"></i>
                        </div>
                        <div class="profile-info">
                            <h3>Mehmon Foydalanuvchi</h3>
                            <p>Hisobingizga kirish uchun iltimos, tizimga kiring</p>
                            <button class="cta-button">Tizimga Kirish</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async checkout() {
        const orderData = {
            items: this.cart.getItems(),
            total: this.cart.getTotal()
        };
        
        const order = await BookAPI.createOrder(orderData);
        if (order) {
            alert(`Buyurtmangiz qabul qilindi! Buyurtma raqami: ${order.id}`);
            this.cart.clear();
            this.loadView('home');
        }
    }
}

// Initialize the application
const app = new OnlineKitobApp();