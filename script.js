const apiKey = '8ec7bf65de60c24cd8cc5785a686cad5';

const defaultLat = 59.926547;
const defaultLon = 30.342669;
const defaultCity = 'Saint Petersburg';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const temperature = document.getElementById('temperature');
const city = document.getElementById('city');
const cityName = city.textContent.split(',')[0].trim(); 
const cityInput = document.getElementById('city-input');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const precipitation = document.getElementById('precipitation');
const windSpeed = document.getElementById('wind');

const appWeatherIcon = document.querySelector('.app__weather__icon');

const searchForm = document.getElementById('search-form');
const openMapButton = document.querySelector('.app__openmap__button');

const appWeather = document.getElementById('app-weather');
const weatherAdvice = document.querySelector('.app__weather__advice');

const cityBackgrounds = {
    'London': 'images/cities/london.jpg',
    'Sydney': 'images/cities/sydney.jpg',
    'Melbourne': 'images/cities/melbourne.jpg',
    'Paris': 'images/cities/paris.jpg',
    'New York': 'images/cities/new_york.jpg',
    'Tokyo': 'images/cities/tokyo.jpg',
    'Moscow': 'images/cities/moscow.jpg',
    'Saint Petersburg': 'images/cities/saint_petersburg.jpg'
}

const weatherAdvices = {
    cloud_hot: 'images/advices/cloud_hot_advice.png',
    cloud_chilly: 'images/advices/cloud_chilly_advice.png',
    cloud_warm: 'images/advices/cloud_warm_advice.png',
    cloud_cold: 'images/advices/cloud_cold_advice.png',
    rain_cold: 'images/advices/rain_cold_advice.png',
    rain_chilly: 'images/advices/rain_chilly_advice.png',
    rain_warm: 'images/advices/rain_warm_advice.png',
    rain_hot: 'images/advices/rain_hot_advice.png',
    sun_cold: 'images/advices/sun_cold_advice.png',
    sun_chilly: 'images/advices/sun_chilly_advice.png',
    sun_warm: 'images/advices/sun_warm_advice.png',
    sun_hot: 'images/advices/sun_hot_advice.png',
    default: 'images/advices/default_advice.png',
};


function makeFirstLetterUpper(phrase) {
    return phrase[0].toUpperCase() + phrase.slice(1);
}

/* Default front after loading 
================================ */
document.addEventListener('DOMContentLoaded', () => {
    setCurrentDate();
    const currentDay = setCurrentDay();
    setNextDays(currentDay);
    getWeatherByCity(defaultCity);
    setCityBackground(cityName);
    getNextDaysWeather(defaultLat, defaultLon);
    /*getWeatherByMap(defaultLat, defaultLon);*/
});


/* Day and Date
===================== */
function formatDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

function setCurrentDate() {
    const currentDateElement = document.getElementById('currentDate');
    const currentDate = new Date();
    currentDateElement.textContent = formatDate(currentDate);
}

function setCurrentDay() {
    const currentDayElement = document.getElementById('currentDay');
    const currentDay = new Date().getDay();
    currentDayElement.textContent = days[currentDay];
    return currentDay;
}

function setNextDays(currentDay) {
    for (let i = 1; i < 5; i++) {
        const nextDay = document.getElementById(`next-day${i}`);
        nextDay.textContent = days[(currentDay + i) % 7].slice(0, 3);
    }
}


/* Set city photo */
function setCityBackground(cityName) {
    const backgroundImage = cityBackgrounds[cityName];
    if (backgroundImage) {
        appWeather.style.backgroundImage = `url(${backgroundImage})`;
    } else {
        appWeather.style.backgroundImage = `url('images/cities/weather_background.jpeg')`;
    }
}

/* Prepare tempreture to show
============================== */
function updateTemp(temp, element) {
    const temperatureValue = convertTemp(temp);
    element.style.color = setTempColor(temperatureValue);
    return `${temperatureValue} °C`;

}

function convertTemp(temp) {
    return Math.round(temp);
} 

function setTempColor(temp) {
    if (temp < -20) {
        return "blue";
    } else if ( temp < 0 ) {
        return "lightskyblue";
    } else if ( temp > 10 && temp < 25) {
        return "moccasin";
    } else if ( temp > 24) {
        return "orangered";
    } else {
        return "white";
    };
};


/* Change weather icons
======================== */
function updateWeatherIcon(mainweather) {
    const iconMapping = {
        Clear: 'sun', // Ясная погода
        Clouds: 'cloud', // Облачно
        FewClouds: 'cloud_sun', // Небольшая облачность
        ScatteredClouds: 'cloud_cloudy_sun', // Рассеянная облачность
        Drizzle: 'cloud_drizzle', // Мелкий дождь
        Rain: 'cloud_rain', // Дождь
        Thunderstorm: 'cloud_heavy_rain', // Гроза
        Snow: 'cloud_cold_snow', // Снег
        Mist: 'cloud', // Туман
        Fog: 'cloud', // Мгла
        Haze: 'sun_umbrella', // Лёгкая дымка
        Smoke: 'cloud', // Дым
        Dust: 'cloud', // Пыль
        Sand: 'cloud', // Песчаная буря
        Ash: 'cloud', // Вулканический пепел
        Squall: 'cloud_cloudy_sun', // Шквалы
        Tornado: 'cloud_heavy_rain' // Торнадо
    };

    const iconName = iconMapping[mainweather] || 'cloud';
    appWeatherIcon.src = `images/weather_icons/${iconName}.svg`;
    appWeatherIcon.alt = mainweather;
}

/* Change advice pictures
======================== 
*/

