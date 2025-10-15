// Utility functions
class Helpers {
    static formatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    }
    
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    static truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
    
    static getRandomColor() {
        const colors = [
            'linear-gradient(45deg, #FF6B6B, #FF8E8E)',
            'linear-gradient(45deg, #6C63FF, #8B85FF)',
            'linear-gradient(45deg, #FFC300, #FFD54F)',
            'linear-gradient(45deg, #4ECDC4, #88D9D3)',
            'linear-gradient(45deg, #FF8E53, #FFA477)',
            'linear-gradient(45deg, #9B59B6, #BD69DE)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    
    // Add these methods to the Helpers class
    static formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
    
    static generateOrderId() {
        return 'BV-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }
    
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    static validatePhone(phone) {
        const re = /^\+?[\d\s\-\(\)]{10,}$/;
        return re.test(phone);
    }
    
    static getInitials(name) {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    
    
}

export default Helpers;














