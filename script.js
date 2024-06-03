const searchBtn = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");
const API_KEY = "3065705f5a9cdacd92c9c9b1c5542cf9";



const createAndAppendWeatherCard=(eachItem)=>{
    return `<li class="each-card">
                <h2> (______)</h2>
                <h4>Temperature: ___° C</h4>
                <h4>Wind: ___ M/S</h4>
                <h4>Humidity: ___%</h4>
            </li>`
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
        console.log(sixDaysForecast)
        sixDaysForecast.forEach(eachItem=>{
            createAndAppendWeatherCard(eachItem)
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

    console.log(cityName);
    cityInput.value = "";

    const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

    fetch(GEOCODING_API_URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
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
