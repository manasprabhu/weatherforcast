const apiKey = "b09dfd265c87056e4654ead8b43b49da";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

async function checkWeather(city) {
    if (city.trim() === "") {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".error p").innerText = "Please enter a city name";
        document.querySelector(".weather").style.display = "none";
        return;
    }

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

        const weatherCondition = data.weather[0].main;
        const weatherImages = {
            Clouds: "images/clouds.png",
            Clear: "images/clear.png",
            Rain: "images/rain.png",
            Drizzle: "images/drizzle.png",
            Mist: "images/mist.png"
        };

        weatherIcon.src = weatherImages[weatherCondition] || "images/default.png";

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch (error) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".error p").innerText = error.message;
        document.querySelector(".weather").style.display = "none";
    }
}

// Click event for search button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Press 'Enter' key to trigger search
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});