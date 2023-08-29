const key = '6e07f1b9464466e8886c4a31d35c862a';
const url = (location) => `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`;

// async function getWeatherByLocation(location) {
//     const response = await fetch(url(location));
//     const responseData = await response.json();
//     console.log(responseData);
// }

// getWeatherByLocation();

fetch(url('Lviv'))
.then(response => response.json())
.then (data => {
    console.log(data);

});




