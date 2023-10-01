window.onload = function() {
    input.focus();
    document.querySelector('.main-top').style.height = '100%';
    document.querySelector('#search').style.cssText = `
        position: relative;
        top: 35%;
    `;
}

const keyWeather1 = '6e07f1b9464466e8886c4a31d35c862a';
const urlWeather1 = (enteredLocation) => `https://api.openweathermap.org/data/2.5/weather?q=${enteredLocation}&appid=${keyWeather1}`;
const keyNews2 = '4c6ea768d9074c66b72d7a6b270a1ac0';
const urlNews2 = (enteredLocation) => `https://newsapi.org/v2/everything?q=${enteredLocation}&sortBy=popularity&apiKey=${keyNews2}`;
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

    // console.log(dataWeather, dataNews, dataPhotos);

    //getting values for weather

    getDataWeather(dataWeather);
    // document.querySelector('.main-weather').textContent = dataWeather.weather[0].main;
    // document.querySelector('.main-temp').textContent = getDataWeather(dataWeather.main.temp);
    // document.querySelector('.feels-like-value').textContent = getDataWeather(dataWeather.main.feels_like);
    // document.querySelector('.feels-like-value').textContent = getDataWeather(dataWeather.main.feels_like);
    // document.querySelector('.temp-minmax-value').textContent = getDataWeather(dataWeather.main.temp_min) + '/' + getDataWeather(dataWeather.main.temp_max);
    // document.querySelector('.pressure-value').textContent = `${dataWeather.main.pressure} in`;
    // document.querySelector('.humidity-value').textContent = `${dataWeather.main.humidity}%`;
    // document.querySelector('.wind-value').textContent = `${(dataWeather.wind.speed).toFixed(1)} mph`;
    // document.querySelector('.fa-arrow-up').style.setProperty('transform', `rotate(${dataWeather.wind.deg}deg)`);

    //getting values for news
    getDataNews(dataNews);

    //getting values for photos
    getDataPhotos(dataPhotos);

}

// ________________________________________________________________________________________________________________________

function getFloorValueOfWeather(weatherValue) {
    return weatherValue - 273.15 > 0 ? `+${Math.floor(weatherValue - 273.15)}°` : `-${Math.floor(weatherValue - 273.15)}°`;
}

function selectCity() {
    input.addEventListener('keyup', (e) => {
        e.preventDefault();
        if (e.key === 'Enter') {
            // city.textContent = input.value;
            // const inputValue = input.value.split('')[0].toUpperCase().join('');
            const inputValue = input.value.trim().charAt(0).toUpperCase() + input.value.trim().slice(1);
            input.value = inputValue;
            city.innerHTML = `${input.value}<i class="fa-solid fa-xmark"></i>`;
            document.querySelector('.main-top').style.height = '';
            document.querySelector('.main-top').classList.add('height-60');
            document.querySelector('#search').style.cssText = '';

            document.querySelector('.photos-data-container').innerHTML = '';
            document.querySelector('.news-data-container').innerHTML = '';
            getResponses(`${inputValue}`);
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
    if (btnWeather.classList.contains('active-btn')) return;

    btnWeather.classList.toggle('active-btn');

    // new
        document.querySelector('.main-bottom').style.height = '0';
        document.querySelector('.main-top').style.height = '100%';
        const timeOut = setTimeout(() => {
            document.querySelector('.main-bottom').style.height = '40%';
            document.querySelector('.main-top').style.height = '60%';
            document.querySelector('.weather-data-container').classList.remove('hide');
        }, 500);


    document.querySelector('.news-data-wrapper').classList.add('hide');
    document.querySelector('.photos-data-wrapper').classList.add('hide');
    // document.querySelector('.weather-data-container').classList.remove('hide');



    document.querySelector('.main-bottom').classList.remove('data-container-active');
    document.querySelector('.main-top').classList.remove('data-container-unactive');
    elemsToHide('mainVisible');

    btnNews.classList.remove('active-btn');
    btnPhotos.classList.remove('active-btn');
});

btnNews.addEventListener('click', () =>{
    if (btnNews.classList.contains('active-btn')) return;

    btnNews.classList.toggle('active-btn');
    document.querySelector('.main-bottom').style.height = '';
    document.querySelector('.main-top').style.height = '';
    document.querySelector('.weather-data-container').classList.add('hide');
    document.querySelector('.news-data-wrapper').classList.remove('hide');
    document.querySelector('.photos-data-wrapper').classList.add('hide');
    document.querySelector('.main-bottom').classList.add('data-container-active');
    document.querySelector('.main-top').classList.add('data-container-unactive');
    
    // document.querySelector('.news-data-container').addEventListener('scroll', elem => {
        //     // const coords = elem.getBoundingClientRect();
        //     setInterval(()=> {
            //         console.log(document.querySelector('.news-data-container').getBoundingClientRect());
            //         console.log(document.querySelector('.news-data-container').scrollY);
            //     }, 1000);
            // });
            
            elemsToHide('mainHidden');
            
            btnWeather.classList.remove('active-btn');
            btnPhotos.classList.remove('active-btn');
        });
        
btnPhotos.addEventListener('click', () =>{
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
    input.style.display = 'block';
    }
});

// for weather data

function getDataWeather(dataWeather) {
    document.querySelector('.main-weather').textContent = dataWeather.weather[0].main;
    document.querySelector('.main-temp').textContent = getFloorValueOfWeather(dataWeather.main.temp);

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
    `;

    document.querySelector('.fa-arrow-up').style.setProperty('transform', `rotate(${dataWeather.wind.deg}deg)`);
}

// for news data

function getDataNews(dataNews) {
    for (let i = 0; i <= 20; i++) {
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
        div.addEventListener('click', (e) => {
            // const target = e.target;
            // window.location.href = `${dataNews.articles[i].url}`;
            window.open(`${dataNews.articles[i].url}`, '_blank'); ;
        }, false);
    }
}

//for photos data

function getDataPhotos(dataPhotos) {
    for (let i = 0; i <= 27; i++) {
        const div = document.createElement('div');
        const img = document.createElement('img');
    
        div.classList.add('image-content');
    
        img.setAttribute('src', `${dataPhotos.results[i].urls.small}`);
        img.setAttribute('alt', `${dataPhotos.results[i].alt_description}`);

        document.querySelector('.photos-data-container').appendChild(div);
        div.appendChild(img);
    }
}

function elemsToHide(elem) {
    if (elem == 'mainHidden') {
        document.querySelector('.main-weather').style.visibility = 'hidden';
        document.querySelector('.main-temp').style.visibility = 'hidden';
        document.querySelector('#search').style.visibility = 'hidden';
        document.querySelector('.city').style.visibility = 'hidden';
    } else if (elem == 'mainVisible') {
        document.querySelector('.main-weather').style.visibility = 'visible';
        document.querySelector('.main-temp').style.visibility = 'visible';
        document.querySelector('#search').style.visibility = 'visible';
        document.querySelector('.city').style.visibility = 'visible';
    }
}

const mainBottom = document.querySelector('.main-bottom');

// document.querySelector('.data-container-active').addEventListener('scroll', elem => {
//     const coords = elem.getBoundingClientRect();
//     setInterval(() => console.log(coords), 5000);
// });