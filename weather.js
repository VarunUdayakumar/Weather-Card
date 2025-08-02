const apiKey = "5261954446308e87940a9dfbc7051c0f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const cityDisplay = document.querySelector(".city");
const tempDisplay = document.querySelector(".temp");
const humidityDisplay = document.querySelector(".humidity");
const windDisplay = document.querySelector(".wind");
const weatherDisplay = document.querySelector(".weather");
const errorDisplay = document.querySelector(".error");

const weatherIconMap = {
    "Clouds": "images/clouds.png",
    "Clear": "images/clear.png",
    "Rain": "images/rain.png",
    "Drizzle": "images/drizzle.png",
    "Mist": "images/mist.png",
    "Haze": "images/mist.png",
    "Snow": "images/snow.png"
};

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (!response.ok) {
            if (response.status === 404) {
                 errorDisplay.textContent = "City not found. Please try again.";
            } else {
                 errorDisplay.textContent = `Error: ${response.statusText}`;
            }
            errorDisplay.style.display = "block";
            weatherDisplay.style.display = "none";
            return;
        }

        const data = await response.json();

        cityDisplay.innerHTML = data.name;
        tempDisplay.innerHTML = Math.round(data.main.temp) + "°c";
        humidityDisplay.innerHTML = data.main.humidity + "%";
        windDisplay.innerHTML = data.wind.speed + " km/h";

        const weatherCondition = data.weather[0].main;
        weatherIcon.src = weatherIconMap[weatherCondition] || "images/default.png";

        weatherDisplay.style.display = "block";
        errorDisplay.style.display = "none";

    } catch (error) {
        console.error("Failed to fetch weather:", error);
        errorDisplay.textContent = "Failed to connect. Please check your internet connection.";
        errorDisplay.style.display = "block";
        weatherDisplay.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    if (searchBox.value) {
        checkWeather(searchBox.value);
    }
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && searchBox.value) {
        checkWeather(searchBox.value);
    }
});