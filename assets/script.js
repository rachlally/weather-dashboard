
//generate API key
var APIKey = "a700477e931b172046d7bbc2533b8c5a";

//create variable for the API to call
var city = "White Salmon";

//Construct a query URL to make call:
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL , {
    cache: 'reload',
})
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
    console.log(data);
    console.log(data.wind.speed);
});

console.log("howdy weather");
