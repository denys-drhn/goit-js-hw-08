// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");

const galleryMarkup = createGalleryMarkup(galleryItems);
galleryContainer.addEventListener('click', onGalleryContainerClick);

// 1. первий шаг -> создать разметку
function createGalleryMarkup(items) {
		
	const markup = items.map(({preview, original, description}) => {
		return `
	<div class="gallery__item">
	<a class="gallery__link" href="${original}">
	<img
		class="gallery__image"
		src="${preview}"
		data-source="${original}"
		alt="${description}"
	/>
	</a>
	</div>
	`;
	}).join('');
	
	return markup;
};


// 1. второй шаг ->  рендер разметки + создание переменних
galleryContainer.innerHTML = galleryMarkup;


// 2. Реализация делегирования на div.gallery и получение url большого изображения

function onGalleryContainerClick(event) {
	
	event.preventDefault();      // *Запрети (перенаправлен на другую страницу) по умолчанию.
	// console.log(event.target);
	// console.log(event.currentTarget);
	// console.log(event.target.nodeName);
	if (event.target.nodeName !== "IMG") {
    return;
	};

	const selectedImg = event.target.dataset.source; // получение url большого изображения

	// 3. Замена значения атрибута src элемента <img> в модальном окне перед открытием
	// Подключение скрипта и стилей библиотеки модального окна basicLightbox:
	const instance = basicLightbox.create(`<img src="${selectedImg}" width="800" height="600">`, {
		onShow: (instance) => document.addEventListener('keydown', onEscKeyPress), // .методи onShow та onClose бібліотеки basicLightbox.
		onClose: (instance) => document.removeEventListener('keydown', onEscKeyPress), //  снятие слушателя собитий, когда закрилось модальное окно
	});

	instance.show();
	
	// * Закрытие с клавиатуры:
	function onEscKeyPress(event) {
		console.log(event.code);
		
		if (event.code === 'Escape') {
			instance.close();
			// document.removeEventListener('keydown', onEscKeyPress); // снятие слушателя собитий после того, как закрилось модальное окно.
			}
	}
};
