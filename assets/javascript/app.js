
// Initial array of xmas buttons
var topics = ["santa", "reindeer", "elf", "snow", "presents", "christmas-tree"]

// Function for displaying buttons data
function renderTopicButtons() {
    // Deleting the xmas buttons prior to adding new xmas buttons
    $("#buttons").empty();
    // Looping through the array of xmas buttons
    for (var i = 0; i < topics.length; i++) {
        var topic = topics[i];
        createButton(topic);
    }
}

function createButton(text) {
    var btn = $('<button/>',
        {
            text: text,
            click: function () { search(text) }
        });
    $("#buttons").append(btn);
}


function search(text) {
    // clear previous results
    $("#gifs-appear-here").empty();

    // Storing our giphy API URL for a random christmas image
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        text + "&api_key=FoeQWoF8PuMNeAyII59dhJ4xAMAU2xnn&limit=10";

    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data from the AJAX request comes back
        .then(function (response) {
            createImages(response.data);
        });
}

function createImages(imageDataArray) {
    for (var i = 0; i < imageDataArray.length; i++) {
        var gifInfo = imageDataArray[i];
        var rating = gifInfo.rating;
        var images = gifInfo.images;
        var fixedHeightStill = images.fixed_height_still;
        var fixedHeight = images.fixed_height;
        createImage(rating, fixedHeight.url, fixedHeightStill.url);
    }
}

function createImage(rating, animated, still) {
    // Creating and storing a div tag
    var topicDiv = $("<div>");

    // Creating a paragraph tag with the topics item's rating
    var p = $("<p>").text("Rating: " + rating);

    // Creating and storing an image tag
    var topicImage = $("<img>");
    // Setting the src attribute of the image to a property pulled off the result item
    topicImage.attr("src", still);
    topicImage.attr("data-still", still);
    topicImage.attr("data-animated", animated);
    topicImage.attr("class", "gif");

    // Appending the paragraph and image tag to the topicDiv
    topicDiv.append(p);
    topicDiv.append(topicImage);

    // Prependng the topicDiv to the HTML page in the "#gifs-appear-here" div
    $("#gifs-appear-here").prepend(topicDiv);
}

$(document).on("click", ".gif", function () {

    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var src = $(this).attr("src");
    var dataStill = $(this).attr("data-still");

    if (src === dataStill) {
        $(this).attr("src", $(this).attr("data-animated"));
    } else {
        $(this).attr("src", dataStill);
    }
});



// This function handles events where one button is clicked
$("#create-button").on("click", function (event) {
    // This line will grab the text from the input box
    var newTopic = $("#topic-input").val().trim();
    // The topic from the textbox is then added to our array
    topics.push(newTopic);
    // calling renderTopicButtons which handles the processing of our topic array
    renderTopicButtons();
});
// Calling the renderTopicButtons function at least once to display the initial list of topics
renderTopicButtons();
