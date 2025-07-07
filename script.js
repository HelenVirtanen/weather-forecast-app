const apiKey = '8ec7bf65de60c24cd8cc5785a686cad5';

const defaultLat = 59.926547;
const defaultLon = 30.342669;
const defaultCity = 'Saint Petersburg';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const currentDay = new Date().getDay();
const currentDate = new Date();
const currentDayElement = document.getElementById('currentDay');
const currentDateElement = document.getElementById('currentDate');

const city = document.getElementById('city');
const cityName = city.textContent.split(',')[0].trim(); 
const cityInput = document.getElementById('city-input');

const temperature = document.getElementById('temperature');

const appWeatherIcon = document.querySelector('.app__weather__icon');

let cityBackgrounds = {};

async function loadCityBackgrounds() {
    try {
        const response = await fetch('./data/cities.json');
        if (!response.ok) throw new Error('Failed to load city backgrounds JSON');

        cityBackgrounds = await response.json();
    } catch (error) {
        console.error('Error while loading cityBackgrounds:', error);
    }
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

const weatherFeatures = document.getElementById('weather-features-list');
const weatherFeatureValue = document.querySelector('.app__list-item-value');
const tempFeelsLike = document.getElementById('feels-like');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const precipitation = document.getElementById('precipitation');
const windSpeed = document.getElementById('wind');
const pressure = document.getElementById('pressure');


const nextDays = document.getElementById('next-days');
const currentDayInfo = document.getElementById('next-day0');
const currentDayTempInfo = document.getElementById('next-temp0');
const currentDayIcon = document.getElementById('next-day-img0'); 
let forecastNextDaysNoon = [];
let currentWeatherToday = [];

const searchForm = document.getElementById('search-form');
const openMapButton = document.querySelector('.app__openmap__button');

const appWeather = document.getElementById('app-weather');
const weatherAdvice = document.querySelector('.app__weather__advice');


function makeFirstLetterUpper(phrase) {
    return phrase[0].toUpperCase() + phrase.slice(1);
}

function roundValue(value) {
    return Math.round(value);
}

/* Default front after loading */
document.addEventListener('DOMContentLoaded', async () => {
    await loadCityBackgrounds();
    setCurrentDate();
    setCurrentDay();
    getWeatherByCity(defaultCity);
    setCityBackground(cityName);
    getWeatherNextDaysNoon(defaultLat, defaultLon);
});

/* Set current day, next days and date */
function formatDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

function setCurrentDate() {
    currentDateElement.textContent = formatDate(currentDate);
}

function setCurrentDay() {
    currentDayElement.textContent = days[currentDay];
    currentDayInfo.textContent = days[(currentDay) % 7].slice(0, 3);
    return currentDay;
}

/* Set city background */
function setCityBackground(cityName) {
    const backgroundImage = cityBackgrounds[cityName];
    if (backgroundImage) {
        appWeather.style.backgroundImage = `url(${backgroundImage})`;
    } else {
        appWeather.style.backgroundImage = `url('images/cities/weather_background.webp')`;
    }
}

/* Convert and style tempreture */
function updateTemp(temp, element) {
    const temperatureValue = roundValue(temp);
    element.style.color = setTempColor(temperatureValue);
    return formatTemp(temperatureValue);
}

function setTempColor(temp) {
    if (temp < -20) {
        return "deepskyblue";
    } else if (temp < 0) {
        return "lightskyblue";
    } else if (temp >= 0 && temp < 5) {
        return "white";
    } else if (temp >= 5 && temp < 16) {
        return "moccasin";
    } else if (temp >= 15 && temp < 25) {
        return "gold";
    } else if ( temp >= 25 && temp < 35) {
        return "darkorange";   
    } else if ( temp >= 35) {
        return "orangered";
    };
};

function formatTemp(temp) {
    if (temp > 0) {
        return `+${temp} °C`;
    } else {
        return `${temp} °C`;
    };
}

/* Convert and style wind speed */
function updateWind(wind, element) {
    const windValue = roundValue(wind);
    element.style.color = setWindColor(windValue);
    return `${windValue} m/s`;
}

function setWindColor(wind) {
    if (wind < 4) {
        return "cornflowerblue";
    } else if ( wind >= 4 && wind < 8) {
        return "lightpink";
    } else if ( wind >= 8 && wind < 14) {
        return "hotpink";
    } else if ( wind >= 14 && wind < 21) {
        return "deeppink";   
    } else if ( wind >= 21) {
        return "MediumVioletRed";
    };
}

/* Convert and style pressure */
function updatePressure(pressure, element) {
    const pressureValue = calculatePressure(pressure);
    element.style.color = setPressureColor(pressureValue);
    return `${pressureValue} mmHg`;
}

function calculatePressure(pressure) {
    return roundValue(pressure * 0.750063);
}

function setPressureColor(pressure) {
    if (pressure < 750) {
        return "yellowgreen";
    } else if (pressure >= 750 && pressure < 765) {
        return "cornflowerblue"; 
    } else if (pressure >= 765) {
        return "deeppink"; 
    };
}

/* Style humidity */
function updateHumidity(humidityProc, element) {
    element.style.color = setHumidityColor(humidityProc);
    return `${humidityProc} %`;
}

function setHumidityColor(humidityProc) {
    if (humidityProc < 31) {
        return "yellowgreen";
    } else if (humidityProc >= 31 && humidityProc < 61) {
        return "cornflowerblue"; 
    } else if (humidityProc >= 61 && humidityProc < 91) {
        return "deeppink"; 
    } else if (humidityProc >= 91) {
        return "MediumVioletRed";
    };
}

/* Style precipitation */
function updatePrecipitation(rainValue, element) {
    element.style.color = setPrecipitationColor(rainValue);
    return `${rainValue} %`;
}

function setPrecipitationColor(rainValue) {
    if (rainValue < 6) {
        return "cornflowerblue";
    } else if ( rainValue >= 6 && rainValue < 20) {
        return "royalblue";
    } else if ( rainValue >= 20 && rainValue < 50) {
        return "BlueViolet";
    } else if ( rainValue >= 50 && rainValue < 100) {
        return "deeppink";   
    } else if ( rainValue >= 100) {
        return "MediumVioletRed";
    };
}

/* Change weather icons */
function updateWeatherIcon(mainweather, element) {
    const iconName = iconMapping[mainweather] || 'cloud';
    element.src = `images/weather_icons/${iconName}.svg`;
    element.alt = mainweather;
}

/* Change advice pictures */
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
            cloud_chilly: { width: '70px', top: '10%' },
            cloud_hot: { width: '75px', top: '8%' },
            cloud_warm: { width: '75px', top: '8%' },
            cloud_cold: { width: '75px', top: '8%' },
            rain: { width: '105px', top: '8%' },
        };

        const style = Object.entries(styleMapping).find(([key]) => adviceKey.includes(key))?.[1] || {};
        weatherAdvice.style.width = style.width || '';
        weatherAdvice.style.top = style.top || '';
    }
}

