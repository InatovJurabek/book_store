import Helpers from '../utils/helpers.js';

class Cart {
    constructor() {
        this.cartItems = JSON.parse(localStorage.getItem('bookverse_cart')) || [];
        this.cartCount = document.querySelector('.cart-count');
        this.cartTotal = document.querySelector('.cart-total');
        this.cartItemsContainer = document.querySelector('.cart-items');
        this.init();
    }

    init() {
        this.updateCartDisplay();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Listen for add to cart events
        document.addEventListener('bookAddedToCart', (e) => {
            this.addItem(e.detail.book);
        });

        // Listen for remove item events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item')) {
                const bookId = parseInt(e.target.dataset.bookId);
                this.removeItem(bookId);
            } else if (e.target.classList.contains('update-quantity')) {
                const bookId = parseInt(e.target.dataset.bookId);
                const change = parseInt(e.target.dataset.change);
                this.updateQuantity(bookId, change);
            }
        });
    }

    addItem(book) {
        const existingItem = this.cartItems.find(item => item.id === book.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cartItems.push({
                ...book,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartDisplay();
        this.showAddToCartAnimation(book);
    }

    removeItem(bookId) {
        this.cartItems = this.cartItems.filter(item => item.id !== bookId);
        this.saveCart();
        this.updateCartDisplay();
    }

    updateQuantity(bookId, change) {
        const item = this.cartItems.find(item => item.id === bookId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeItem(bookId);
            } else {
                this.saveCart();
                this.updateCartDisplay();
            }
        }
    }

    saveCart() {
        localStorage.setItem('bookverse_cart', JSON.stringify(this.cartItems));
    }

    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartTotal();
        this.renderCartItems();
    }

    updateCartCount() {
        if (this.cartCount) {
            const totalItems = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
            this.cartCount.textContent = totalItems;
            this.cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    updateCartTotal() {
        if (this.cartTotal) {
            const total = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            this.cartTotal.textContent = Helpers.formatPrice(total);
        }
    }

    renderCartItems() {
        if (!this.cartItemsContainer) return;

        if (this.cartItems.length === 0) {
            this.cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <div class="empty-cart-icon">📚</div>
                    <h3>Your cart is empty</h3>
                    <p>Add some books to get started!</p>
                    <a href="books.html" class="btn-primary">Browse Books</a>
                </div>
            `;
            return;
        }

        this.cartItemsContainer.innerHTML = this.cartItems.map(item => `
            <div class="cart-item" data-book-id="${item.id}">
                <div class="cart-item-image">
                    <div class="book-cover-small" style="background: ${item.coverColor}"></div>
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <p class="cart-item-author">by ${item.author}</p>
                    <p class="cart-item-price">${Helpers.formatPrice(item.price)}</p>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="update-quantity" data-book-id="${item.id}" data-change="-1">
                            −
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="update-quantity" data-book-id="${item.id}" data-change="1">
                            +
                        </button>
                    </div>
                    <button class="remove-item" data-book-id="${item.id}">
                        Remove
                    </button>
                </div>
                <div class="cart-item-total">
                    ${Helpers.formatPrice(item.price * item.quantity)}
                </div>
            </div>
        `).join('');
    }

    showAddToCartAnimation(book) {
        // Create flying book animation
        const animation = document.createElement('div');
        animation.className = 'add-to-cart-animation';
        animation.innerHTML = '📚';
        animation.style.cssText = `
            position: fixed;
            font-size: 24px;
            z-index: 10000;
            pointer-events: none;
        `;

        document.body.appendChild(animation);

        // Get positions
        const cartBtn = document.querySelector('.nav-link[href="cart.html"]');
        const startRect = document.querySelector(`[data-book-id="${book.id}"]`)?.getBoundingClientRect() || 
                         { left: window.innerWidth / 2, top: window.innerHeight / 2 };
        const endRect = cartBtn?.getBoundingClientRect() || 
                       { left: window.innerWidth - 100, top: 20 };

        // Animate
        animation.style.left = startRect.left + 'px';
        animation.style.top = startRect.top + 'px';

        setTimeout(() => {
            animation.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            animation.style.left = endRect.left + 'px';
            animation.style.top = endRect.top + 'px';
            animation.style.transform = 'scale(0.5)';
            animation.style.opacity = '0.5';
        }, 100);

        // Clean up
        setTimeout(() => {
            document.body.removeChild(animation);
        }, 1000);
    }

    getCartSummary() {
        const total = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalItems = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
        
        return {
            items: this.cartItems,
            total,
            totalItems
        };
    }

    clearCart() {
        this.cartItems = [];
        this.saveCart();
        this.updateCartDisplay();
    }
}

export default Cart;