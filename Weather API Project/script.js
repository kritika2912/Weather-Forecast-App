const apiKey = "54603a8f47644c75b2a215327250607"; // WeatherAPI key


document.getElementById("weatherForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const city = document.getElementById("cityInput").value.trim();
  if (city) {
    getWeather(city);
  }
});

function getWeather(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      document.getElementById("weatherResult").innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
}

function displayWeather(data) {
  const html = `
    <h2>${data.location.name}, ${data.location.country}</h2>
    <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
    <p><strong>Condition:</strong> ${data.current.condition.text}</p>
    <img src="https:${data.current.condition.icon}" alt="weather icon">
    <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.current.wind_kph} km/h</p>
  `;
  document.getElementById("weatherResult").innerHTML = html;
}


