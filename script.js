const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';  // Replace with your OpenWeatherMap API key
const googleApiKey = 'YOUR_GOOGLE_API_KEY';   // Replace with your Google API key

const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('city');

const cityNameElement = document.getElementById('cityName');
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('windSpeed');
const descriptionElement = document.getElementById('description');
const weatherIconElement = document.getElementById('weatherIcon');

// Initialize Google Places Autocomplete
let autocomplete;

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(cityInput);
  autocomplete.setFields(['address_components', 'geometry']);
}

getWeatherBtn.addEventListener('click', getWeather);

function getWeather() {
  const city = cityInput.value.trim();
  if (city === "") return;

  // Get latitude and longitude from Google Places API
  const place = autocomplete.getPlace();
  if (!place.geometry) {
    alert("City not found!");
    return;
  }

  const lat = place.geometry.location.lat();
  const lon = place.geometry.location.lng();

  // Call OpenWeatherMap API
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weatherData = data;
      const cityName = data.name;
      const temperature = weatherData.main.temp;
      const humidity = weatherData.main.humidity;
      const windSpeed = weatherData.wind.speed;
      const description = weatherData.weather[0].description;
      const iconCode = weatherData.weather[0].icon;

      // Update UI
      cityNameElement.textContent = cityName;
      temperatureElement.textContent = `Temperature: ${temperature}°C`;
      humidityElement.textContent = `Humidity: ${humidity}%`;
      windSpeedElement.textContent = `Wind Speed: ${windSpeed} m/s`;
      descriptionElement.textContent = `Condition: ${description}`;
      weatherIconElement.src = `http://openweathermap.org/img/wn/${iconCode}.png`;
    })
    .catch(error => {
      alert('Error fetching weather data. Please try again.');
    });
}