/* Style choosed weather feature */
weatherFeatures.addEventListener('click', (event) => {
    const clickedWeatherFeature = event.target.closest(".app__list-item");

    if (clickedWeatherFeature) {
        const choosedFeature = weatherFeatures.querySelector('.app__list-item--active');
        if (choosedFeature) {
            choosedFeature.classList.remove('app__list-item--active');
        }
        clickedWeatherFeature.classList.add('app__list-item--active');
    }
})

/*Search weather by city name */
async function getWeatherByCity(cityName) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Failed to get weather data by city name');
        }

        const data = await response.json();
        currentWeatherToday = data;
        city.textContent = `${data.name}, ${data.sys.country}`;
        description.textContent = makeFirstLetterUpper(data.weather[0].description);
        humidity.textContent = updateHumidity(data.main.humidity, humidity);
        precipitation.textContent = updatePrecipitation(data.rain?.['1h'] || 0, precipitation); 
        windSpeed.textContent = updateWind(data.wind.speed, windSpeed);
        pressure.textContent = updatePressure(data.main.pressure, pressure);
        temperature.textContent = updateTemp(data.main.temp, temperature);
        tempFeelsLike.textContent = updateTemp(data.main.temp, tempFeelsLike);
        currentDayTempInfo.textContent = temperature.textContent;
        updateWeatherIcon(data.weather[0].main, appWeatherIcon);
        updateWeatherIcon(data.weather[0].main, currentDayIcon);

        updateWeatherAdvice(data.weather[0].main, roundValue(data.main.temp));
        setCityBackground(cityName);

        const { lat, lon } = data.coord;
        await getWeatherNextDaysNoon(lat, lon);

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

