// Premade list of gifs
var gifs = ["Black Panther", "Boondocks", "Futurama", "Rick and Morty", "Tonight Show", "HIMYM", "Sixers", "Steelers", "Nike", "Olympics" ];

// displayGifInfo function re-renders the HTML to display the appropriate content
function displayGifInfo() {

    var gifSearchResult = $(this).attr("data-name");

    // URL that utilizes the gif search result from the buttons created up to pg-13 and with 10 gifs 
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=l0H0WniOrvNP9E3BWSJxy2EWJ5GWPGNY&q=" + gifSearchResult + "&limit=10&offset=0&rating=pg-13&lang=en";

    // API key - l0H0WniOrvNP9E3BWSJxy2EWJ5GWPGNY
    // Creates AJAX call for the specific gif button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var gifsArray = response.data
        // $("#gifs-view").empty();
        for (var i = 0; i < gifsArray.length; i++) {

            // Creates a div to hold the gif
            var gifDataToDiv = $("<div>")

            /////////// Rating ///////////
            $('#gifs-view').append(gifDataToDiv);
            // Retrieves the Rating Data
            console.log(gifsArray)
            // Creates an element to have the rating displayed
            var gifRating = $("<h3>").text(gifsArray[i].rating)
            // Displays the rating
            gifDataToDiv.append("<h3>Rating: " + gifsArray[i].rating + "<h3>")

            /////////// Images ///////////
            $('#gifs-view').prepend(gifDataToDiv);
            var gitImage = $("<img>").attr("src", gifsArray[i].images.original.url)
            gitImage.attr("data-still", gifsArray[i].images.original_still.url)
            gitImage.attr("data-animate", gifsArray[i].images.original.url)
            gitImage.attr("data-state", "animate")
            gitImage.attr("class", "gif")
            gifDataToDiv.append(gitImage)
        }
    });
}

// On click allows button to flip from still to animate depending on the gifs current state
// Gif starts on animate and when clicked gets changed to still both in data-state as well as image displayed
$(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    console.log("state")

    if (state === "still") {
        $(this).attr('src', $(this).attr("data-animate"))
        $(this).attr("data-state", "animate")
        console.log(state)
        console.log("moving")
    }

    if (state === "animate") {
        $(this).attr('src', $(this).attr('data-still'))
        $(this).attr("data-state", "still")
        console.log(state)
        console.log("not moving")
    }
});

// Displays gif data
function renderButtons() {

    // Deletes the gifs prior to adding new gifs in order to have a clean slate upon creation
    $("#buttons-view").empty();
    // for loop to go through the array of gifs
    for (var i = 0; i < gifs.length; i++) {

        // Generates buttons for each gif in the array while addin classes and attributes
        var a = $("<button>");
        a.addClass("gifClass");
        a.attr("data-name", gifs[i]);
        a.text(gifs[i]);
        $("#buttons-view").append(a);
    }
}

// Allows button creation when adding a gif
$("#add-gif").on("click", function (event) {
    event.preventDefault();
    var gif = $("#gif-input").val().trim();
    gifs.push(gif);
    renderButtons();
});

// Adding click event listeners to all elements with a class of "gif"
$(document).on("click", ".gifClass", displayGifInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();