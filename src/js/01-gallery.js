// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
// console.log(galleryItems);


// -------------------------------
// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector(".gallery");

const galleryMarkup = createGalleryMarkup(galleryItems);
galleryContainer.addEventListener('click', onGalleryContainerClick);

// 1. первий шаг -> создать разметку
function createGalleryMarkup(items) {
		
	const markup = items.map(({preview, original, description}) => {
		return `
	<div class="gallery__item">
	<a class="gallery__link" href="${original}" >
	<img
		class="gallery__image"
		src="${preview}"
		alt="${description}"
		title="${description}"
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
	
	event.preventDefault();		// *Запрети (перенаправлен на другую страницу) по умолчанию.
	
	if (event.target.nodeName !== "IMG") {
		return;
	};	
};

let gallery = new SimpleLightbox('.gallery a');