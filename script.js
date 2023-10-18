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
const getJson = function (url, errMsg = `Somthing went wrong`) {
  return fetch(url).then(response => {
    //HOW TO HANDLE 404 ERROR
    if (!response.ok)
      throw new Error(`Country not found ${errMsg} ${response.status})`);
    return response.json();
  });
};
////////////////
/*
// //HOW TO CONSUME A PROMISE, PROMISES AND FETCH API, HOW TO CHAIN PROMISSES
const getCountryData = function (country) {
  fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then(response => {
      //HOW TO HANDLE 404 ERROR
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      return fetch(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
      );
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data, 'neighbour'))
    //HOW TO HANDLE ERRORS / catch error
    .catch(err => {
      console.log(`${err} 💣💣💣`);
      renderError(`Somthing went wrong 💣💣 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
*/
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
  getCountryData('italy');
});
/*
/////////////////////////////////////
// Coding Challenge #1

//In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

//Here are your tasks:

//PART 1
//1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).

//2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.

//The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉

//3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'

//4. Chain a .catch method to the end of the promise chain and log errors to the console
//5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

//PART 2
//6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
//7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

//TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
//TEST COORDINATES 2: 19.037, 72.873
//TEST COORDINATES 2: -33.933, 18.474

////////////////////////
const getJsonChalange = function (url, errMsg = `Somthing went wrong`) {
  return fetch(url).then(response => {
    //HOW TO HANDLE 404 ERROR
    if (!response.ok)
      throw new Error(`Country not found ${errMsg} ${response.status})`);
    return response.json();
  });
};

const whereAmI = function (lat, lng) {
  getJsonChalange(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(data => {
      console.log(data);
    })
    .catch(err => console.error(err.message));
};

whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);
*/
// MAKING A SIMPLE PROMISE examples
const lotteryPromise = new Promise(function (resolve, reject) {
  Math.random() >= 0.5
    ? resolve('you win 🤑')
    : reject(new Error('you lost 💩'));
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));
//
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
wait(2)
  .then(() => {
    console.log('I waited 2 sec');
    return wait(1);
  })
  .then(() => {
    console.log('I waited 3 sec');
    return wait(1);
  })
  .then(() => {
    console.log('I waited 4 sec');
    return wait(1);
  });
