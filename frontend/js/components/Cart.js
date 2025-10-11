class ShoppingCart {
    constructor() {
        this.items = this.loadFromLocalStorage();
        this.updateCartUI();
    }

    addItem(bookId) {
        // Book ma'lumotlarini API dan olish
        this.getBookDetails(bookId).then(book => {
            if (!book) return;

            const existingItem = this.items.find(item => item.id === book.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.items.push({
                    id: book.id,
                    title: book.title,
                    price: book.price || 0,
                    quantity: 1,
                    author: book.author,
                    image: book.image
                });
            }
            
            this.saveToLocalStorage();
            this.updateCartUI();
            this.showNotification(`${book.title} savatga qo'shildi`);
        });
    }

    removeItem(bookId) {
        this.items = this.items.filter(item => item.id !== bookId);
        this.saveToLocalStorage();
        this.updateCartUI();
        this.showNotification('Mahsulot savatdan olib tashlandi');
    }

    updateQuantity(bookId, quantity) {
        const item = this.items.find(item => item.id === bookId);
        if (item) {
            item.quantity = Math.max(0, quantity);
            if (item.quantity <= 0) {
                this.removeItem(bookId);
            } else {
                this.saveToLocalStorage();
                this.updateCartUI();
            }
        }
    }

    clear() {
        this.items = [];
        this.saveToLocalStorage();
        this.updateCartUI();
    }

    getItems() {
        return this.items;
    }

    getTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    getTotalItems() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    async getBookDetails(bookId) {
        try {
            const response = await fetch(`/api/books/${bookId}/`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Kitob ma\'lumotlarini olishda xato:', error);
            return null;
        }
    }

    loadFromLocalStorage() {
        try {
            return JSON.parse(localStorage.getItem('bookstore_cart')) || [];
        } catch (error) {
            console.error('LocalStorage dan ma\'lumot olishda xato:', error);
            return [];
        }
    }

    saveToLocalStorage() {
        try {
            localStorage.setItem('bookstore_cart', JSON.stringify(this.items));
        } catch (error) {
            console.error('LocalStorage ga saqlashda xato:', error);
        }
    }

    updateCartUI() {
        // Cart count yangilash
        const cartCounts = document.querySelectorAll('.cart-count');
        cartCounts.forEach(element => {
            element.textContent = this.getTotalItems();
        });

        // Cart total yangilash
        const cartTotal = document.getElementById('cart-total');
        if (cartTotal) {
            cartTotal.textContent = this.getTotal().toLocaleString() + ' so\'m';
        }

        // Agar cart sahifasi ochiq bo'lsa, uni yangilash
        if (app && app.currentView === 'cart') {
            app.renderCart();
        }
    }

    showNotification(message) {
        // Notification yaratish
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;

        // Notification stillari
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--white);
            color: var(--text-color);
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            border-left: 4px solid var(--success-color);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        // 3 soniyadan keyin olib tashlash
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}