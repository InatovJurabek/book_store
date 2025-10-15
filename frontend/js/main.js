import Navigation from './components/Navigation.js';
import BookCard from './components/BookCard.js';
import BookAPI from './utils/api.js';
import { ScrollAnimations, FloatingAnimation } from './utils/animation.js';

class BookStoreApp {
    constructor() {
        this.navigation = null;
        this.scrollAnimations = null;
        this.floatingAnimation = null;
        this.init();
    }

    async init() {
        // Initialize components
        this.navigation = new Navigation();
        this.scrollAnimations = new ScrollAnimations();
        this.floatingAnimation = new FloatingAnimation();

        // Load featured books
        await this.loadFeaturedBooks();

        // Setup event listeners
        this.setupEventListeners();
    }

    async loadFeaturedBooks() {
        try {
            const books = await BookAPI.getFeaturedBooks();
            this.renderBooks(books);
        } catch (error) {
            console.error('Error loading featured books:', error);
        }
    }

    renderBooks(books) {
        const booksGrid = document.getElementById('books-grid');
        if (!booksGrid) return;

        booksGrid.innerHTML = '';
        
        books.forEach((book, index) => {
            const bookCard = new BookCard(book);
            const cardElement = bookCard.create();
            
            // Add staggered animation delay
            cardElement.style.setProperty('--delay', `${index * 100}ms`);
            cardElement.dataset.delay = index * 100;
            
            booksGrid.appendChild(cardElement);
        });

        // Re-initialize scroll animations for new elements
        this.scrollAnimations.init();
    }

    setupEventListeners() {
        // Handle add to cart events
        document.addEventListener('bookAddedToCart', (e) => {
            this.handleAddToCart(e.detail.book);
        });

        // Handle search functionality (if implemented)
        this.setupSearch();
    }

    handleAddToCart(book) {
        // Show notification or update cart count
        this.showNotification(`${book.title} added to cart!`);
        
        // Update cart count in navigation
        this.updateCartCount();
    }

    showNotification(message) {
        // Create and show a temporary notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 12px 20px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-hover);
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    updateCartCount() {
        // Update cart count in the navigation
        // This would typically read from a cart state management system
        console.log('Cart updated');
    }

    setupSearch() {
        // Search functionality would be implemented here
        // This is a placeholder for future implementation
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BookStoreApp();
});






