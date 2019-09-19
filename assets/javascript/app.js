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
            prependGifs(newDiv);
        }
        // JSON.stringify causes quotes around response elements//
        // $("#gifView").append(JSON.stringify("Rating: " + response.data[i].rating + "<img src=" + response.data[i].images.fixed_height.url + close));
    });
    console.log(term);
})

function createButton() {
    var btn = document.createElement("button");
    btn.innerHTML = $("#userInput").val();
    $(btn).attr("class", "button");
    $("#buttons").append(btn);
}

function gifStop() {
    $("#gifImage").on("click", function () {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })
};

// // Trigger ajax call for user pressing button//
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

    // group img and rating and place them in the "gifView div"
        //put the gifs on the page
        function prependGifs(newDiv) {
            $("#gifView").prepend(newDiv);
            // $("#gifImage").prepend(img);
            $(this).attr("src", $(this).attr("data-still"));
            gifStop();
        }