/* Search weather with map */
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
        humidity.textContent = updateHumidity(data.main.humidity, humidity);
        precipitation.textContent = updatePrecipitation(data.rain?.['1h'] || 0, precipitation); 
        windSpeed.textContent = `${data.wind.speed} km/h`;
        temperature.textContent = updateTemp(data.main.temp, temperature);
        tempFeelsLike.textContent = updateTemp(data.main.temp, tempFeelsLike);
        pressure.textContent = updatePressure(data.main.pressure, pressure);
        currentDayTempInfo.textContent = temperature.textContent;
        updateWeatherIcon(data.weather[0].main, appWeatherIcon);
        updateWeatherIcon(data.weather[0].main, currentDayIcon);
        updateWeatherAdvice(data.weather[0].main, roundValue(data.main.temp));

        const { lat, lon } = data.coord;
        await getWeatherNextDaysNoon(lat, lon);

    } catch (error) {
        alert('Unable to fetch weather data. Please check your VPN or Internet connection and try again.');
    }
};


/* Show weather for next 3 days */
async function getWeatherNextDaysNoon(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        const today = new Date();
        forecastNextDaysNoon = data.list
            .filter(entry => {
                const forecastTime = new Date(entry.dt * 1000);
                return (forecastTime.getUTCDate() !== today.getUTCDate() && 
                        forecastTime.getUTCHours() === 12); // Noon
            })
            .slice(0, 3); // Take 3 days

        for (let i = 0; i < forecastNextDaysNoon.length; i++) {
            let nextDayTemp = document.getElementById(`next-temp${i + 1}`);
            nextDayTemp.textContent = formatTemp(roundValue(forecastNextDaysNoon[i].main.temp));

            let nextDayImg = document.getElementById(`next-day-img${i + 1}`);
            updateWeatherIcon(forecastNextDaysNoon[i].weather[0].main, nextDayImg);

            let nextDay = document.getElementById(`next-day${i + 1}`);
            let nextDayDate = new Date(forecastNextDaysNoon[i].dt_txt);
            nextDay.textContent = days[nextDayDate.getDay() % 7].slice(0, 3);
        }

    } catch (error) {
        console.error("Ошибка получения данных:", error);
    }
}

/* Change day in next days info */
nextDays.addEventListener('click', (event) => {
    const clickedNextDay = event.target.closest(".app__days-item");
    if (clickedNextDay) {
        const choosedDayInfo = nextDays.querySelector('.app__days-item--current');
        if (choosedDayInfo) {
            choosedDayInfo.classList.remove('app__days-item--current');
        }
        clickedNextDay.classList.add('app__days-item--current');

        // Получение индекса выбранного дня
        const dayIndex = Array.from(nextDays.children).indexOf(clickedNextDay);

        if (dayIndex === 0) {
            const data = currentWeatherToday;
            setCurrentDate();
            setCurrentDay();
            temperature.textContent = updateTemp(data.main.temp, temperature);
            tempFeelsLike.textContent = updateTemp(data.main.temp, tempFeelsLike);
            description.textContent = makeFirstLetterUpper(data.weather[0].description);
            humidity.textContent = updateHumidity(data.main.humidity, humidity);
            precipitation.textContent = updatePrecipitation(data.rain?.['1h'] || 0, precipitation); 
            windSpeed.textContent = `${data.wind.speed} km/h`;
            pressure.textContent = updatePressure(data.main.pressure, pressure);
            currentDayTempInfo.textContent = temperature.textContent;
            updateWeatherIcon(data.weather[0].main, appWeatherIcon);
            updateWeatherAdvice(data.weather[0].main, roundValue(data.main.temp));
        }

        if (dayIndex !== 0 && forecastNextDaysNoon[dayIndex - 1]) {
            const data = forecastNextDaysNoon[dayIndex - 1];
            updateDateAndDay(data.dt_txt);
            temperature.textContent = updateTemp(data.main.temp, temperature);
            tempFeelsLike.textContent = updateTemp(data.main.feels_like, tempFeelsLike);
            humidity.textContent = updateHumidity(data.main.humidity, humidity);
            precipitation.textContent = updatePrecipitation(data.rain?.['3h'] || 0, precipitation);
            windSpeed.textContent = updateWind(data.wind.speed, windSpeed);
            pressure.textContent = updatePressure(data.main.pressure, pressure);
            description.textContent = makeFirstLetterUpper(data.weather[0].main);
            updateWeatherIcon(data.weather[0].main, appWeatherIcon);
            updateWeatherAdvice(data.weather[0].main, roundValue(data.main.temp));
        }
    }
});

function updateDateAndDay(dateText) {
    const date = new Date(dateText); 
    currentDateElement.textContent = formatDate(date);
    currentDayElement.textContent = days[date.getDay() % 7];
}


