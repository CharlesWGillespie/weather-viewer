
const APIKey = "40ac34cf8262f576b914adb248d863e2";
const searchBtn = document.querySelector("#searchBtn");

// get api data for city
function fetchWeatherData(city) {
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`; // Celsius
  fetch(queryURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      showWeather(data);
      getFutureWeather(data.coord.lat, data.coord.lon); // Pass latitude and longitude to future weather function
    })
    .catch((error) => {
      alert(error.message);
    });
}
// show current date weather
function showWeather(data) {
  const { name } = data;
  const { description } = data.weather[0];
  const { temp } = data.main;
  const { speed } = data.wind;
  const { humidity } = data.main;

  // Convert temperature to Fahrenheit and m/s to Mph
  const tempFahrenheit = (temp * 9) / 5 + 32;
  const speedMPH = speed * 2.23694;

  // Get Current Date
  const currentDate = dayjs().format('MM/DD/YYYY');

  const card = document.querySelector('.card');
  const cardHeader = card.querySelector('.card-header');
  const tempElement = card.querySelector('.list-group-item:nth-child(1)');
  const windElement = card.querySelector('.list-group-item:nth-child(2)');
  const humidityElement = card.querySelector('.list-group-item:nth-child(3)');

  cardHeader.textContent = `${name} | ${description} | ${currentDate}`;
  tempElement.textContent = `Temp: ${temp}°C |  ${tempFahrenheit.toFixed()}°F`;
  windElement.textContent = `Wind: ${speed} m/s | ${speedMPH.toFixed()}mph`;
  humidityElement.textContent = `Humidity: ${humidity}%`;
}

// get future weather
function getFutureWeather(lat, lon) {
  const fiveDayWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`;
  fetch(fiveDayWeather)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      showFiveDayWeather(data);
    })
    .catch((error) => {
      alert(error.message);
    });
}

function showFiveDayWeather(data) {
  const forecastList = data.list; 
  
  for (let i = 0; i < 5; i++) {
    const forecast = forecastList[i]; 
    const descriptionElement = document.querySelector(`#description-${i + 1}`);
    const dateElement = document.querySelector(`#future-date-${i + 1}`)
    const tempElement = document.querySelector(`#future-temp-${i + 1}`);
    const windElement = document.querySelector(`#future-wind-${i + 1}`);
    const humidityElement = document.querySelector(`#future-humidity-${i + 1}`);
    
    for(let j = 0; j < 40; j += 8){

    }
    
    const description = forecast.weather[0].description;
    const temp = forecast.main.temp;
    const wind = forecast.wind.speed;
    const humidity = forecast.main.humidity;

    const currentDate = dayjs().format('MM/DD/YYYY');
    
    const tempFahrenheit = (temp * 9) / 5 + 32;
    const speedMPH = wind * 2.23694;
    
    dateElement.textContent = `${currentDate}`
    descriptionElement.textContent = description;
    tempElement.textContent = `Temp: ${temp}°C | ${tempFahrenheit.toFixed()} F`;
    windElement.textContent = `Wind: ${wind} m/s ${speedMPH.toFixed()}mph`;
    humidityElement.textContent = `Humidity: ${humidity}%`;
  }
}
  
  
searchBtn.addEventListener("click", (event) => {
  event.preventDefault(); 
  const userInput = document.getElementById("userInput");
  const city = userInput.value;
  fetchWeatherData(city);
});
