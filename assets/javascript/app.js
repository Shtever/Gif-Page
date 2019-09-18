// queryURL components//
var protocol = "http://api.giphy.com/v1/gifs/search?q="
var term = ""
var query = "&limit:10"
var api = "&api_key=j7uGW8a9SseGiiroM6bZvYm3X40oKHSh"
// queryURL var declared//
var queryURL = protocol + term + query + api;

// function to trigger AJAX call using queryURL var//
$("#findGif").on("click", function (event) {
    event.preventDefault();
    term = $("#userInput").val();
    queryURL = protocol + term + query + api;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);
        console.log(response);
        for (var i = 0; i <= 10; i++)
        var newDiv = $("<div class='gif'>");
        var rating = "Rating: " + response.data[i].rating;
        var imgURL = response.data[i].images.fixed_height.url;
        var img = $("<img>").attr("src", imgURL);
        newDiv.append(img);
   
        $("#gifView").append(rating);
        $("#gifImage").append(img);        
        
        // Removed JSON.stringify because the results had quotation marks around them//
        // $("#gifView").append(JSON.stringify("Rating: " + response.data[i].rating + "<img src=" + response.data[i].images.fixed_height.url + close));
    });
    console.log(term);
})