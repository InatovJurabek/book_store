import Helpers from '../utils/helpers.js';

class BookCard {
    constructor(book) {
        this.book = book;
        this.element = null;
    }

    create() {
        const card = document.createElement('div');
        card.className = 'book-card fade-in';
        card.innerHTML = this.getTemplate();
        this.element = card;
        
        this.setupEventListeners();
        return card;
    }

    getTemplate() {
        return `
            <div class="book-cover" style="background: ${this.book.coverColor}">
                <div class="book-placeholder"></div>
            </div>
            <h3 class="book-title">${Helpers.truncateText(this.book.title, 40)}</h3>
            <p class="book-author">by ${this.book.author}</p>
            <div class="book-price">
                <span class="price">${Helpers.formatPrice(this.book.price)}</span>
                <button class="add-to-cart" data-book-id="${this.book.id}">
                    Add to Cart
                </button>
            </div>
        `;
    }

    setupEventListeners() {
        const addToCartBtn = this.element.querySelector('.add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.addToCart();
            });
        }

        this.element.addEventListener('click', () => {
            this.viewDetails();
        });
    }

    addToCart() {
        // Animation for add to cart
        const btn = this.element.querySelector('.add-to-cart');
        btn.textContent = 'Added!';
        btn.style.background = '#4CAF50';
        
        setTimeout(() => {
            btn.textContent = 'Add to Cart';
            btn.style.background = '';
        }, 2000);

        // Dispatch custom event
        const event = new CustomEvent('bookAddedToCart', {
            detail: { book: this.book }
        });
        document.dispatchEvent(event);
    }

    viewDetails() {
        // Navigate to book details page
        console.log('Viewing details for:', this.book.title);
        // In a real app, this would navigate to the book detail page
    }
}

export default BookCard;