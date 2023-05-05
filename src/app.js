const searchBar = document.querySelector(".form__search");
const searchBtn = document.querySelector(".form__btn");
const apiKey = "3e091190429e0f74ae16f6a97e7ab6a5";
const loading = document.querySelector(".load")
const infos = document.querySelector(".infos")

async function fetchWeather(city) {

    infos.style.display = "none"
    loading.style.display = "block"

    try {
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey);
        if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
        }
        const data = await response.json();
        const { name } = data;
        const { temp, humidity } = data.main;
        const { description, icon } = data.weather[0];
        const { speed } = data.wind;
    
        // Nom de la ville
        document.querySelector(".city span").textContent = name;
        //temperature
        document.querySelector(".temp").textContent = temp + "°C";
        // Humidity
        document.querySelector(".humidity span").textContent = humidity + "%";
        // Vitesse du vent
        document.querySelector(".wind span").textContent = speed + "Km/h";
        //autre infos
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").textContent = description;
    } catch (error) {
        console.error(error)
    } finally {
        loading.style.display = "none"
        infos.style.display = "block"
    }
    

}

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    fetchWeather(searchBar.value);
    searchBar.value = "";
});

searchBar.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event == "Enter") {
        fetchWeather(searchBar.value);
    }
});

fetchWeather("antananarivo");
