import axios from 'axios';

const API_KEY = '33244782-4607a2d9b6fd42ac4c590d6ff';
const PER_PAGE = 40;
const BASE_URL = 'https://pixabay.com/api';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: PER_PAGE,
  safesearch: true,
};

export const fetchImages = async (searchQuery, page) => {
  const request = await axios.get(`/?q=${searchQuery}&page=${page}`);

  return request.data;
};
