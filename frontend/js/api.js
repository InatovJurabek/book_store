// API base URL ni sozlang
const API_BASE_URL = 'http://localhost:8000/api';  // Development uchun
// Yoki
// const API_BASE_URL = '/api';  // Production uchun

class BookAPI {
    static async getBooks() {
        try {
            const response = await fetch(`${API_BASE_URL}/books/`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            
            // Agar results maydoni bo'lsa (pagination bo'lsa)
            return data.results || data;
        } catch (error) {
            console.error('Kitoblarni olishda xato:', error);
            this.showError('Kitoblarni yuklashda xato yuz berdi');
            return [];
        }
    }

    static async getBookDetail(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/books/${id}/`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Kitob ma\'lumotlarini olishda xato:', error);
            this.showError('Kitob ma\'lumotlarini yuklashda xato');
            return null;
        }
    }

    static async getCategories() {
        try {
            const response = await fetch(`${API_BASE_URL}/categories/`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            return data.results || data;
        } catch (error) {
            console.error('Kategoriyalarni olishda xato:', error);
            return [];
        }
    }

    static async searchBooks(query) {
        try {
            const response = await fetch(`${API_BASE_URL}/books/?search=${encodeURIComponent(query)}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            return data.results || data;
        } catch (error) {
            console.error('Qidiruvda xato:', error);
            return [];
        }
    }

    static async createOrder(orderData) {
        try {
            const response = await fetch(`${API_BASE_URL}/orders/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': this.getCSRFToken(),
                },
                body: JSON.stringify(orderData)
            });
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Buyurtma yaratishda xato:', error);
            this.showError('Buyurtma yaratishda xato yuz berdi');
            return null;
        }
    }

    static getCSRFToken() {
        // CSRF token ni olish
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1];
        return cookieValue;
    }

    static showError(message) {
        // Error notification ko'rsatish
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e74c3c;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}