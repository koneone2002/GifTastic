// create an array of clickable items

var sports = ["steph curry", "kevin durant", "lebron james", "james hardin", "san francisco giants", "golden state warriors", "san jose sharks", "buster posey", "joe panik", "bruce bochy", "hunter pence", "lance armstrong", "tour de france", "chris froome", "peter sagan", "venus williams", "oprah winfrey", "bike crashes", "tom brady", "smiling dogs"];

// create a submit button that takes user input and creates another category item by adding it to the array
$(document).ready(function () {
    $("#add-sport").on("click", function () {
        event.preventDefault();
        var mySport = $("#sports-input").val().trim();
        if (mySport === "") {
            alert("you need to enter something");
        } else {
       
        sports.push(mySport);
        // sessionStorage.clear();
        // sessionStorage.setItem("sport", mySport);
        }
        renderButtons();
    });
    
    // This NEEDS to be 'document' - not a $jquery selector - so when the page loads any click on the doc will work - otherwise the page loads before the items are added to the array 

    $(document).on("click",".sporty", function () {
        // Grabbing and storing the data-name property value from the button
        
        $("#sports").empty();
        var sports = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            sports + "&api_key=IGfsR8cPY5lg46lqFb0qZszrXY8zScAl&limit=10&rating=g&rating=pg";
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
                    var sportDiv = $("<div>").attr("class", "trouble");
                    var p = $("<p>").text("Rating:  " + results[j].rating.toUpperCase());
                     // This is the part that handles the animation  
                    var sportImage = $("<img>");
                    
                    // This assigns the necessary data states for the animation on click below
                    sportImage.attr({
                        "src": results[j].images.fixed_height_still.url,
                        "data-state": "still",
                        "data-animate": results[j].images.fixed_height.url,
                        "data-still": results[j].images.fixed_height_still.url
                        
                    });
                   
    
                    sportImage.on("click", function() {
                        // This checks the state - if the state is still, we change it to animate, else we change it to still - like a toggle   
                        var state = $(this).attr("data-state");
                        if (state === "still") {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        } else {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }
                    });   
                
    
                    
    
    
                    sportDiv.append(sportImage);
                    sportDiv.append(p);
                    
                    
                    // sportImage.append(p);
                   
    
                    $("#sports").append(sportDiv);
                }
            });
            
    });
    
});

// This is the function that creates the buttons
function renderButtons() {
    $("#sportsButton").empty();

    for (var i = 0; i < sports.length; i++) {
        var button = $("<button>");
        button.addClass("sporty");
        button.attr("data-name", sports[i]);
        button.text(sports[i]);
        $("#sportsButton").append(button);
        localStorage.setItem("button", "sporty");
    }
}



renderButtons();

