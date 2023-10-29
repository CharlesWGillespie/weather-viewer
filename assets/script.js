
const APIKey = "40ac34cf8262f576b914adb248d863e2";
const searchBtn = document.querySelector("#searchBtn");

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
    })
    .catch((error) => {
      alert(error.message);
    });
}

function showWeather(data) {
  const { name } = data;
  const { temp } = data.main;
  const { speed } = data.wind;
  const { humidity } = data.main;

  

  // Convert temperature to Fahrenheit
  const tempFahrenheit = (temp * 9) / 5 + 32;
  const speedMPH = speed * 2.23694

  const card = document.querySelector('.card');
  const cardHeader = card.querySelector('.card-header');
  const tempElement = card.querySelector('.list-group-item:nth-child(1)');
  const windElement = card.querySelector('.list-group-item:nth-child(2)');
  const humidityElement = card.querySelector('.list-group-item:nth-child(3)');



  cardHeader.textContent = `City: ${name} ` ;
  tempElement.textContent = `Temp: ${temp}°C |  ${tempFahrenheit.toFixed()}°F`;
  windElement.textContent = `Wind: ${speed} m/s | ${speedMPH.toFixed()}mph`;
  humidityElement.textContent = `Humidity: ${humidity}%`;
   
}

searchBtn.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent form submission
  const userInput = document.getElementById("userInput");
  const city = userInput.value;
  fetchWeatherData(city);
});
