window.addEventListener('DOMContentLoaded', () => {
    input.focus();
    const currentTime = new Date();
    if(currentTime.getHours() > 6 && currentTime.getHours() < 17) {
        document.getElementById('main').style.backgroundImage = 'url(img/afternoon.png)';
    } else {
        document.getElementById('main').style.backgroundImage = 'url(img/night.png)';
    }
});

const keyWeather1 = '6e07f1b9464466e8886c4a31d35c862a';
const urlWeather1 = (enteredLocation) => `https://api.openweathermap.org/data/2.5/weather?q=${enteredLocation}&appid=${keyWeather1}`;
const keyNews2 = '39ee0dc0254b92408ad7d62751ad74cc';
const urlNews2 = (enteredLocation) => `https://gnews.io/api/v4/search?q=${enteredLocation}&apikey=${keyNews2}`;
const keyPhotos3 = 'nTCkY5XRA7Sqw-zm7gU74m90b3kbqy8cOVEcZowcZxg';
const urlPhotos3 = (enteredLocation) => `https://api.unsplash.com/search/photos?per_page=50&query=${enteredLocation}&client_id=${keyPhotos3}`

const input = document.getElementById('search');
const city = document.querySelector('.city');

// ________________________________________________________________________________________________________

async function getResponses(location) {
    document.querySelector('.loader').style.display = 'block';

    document.querySelector('.weather-data-container').classList.add('hide');
    document.querySelector('.news-data-wrapper').classList.add('hide');
    document.querySelector('.photos-data-wrapper').classList.add('hide');

    try {
        const respWeather = await fetch(urlWeather1(location));
        const respNews = await fetch(urlNews2(location));
        const respPhotos = await fetch(urlPhotos3(location));
        if (!respWeather.ok || !respNews.ok || !respPhotos.ok) {
            throw new Error('Error');
        }
    } catch (error) {
        console.log(error);
    }

    const respWeather = await fetch(urlWeather1(location));
    const respNews = await fetch(urlNews2(location));
    const respPhotos = await fetch(urlPhotos3(location));

    const dataWeather = await respWeather.json();
    const dataNews = await respNews.json();
    const dataPhotos = await respPhotos.json();

    if (document.querySelector('.option-weather').classList.contains('active-btn')){
        document.querySelector('.weather-data-container').classList.remove('hide');
    } else if (document.querySelector('.option-news').classList.contains('active-btn')) {
        document.querySelector('.news-data-wrapper').classList.remove('hide');
    } else if (document.querySelector('.option-photos').classList.contains('active-btn')) {
        document.querySelector('.photos-data-wrapper').classList.remove('hide');
    }

    document.querySelector('.loader').style.display = 'none';

    getDataWeather(dataWeather);
    getDataPhotos(dataPhotos);
    getDataNews(dataNews);
}

// ________________________________________________________________________________________________________________________

function getFloorValueOfWeather(weatherValue) {
    return weatherValue - 273.15 > 0 ? `+${Math.floor(weatherValue - 273.15)}°` : `-${Math.floor(weatherValue - 273.15)}°`;
}

function selectCity() {
    input.addEventListener('keyup', (e) => {
        e.preventDefault();
        if (e.key === 'Enter') {
            const inputValue = input.value.trim().charAt(0).toUpperCase() + input.value.trim().slice(1);
            input.value = inputValue;
            city.innerHTML = `${input.value}<i class="fa-solid fa-xmark"></i>`;
            document.querySelector('.main-bottom').classList.add('bottom-opened');
            document.querySelector('.main-top').classList.remove('hide');
            document.querySelector('.main-bottom').classList.remove('hide');
            document.querySelector('#search').style.cssText = '';

            document.querySelector('.photos-data-container').innerHTML = '';
            document.querySelector('.news-data-container').innerHTML = '';
            if (document.querySelector('.weather-icon')) {
                document.querySelector('.weather-icon').remove();
            }
            getResponses(`${inputValue}`);
       
            input.value = '';
            input.style.display = 'none';
            input.blur();
        } 
    });
}
selectCity();

const tabs = document.querySelector('.tabs');
const btnWeather = document.querySelector('.option-weather');
const btnNews = document.querySelector('.option-news');
const btnPhotos = document.querySelector('.option-photos');


btnWeather.addEventListener('click', () => {
    if (btnWeather.classList.contains('active-btn')) return;

    btnWeather.classList.toggle('active-btn');

        // const timeOut = setTimeout(() => {
        //     document.querySelector('.main-bottom').style.height = '40%';
        //     document.querySelector('.main-top').style.height = '60%';
        // }, 500);
        
            document.querySelector('.weather-data-container').classList.remove('hide');
    document.querySelector('.news-data-wrapper').classList.add('hide');
    document.querySelector('.photos-data-wrapper').classList.add('hide');

    document.querySelector('.main-bottom').classList.remove('data-container-active');
    document.querySelector('.main-top').classList.remove('data-container-unactive');
    elemsToHide('mainVisible');

    btnNews.classList.remove('active-btn');
    btnPhotos.classList.remove('active-btn');
});

