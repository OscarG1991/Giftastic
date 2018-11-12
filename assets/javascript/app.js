        var gifs = ["Breath of the Wild","Resident Evil", "Red Dead Redemption", "Last of Us", "Fortnite", "Kingdom Hearts"];
        
       
function displayGifs () 

    {
        var giphy = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax ({
        url: queryURL,
        method: "GET"
                })

            .then(function(response)
            {
                var results = response.data;
                    for (var i = 0; i<results.length; i++)
                {   var animated = results[i].images.fixed_height.url
                    var still = results[i].images.fixed_height_still.url
                            if (results[i].rating !=="r" && results[i].rating !== "pg-13") 
                                {
                            var gifDiv = $("<div id='gif-display'>");
                            var rating = results[i].rating;
                            var p = $("<p>").text("Rating: " + rating);
                            var giphyImg = $("<img>");
                    giphyImg.addClass("gif-image")        
                    giphyImg.attr("src", still);
                    giphyImg.attr("data-state", "still");
                    giphyImg.attr("data-still", still);
                    giphyImg.attr("data-animate", animated);
                    gifDiv.append(p);
                    gifDiv.append(giphyImg);
                    $("#gif-view").prepend(gifDiv);
                }
                }
            });
    }
     function makeButtons ()
    {
        $("#gif-buttons").empty();
        for (var i = 0; i < gifs.length; i++)
        {
            var button = $("<button class='button button4'>");
            button.addClass("gif-button");
            button.attr("data-name", gifs[i]);
            button.text(gifs[i]);
            $("#gif-buttons").append(button);
        }
    }
        $("#add-gif").on("click", function (event){
        event.preventDefault();

        var gif = $("#gif-input").val().trim();
        gifs.push(gif);
        makeButtons();
        $("#gif-input").val("");
        });
        $(document).on("click", ".gif-button", displayGifs);

        function playGifs() {
        var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } 
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}

makeButtons();
$(document).on("click", ".gif-image", playGifs);

    

