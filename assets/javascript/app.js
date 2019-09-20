//document.ready so input border animation syncs with header animation
$(document).ready
debugger;


// Populate buttons at sports top of page
var sports = ["soccer", "baseball", "football", "basketball", "lacrosse", "hockey"];
for (var j = 0; j < sports.length; j++) {
    var btn = $("<button>" + (sports[j]) + "</button>");
    $(btn).attr("class", "button");
    $(btn).addClass("btn btn-info");
    $("#buttons").append(btn);
}
gifSearch()

// queryURL components//
var protocol = "https://api.giphy.com/v1/gifs/search?q="
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
            var animate = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed_height_still.url;
            var img = $("<img>")
            img.attr("src", still);
            img.attr("data-still", still);
            img.attr("data-animate", animate);
            img.attr("data-state", "still");
            img.addClass("gifAnimation");
            newDiv.append(img);
            newDiv.append("<br>");
            newDiv.append(ratingDiv);
            prependGifs(newDiv);
            gifAnim();


            function gifAnim() {
                $(document).on("click", ".gifAnimation", function () {
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });
            };


        }
    });
})

// // Trigger ajax call for user pressing button//
function gifSearch() {
    $(document).on("click", ".button", function (event) {
        event.preventDefault();
        term = $(this).text();
        queryURL = protocol + term + query + api;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            for (var i = 0; i < 10; i++) {
                var newDiv = $("<div class='gif'>");
                var ratingDiv = $("<span class='rating'>");
                var rating = "Rating: " + response.data[i].rating;
                ratingDiv.text(rating);
                var animate = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                var img = $("<img>")
                img.attr("src", still);
                img.attr("data-still", still);
                img.attr("data-animate", animate);
                img.attr("data-state", "still");
                img.addClass("gifAnimation")
                newDiv.append(img);
                newDiv.append("<br>");
                newDiv.append(ratingDiv);
                prependGifs(newDiv);
                gifAnim();


                function gifAnim() {
                    $(document).on("click", ".gifAnimation", function () {
                        var state = $(this).attr("data-state");
                        if (state === "still") {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        } else {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }
                    });
                };
            }

        })
    })
}

// User input creates a button
function createButton() {
    event.preventDefault();
    var btn = document.createElement("button");
    btn.innerHTML = $("#userInput").val();
    $(btn).attr("class", "button");
    $(btn).addClass("btn btn-info");
    $("#buttons").append(btn);
}

// group img and rating and place them in the "gifView div"
//put the gifs on the page
function prependGifs(newDiv) {
    $("#gifView").prepend(newDiv);
}

// // gif animation
// function gifAnim() {
//     $(".gifAnimation").on("click", function () {
//         if (state === "still") {
//             $(this).attr("src", $(this).attr("data-animate"));
//             $(this).attr("data-state", "animate");
//           } else {
//             $(this).attr("src", $(this).attr("data-still"));
//             $(this).attr("data-state", "still");
//           }

//     });
// };
