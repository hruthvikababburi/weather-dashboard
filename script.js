const searchBtn = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");
const weatherCardsCont = document.querySelector(".weather-cards");
const API_KEY = "3065705f5a9cdacd92c9c9b1c5542cf9";
const container = document.querySelector('container')
const currentWeather = document.querySelector('.current-weather')


const createAndAppendWeatherCard=(cityName,eachItem,index)=>{
    if(index === 0){
        return `<div class="data">
                    <h2>${cityName} (${eachItem.dt_txt.split(' ')[0]})</h2>
                    <h4>Temperature: ${(eachItem.main.temp - 273.15).toFixed(2)}° C</h4>
                    <h4>Wind: ${eachItem.wind.speed} M/S</h4>
                    <h4>Humidity: ${eachItem.main.humidity}%</h4>
                </div>
                <div class="icon">
                    <img src="https://openweathermap.org/img/wn/${eachItem.weather[0].icon}@4x.png" alt="weather-icon">
                    <h6>${eachItem.weather[0].description}</h6>
                </div>`;
    }
    else{
        return `<li class="each-card">
                <h2> (${eachItem.dt_txt.split(' ')[0]})</h2>
                <img src="https://openweathermap.org/img/wn/${eachItem.weather[0].icon}@2x.png" alt="weather-icon">
                <h4>Temperature: ${(eachItem.main.temp - 273.15).toFixed(2)}° C</h4>
                <h4>Wind: ${eachItem.wind.speed} M/S</h4>
                <h4>Humidity: ${eachItem.main.humidity}%</h4>
            </li>`
    }
}
const getWeatherDetails = (cityName,lat,lon)=>{
    const WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    fetch(WEATHER_API_URL).then(res=>res.json()).then(data=>{
        const uniqueForecastDays  = []
        const sixDaysForecast = data.list.filter(forecast=>{
            const forecastDate = new Date(forecast.dt_txt).getDate()
            if(!uniqueForecastDays.includes(forecastDate)){
                return uniqueForecastDays.push(forecastDate)
            }
        })

        cityInput.value = '';
        currentWeather.innerHTML = ''
        weatherCardsCont.innerHTML=''


        // console.log(sixDaysForecast)
        sixDaysForecast.forEach((eachItem,index)=>{
            if(index === 0){
                currentWeather.insertAdjacentHTML('beforeend',createAndAppendWeatherCard(cityName,eachItem, index));
            }
            else{
                weatherCardsCont.insertAdjacentHTML('beforeend',createAndAppendWeatherCard(cityName, eachItem, index));
            }
            
        })
    }).catch((error) => {
        console.error('Fetch error:', error);
        alert('An error has occurred while fetching the weather forecast!');
    });
}

const getCityName = () => {
    const cityName = cityInput.value.trim();
    if (cityName === "") {
        alert('Enter Valid City');
        return;
    }
    // console.log(cityName);
    const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    fetch(GEOCODING_API_URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            // console.log(data);
            if (data.length === 0) {
                alert('City not found');
            }
            const {name, lat, lon} = data[0];
            getWeatherDetails(name,lat,lon);
        })
        .catch((error) => {
            console.error('Fetch error:', error);
            alert('An error has occurred while fetching the details');
        });
};

searchBtn.addEventListener('click', getCityName);
