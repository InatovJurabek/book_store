class ScrollAnimations {
    constructor() {
        this.fadeElements = document.querySelectorAll('.fade-in');
        this.init();
    }

    init() {
        this.createObserver();
        this.checkElements();
    }

    createObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                   
                    const delay = entry.target.dataset.delay || 0;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.fadeElements.forEach(el => {
            this.observer.observe(el);
        });
    }

    checkElements() {
        this.fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.classList.add('visible');
            }
        });
    }
}


class FloatingAnimation {
    constructor() {
        this.books = document.querySelectorAll('.floating-books .book');
        this.init();
    }

    init() {
        this.books.forEach((book, index) => {
          
            const rotation = this.getRandomRotation();
            const duration = 3 + Math.random() * 2;
            const delay = index * 0.5;
            
            book.style.setProperty('--rotation', `${rotation}deg`);
            book.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        });
    }

    getRandomRotation() {
        return (Math.random() * 20) - 10; 
    }
}

export { ScrollAnimations, FloatingAnimation };















