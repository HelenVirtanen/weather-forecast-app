[🇷🇺](#прогноз-погоды-friendly-forecast-) | [🇬🇧](#friendly-forecast-weather-app-)

---

# Friendly Forecast Weather App 🌞🌎

[GitHub Repository](https://github.com/HelenVirtanen/weather-forecast-app)  
[View on GitHub Pages](https://helenvirtanen.github.io/weather-forecast-app/)

## 📖 Project Description
The **"Friendly Forecast"** app shows you the weather anywhere in the world for today and the next 3 days.

### 🌟 Key Features
* 🧥 Clothing and accessory advice: umbrella, sunscreen, hat, etc.
* 📊 Detailed weather data: "feels like" temperature, precipitation probability, humidity, wind, pressure.
* 🎨 Color-coded anomalies:
  * green — below normal,  
  * blue — within normal,  
  * pink/red — above normal.
* 🌡️ Temperature palette: from cold blues to warm reds.
* 🔍 Search via form and map.
* 🖼️ Unique background images for popular cities; default background for others.

## 🧭 Interface Overview
🔹 **Left panel**:
  - Current date, day, location (with international code);  
  - Air temperature, general description, weather icon and suggestion image.

🔸 **Right panel**:
  - Detailed weather data: "feels like", precipitation, humidity, wind speed, atmospheric pressure;  
  - List of 4 days (current + next 3) with temperature and icons;  
  - Search form and "Show" button;  
  - Map open button.

🔻 **Footer**: year, author name, slogan.

## 🖼️ Screenshots
### Default view
![Default](./screenshots/default.png)

### Forecast in selected city (e.g., Tokyo)
![Tokyo](./screenshots/tokyo.png)

### Weather forecast for another day (e.g., New York, day after tomorrow)
![New York](./screenshots/new-york.png)

## ⚙️ Script Behavior
* Weather data updates automatically for today and the next days when searching;
* Current date and day are shown by default;
* Forecast updates every 3 hours;
* Search available via form and map;
* Background, suggestion, and icons are selected automatically based on location and forecast;
* Smooth scroll to top when clicking anchor links.

## 🛠️ Technologies Used
* HTML  
* CSS  
* JS  
* OpenWeather API

## 🚀 Installation and Launch
**Clone the repository**
```bash
https://github.com/HelenVirtanen/weather-forecast-app.git
```

**Open the project**
1) In VS Code → click Go Live (requires Live Server extension)
2) Or via GitHub Pages → https://helenvirtanen.github.io/weather-forecast-app/

## 💡 Planned Improvements
To improve UX and visual appeal, here are some ideas:
1) More backgrounds for specific cities/countries (e.g., by country code);
2) Alternative suggestion icons with a male character;
3) Language switcher (ru/en);
4) Multiple color themes, including for colorblind users;
5) Open map by clicking current location in the left panel.


# Прогноз погоды Friendly Forecast 🌞🌎

[Репозиторий в GitHub](https://github.com/HelenVirtanen/weather-forecast-app)

[Посмотреть на GitHub Pages](https://helenvirtanen.github.io/weather-forecast-app/)

## 📖 Описание проекта: 
Приложение "Friendly Forecast" позволяет узнать погоду в любой точке мира на сегодняшний день и на 3 дня вперед.

### 🌟 Основные особенности
* 🧥 Советы по одежде и аксессуарам: зонт, солнцезащитный крем, шапка и др.
* 📊 Расширенные метеоданные: «ощущаемая» температура, вероятность осадков, влажность, ветер, давление.
* 🎨 Цветовая индикация аномалий:
* - зелёный — ниже нормы,
* - синий — в пределах нормы,
* - розовый/красный — выше нормы.
* 🌡️ Температурная палитра: от холодных синих до тёплых красных оттенков.
* 🔍 Поиск через форму и карту.
* 🖼️ Уникальные фоны для популярных городов; для остальных — дефолтный фон.

## Элементы интерфейса приложения:
🔹 __левая панель__: 
  - текущая дата, день, местоположение (с международным кодом);
  - температура воздуха, общее описание погоды, иконка-состояние и картинка-совет

🔸 __правая панель__: 
  - подробные погодные данные: температура воздуха по ощущению, вероятность осадков, уровень влажности, скорость ветра, атмосферное давление;
  - список из 4 дней (текущего и следующих трех) с температурой и иконками;
  - форма поиска и кнопка Show (Показать);
  - кнопка открытия карты;

🔻 __футер__: год, имя автора, слоган

## 🖼️ Скриншоты
### Главная по дефолту
![Главная](./screenshots/default.png)

### Прогноз погоды в выбранном городе (пример, Токио)
![Токио](./screenshots/tokyo.png)

### Пример отображения погоды в другой день (пример, Нью-Йорк послезавтра)
![Нью-Йорк](./screenshots/new-york.png)

## ⚙️ Суть работы скрипта:
* Автоматически обновляются данные по текущему дню и следующим дням при поиске;
* По умолчанию отображаются текущие дата и день; 
* Обновление прогноза — каждые 3 часа;
* Доступен поиск как по форме с инпутом, так и с помощью карты;
* Фон, совет, иконки подставляются автоматически (в зависимости от местоположения и прогноза);
* При переходе по якорным ссылкам происходит плавный скролл вверх (на высоту хедера).

## 🛠️ Применяемые технологии
* HTML
* CSS
* JS
* OpenWeather API

## 🚀 Установка и запуск
**Клонирование репозитория**
```https://github.com/HelenVirtanen/weather-forecast-app.git```

**Открытие проекта**
1) VS Code -> нажать Go Live (для этого должен быть установлен плагин Live Server)
2) GitHub Pages -> https://helenvirtanen.github.io/weather-forecast-app/

## 💡 Планы по развитию
Для улучшения пользовательского опыта и эстетики есть идеи добавить: 
1) большее количество фонов для конкретных городов/стран (например, по коду страны)
2) альтернативные иконкам-советам с девушкой иконки-советы с парнем 
3) языковой переключатель (ru/en)
4) несколько вариантов цветовых тем, в т.ч. для людей с особенностями цветового зрения;
5) открытие карты по нажатию на текущее место в левой панели
