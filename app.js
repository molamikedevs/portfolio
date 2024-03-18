const words = document.querySelectorAll('.word')
words.forEach(word => {
	let letters = word.textContent.split('')
	word.textContent = ''
	letters.forEach(letter => {
		let span = document.createElement('span')
		span.textContent = letter
		span.className = 'letter'
		word.appendChild(span)
	})
})

let currentWordIndex = 0
let maxWordIndex = words.length - 1

words[currentWordIndex].style.opacity = '1'

let animateText = () => {
	let currentWord = words[currentWordIndex]
	let nextWord =
		currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1]

	Array.from(currentWord.children).forEach((letter, i) => {
		setTimeout(() => {
			letter.className = 'letter out'
		}, i * 80)
	})
	nextWord.style.opacity = '1'
	Array.from(nextWord.children).forEach((letter, i) => {
		letter.className = 'letter behind'
		setTimeout(() => {
			letter.className = 'letter in'
		}, 340 + i * 80)
	})
	currentWordIndex =
		currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1
}

animateText()
setInterval(animateText, 3000)

//creating circle in javascript
const circles = document.querySelectorAll('.circle')
circles.forEach(elem => {
	let dots = elem.getAttribute('data-dots')
	let marked = elem.getAttribute('data-percent')
	let percent = Math.floor((dots * marked) / 100)
	let points = ''
	let rotate = 360 / dots

	for (let i = 0; i < dots; i++) {
		points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`
	}
	elem.innerHTML = points

	const pointMarked = elem.querySelectorAll('.points')
	for (let i = 0; i < percent; i++) {
		pointMarked[i].classList.add('marked')
	}
})

//filter projects js
var mixer = mixitup('.portfolio-gallery')

// get full year
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('currentYear').innerText = new Date().getFullYear()
})

// activeMenu js
let menuLi = document.querySelectorAll('header ul li a')
let section = document.querySelectorAll('section')

const activeMenu = () => {
	let len = section.length
	while (--len && window.scrollY + 97 < section[len].offsetTop) {}

	menuLi.forEach(sec => sec.classList.remove('active'))
	menuLi[len].classList.add('active')
}

activeMenu()
window.addEventListener('scroll', activeMenu)

const header = document.querySelector('header')
window.addEventListener('scroll', () => {
	header.classList.toggle('sticky', window.scrollY > 50)
})

// navbar toggle
let menuIcon = document.querySelector('#menu-icon')
let navList = document.querySelector('.navbar')

menuIcon.onclick = () => {
	menuIcon.classList.toggle('bx-x')
	navList.classList.toggle('open')
}

menuIcon.onscroll = () => {
	menuIcon.classList.remove('bx-x')
	navList.classList.remove('open')
}

// Biography display js
document.addEventListener('DOMContentLoaded', function () {
	const fullText = document.getElementById('full-text')
	const readMoreBtn = document.getElementById('read-more-btn')
	const fullTextContent = fullText.textContent.trim()
	let truncatedText = fullTextContent.slice(0, 203)
	fullText.textContent = truncatedText
	let isFullTextVisible = false
	readMoreBtn.addEventListener('click', function (e) {
		e.preventDefault()
		if (!isFullTextVisible) {
			fullText.textContent = fullTextContent
			readMoreBtn.textContent = 'Read Less'
		} else {
			fullText.textContent = truncatedText
			readMoreBtn.textContent = 'Read More'
		}
		isFullTextVisible = !isFullTextVisible
	})
})

// services text display js
document.addEventListener('DOMContentLoaded', function () {
	const serviceTexts = document.querySelectorAll('.service-text')
	const readMoreBtns = document.querySelectorAll('.read-more-btn')

	serviceTexts.forEach((text, index) => {
		const truncatedText = text.textContent.slice(0, 100)
		const fullText = text.textContent

		text.textContent = truncatedText

		readMoreBtns[index].addEventListener('click', function (e) {
			e.preventDefault()
			const isFullTextVisible = text.textContent !== truncatedText

			if (!isFullTextVisible) {
				text.textContent = fullText
				readMoreBtns[index].textContent = 'Read Less'
			} else {
				text.textContent = truncatedText
				readMoreBtns[index].textContent = 'Read More!'
			}
		})
	})
})

//scroll behavior
const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		console.log(entry)
		if (entry.isIntersecting) {
			entry.target.classList.add('show-items')
		} else {
			entry.target.classList.remove('show-items')
		}
	})
})

const scrollScale = document.querySelectorAll('.scroll-scale')
scrollScale.forEach(scroll => observer.observe(scroll))

const scrollBottom = document.querySelectorAll('.scroll-bottom')
scrollBottom.forEach(scroll => observer.observe(scroll))

const scrollTop = document.querySelectorAll('.scroll-top')
scrollTop.forEach(scroll => observer.observe(scroll))

document
	.getElementById('contact-form')
	.addEventListener('submit', function (event) {
		event.preventDefault()

		// Collect form data
		const templateParams = {
			name: document.getElementById('name').value,
			email: document.getElementById('email').value,
			number: document.getElementById('number').value,
			message: document.getElementById('message').value,
		}

		// Send email
		emailjs.send('service_obl2as7', 'template_fqwk5lr', templateParams).then(
			function (response) {
				swal('Your message has been successfully sent!')
				resetForm() // Reset form fields
			},
			function (error) {
				swal('Oops!', 'Something went wrong, you should choose again!', 'error')
			}
		)
	})

function resetForm() {
	document.getElementById('contact-form').reset()
}
