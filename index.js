const modalCalc = document.getElementById('modal')

// Закрытие модального окна //

const buttonClose = document.querySelector('.modal__close')

buttonClose.addEventListener('click', () => modalCalc.close())
modalCalc.addEventListener('mousedown', e => {
	if (e.target.classList.contains('modal')) modalCalc.close()
})

const productsList = document.querySelector('.modal__products-list')

// Динамическая нумерация //

const numerableProduct = () => {
	const incrementProduct = productsList.querySelectorAll('.product__title')
	for (let i = 0; i < incrementProduct.length; i++) {
		const title = incrementProduct[i]
		title.innerHTML = 'Товар ' + (i + 1)
	}
}
numerableProduct()

// Удаление продукта //

productsList.addEventListener('click', e => {
	if (e.target.classList.contains('product__delete')) {
		e.target.closest('.product').remove()
		numerableProduct()
		count()
	}
})

// Добавление продукта //

const template = document.getElementById('product-template').content

const createProduct = () => {
	return template.querySelector('.product').cloneNode(true)
}

const buttonAddProduct = document.querySelector('.modal__add-product')

buttonAddProduct.addEventListener('click', () => {
	productsList.append(createProduct())
	numerableProduct()
	count()
})

// Динамический подсчёт //

function count() {
	const dimensionInputs = document.querySelectorAll('.dimension')

	const volumeInputs = document.querySelectorAll('.volume')
	const volumeResult = document.querySelector('.volume-result')
	const weightInputs = document.querySelectorAll('.weight')
	const weightResult = document.querySelector('.weight-result')
	const densityResultInput = document.querySelector('.density-result')
	const costInputs = document.querySelectorAll('.cost')
	const costResultInput = document.querySelector('.cost-result')

	// Функция для подсчета суммы (можно переделать на reduce)

	const totalCount = inputs => {
		let totalResult = 0
		for (let input of inputs) {
			totalResult += +input.value
		}
		return totalResult
	}

	// Функция для подсчета плотности

	function densityCount() {
		const result = weightResult.value / volumeResult.value
		densityResultInput.value = result
	}

	// Функция для перерасчета при удалении и добавлении товаров

	function resultRecount() {
		volumeResult.value = totalCount(volumeInputs)
		weightResult.value = totalCount(weightInputs)
		densityCount()
	}
	resultRecount()

	// Подсчет объёма конкретного товара

	for (let input of dimensionInputs) {
		input.addEventListener('input', e => {
			const product = e.target.closest('.product')
			const inputsDimensions = product.querySelectorAll('.dimension')
			const volumeProduct = product.querySelector('.volume')
			let result =
				inputsDimensions[0].value *
				inputsDimensions[1].value *
				inputsDimensions[2].value

			volumeProduct.value = result / 1000000

			volumeResult.value = totalCount(volumeInputs)
			densityCount()
		})
	}

	// Подсчет общего веса

	for (let input of weightInputs) {
		input.addEventListener('input', () => {
			weightResult.value = totalCount(weightInputs)
			densityCount()
		})
	}

	// Подсчет общей стоимости

	for (let input of costInputs) {
		input.addEventListener('input', () => {
			costResultInput.value = (+totalCount(costInputs) * 0.14).toFixed(2)
		})
	}
}

count()

const buttonSelect = document.querySelector('.modal__select')
const selectOptionList = document.querySelector('.modal__options-list')
const checkboxs = document.querySelectorAll('.checkbox__input-pack')
const labelsPack = document.querySelectorAll('.modal__label-item')
const labelCheckboxs = document.querySelectorAll('.modal__pack-checkbox')

// Перед открытием select, смотрим, какие ярлыки есть //

buttonSelect.addEventListener('click', () => {
	for (let label of labelsPack) {
		if (label.classList.contains('visually-hidden')) continue

		switch (label.getAttribute('data-pack')) {
			case 'Пупырка':
				checkboxs[0].checked = true
				break
			case 'Паллета':
				checkboxs[1].checked = true
				break
			case 'Фанера':
				checkboxs[2].checked = true
				break
		}
	}
	buttonSelect.classList.toggle('modal__select--open')
	selectOptionList.classList.toggle('visually-hidden')
})

// При удалении ярлыка, снимаем чекбокс //

labelsPack.forEach(label => {
	label.addEventListener('click', e => {
		switch (label.getAttribute('data-pack')) {
			case 'Пупырка':
				checkboxs[0].checked = false
				break
			case 'Паллета':
				checkboxs[1].checked = false
				break
			case 'Фанера':
				checkboxs[2].checked = false
				break
		}
		label.classList.toggle('visually-hidden')
	})
})

// При нажатии на чекбокс, добавляем или убираем ярлык //

labelCheckboxs.forEach(label => {
	label.addEventListener('click', e => {
		const input = e.target.querySelector('.checkbox__input')

		switch (input?.getAttribute('data-pack')) {
			case 'Пупырка':
				labelsPack[0].classList.toggle('visually-hidden')
				break
			case 'Паллета':
				labelsPack[1].classList.toggle('visually-hidden')
				break
			case 'Фанера':
				labelsPack[2].classList.toggle('visually-hidden')
				break
		}
	})
})

const buttonSubmit = document.querySelector('.modal__button')

buttonSubmit.addEventListener('click', () => {
	modalCalc.close()
	alert('Спасибо за заказ! Мы скоро свяжемся с Вами!')
})
