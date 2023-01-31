// IMPORTS
import './css/styles.css';
import Notiflix from 'notiflix';
import { renderMarkup } from './js/renderMarkup';
import { refs } from './js/refs';
import { fetchImages } from './js/api';

// VARIABLES
let page = 1;
let searchQuery = '';

// FUNCTIONS
// Функція отправки даних на Pixabay
const onSubmit = async evt => {
  evt.preventDefault();
  // Беремо значення із інпута
  searchQuery = evt.target.elements.searchQuery.value;
  // Скидаємо сторінку
  page = 1;

  // Очищуємо галерею
  refs.galleryContainer.innerHTML = '';
  // Створити запит
  try {
    const request = await fetchImages(searchQuery, page);
    // Створюємо повідомлення якщо прийшов пустий масив
    if (request.totalHits === 0) {
      alertNoImagesFound();
      return;
    }

    if (request.totalHits > 40) {
      refs.loadMoreBtn.classList.remove('is-hidden');
    } else {
      refs.loadMoreBtn.classList.add('is-hidden');
    }
    // Відмальовуємо розмітку
    renderMarkup(request.hits, refs.galleryContainer);
  } catch (error) {
    console.error(error);
  }

  // Очищуємо форму
  evt.target.reset();
};

// Функція для завантаження даних по кліку
const onLoadMore = async () => {
  page = page + 1;

  try {
    const request = await fetchImages(searchQuery, page);
    if (page === Math.ceil(request.totalHits / 40)) {
      refs.loadMoreBtn.classList.add('is-hidden');
      // Створюємо повідомлення про закінченя коллекції
      alertEndOfSearch();
    }
    // Відмальовуємо розмітку
    renderMarkup(request.hits, refs.galleryContainer);
  } catch (error) {
    console.error(error);
  }
};

// Функція для повідомлення повернення пустого масиву
function alertNoImagesFound() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

// Функція для повідомлення про закінченя коллекції
function alertEndOfSearch() {
  Notiflix.Notify.failure(
    "We're sorry, but you've reached the end of search results."
  );
}

// LISTENERS
refs.searchForm.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
