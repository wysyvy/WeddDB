// Ждём полной загрузки страницы
document.addEventListener('DOMContentLoaded', function () {
	// Убираем класс no-js, если JS работает
	document.documentElement.classList.remove('no-js')

	// Находим все элементы с классом animate-on-scroll
	const animatedElements = document.querySelectorAll('.animate-on-scroll')

	// Проверяем, поддерживает ли браузер Intersection Observer
	if ('IntersectionObserver' in window) {
		// Создаем один observer для всех элементов
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						// Добавляем класс is-visible
						entry.target.classList.add('is-visible')
						// После показа прекращаем наблюдение за элементом (оптимизация)
						observer.unobserve(entry.target)
					}
				})
			},
			{
				threshold: 0.1,
				rootMargin: '0px 0px -50px 0px',
			}
		)

		// Наблюдаем за всеми элементами
		animatedElements.forEach(el => {
			observer.observe(el)
		})
	} else {
		// Fallback для старых браузеров
		function checkVisibility() {
			animatedElements.forEach(el => {
				if (!el.classList.contains('is-visible') && isElementInViewport(el)) {
					el.classList.add('is-visible')
				}
			})
		}

		function isElementInViewport(el) {
			const rect = el.getBoundingClientRect()
			const windowHeight =
				window.innerHeight || document.documentElement.clientHeight
			return rect.top < windowHeight - 100 && rect.bottom > 0
		}

		// Используем requestAnimationFrame для плавности
		let ticking = false
		window.addEventListener(
			'scroll',
			() => {
				if (!ticking) {
					requestAnimationFrame(() => {
						checkVisibility()
						ticking = false
					})
					ticking = true
				}
			},
			{ passive: true }
		)

		// Проверяем при загрузке
		setTimeout(checkVisibility, 100)
	}

	// Убедимся, что первый блок (hero-screen) отображается сразу
	const heroContent = document.querySelector('.hero-content')
	if (heroContent) {
		heroContent.style.opacity = '1'
		heroContent.style.animation = 'fadeInUp 1s ease-out forwards'
	}

	// Анимация для рамок с использованием requestAnimationFrame
	const floralFrameTop = document.querySelector('.floral-frame-top img')
	const floralFrameBottom = document.querySelector('.floral-frame-bottom img')

	if (floralFrameTop) {
		requestAnimationFrame(() => {
			floralFrameTop.style.animation = 'fadeIn 1.2s ease-out forwards'
			floralFrameTop.style.animationDelay = '0.3s'
		})
	}

	if (floralFrameBottom) {
		requestAnimationFrame(() => {
			floralFrameBottom.style.animation = 'fadeIn 1.2s ease-out forwards'
			floralFrameBottom.style.animationDelay = '0.5s'
		})
	}

	// Оптимизация: предзагрузка изображений, которые появятся позже
	const preloadImages = ['img/7.png', 'img/8-2.png']
	preloadImages.forEach(src => {
		const img = new Image()
		img.src = src
	})

	console.log(
		'Сайт оптимизирован, количество анимированных элементов:',
		animatedElements.length
	)
})
