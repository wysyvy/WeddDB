// Ждём полной загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    
    // Убираем класс no-js, если JS работает
    document.documentElement.classList.remove('no-js');
    
    // Находим все элементы с классом animate-on-scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Функция для проверки, виден ли элемент на экране
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Элемент считается видимым, когда его верхняя часть входит в экран
        // с небольшим отступом (100px) для более плавного появления
        return rect.top < windowHeight - 100 && rect.bottom > 0;
    }
    
    // Функция для показа элемента
    function showElement(el) {
        // Добавляем класс is-visible, который активирует CSS-переход
        el.classList.add('is-visible');
    }
    
    // Функция для проверки всех элементов при скролле
    function checkVisibility() {
        animatedElements.forEach(el => {
            if (!el.classList.contains('is-visible') && isElementInViewport(el)) {
                showElement(el);
            }
        });
    }
    
    // Проверяем элементы сразу после загрузки страницы
    // Ждём небольшую задержку, чтобы страница полностью отрисовалась
    setTimeout(() => {
        checkVisibility();
    }, 100);
    
    // Используем Intersection Observer для современных браузеров (более производительно)
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    showElement(entry.target);
                    // После показа прекращаем наблюдение за элементом
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // Элемент показывается, когда видно хотя бы 10%
            rootMargin: '0px 0px -50px 0px' // Небольшой отступ для более плавного появления
        });
        
        // Наблюдаем за всеми элементами
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback для старых браузеров
        window.addEventListener('scroll', checkVisibility, { passive: true });
        window.addEventListener('resize', checkVisibility, { passive: true });
    }
    
    // Убедимся, что первый блок (hero-screen) не перекрывается анимациями
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        // Убедимся, что CSS-анимация первого блока работает правильно
        heroContent.style.opacity = '1';
        heroContent.style.animation = 'fadeInUp 1s ease-out forwards';
    }
    
    console.log('Анимации загружены! Количество элементов:', animatedElements.length);
});