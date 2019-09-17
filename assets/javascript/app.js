var protocol = "http://api.giphy.com/v1/gifs/search?q="
var term = ""
var query = "&lang:en&limit:10"
var api = "&api_key=j7uGW8a9SseGiiroM6bZvYm3X40oKHSh"

var queryURL = protocol + term + query + api;
console.log(queryURL);