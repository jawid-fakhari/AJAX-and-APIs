'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//Render data////////////
const render = function (data, className = '') {
  const html = `
   <article class="country ${className}">
     <img class="country__img" src="${data.flag}" />
     <div class="country__data">
     <h3 class="country__name">${data.name}</h3>
     <h4 class="country__region">${data.region}</h4>
     <p class="country__row"><span>👫</span>POP ${data.population}</p>
     <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
     <p class="country__row"><span>💰</span>CUR ${data.currencies[0].name}</p>
     </div>
   </article>
   `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

//how to make a new API request///////////////
// const getCountryDataAndNeighbour = function (country) {
//   //AJAX call countery 1
//   const request = new XMLHttpRequest();
//   request.open(
//     'GET',
//     `https://countries-api-836d.onrender.com/countries/name/${country}`
//   );
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // render requested country 1
//     render(data);

//     //Get neighbour country 2
//     const neighbour = data.borders?.[0];

//     if (!neighbour) return;
//     //AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open(
//       'GET',
//       `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
//     );
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);

//       render(data2, 'neighbour');
//     });
//   });
// };

// getCountryDataAndNeighbour('portugal');

//HOW TO CONSUME A PROMISE, PROMISES AND FETCH API, HOW TO CHAIN PROMISSES
const getCountryData = function (country) {
  fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then(response => response.json())
    .then(data => {
      render(data[0]);

      const neighbour1 = data[0].borders?.[0];

      return fetch(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour1}`
      );
    })
    .then(response => response.json())
    .then(data => render(data, 'neighbour'));
};
getCountryData('portugal');