/* Need to add in json 
/*
"Berlin": "../images/cities/berlin.webp",
  "Madrid": "../images/cities/madrid.webp",
  "Rome": "../images/cities/rome.webp",
  "Istanbul": "../images/cities/istanbul.webp",
  "Los Angeles": "../images/cities/los_angeles.webp",
  "Chicago": "../images/cities/chicago.webp",
  "Toronto": "../images/cities/toronto.webp",
  "San Francisco": "../images/cities/san_francisco.webp",
  "Vienna": "../images/cities/vienna.webp",
  "Amsterdam": "../images/cities/amsterdam.webp",
  "Oslo": "../images/cities/oslo.webp",
  "Stockholm": "../images/cities/stockholm.webp",
  "Lisbon": "../images/cities/lisbon.webp",
  "Warsaw": "../images/cities/warsaw.webp",
  "Budapest": "../images/cities/budapest.webp",
  "Brussels": "../images/cities/brussels.webp",
  "Athens": "../images/cities/athens.webp",
  "Copenhagen": "../images/cities/copenhagen.webp",
  "Dublin": "../images/cities/dublin.webp",
  "Zurich": "../images/cities/zurich.webp",
  "Prague": "../images/cities/prague.webp",
  "Seoul": "../images/cities/seoul.webp",
  "Beijing": "../images/cities/beijing.webp",
  "Hong Kong": "../images/cities/hong_kong.webp",
  "Shanghai": "../images/cities/shanghai.webp",
  "Guangzhou": "../images/cities/guangzhou.webp",
  "Shenzhen": "../images/cities/shenzhen.webp",
  "Mumbai": "../images/cities/mumbai.webp",
  "Delhi": "../images/cities/delhi.webp",
  "Bangalore": "../images/cities/bangalore.webp",
  "Karachi": "../images/cities/karachi.webp",
  "Cairo": "../images/cities/cairo.webp",
  "Cape Town": "../images/cities/cape_town.webp",
  "Johannesburg": "../images/cities/johannesburg.webp",
  "Nairobi": "../images/cities/nairobi.webp",
  "Doha": "../images/cities/doha.webp",
  "Riyadh": "../images/cities/riyadh.webp",
  "Abu Dhabi": "../images/cities/abu_dhabi.webp",
  "Tehran": "../images/cities/tehran.webp",
  "Tbilisi": "../images/cities/tbilisi.webp",
  "Yerevan": "../images/cities/yerevan.webp",
  "Baku": "../images/cities/baku.webp",
  "Almaty": "../images/cities/almaty.webp",
  "Astana": "../images/cities/astana.webp",
  "Minsk": "../images/cities/minsk.webp",
  "Kazan": "../images/cities/kazan.webp",
  "Novosibirsk": "../images/cities/novosibirsk.webp",
  "Yekaterinburg": "../images/cities/yekaterinburg.webp",
  "Rostov-on-Don": "../images/cities/rostov_on_don.webp",
  "Vladivostok": "../images/cities/vladivostok.webp",
  "Irkutsk": "../images/cities/irkutsk.webp",
  "Krasnoyarsk": "../images/cities/krasnoyarsk.webp",
  "Samara": "../images/cities/samara.webp",
  "Ufa": "../images/cities/ufa.webp",
  "Perm": "../images/cities/perm.webp",
  "Omsk": "../images/cities/omsk.webp",
  "Chelyabinsk": "../images/cities/chelyabinsk.webp",
  "Volgograd": "../images/cities/volgograd.webp",
  "Kaliningrad": "../images/cities/kaliningrad.webp",
  "Krasnodar": "../images/cities/krasnodar.webp",
  "Arkhangelsk": "../images/cities/arkhangelsk.webp",
  "Murmansk": "../images/cities/murmansk.webp",
  "Sochi": "../images/cities/sochi.webp",
  "Tallinn": "../images/cities/tallinn.webp",
  "Riga": "../images/cities/riga.webp",
  "Vilnius": "../images/cities/vilnius.webp",
  "Belgrade": "../images/cities/belgrade.webp",
  "Sarajevo": "../images/cities/sarajevo.webp",
  "Skopje": "../images/cities/skopje.webp",
  "Bishkek": "../images/cities/bishkek.webp",
  "Tashkent": "../images/cities/tashkent.webp",
  "Hanoi": "../images/cities/hanoi.webp",
  "Ho Chi Minh City": "../images/cities/ho_chi_minh_city.webp",
  "Manila": "../images/cities/manila.webp",
  "Mexico City": "../images/cities/mexico_city.webp",
  "Lima": "../images/cities/lima.webp",
  "Buenos Aires": "../images/cities/buenos_aires.webp",
  "Santiago": "../images/cities/santiago.webp",
  "São Paulo": "../images/cities/sao_paulo.webp"
*/