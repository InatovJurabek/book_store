import Helpers from '../utils/helpers.js';

class SearchFilter {
    constructor() {
        this.searchInput = document.querySelector('.search-input');
        this.filterSelects = document.querySelectorAll('.filter-select');
        this.booksGrid = document.getElementById('books-grid');
        this.books = [];
        this.init();
    }

    async init() {
        await this.loadBooks();
        this.setupEventListeners();
        this.renderBooks(this.books);
    }

    async loadBooks() {
        // In a real app, this would be an API call
        this.books = [
            {
                id: 1,
                title: "The Midnight Library",
                author: "Matt Haig",
                price: 24.99,
                category: "fiction",
                coverColor: "linear-gradient(45deg, #6C63FF, #8B85FF)",
                rating: 4.5
            },
            {
                id: 2,
                title: "Atomic Habits",
                author: "James Clear",
                price: 27.99,
                category: "self-help",
                coverColor: "linear-gradient(45deg, #FFC300, #FFD54F)",
                rating: 4.8
            },
            {
                id: 3,
                title: "The Alchemist",
                author: "Paulo Coelho",
                price: 19.99,
                category: "fiction",
                coverColor: "linear-gradient(45deg, #FF6B6B, #FF8E8E)",
                rating: 4.7
            },
            {
                id: 4,
                title: "Dune",
                author: "Frank Herbert",
                price: 29.99,
                category: "sci-fi",
                coverColor: "linear-gradient(45deg, #4ECDC4, #88D9D3)",
                rating: 4.6
            },
            {
                id: 5,
                title: "Project Hail Mary",
                author: "Andy Weir",
                price: 26.99,
                category: "sci-fi",
                coverColor: "linear-gradient(45deg, #FF8E53, #FFA477)",
                rating: 4.9
            },
            {
                id: 6,
                title: "The Silent Patient",
                author: "Alex Michaelides",
                price: 22.99,
                category: "mystery",
                coverColor: "linear-gradient(45deg, #9B59B6, #BD69DE)",
                rating: 4.4
            },
            {
                id: 7,
                title: "Educated",
                author: "Tara Westover",
                price: 21.99,
                category: "memoir",
                coverColor: "linear-gradient(45deg, #3498DB, #5DADE2)",
                rating: 4.7
            },
            {
                id: 8,
                title: "Where the Crawdads Sing",
                author: "Delia Owens",
                price: 25.99,
                category: "fiction",
                coverColor: "linear-gradient(45deg, #E74C3C, #EC7063)",
                rating: 4.8
            }
        ];
    }

    setupEventListeners() {
        // Search input with debounce
        if (this.searchInput) {
            this.searchInput.addEventListener('input', 
                Helpers.debounce(() => this.handleSearch(), 300)
            );
        }

        // Filter selects
        this.filterSelects.forEach(select => {
            select.addEventListener('change', () => this.handleFilter());
        });
    }

    handleSearch() {
        const searchTerm = this.searchInput.value.toLowerCase().trim();
        this.applyFilters(searchTerm);
    }

    handleFilter() {
        this.applyFilters();
    }

    applyFilters(searchTerm = '') {
        let filteredBooks = [...this.books];

        // Apply search filter
        if (searchTerm) {
            filteredBooks = filteredBooks.filter(book =>
                book.title.toLowerCase().includes(searchTerm) ||
                book.author.toLowerCase().includes(searchTerm)
            );
        }

        // Apply category filter
        const categoryFilter = document.querySelector('[data-filter="category"]');
        if (categoryFilter && categoryFilter.value) {
            filteredBooks = filteredBooks.filter(book => 
                book.category === categoryFilter.value
            );
        }

        // Apply price filter
        const priceFilter = document.querySelector('[data-filter="price"]');
        if (priceFilter && priceFilter.value) {
            filteredBooks = this.filterByPrice(filteredBooks, priceFilter.value);
        }

        this.renderBooks(filteredBooks);
    }

    filterByPrice(books, priceRange) {
        switch (priceRange) {
            case 'under-20':
                return books.filter(book => book.price < 20);
            case '20-30':
                return books.filter(book => book.price >= 20 && book.price <= 30);
            case 'over-30':
                return books.filter(book => book.price > 30);
            default:
                return books;
        }
    }

    renderBooks(books) {
        if (!this.booksGrid) return;

        this.booksGrid.innerHTML = '';

        if (books.length === 0) {
            this.booksGrid.innerHTML = `
                <div class="no-results">
                    <h3>No books found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            `;
            return;
        }

        books.forEach((book, index) => {
            const bookCard = this.createBookCard(book, index);
            this.booksGrid.appendChild(bookCard);
        });
    }

    createBookCard(book, index) {
        const card = document.createElement('div');
        card.className = 'book-card fade-in';
        card.style.animationDelay = `${index * 100}ms`;
        card.innerHTML = `
            <div class="book-cover" style="background: ${book.coverColor}">
                <div class="book-placeholder"></div>
            </div>
            <h3 class="book-title">${Helpers.truncateText(book.title, 40)}</h3>
            <p class="book-author">by ${book.author}</p>
            <div class="book-meta">
                <span class="book-category">${book.category}</span>
                <span class="book-rating">⭐ ${book.rating}</span>
            </div>
            <div class="book-price">
                <span class="price">${Helpers.formatPrice(book.price)}</span>
                <button class="add-to-cart" data-book-id="${book.id}">
                    Add to Cart
                </button>
            </div>
        `;

        // Add event listeners
        const addToCartBtn = card.querySelector('.add-to-cart');
        addToCartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.handleAddToCart(book);
        });

        card.addEventListener('click', () => {
            this.viewBookDetails(book);
        });

        return card;
    }

    handleAddToCart(book) {
        const event = new CustomEvent('bookAddedToCart', {
            detail: { book }
        });
        document.dispatchEvent(event);
    }

    viewBookDetails(book) {
        // Navigate to book details page
        console.log('Viewing details for:', book.title);
    }
}

export default SearchFilter;