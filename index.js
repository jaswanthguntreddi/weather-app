const apikey = "1bd7f36527acb53b78ba4c135945f724";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchbox = document.querySelector('.search input');
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

async function checkweather(city) {
    try {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);
        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            const data = await response.json();
            console.log(data);

            document.querySelector('.city').innerHTML = data.name;
            document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
            document.querySelector('.wind').innerHTML = data.wind.speed + "km/h";

            const weatherMain = data.weather[0].main;
            if (weatherMain === 'Clouds') {
                weathericon.src = "images/clouds.png";
            } else if (weatherMain === 'Clear') {
                weathericon.src = "images/clear.png";
            } else if (weatherMain === 'Rain') {
                weathericon.src = "images/rain.png";
            } else if (weatherMain === 'Drizzle') {
                weathericon.src = "images/drizzle.png";
            } else if (weatherMain === 'Mist') {
                weathericon.src = "images/mist.png";
            } else if (weatherMain === 'Snow') {
                weathericon.src = "images/snow.png";
            } else if (weatherMain === 'Fog') {
                weathericon.src = "images/fog.png";
            } else {
                weathericon.src = "images/clouds.png";
            }

            document.querySelector('.weather').style.display = 'block';
            document.querySelector('.error').style.display = 'none';
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchbtn.addEventListener("click", () => {
    const city = searchbox.value.trim();
    if (city) {
        checkweather(city);
    }
});
