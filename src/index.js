import './css/styles.css';
import { fetchCountries } from "./js/fetchCountries";
import lodash from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputElement = document.querySelector("#search-box");
const listElement = document.querySelector(".country-list");

inputElement.addEventListener("input", lodash(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  event.preventDefault();
  const countryName = event.target.value.trim();

  clearMurkup();

  if (countryName) {
    fetchCountries(countryName)
      .then(data => {
        console.log(data);
        if (data.length > 1 && data.length < 10) {
          makeMurkupCountries(data);
          return;
        } else if (data.length === 1) {
          makeMurkupCountry(data);
          return;
        } else if (data.length > 10) {
          clearMurkup();
          Notiflix.Notify.info(
            "Too many matches found. Please enter a more specific name."
          );
          return;
        }

        listElement.innerHTML = murkup;
      })
      .catch(error =>
        Notiflix.Notify.failure("Oops, there is no country with that name")
        );
  }
};

function makeMurkupCountries(arr) {
  const murkup = arr
    .map(({ name, flags }) => {
      return `
      <li>
        <img src="${flags.png}" alt="${name.official}" width="60" height="40" >
         <h2>${name.official}</h2>
      </li>`;
    })
    .join('');
  listElement.innerHTML = murkup;
};

function makeMurkupCountry(arr) {
  const murkup = arr
    .map(
      ({ name, capital, population, flags, languages }) => {
        return `
          <div class="country">
           <img src="${flags.png}" alt="${name.official}" class="country-flag">
           <h2 class="country-name">${name.official}</h2>
         </div>
         <ul class="country-info">
           <li>Capital: ${capital}</li>
           <li>Population: ${population}</li>
           <li>Languages: ${Object.values(languages)}</li>
         </ul>
      `;
      }
    )
    .join('');
    listElement.innerHTML = murkup;
};

function clearMurkup() {
  listElement.innerHTML = "";
};
