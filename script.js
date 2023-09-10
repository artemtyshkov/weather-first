const keyWeather1 = '6e07f1b9464466e8886c4a31d35c862a';
const urlWeather1 = (enteredLocation) => `https://api.openweathermap.org/data/2.5/weather?q=${enteredLocation}&appid=${keyWeather1}`;

const keyNews2 = '4c6ea768d9074c66b72d7a6b270a1ac0';
const urlNews2 = (enteredLocation) => `https://newsapi.org/v2/everything?q=${enteredLocation}&sortBy=popularity&apiKey=${keyNews2}`;

// const keyPhotos3 = '';

const input = document.getElementById('search');
const city = document.querySelector('.city');

window.onload = input.focus();

// ________________________________________________________________________________________________________

async function getResponses(location) {
    document.querySelector('.loader').style.display = 'block';
    document.querySelector('.weather-data-container').classList.add('hide');

    const respWeather = await fetch(urlWeather1(location));
    const respNews = await fetch(urlNews2(location));

    const dataWeather = await respWeather.json();
    const dataNews = await respNews.json();

    document.querySelector('.loader').style.display = 'none';
    document.querySelector('.weather-data-container').classList.toggle('hide');

    console.log(dataWeather, dataNews);

    //getting values for weather
    document.querySelector('.main-weather').textContent = dataWeather.weather[0].main;
    document.querySelector('.main-temp').textContent = getDataWeather(dataWeather.main.temp);
    document.querySelector('.feels-like-value').textContent = getDataWeather(dataWeather.main.feels_like);
    document.querySelector('.feels-like-value').textContent = getDataWeather(dataWeather.main.feels_like);
    document.querySelector('.temp-minmax-value').textContent = getDataWeather(dataWeather.main.temp_min) + '/' + getDataWeather(dataWeather.main.temp_max);
    document.querySelector('.pressure-value').textContent = `${dataWeather.main.pressure} in`;
    document.querySelector('.humidity-value').textContent = `${dataWeather.main.humidity}%`;
    document.querySelector('.wind-value').textContent = `${(dataWeather.wind.speed).toFixed(1)} mph`;
    document.querySelector('.fa-arrow-up').style.setProperty('transform', `rotate(${dataWeather.wind.deg}deg)`);

    //getting values for news

}

// ________________________________________________________________________________________________________________________

function getDataWeather(weatherValue) {
    return weatherValue - 273.15 > 0 ? `+${Math.floor(weatherValue - 273.15)}°` : `-${Math.floor(weatherValue - 273.15)}°`;
}

function selectCity() {
    input.addEventListener('keyup', (e) => {
        if (e.code === 'Enter') {
            city.textContent = input.value;
            getResponses(`${input.value}`);
            input.value = '';
            input.blur();
        } 
    });
}
selectCity();
