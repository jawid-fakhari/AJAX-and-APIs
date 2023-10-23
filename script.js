'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const imageContainer = document.querySelector('.images');
///////////////////////////////////////
//Render data////////////
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1; /// used in finaly
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
  countriesContainer.style.opacity = 1; /// used in finaly
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
/*
const getJson = function (url, errMsg = `Somthing went wrong`) {
  return fetch(url).then(response => {
    //HOW TO HANDLE 404 ERROR
    if (!response.ok)
      throw new Error(`Country not found ${errMsg} ${response.status})`);
    return response.json();
  });
};
*/
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
/*
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
*/
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
/*
// MAKING A SIMPLE PROMISE examples
const lotteryPromise = new Promise(function (resolve, reject) {
  Math.random() >= 0.5
    ? resolve('you win 🤑')
    : reject(new Error('you lost 💩'));
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

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
*/
///////////////////
/*
//Promisfying the geolocation API

const getPosition = function () {
  return new Promise((resolve, reject) => {
    //   navigator.geolocation.getCurrentPosition(
    //     position => resolve(position),
    //     err => reject(err)
    //   );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(res => {
  console.log(res);
});

const whereAmI = function () {
  getPosition()
    .then(res => {
      const { latitude: lat, longitude: lng } = res.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥`));
};
btn.addEventListener('click', whereAmI);
*/

//////////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/
/*
const img = document.createElement('img');
const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    img.addEventListener('load', () => {
      resolve(img);
      imageContainer.appendChild(img);
    });
    img.addEventListener('error', err => reject(err));
    img.src = imgPath;
  });
};

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
  img.style.display = 'none';
};

wait(0)
  .then(() => {
    createImage('img/img-1.jpg');
    return wait(2);
  })
  .then(() => {
    createImage('img/img-2.jpg');
    return wait(2);
  })
  .then(() => {
    createImage('img/img-3.jpg');
    return wait(2);
  })
  .catch(err => console.error(err));
*/
////////////////////
//Consuming promises with Async/Await method and use of try{}catch{} ///////////////////
const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    //Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    //reverse geolocation
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();
    console.log(dataGeo);
    //Country data
    const res = await fetch(
      `https://countries-api-836d.onrender.com/countries/name/${dataGeo.country}`
    ); // == fetch('url').then(res=>c.log(res))
    if (!res.ok) throw new Error('Problem getting location data');
    const data = await res.json(); // == ... responese.json() ).then(data=>{render...})
    renderCountry(data[0]);
  } catch (err) {
    console.log(err);
    renderError(`erorr error error error ${err.message}`);
  }
};
// whereAmI();
btn.addEventListener('click', whereAmI);
console.log('First');
