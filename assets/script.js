let APIKey = "40ac34cf8262f576b914adb248d863e2";
let userInput = document.querySelector("#userInput");
let searchBtn = document.querySelector("#searchBtn");
let city = userInput.value;

let queryURL =
  "http://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&appid=" +
  APIKey;

function search(event) {
  event.preventDefault();
  fetch(queryURL).then(function (response) {
    return response.json().then(function (data) {
      console.log(data);
    });
  });
}
searchBtn.addEventListener("click", search);
