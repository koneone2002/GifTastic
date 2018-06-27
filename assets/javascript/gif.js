// create an array of category items
var sports = ["steph curry", "kevin durant", "lebron james", "james hardin", "san francisco giants", "golden state warriors", "san jose sharks", "buster posey", "joe panik", "bruce bochy", "hunter pence", "lance armstrong", "tour de france", "chris froome", "peter sagan", "venus williams", "oprah", "serena williams", "maria sharapova", "danica patrick", "tonya harding", "nancy kerrigan"];
// create buttons using JS of the array of  category items - use a loop
// each time a button is clicked the img div area clears to make room for the new set of images(previously viewed ones disappear)

// request 10 fixed-height items of category from giphy


// show the rating of each giphy in a paragraph

// make each giphy start in a paused state and on click animate

// create a submit button that takes user input and creates another category item by adding it to the array
$(document).ready(function () {
    $("#add-sport").on("click", function () {
        event.preventDefault();
        var mySport = $("#sports-input").val().trim();
        sports.push(mySport);
    
        renderButtons();
    });
    $(document).on("click",".sporty", function () {
        // Grabbing and storing the data-name property value from the button
        
        $("#sports").empty();
        var sports = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            sports + "&api_key=dc6zaTOxFJmzC&limit=10";
            console.log(sports);
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                console.log(queryURL);
    
                console.log(response);
    
                var results = response.data
                for (var j = 0; j < results.length; j++) {
                    var sportDiv = $("<div>");
                    var p = $("<p>").text("Rating:  " + results[j].rating);
                    
                    var sportImage = $("<img>");
                    sportImage.attr({
                        "src": results[j].images.fixed_height_still.url,
                        "data-state": "still",
                        "data-animate": results[j].images.fixed_height.url,
                        "data-still": results[j].images.fixed_height_still.url
                        
                    });
                   
    
                    sportImage.on("click", function() {
                        
                        var state = $(this).attr("data-state");
                        if (state === "still") {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        } else {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }
                    });   
                
    
                    
    
    
    
                    sportDiv.append(p);
                    sportDiv.append(sportImage);
                   
    
                    $("#sports").append(sportDiv);
                }
            });
            
    });
    
});


function renderButtons() {
    $("#sportsButton").empty();

    for (var i = 0; i < sports.length; i++) {
        var button = $("<button>");
        button.addClass("sporty");
        button.attr("data-name", sports[i]);
        button.text(sports[i]);
        $("#sportsButton").append(button);
    }
}



renderButtons();

