// Populate buttons at sports top of page
var sports = ["soccer", "baseball", "football", "basketball", "lacrosse", "hockey"];
for (var j = 0; j < sports.length; j++){
        var btn = $("<button>" + (sports[j]) + "</button>");
        $(btn).attr("class", "button");
        $("#buttons").append(btn);
        gifSearch();
    }    


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
    createButton();

    // AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // For loop - image & rating for each gif.
        for (var i = 0; i < 10; i++) {
            var newDiv = $("<div class='gif'>");
            var ratingDiv = $("<span class='rating'>");
            var rating = "Rating: " + response.data[i].rating;
            ratingDiv.text(rating);
            var imgURL = response.data[i].images.fixed_height.url;
            var img = $("<img>").attr("src", imgURL);
            $("<img>").attr("data-still")
            newDiv.append(img);
            newDiv.append("<br>");
            newDiv.append(ratingDiv);
            prependGifs(newDiv);
        }
    });
    console.log(term);
})


// User input creates a button
function createButton() {
    var btn = document.createElement("button");
    btn.innerHTML = $("#userInput").val();
    $(btn).attr("class", "button");
    $("#buttons").append(btn);
}

// // Trigger ajax call for user pressing button//
function gifSearch(){
    $(document).on("click", ".button", function (event) {
    event.preventDefault();
    term = $(this).text();
    queryURL = protocol + term + query + api;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i <= 10; i++) {
            var newDiv = $("<div class='gif'>");
            var ratingDiv = $("<span class='rating'>");
            var rating = "Rating: " + response.data[i].rating;
            ratingDiv.text(rating);
            var imgURL = response.data[i].images.fixed_height.url;
            var img = $("<img>").attr("src", imgURL);
            $("<img>").attr("data-still")
            newDiv.append(img);
            newDiv.append("<br>");
            newDiv.append(ratingDiv);
            prependGifs(newDiv)
        }})
    })
}
    // group img and rating and place them in the "gifView div"
        //put the gifs on the page
        function prependGifs(newDiv) {
            $("#gifView").prepend(newDiv);
            // $("#gifImage").prepend(img);
            $(this).attr("src", $(this).attr("data-still"));
        }