btnNews.addEventListener('click', () => {
    if (btnNews.classList.contains('active-btn')) return;

    btnNews.classList.toggle('active-btn');
    document.querySelector('.main-bottom').style.height = '';
    document.querySelector('.main-top').style.height = '';
    document.querySelector('.weather-data-container').classList.add('hide');
    document.querySelector('.news-data-wrapper').classList.remove('hide');
    document.querySelector('.photos-data-wrapper').classList.add('hide');
    document.querySelector('.main-bottom').classList.add('data-container-active');
    document.querySelector('.main-top').classList.add('data-container-unactive');
            
    elemsToHide('mainHidden');
    
    btnWeather.classList.remove('active-btn');
    btnPhotos.classList.remove('active-btn');
});
        
btnPhotos.addEventListener('click', () => {
    if (btnPhotos.classList.contains('active-btn')) return;
        
    document.querySelector('.main-bottom').style.height = '';
    document.querySelector('.main-top').style.height = '';

    btnPhotos.classList.toggle('active-btn');
    document.querySelector('.weather-data-container').classList.add('hide');
    document.querySelector('.news-data-wrapper').classList.add('hide');
    document.querySelector('.photos-data-wrapper').classList.remove('hide');
    document.querySelector('.main-bottom').classList.add('data-container-active');
    document.querySelector('.main-top').classList.add('data-container-unactive');

    function mainData() {
        document.querySelector('.main-temp').classList.add('secondary-temp');
    }
    mainData();
    elemsToHide('mainHidden');

    btnNews.classList.remove('active-btn');
    btnWeather.classList.remove('active-btn');
});

document.addEventListener('click', (e) =>{
    const target = e.target.closest('.fa-xmark');

    if(target){
    target.parentElement.textContent = '';
    document.querySelector('.main-top').classList.toggle('hide');
    document.querySelector('.main-bottom').classList.toggle('hide');
    document.querySelector('.main-bottom').classList.remove('bottom-opened');
    input.style.display = 'block';
    }
});

// for weather data

function getDataWeather(dataWeather) {
    document.querySelector('.main-weather').textContent = dataWeather.weather[0].main;
    document.querySelector('.main-temp').textContent = getFloorValueOfWeather(dataWeather.main.temp);

    const img = document.createElement('img');
    img.setAttribute('src', `http://openweathermap.org/img/wn/${dataWeather.weather[0].icon}.png`);
    img.setAttribute('alt', `weather icon`);
    img.classList.add('weather-icon');
    document.querySelector('.main-weather').after(img);

    const sunriseMil = dataWeather.sys.sunrise;
    let sunriseMin = Math.floor((sunriseMil / 60) % 60);
    if (sunriseMin < 10) {sunriseMin = `0${sunriseMin}`}
    let sunriseHour = Math.floor((sunriseMil / 3600) % 24);
    if (sunriseHour < 10) {sunriseHour = `0${sunriseHour}`}
    const sunsetMil = dataWeather.sys.sunset;
    let sunsetMin = Math.floor((sunsetMil / 60) % 60);
    if (sunsetMin < 10) {sunsetMin = `0${sunsetMin}`}
    let sunsetHour = Math.floor((sunsetMil / 3600) % 24);
    if (sunsetHour < 10) {sunsetHour = `0${sunsetHour}`}


    document.querySelector('.weather-data-container').innerHTML = `
        <div class="temp-feels-like">
            <span class="weather-data-text">Feels Like</span>
            <span class="feels-like-value">${getFloorValueOfWeather(dataWeather.main.feels_like)}</span>
        </div>
        <div class="temp-minmax">
            <span class="weather-data-text">Min/max</span>
            <span class="temp-minmax-value">${getFloorValueOfWeather(dataWeather.main.temp_min) + '/' + getFloorValueOfWeather(dataWeather.main.temp_max)}</span>
        </div>
        <div class="pressure">
            <span class="weather-data-text">Pressure</span>
            <span class="pressure-value">${dataWeather.main.pressure} in</span>
        </div>
        <div class="humidity">
            <span class="weather-data-text">Humidity</span>
            <span class="humidity-value">${dataWeather.main.humidity}%</span>
        </div>
        <div class="wind">
            <span class="weather-data-text">Wind</span>
            <div class="wind-table">
                <i class="fa-solid fa-arrow-up"></i>                            
                <span class="wind-value">${(dataWeather.wind.speed).toFixed(1)} mph</span>
            </div>
        </div>
        <div class="sunrise">
            <span class="weather-data-text">Sunrise</span>
            <span class="sunrise-value">${sunriseHour}:${sunriseMin}</span>
        </div>
        <div class="sunset">
            <span class="weather-data-text">Sunset</span>
            <span class="sunset-value">${sunsetHour}:${sunsetMin}</span>
        </div>
    `;

    document.querySelector('.fa-arrow-up').style.setProperty('transform', `rotate(${dataWeather.wind.deg}deg)`);
}

