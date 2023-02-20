import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state'; // Антипаттерн "магические числа и строки"

const formData = {};

const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const message = document.querySelector('.feedback-form textarea');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

populateFormInput();

function onFormInput(event) {
	
		formData.email = email.value,
		formData.message = message.value,
	

	// console.log(formData);

	localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

function populateFormInput() {
	const savedFormInput = localStorage.getItem(STORAGE_KEY);
	
	if (savedFormInput) {
		const parsedFormInput = JSON.parse(savedFormInput);
		email.value = parsedFormInput.email;
		message.value = parsedFormInput.message;
		}
};

function onFormSubmit(event) {
	event.preventDefault();
	
	console.log(formData); // вывод объектa с полями email, message и текущими их значениями в консоль

	localStorage.removeItem(STORAGE_KEY); // удаление local storage после нажатия submit
	form.reset(); // сброс строки из поля ввода после нажатия submit
	};