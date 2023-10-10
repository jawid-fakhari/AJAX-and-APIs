'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//Render data////////////
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //countriesContainer.style.opacity = 1;/// used in finaly
};

const renderCountry = function (data, className = '') {
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
  //countriesContainer.style.opacity = 1;/// used in finaly
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
/////////////////////////////
// helper function ///////
const getJson = function (url, errMsg = `Somthing wen wrong`) {
  return fetch(url).then(response => {
    //HOW TO HANDLE 404 ERROR
    if (!response.ok)
      throw new Error(`Country not found ${errMsg} ${response.status})`);
    return response.json();
  });
};
////////////////
// //HOW TO CONSUME A PROMISE, PROMISES AND FETCH API, HOW TO CHAIN PROMISSES
// const getCountryData = function (country) {
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(response => {
//       //HOW TO HANDLE 404 ERROR
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);

//       const neighbour = data[0].borders?.[0];

//       return fetch(
//         `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
//       );
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     //HOW TO HANDLE ERRORS / catch error
//     .catch(err => {
//       console.log(`${err} 💣💣💣`);

//       renderError(`Somthing went wrong 💣💣 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
///////////////////
//HOW TO CONSUME A PROMISE, PROMISES AND FETCH API, HOW TO CHAIN PROMISSES
const getCountryData = function (country) {
  getJson(
    `https://countries-api-836d.onrender.com/countries/name/${country}`,
    'Country not found'
  )
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0].borders?.[0];

      if (!neighbour) throw new Error('No neighbour found!');

      return getJson(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    //HOW TO HANDLE ERRORS / catch error
    .catch(err => {
      renderError(`Somthing went wrong 💣💣 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('japan');
});
