//Global Variables
var APIKey = "a700477e931b172046d7bbc2533b8c5a";

var searchButton = $('#search-button');
var citySearch = $('#city-search');
var formEl = $('city-form');
var currentWeather = $('#current-weather');

//Current Date + Five Calendar Days
var today = moment();
$("#current-date").text(today.format("MMM Do, YYYY"));
$("#day1").text(today.add(1, 'days').format("MMM Do, YYYY"));
$("#day2").text(today.add(1, 'days').format("MMM Do, YYYY"));
$("#day3").text(today.add(1, 'days').format("MMM Do, YYYY"));
$("#day4").text(today.add(1, 'days').format("MMM Do, YYYY"));
$("#day5").text(today.add(1, 'days').format("MMM Do, YYYY"));

//API test: successful link

function getApi(cityName) {
    $('input[type="text"]').val('');

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey + "&units=imperial";
    
    fetch(queryURL)
        .then(function(response) {
        return response.json();
    })
        .then(function (data) {
        console.log(data);
        currentWeather.append(`<h2>${data.name}</h2>`);
        currentWeather.append(`<span>${data.main.temp}</span>`);
        currentWeather.append(`<span>${data.wind.speed}</span>`);
        currentWeather.append(`<span>${data.main.humidity}</span>`);
        
    });
}

//Click Event: Type City, Click Search, Function to console.log API results
searchButton.on('click', function searchCitySubmit(event) {
    event.preventDefault();

    var currentCity = citySearch.val();
    console.log('City:', citySearch.val());
    getApi(currentCity);
          
});
