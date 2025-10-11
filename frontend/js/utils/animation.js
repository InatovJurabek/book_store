// // animations.js - JavaScript qismi
// class Animations {
//     static initScrollAnimations() {
//         const observer = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     entry.target.classList.add('visible');
//                 }
//             });
//         }, {
//             threshold: 0.1,
//             rootMargin: '0px 0px -50px 0px'
//         });

//         // Barcha scroll animatsiya elementlarini kuzatish
//         document.querySelectorAll('.fade-in-scroll').forEach(el => {
//             observer.observe(el);
//         });
//     }

//     static animateValue(element, start, end, duration) {
//         let startTimestamp = null;
//         const step = (timestamp) => {
//             if (!startTimestamp) startTimestamp = timestamp;
//             const progress = Math.min((timestamp - startTimestamp) / duration, 1);
//             const value = Math.floor(progress * (end - start) + start);
//             element.textContent = value.toLocaleString();
//             if (progress < 1) {
//                 window.requestAnimationFrame(step);
//             }
//         };
//         window.requestAnimationFrame(step);
//     }

//     static typeWriter(element, text, speed = 50) {
//         let i = 0;
//         element.innerHTML = '';
        
//         function type() {
//             if (i < text.length) {
//                 element.innerHTML += text.charAt(i);
//                 i++;
//                 setTimeout(type, speed);
//             }
//         }
//         type();
//     }
// }

// // DOM yuklanganidan keyin animatsiyalarni ishga tushirish
// document.addEventListener('DOMContentLoaded', function() {
//     Animations.initScrollAnimations();
    
//     // Statistik raqamlarni animatsiya qilish
//     const statNumbers = document.querySelectorAll('.stat-card h3');
//     statNumbers.forEach(stat => {
//         const finalValue = parseInt(stat.textContent);
//         if (!isNaN(finalValue)) {
//             Animations.animateValue(stat, 0, finalValue, 2000);
//         }
//     });
// });



import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAP pluginlarni ishga tushirish
gsap.registerPlugin(ScrollTrigger);

class BookStoreAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.heroAnimation();
        this.floatingBooks();
        this.scrollAnimations();
        this.pageTurnEffect();
        this.parallaxEffect();
    }

    // Hero section animatsiyasi
    heroAnimation() {
        const tl = gsap.timeline();
        
        tl.fromTo('.hero-bg-shape', 
            { scale: 0, rotation: -45 },
            { scale: 1, rotation: 0, duration: 1.5, ease: "power3.out" }
        )
        .fromTo('.hero-title', 
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
            "-=0.5"
        )
        .fromTo('.hero-subtitle', 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
            "-=0.8"
        )
        .fromTo('.hero-cta', 
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
            "-=0.5"
        );
    }

    // Floating books animatsiyasi
    floatingBooks() {
        gsap.to('.floating-book', {
            y: -30,
            rotation: 5,
            duration: 3,
            ease: "power1.inOut",
            stagger: {
                amount: 2,
                from: "random"
            },
            yoyo: true,
            repeat: -1
        });
    }

    // Scroll animatsiyalari
    scrollAnimations() {
        // Kitob kartalari uchun animatsiya
        gsap.utils.toArray('.book-card').forEach((card, index) => {
            gsap.fromTo(card, {
                y: 100,
                opacity: 0,
                rotationY: -15
            }, {
                y: 0,
                opacity: 1,
                rotationY: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                },
                delay: index * 0.1
            });
        });

        // Statistikalar uchun count-up animatsiya
        gsap.utils.toArray('.stat-number').forEach(stat => {
            const target = parseInt(stat.textContent);
            const obj = { value: 0 };
            
            gsap.to(obj, {
                value: target,
                duration: 2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: stat,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                onUpdate: () => {
                    stat.textContent = Math.floor(obj.value).toLocaleString();
                }
            });
        });

        // Parallax effect
        gsap.to('.parallax-bg', {
            yPercent: -30,
            ease: "none",
            scrollTrigger: {
                trigger: ".parallax-section",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }

    // Kitob sahifasini aylantirish effekti
    pageTurnEffect() {
        document.querySelectorAll('.book-3d').forEach(book => {
            book.addEventListener('mouseenter', () => {
                gsap.to(book, {
                    rotationY: 15,
                    duration: 0.8,
                    ease: "power2.out"
                });
            });
            
            book.addEventListener('mouseleave', () => {
                gsap.to(book, {
                    rotationY: 0,
                    duration: 0.8,
                    ease: "power2.out"
                });
            });
        });
    }

    // Parallax effektlari
    parallaxEffect() {
        gsap.to(".parallax-layer-1", {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                scrub: 1
            }
        });

        gsap.to(".parallax-layer-2", {
            yPercent: -40,
            ease: "none",
            scrollTrigger: {
                scrub: 1
            }
        });
    }
}

export default BookStoreAnimations;