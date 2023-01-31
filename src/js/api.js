import axios from 'axios';

const API_KEY = '33244835-834a443ff0995699e1f6454d7';
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
