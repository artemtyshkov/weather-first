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
    document.querySelector('.news-data-container').classList.add('hide');
    document.querySelector('.photos-data-container').classList.add('hide');

    const respWeather = await fetch(urlWeather1(location));
    const respNews = await fetch(urlNews2(location));

    const dataWeather = await respWeather.json();
    const dataNews = await respNews.json();

    if (document.querySelector('.option-weather').classList.contains('active-btn')){
        document.querySelector('.weather-data-container').classList.remove('hide');
    } else if (document.querySelector('.option-news').classList.contains('active-btn')) {
        document.querySelector('.news-data-container').classList.remove('hide');
    } else if (document.querySelector('.option-photos').classList.contains('active-btn')) {
        document.querySelector('.photos-data-container').classList.remove('hide');
    }

    document.querySelector('.loader').style.display = 'none';

    console.log(dataNews);

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

    getDataNews(dataNews);
}

// ________________________________________________________________________________________________________________________

function getDataWeather(weatherValue) {
    return weatherValue - 273.15 > 0 ? `+${Math.floor(weatherValue - 273.15)}°` : `-${Math.floor(weatherValue - 273.15)}°`;
}

function selectCity() {
    input.addEventListener('keyup', (e) => {
        if (e.code === 'Enter') {
            city.textContent = input.value;
            city.innerHTML = `
                ${input.value}<i class="fa-solid fa-xmark"></i>
            `;
            getResponses(`${input.value}`);
            input.value = '';
            input.style.display = 'none';
            input.blur();
        } 
    });
}
selectCity();

const nav = document.querySelector('.nav');
const btnWeather = document.querySelector('.option-weather');
const btnNews = document.querySelector('.option-news');
const btnPhotos = document.querySelector('.option-photos');

btnWeather.addEventListener('click', () => {
    if (btnWeather.classList.contains('active-btn')) {
        return;
    } else {
        btnWeather.classList.toggle('active-btn');
        document.querySelector('.weather-data-container').classList.remove('hide');
        document.querySelector('.news-data-container').classList.add('hide');
        document.querySelector('.photos-data-container').classList.add('hide');

        document.querySelector('.main-bottom').classList.remove('data-container-active');
        document.querySelector('.main-top').classList.remove('data-container-unactive');
    }

    btnNews.classList.remove('active-btn');
    btnPhotos.classList.remove('active-btn');
});

btnNews.addEventListener('click', () =>{
    if (btnNews.classList.contains('active-btn')) {
        return;
    } else {
        btnNews.classList.toggle('active-btn');
        document.querySelector('.weather-data-container').classList.add('hide');
        document.querySelector('.news-data-container').classList.remove('hide');
        document.querySelector('.photos-data-container').classList.add('hide');

        document.querySelector('.main-bottom').classList.add('data-container-active');
        document.querySelector('.main-top').classList.add('data-container-unactive');
    }

    btnWeather.classList.remove('active-btn');
    btnPhotos.classList.remove('active-btn');
});

btnPhotos.addEventListener('click', () =>{
    if (btnPhotos.classList.contains('active-btn')) {
        return;
    } else {
        btnPhotos.classList.toggle('active-btn');
        document.querySelector('.weather-data-container').classList.add('hide');
        document.querySelector('.news-data-container').classList.add('hide');
        document.querySelector('.photos-data-container').classList.remove('hide');
    }

    btnNews.classList.remove('active-btn');
    btnWeather.classList.remove('active-btn');
});

document.addEventListener('click', (e) =>{
    const target = e.target.closest('.fa-xmark');

    if(target){
    target.parentElement.textContent = '';
    input.style.display = 'block';
    }
});

// for news data

function getDataNews(dataNews) {
    for (let i = 0; i <= 10; i++) {
        const div = document.createElement('div');
        const img = document.createElement('img');
        const p = document.createElement('p');

        div.classList.add('news', `news-${i}`);

        img.classList.add('news-image');
        img.setAttribute('src', `${dataNews.articles[i].urlToImage}`);
        img.setAttribute('alt', `${dataNews.articles[i].title}`);

        p.classList.add('news-title');

        const textNodeP = dataNews.articles[i].description;
        if (textNodeP.split(' ').lenght > 12) {
            p.textContent = `${dataNews.articles[i].description}`
        } else {
            p.textContent = `${textNodeP.split(' ').slice(0, 12).join(' ')}...`
        };

        document.querySelector('.news-data-container').appendChild(div);
        div.appendChild(img);
        div.appendChild(p);
    }
}