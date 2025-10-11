class SearchFilter {
    constructor() {
        this.books = [];
        this.filteredBooks = [];
        this.currentFilters = {
            category: '',
            price: '',
            sort: ''
        };
    }

    setBooks(books) {
        this.books = books;
        this.filteredBooks = [...books];
    }

    searchBooks(query) {
        if (!query.trim()) {
            this.filteredBooks = [...this.books];
        } else {
            this.filteredBooks = this.books.filter(book =>
                book.title.toLowerCase().includes(query.toLowerCase()) ||
                book.author?.toLowerCase().includes(query.toLowerCase()) ||
                book.description?.toLowerCase().includes(query.toLowerCase())
            );
        }
        this.applyAllFilters();
    }

    filterByCategory(categoryId) {
        this.currentFilters.category = categoryId;
        this.applyAllFilters();
    }

    filterByPrice(priceRange) {
        this.currentFilters.price = priceRange;
        this.applyAllFilters();
    }

    sortBooks(sortType) {
        this.currentFilters.sort = sortType;
        this.applyAllFilters();
    }

    applyAllFilters() {
        let filtered = [...this.books];

        // Category filter
        if (this.currentFilters.category) {
            filtered = filtered.filter(book => 
                book.category == this.currentFilters.category
            );
        }

        // Price filter
        if (this.currentFilters.price) {
            switch(this.currentFilters.price) {
                case '0-50000':
                    filtered = filtered.filter(book => book.price <= 50000);
                    break;
                case '50000-100000':
                    filtered = filtered.filter(book => book.price > 50000 && book.price <= 100000);
                    break;
                case '100000+':
                    filtered = filtered.filter(book => book.price > 100000);
                    break;
            }
        }

        // Sorting
        if (this.currentFilters.sort) {
            switch(this.currentFilters.sort) {
                case 'price_asc':
                    filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
                    break;
                case 'price_desc':
                    filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
                    break;
                case 'title_asc':
                    filtered.sort((a, b) => a.title.localeCompare(b.title));
                    break;
            }
        }

        this.filteredBooks = filtered;
        this.renderResults();
    }

    renderResults() {
        const booksContainer = document.getElementById('books-container');
        if (!booksContainer) return;

        if (this.filteredBooks.length === 0) {
            booksContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search fa-3x"></i>
                    <h3>Hech narsa topilmadi</h3>
                    <p>Boshqa so'zlar bilan qaytadan urinib ko'ring</p>
                </div>
            `;
            return;
        }

        booksContainer.innerHTML = this.filteredBooks.map(book => `
            <div class="book-card" data-book-id="${book.id}">
                <div class="book-image">
                    <i class="fas fa-book fa-3x"></i>
                </div>
                <div class="book-title">${book.title}</div>
                <div class="book-author">${book.author || 'Noma\'lum muallif'}</div>
                <div class="book-price">${book.price ? book.price.toLocaleString() + ' so\'m' : 'Bepul'}</div>
                <div class="book-actions">
                    <button class="btn btn-primary" onclick="app.cart.addItem(${book.id})">
                        <i class="fas fa-cart-plus"></i> Savatga
                    </button>
                    <button class="btn btn-secondary" onclick="app.viewBookDetail(${book.id})">
                        <i class="fas fa-info-circle"></i> Batafsil
                    </button>
                </div>
            </div>
        `).join('');
    }

    getFilteredBooks() {
        return this.filteredBooks;
    }
}