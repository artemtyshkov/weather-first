// let enteredLocation = 'Dnipro';
    
const keyWeather1 = '6e07f1b9464466e8886c4a31d35c862a';
const urlWeather1 = (enteredLocation) => `https://api.openweathermap.org/data/2.5/weather?q=${enteredLocation}&appid=${keyWeather1}`;

const keyNews2 = '4c6ea768d9074c66b72d7a6b270a1ac0';
const urlNews2 = (enteredLocation) => `https://newsapi.org/v2/everything?q=${enteredLocation}&sortBy=popularity&apiKey=${keyNews2}`;

const keyPhotos3 = '';

async function getResponses(location) {
    const respWeather = await fetch(urlWeather1(location));
    const respNews = await fetch(urlNews2(location));

    const dataWeather = await respWeather.json();
    const dataNews = await respNews.json();

    console.log(dataWeather, dataNews);

    //getting values for weather
    mainWeather.textContent = dataWeather.weather[0].main;
    mainTemp.textContent = `${Math.round(dataWeather.main.temp - 273,15)}°`;
    valueFeelsLike.textContent = `${Math.round(dataWeather.main.feels_like - 273,15)}°`;
    valueTempMinMax.textContent = Math.round(dataWeather.main.temp_min - 273,15) + '°/' + Math.round(dataWeather.main.temp_max - 273,15) + '°';
    valuePressure.textContent = `${dataWeather.main.pressure} in`;
    valueHumidity.textContent = `${dataWeather.main.humidity}%`;
    valueWind.textContent = `${(dataWeather.wind.speed).toFixed(1)} mph`;

    //getting values for news

}
getResponses('Dnipro');


//values in app
const mainTemp = document.querySelector('.main-temp');
const mainWeather = document.querySelector('.main-weather');
const valueFeelsLike = document.querySelector('.feels-like-value');
const valueTempMinMax = document.querySelector('.temp-minmax-value');
const valuePressure = document.querySelector('.pressure-value');
const valueHumidity = document.querySelector('.humidity-value');
const valueWind = document.querySelector('.wind-value');


const input = document.getElementById('search');
const city = document.querySelector('.city');

function selectCity() {

    input.addEventListener('keyup', (e) => {
        if (e.code === 'Enter') {
            city.textContent = input.value;
            input.value = '';
            // input.blur();
        } 
    });
}
selectCity();
                          

// {
//     "weather": [
//       {
//         "id": 501,
//         "main": "Rain",
//         "description": "moderate rain",
//         "icon": "10d"
//       }
//     ],
//     "base": "stations",
//     "main": {
//       "temp": 298.48,
//       "feels_like": 298.74,
//       "temp_min": 297.56,
//       "temp_max": 300.05,
//       "pressure": 1015,
//       "humidity": 64,
//     },
//     "wind": {
//       "speed": 0.62,
//       "deg": 349,
//     },
//     "clouds": {
//       "all": 100
//     },
//     "dt": 1661870592,
//     "sys": {
//       "type": 2,
//       "id": 2075663,
//       "country": "IT",
//       "sunrise": 1661834187,
//       "sunset": 1661882248
//     },
//     "timezone": 7200,
//     "id": 3163858,
//     "name": "Zocca",
//     "cod": 200
//   }                        
