let APIKey = "40ac34cf8262f576b914adb248d863e2";
let userInput = document.querySelector("#userInput");
let searchBtn = document.querySelector("#searchBtn");

function search(event) {
  event.preventDefault();

  // Get the user's input (city name) from the input field
  let city = userInput.value;

  // Create the API request URL with the user's input
  let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;

  // Perform the API request
  fetch(queryURL)
    .then(function (response) {
      if (response.status === 200) {
        return response.json();
      } else {
        // Handle error responses (e.g., city not found)
        console.error("Error: City not found or other API issue");
      }
    })
    .then(function (data) {
      // Process and display the weather data
      console.log(data);
    })
    .catch(function (error) {
      console.error("An error occurred while fetching data:", error);
    });
}

searchBtn.addEventListener("click", search);

