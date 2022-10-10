//Global Variables
var APIKey = "a700477e931b172046d7bbc2533b8c5a";

var searchButton = $('#search-button');
var citySearch = $('#city-search');
var formEl = $('city-form');
var currentWeather = $('#current-weather');
var fiveDayContainer = $('#fiveDay');
var listContainer = document.querySelector('#searchHistory');
var searchHistory = [];

//Current Date
var today = moment();
$("#current-date").text(today.format("MMM DD, YYYY"));

//API test: successful link
function getApi(cityName) {
    $('#current-weather').empty('');

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey + "&units=imperial";
    
    fetch(queryURL)
        .then(function(response) {
        return response.json();
    })
        .then(function (data) {
        console.log(data);
        currentWeather.append(`<h2>${data.name}</h2>`);
        currentWeather.append(`<p>Tempterture: <span>${data.main.temp}</span></p>`);
        currentWeather.append(`<p>Wind: <span>${data.wind.speed}</span></p>`);
        currentWeather.append(`<p>Humidity: <span>${data.main.humidity}</span></p>`);
        
    });
 

}

function fiveDayForecast(cityName) {
    $('#fiveDay').empty('');

    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey + "&units=imperial";

    fetch(fiveDayURL)
        .then(function(response) {
        return response.json();
    })
        .then (function (data) {
        console.log(data);
        var fiveDayArray = data.list;
        console.log(fiveDayArray);
        for (var i = 1; i < fiveDayArray.length; i+=8) {
           // console.log(data.list[i]);
           var currentForecastIndex = fiveDayArray[i];
           fiveDayContainer.append(`<div class="col-2 border border-secondary m-1 bg-dark text-white"><p>${moment(currentForecastIndex.dt_txt).format('MMM DD, YYYY')}</p><p>Temperature: <span>${currentForecastIndex.main.temp}</span></p><p>Wind: <span>${currentForecastIndex.wind.speed}</span></p><p>Humidity: <span>${currentForecastIndex.main.humidity}</span></p></div>`);
            
        }



})}

function renderSearch (){
    listContainer.innerHTML="";
    for (var i = searchHistory.length-1; i >= 0; i--) {
        var btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.classList.add("history-btn");
        btn.setAttribute("data-search", searchHistory[i]);
        btn.textContent = searchHistory[i];
        listContainer.append(btn);
    }
}

function setToHistory(search){
    if (searchHistory.indexOf(search) !== -1){
        return;
    }
    searchHistory.push(search);
    localStorage.setItem("cities", JSON.stringify(searchHistory));
    renderSearch();

}

function getHistory(){
    var history = localStorage.getItem("cities");
    if (history) {
        searchHistory = JSON.parse(history);
    }
    renderSearch();
}


//Click Event: Type City, Click Search, Function to console.log API results
searchButton.on('click', function searchCitySubmit(event) {
    event.preventDefault();

    var currentCity = citySearch.val();
    console.log('City:', citySearch.val());
   
    $('#city-search').val('');
    getApi(currentCity);
    fiveDayForecast(currentCity);
    setToHistory(currentCity);
        
});

getHistory();