// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.querySelector("#logo img").style.width = "150px";
    document.querySelector("#logo img").style.opacity = "0.3";
    document.querySelector("#logo img").style.right = "20px";

  } else {
    document.querySelector("#logo img").style.width = "400px";
    document.querySelector("#logo img").style.opacity = "1";
    document.querySelector("#logo img").style.right = "calc(50% - 200px)";
  }
}


// Causes the rating form to appear when the "Add rating" button is clicked (and the button to move up)
function getForm(id) {
	var form = document.getElementById(id);
	form.classList.toggle("form-show");
	button_id = id + "-button";
	document.getElementById(button_id).classList.toggle("move-add-rating-up");
}

// .addEventListener("input[type='range']", sendOutput);

// Sends the current range input value to the output field below it
function sendOutput() {
	document.querySelector("output").value = parseFloat(rating.value);
}

// " + item.volumeInfo.imageLinks.thumbnail + "
function googleBooksApiResponse(response) {
	for (var i = 0; i < 5; i++) {
		var item = response.items[i];
		var bookCoverLink = "https://books.google.com/books/content/images/frontcover/" + item.id
		var one = escape(1);
		var isbn = item.volumeInfo.industryIdentifiers[1].identifier

		// var amazonSearchLink = "http://www.google.com/search?q=" + isbn + "+amazon.com&btnI"
		// var amazonSearchLink = "https://duckduckgo.com/?q=!" + item.volumeInfo.title + "+" + item.volumeInfo.authors + "+amazon"
		
		var amazonSearchLink = "https://www.amazon.com/s?k=" + isbn + "&camp=1789&creative=9325&linkCode=xm2"
			+ "&linkId=48ba27de2a923a70c174c1085d1eb13c&tag=bookbros-20&ref=as_li_qf_sp_sr_il_tl"
		console.log(item.volumeInfo.description)	

		// longhand if statement (replaced below)
		// if(item.volumeInfo.description === undefined) {
		// 	description = 'No synopsis available for this book.'
		// }	
		// else {
		// 	description = item.volumeInfo.description
		// };

		// Check if there are values so that "Undefined" does not get put into the app
		var pages = item.volumeInfo.pageCount === undefined ? '' : ", " + item.volumeInfo.pageCount + " pages"
		var published = item.volumeInfo.publishedDate === undefined ? published = '' : published = "<br><br>Pub. " + item.volumeInfo.publishedDate
		var rating = item.volumeInfo.averageRating === undefined ? '' : "<br><br>Avg Google Books rating: " 
			+ item.volumeInfo.averageRating + "/5 (" + item.volumeInfo.ratingsCount + " people)"

		var description = item.volumeInfo.description === undefined ? description = 'No synopsis available for this book.' : 
			description = item.volumeInfo.description 
		// Associate ID: bookbros03-20

		document.getElementById("book-search-results").innerHTML += 
			("<li>" 
				// "<a href='" + item.selfLink + "'>link</a>
				+ "<div class='description'>View details<div class='hidden-description'>" 
						+ "<span>"
							+ "<a class='rounded-link' target='_blank' href=\"" + amazonSearchLink + "\">Amazon</a>"
							+ "<a class='rounded-link' target='_blank' href=\"" + item.volumeInfo.previewLink + "\">Google Books</a></span>"
					+ "<p>" + item.volumeInfo.categories + pages + published + rating + "<br><br>" + description + "</p>"
				+ "</div></div>"	
				+ "<figure><a href=\"" + bookCoverLink +"?fife=w667-h1000\">"
					+ "<img src=\"" + bookCoverLink + "?fife=w200-h300\"/>"
					+ "<figcaption class='book-title-and-author'>"
						+ "<span class='book-title'>" + item.volumeInfo.title + "</span>"
						+ "<span class='by'> by </span>"
						+ "<span class='book-author'>" + item.volumeInfo.authors + "</span>"
					+ "</figcaption></a></figure></li>");
	}
	return response.items
}