function updateWeatherAdvice(mainweather, temp) {
    const adviceMapping = {
        Clear: 'sun',
        Clouds: 'cloud',
        FewClouds: 'sun',
        ScatteredClouds: 'cloud',
        Drizzle: 'rain',
        Rain: 'rain',
        Thunderstorm: 'rain',
        Snow: 'snow',
        Mist: 'cloud',
        Fog: 'cloud',
        Haze: 'sun',
        Smoke: 'cloud',
        Dust: 'sun',
        Sand: 'sun',
        Ash: 'cloud',
        Squall: 'cloud',
        Tornado: 'rain',
    };

    const temperatureRanges = {
        cold: temp < 0,
        chilly: temp >= 0 && temp < 10,
        warm: temp >= 10 && temp < 20,
        hot: temp >= 20,
    };

    const adviceKeyBase = adviceMapping[mainweather] || 'default';
    let adviceKey = adviceKeyBase;

    if (temperatureRanges.cold) adviceKey += '_cold';
    else if (temperatureRanges.chilly) adviceKey += '_chilly';
    else if (temperatureRanges.warm) adviceKey += '_warm';
    else if (temperatureRanges.hot) adviceKey += '_hot';

    if (weatherAdvice) {
        weatherAdvice.src = weatherAdvices[adviceKey] || weatherAdvices['default'];
        weatherAdvice.alt = `${mainweather} advice`;

        const styleMapping = {
            sun: { width: '105px', top: '10%' },
            cloud_chilly: { width: '65px', top: '8%' },
            cloud_hot: { width: '75px', top: '8%' },
            cloud_warm: { width: '75px', top: '8%' },
            cloud_cold: { width: '75px', top: '8%' },
            rain: { width: '95px', top: '5%' },
        };

        const style = Object.entries(styleMapping).find(([key]) => adviceKey.includes(key))?.[1] || {};
        weatherAdvice.style.width = style.width || '';
        weatherAdvice.style.top = style.top || '';
    }
}

/*Search weather by city name
============================== */
async function getWeatherByCity(cityName) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Failed to get weather data by city name');
        }

        const data = await response.json();
        console.log('Successfullly got weather data by city name');
        city.textContent = `${data.name}, ${data.sys.country}`;
        description.textContent = makeFirstLetterUpper(data.weather[0].description);
        humidity.textContent = `${data.main.humidity}%`;
        precipitation.textContent = `${data.rain?.['1h'] || 0}%`; 
        windSpeed.textContent = `${data.wind.speed} km/h`;
        temperature.textContent = updateTemp(data.main.temp, temperature);
        updateWeatherIcon(data.weather[0].main);
        updateWeatherAdvice(data.weather[0].main, convertTemp(data.main.temp));
        setCityBackground(cityName);

        const { lat, lon } = data.coord;
        await getNextDaysWeather(lat, lon);

    } catch (error) {
        alert('Unable to fetch weather data for next days. Please check your Internet connection or VPN and try again.');
        console.error(error);
    }
};

searchForm.addEventListener('submit', async(event) => {
    event.preventDefault();

    const inputElement = document.getElementById('city-input');
    const cityName = inputElement.value.trim();

    if (!cityName) {
        alert( 'Please select or enter a city' );
        return;
    }

    await getWeatherByCity(cityName);
    inputElement.value = '';
});

/* Search weather with map 
========================== */
let map, marker;

openMapButton.addEventListener('click', () => {
    const mapContainer = document.getElementById('map');
    mapContainer.style.display = 'block'; // Показываем карту

    // Инициализация карты
    if (!map) {
        map = L.map('map').setView([defaultLat, defaultLon], 10); // Начальная позиция (Санкт-Петербург)

        // Добавляем слой карты (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        // Добавляем маркер
        marker = L.marker([defaultLat, defaultLon], { draggable: true }).addTo(map);
    }

    // Событие при перемещении маркера
    marker.on('dragend', () => {
        const { lat, lng } = marker.getLatLng();
        getWeatherByMap(lat, lng); // Обновляем прогноз погоды
        getNextDaysWeather(lat, lng);
        mapContainer.style.display = 'none'; // Скрываем карту
    });
});

async function getWeatherByMap(lat, lon) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=en`
        );
        const data = await response.json();

        city.textContent = `${data.name}, ${data.sys.country}`;
        description.textContent = makeFirstLetterUpper(data.weather[0].description);
        humidity.textContent = `${data.main.humidity}%`;
        precipitation.textContent = `${data.rain?.['1h'] || 0}%`; 
        windSpeed.textContent = `${data.wind.speed} km/h`;
        temperature.textContent = updateTemp(data.main.temp, temperature);
        updateWeatherIcon(data.weather[0].main);
        updateWeatherAdvice(data.weather[0].main, convertTemp(data.main.temp));

    } catch (error) {
        alert('Unable to fetch weather data. Please check your VPN or Internet connection and try again.');
    }
};

/* Show weather for next 4 days
================================= */
async function getNextDaysWeather(lat, lon) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,weathercode&timezone=auto`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        const nextDaysTemp = data.daily.temperature_2m_max;

        for (let i = 1; i < 5; i++) {
            let nextDay = document.getElementById(`next-temp${i}`);
            let nextDayTemp = convertTemp(nextDaysTemp[i]);
            if (nextDayTemp > 0) {
                nextDay.textContent = `+${nextDayTemp} °C`;
            } else {
                nextDay.textContent = `${nextDayTemp} °C`;
            }

            let nextDayImg = document.getElementById(`next-day-img${i}`);
        };

    } catch (error) {
        alert('Unable to fetch weather data for next days. Please check your Internet connection or VPN and try again.');
        console.error(error);
    }
};

