// Функция для проверки видимости элемента
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Функция для управления навигацией
function initNavigation() {
    const navigation = document.querySelector('.navigation');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Добавляем класс при прокрутке
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navigation.classList.add('scrolled');
        } else {
            navigation.classList.remove('scrolled');
        }
    });
    
    // Подсветка активного пункта меню
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Плавная прокрутка к секциям
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = navigation.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Функция для кнопки "Наверх"
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Показываем/скрываем кнопку при прокрутке
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Прокрутка наверх при клике
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Функция для анимации появления элемента
function animateElement(element) {
    // Анимируем элемент только если он еще не анимирован
    if (!element.classList.contains('element-animated')) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        // Небольшая задержка для плавности
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.classList.add('element-animated');
        }, 100);
    }
}

// Функция для обработки появления элементов при прокрутке
function handleScrollAnimation() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach(element => {
        if (isElementInViewport(element) && !element.classList.contains('animated')) {
            // Анимируем элемент только если он еще не анимирован
            animateElement(element);
            element.classList.add('animated');
        }
    });
}

// Функция для добавления анимации к элементам
function addAnimationToElements() {
    // Добавляем класс для анимации к основным элементам
    const elementsToAnimate = [
        '.page1-content',
        '.page2-text',
        '.page3-head-text',
        '.page3-img-candel',
        '.page4-content-text',
        '.page4-content-image',
        '.page5-left-candel-column',
        '.page5-right-candel-column',
        '.page6-header-container',
        '.comments-block',
        '.page7-candelrow',
        '.footer-content'
    ];
    
    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            // Добавляем класс только если элемент еще не анимирован
            if (!element.classList.contains('animate-on-scroll')) {
                element.classList.add('animate-on-scroll');
            }
        });
    });
}

// Функция для анимации появления страниц по очереди
function animatePageSequence() {
    const pages = document.querySelectorAll('section');
    
    pages.forEach((page, index) => {
        // Устанавливаем начальное состояние только если страница еще не анимирована
        if (!page.classList.contains('page-animated')) {
            page.style.opacity = '0';
            page.style.transform = 'translateY(50px)';
            page.style.transition = 'opacity 1s ease, transform 1s ease';
            
            setTimeout(() => {
                page.style.opacity = '1';
                page.style.transform = 'translateY(0)';
                page.classList.add('page-animated');
            }, index * 200); // Каждая страница появляется с задержкой
        }
    });
}

// Функция для анимации кнопок
function animateButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Добавляем эффект нажатия
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Функция для анимации изображений
function animateImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(image => {
        // Проверяем, загружено ли уже изображение
        if (image.complete) {
            // Если изображение уже загружено, показываем его сразу
            image.style.opacity = '1';
            image.style.transform = 'scale(1)';
        } else {
            // Если изображение еще не загружено, устанавливаем начальное состояние
            image.style.opacity = '0';
            image.style.transform = 'scale(0.9)';
            image.style.transition = 'opacity 1s ease, transform 1s ease';
            
            // Анимация появления изображений при загрузке
            image.addEventListener('load', function() {
                setTimeout(() => {
                    this.style.opacity = '1';
                    this.style.transform = 'scale(1)';
                }, Math.random() * 500); // Случайная задержка для естественности
            });
        }
    });
}

// Функция для плавной прокрутки к секциям
function smoothScrollToSections() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Функция для анимации при загрузке страницы
function pageLoadAnimation() {
    // Анимация заголовка
    const title = document.querySelector('.page1 .title');
    if (title && !title.classList.contains('title-animated')) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(-30px)';
        title.style.transition = 'opacity 1.5s ease, transform 1.5s ease';
        
        setTimeout(() => {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
            title.classList.add('title-animated');
        }, 500);
    }
    
    // Анимация подзаголовка
    const subtitle = document.querySelector('.page1 .subtitle');
    if (subtitle && !subtitle.classList.contains('subtitle-animated')) {
        subtitle.style.opacity = '0';
        subtitle.style.transform = 'translateY(-20px)';
        subtitle.style.transition = 'opacity 1.5s ease, transform 1.5s ease';
        
        setTimeout(() => {
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateY(0)';
            subtitle.classList.add('subtitle-animated');
        }, 800);
    }
    
    // Анимация текста
    const text = document.querySelector('.page1 .text');
    if (text && !text.classList.contains('text-animated')) {
        text.style.opacity = '0';
        text.style.transform = 'translateY(-15px)';
        text.style.transition = 'opacity 1.5s ease, transform 1.5s ease';
        
        setTimeout(() => {
            text.style.opacity = '1';
            text.style.transform = 'translateY(0)';
            text.classList.add('text-animated');
        }, 1100);
    }
    
    // Анимация кнопки
    const button = document.querySelector('.page1 .btn');
    if (button && !button.classList.contains('button-animated')) {
        button.style.opacity = '0';
        button.style.transform = 'translateY(-10px)';
        button.style.transition = 'opacity 1.5s ease, transform 1.5s ease';
        
        setTimeout(() => {
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
            button.classList.add('button-animated');
        }, 1400);
    }
}

// Функция для анимации счетчика отзывов
function animateReviewsCounter() {
    const reviews = document.querySelectorAll('.comments-block .text');
    let currentReview = 0;
    
    // Показываем только первый отзыв, остальные скрываем
    reviews.forEach((review, index) => {
        if (index > 0) {
            review.style.display = 'none';
            review.style.opacity = '0';
            review.style.transform = 'translateY(20px)';
        } else {
            review.style.display = 'block';
            review.style.opacity = '1';
            review.style.transform = 'translateY(0)';
        }
    });
    
    // Функция для показа следующего отзыва
    function showNextReview() {
        if (reviews.length > 1) {
            // Скрываем текущий отзыв
            reviews[currentReview].style.display = 'none';
            reviews[currentReview].style.opacity = '0';
            
            // Показываем следующий отзыв
            currentReview = (currentReview + 1) % reviews.length;
            reviews[currentReview].style.display = 'block';
            
            // Анимация появления
            reviews[currentReview].style.opacity = '0';
            reviews[currentReview].style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                reviews[currentReview].style.opacity = '1';
                reviews[currentReview].style.transform = 'translateY(0)';
            }, 100);
        }
    }
    
    // Автоматическая смена отзывов каждые 5 секунд
    if (reviews.length > 1) {
        setInterval(showNextReview, 5000);
    }
}

// Основная функция инициализации
function init() {
    // Инициализация навигации
    initNavigation();
    
    // Инициализация кнопки "Наверх"
    initScrollToTop();
    
    // Анимация счетчика отзывов
    animateReviewsCounter();
    
    // Добавляем анимацию к элементам
    addAnimationToElements();
    
    // Анимация кнопок
    animateButtons();
    
    // Анимация изображений
    animateImages();
    
    // Плавная прокрутка
    smoothScrollToSections();
    
    // Анимация при загрузке страницы
    pageLoadAnimation();
    
    // Обработчик прокрутки для анимации элементов
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', handleScrollAnimation);
    
    // Запускаем анимацию последовательного появления страниц
    setTimeout(animatePageSequence, 2000);
}

// Запускаем инициализацию после загрузки DOM
document.addEventListener('DOMContentLoaded', init);

// Дополнительная анимация при полной загрузке страницы
window.addEventListener('load', () => {
    // Добавляем класс для завершения загрузки
    document.body.classList.add('page-loaded');
});