function getDataNews(dataNews) {
    for (let i = 0; i <= 20; i++) {
        if (dataNews.articles[i]) {
            const div = document.createElement('div');
            const img = document.createElement('img');
            const p = document.createElement('p');
    
            div.classList.add('news', `news-${i}`);
    
            img.classList.add('news-image');
            // console.log(dataNews.articles[i].image);
            img.setAttribute('src', `${dataNews.articles[i].image}`);
            // img.setAttribute('alt', `${dataNews.articles[i].title}`);
    
            p.classList.add('news-title');
    
            const textNodeP = dataNews.articles[i].title;
            if (textNodeP.split(' ').lenght > 12) {
                p.textContent = `${dataNews.articles[i].title}`;
            } else {
                p.textContent = `${textNodeP.split(' ').slice(0, 12).join(' ')}...`;
            };
    
            document.querySelector('.news-data-container').appendChild(div);
            div.appendChild(img);
            div.appendChild(p);
            
            div.addEventListener('click', () => {
                // window.location.href = `${dataNews.articles[i].url}`;
                window.open(`${dataNews.articles[i].url}`, '_blank'); ;
            });
        }

    }
}

function getDataPhotos(dataPhotos) {
    for (let i = 0; i <= 27; i++) {
        
        if (dataPhotos.results[i]) {
            const div = document.createElement('div');
            const img = document.createElement('img');
        
            div.classList.add('image-content');
            img.classList.add('image');
            img.setAttribute('src', `${dataPhotos.results[i].urls.small}`);
            img.setAttribute('alt', `${dataPhotos.results[i].alt_description}`);
            
            document.querySelector('.photos-data-container').appendChild(div);
            div.appendChild(img);
        }

    }
}

function elemsToHide(elem) {
    if (elem == 'mainHidden') {
        document.querySelector('.main-top-container').style.display = 'none';
    } else if (elem == 'mainVisible') {
        document.querySelector('.main-top-container').style.display = 'flex';
    }
}

const swipeYLimit = 220;
let startY = null;
let touchTime = null;

document.querySelector('.main-bottom').addEventListener('touchstart', e => {
    const { touches } = e;
     touchTime = new Date().getTime();
    console.log(touchTime);
    // const diff = new Date() - touchTime;
    // console.log(diff);
    
    if (touches && touches.length === 1) {
        const touch = touches[0];
         startY = touch.clientY;
         console.log(startY);
        document.querySelector('.main-bottom').addEventListener('touchmove', moveTouch);
        document.querySelector('.main-bottom').addEventListener('touchend', endTouch);
    }
});

const moveTouch = e => {
   
    const progressY = startY - e.touches[0].clientY;
    //
    console.log(touchTime);
    console.log(startY);
    //
    const translation = progressY > 0 ? -Math.abs(progressY) : Math.abs(progressY);
    console.log(translation);
    if (translation < 0) {
        return;
    } else if (translation > 0 && translation < swipeYLimit) {
        document.querySelector('.main-bottom').style.setProperty('transform', `translateY(${translation}px)`);
    }
};

const endTouch = (e) => {
    const finishingTouch = e.changedTouches[0].clientY;
    console.log(finishingTouch);
    if (startY < finishingTouch - swipeYLimit) {  
        document.querySelector('.main-top').classList.remove('data-container-unactive');
        document.querySelector('.main-bottom').style.cssText = '';
        document.querySelector('.main-bottom').classList.toggle('hide');
        document.querySelector('.weather-data-container').classList.remove('hide');
        btnWeather.classList.toggle('active-btn');

    document.querySelector('.news-data-wrapper').classList.add('hide');
    document.querySelector('.photos-data-wrapper').classList.add('hide');

    elemsToHide('mainVisible');

    btnNews.classList.remove('active-btn');
    btnPhotos.classList.remove('active-btn');
 
    document.querySelector('.main-bottom').classList.toggle('hide');
    } else if (startY > finishingTouch + swipeYLimit){
        progressY = 0; 
    }
    document.querySelector('.main-bottom').removeEventListener('touchmove', moveTouch);
    document.querySelector('.main-bottom').removeEventListener('touchend', endTouch);
};

document.documentElement.addEventListener('click', e  => {
    console.log(e);
});

document.querySelector('.photos-data-container').addEventListener('click', e => {
    const target = e.target;

    if (target.classList.contains('image')) {
        document.querySelector('.full-image-box').style.display = 'flex';
        document.querySelector('.full-image').src = target.src.replace('400', '1080');
        document.querySelector('.full-image').alt = target.alt;
    }
});

function closeFullImage() {
    document.querySelector('.full-image-box').style.display = 'none';
}