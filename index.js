const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const apiKey = "b067b3b01460c91047ad00711366af60";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

searchBtn.diabled = true;

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".card").classList.remove("slide-down");
    }
    else{

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

    if(data.weather[0].main == 'Clouds'){
        weatherIcon.src = "images/clouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";
    }
    document.querySelector(".weather").classList.add("fade-in");
    document.querySelector(".card").classList.add("slide-down");
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}
}


searchBox.addEventListener("keyup",e=>{
    e.preventDefault();
    if(searchBox.value === ""){
        searchBtn.disabled = true;
    }
    else if(e.keyCode == 13){
        searchBtn.disabled = false;
        checkWeather(searchBox.value);
    } 
})

searchBtn.addEventListener("click",()=>{
    if(searchBox.value === ""){
        searchBtn.disabled = true;
    }
    else{
        searchBtn.disabled = false;
        checkWeather(searchBox.value);
    }   
});