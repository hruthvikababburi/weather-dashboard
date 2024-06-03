const searchBtn = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input")
const locationBtn = document.querySelector(".location-search-btn");

const getCityName=()=>{
    const cityName = cityInput.value.trim()
    if(cityName ==""){
        alert('Enter Valid City')
    }
    console.log(cityName);
    cityInput.value="";
    const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
}

searchBtn.addEventListener('click',getCityName)