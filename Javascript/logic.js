
var favorites = ["Sports", "Tacos", "Kittens", "Travel", "Scrubs", "LGBTQIA+", "Hikes", "Trees", "Sisters", "The Judds", "Hip Hop"];

function renderButtons() {
	$("#buttonsArea").empty(); // empties the buttonsArea div so we don't make duplicates

	// creates a button with attributes for every item in the favorites array
	for (var i = 0; i < favorites.length; i++) {
		var button = $("<button>");
		button.html(favorites[i]);
		button.addClass("btn btn-outline-secondary");
		button.attr("id", "fav-btn");
		button.attr("fav-title", favorites[i]);
		$("#buttonsArea").append(button);
	}
}



function displayGifs(newFav) {
console.log('displayGifs', thisFav)

	var thisFav = $(this).attr("fav-title");
	console.log(thisFav);
	var queryURL = "https://api.giphy.com/v1/gifs/search?"+newFav+"&api_key=fO9Gzn01DJleelz7mwNW9GChz3vAdzF6&limit=10";

	// ajax call that gets and returns the response object from the query url
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function (response) {
		console.log(response);
		var response = response.data;

		// creates a div that contains a still image gif and rating info for each response item
		for (var i = 0; i < response.length; i++) {
			var gifDiv = $("<div>");
			gifDiv.addClass("gifDiv");

			var rating = response[i].rating;
			var p = $("<p>").html("Rating: " + rating);
			p.addClass("text-center");

			var gifImage = $("<img>");
			gifImage.addClass("gif");
			gifImage.attr("src", response[i].images.fixed_height_still.url);
			gifImage.attr("data-still", response[i].images.fixed_height_still.url);
			gifImage.attr("data-animate", response[i].images.fixed_height.url);
			gifImage.attr("data-state", "still");

			// places the image and the rating text in the gifDiv
			gifDiv.append(p);
			gifDiv.prepend(gifImage);

			// places the gifDiv at the top of the mainArea div
			$("#mainArea").prepend(gifDiv);
		}
	});
}

// when the submit button is clicked, the input value is pushed to the favorites array and rendered into a new button
$("#submit-btn").on("click", function (event) {
	event.preventDefault();

	var newFav = $("#userInput").val().trim();
	favorites.push(newFav);
	renderButtons();
	displayGifs(newFav)
});

// listens for a click of any button with an id of fav-btn, then performs the displayGifs function
$(document).on("click", "#fav-btn", displayGifs);

// starts and stops the animated gif on click
$(document).on("click", ".gif", function () {
	var state = $(this).attr("data-state");

	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
});

renderButtons();

