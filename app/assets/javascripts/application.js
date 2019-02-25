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
		
		var amazonSearchLink = "https://www.amazon.com/s?k=" + isbn + 
		"&ref=as_li_tl?ie=UTF8&tag=bookbros03-20&camp=15121&creative=330641&linkCode=as2&creativeASIN=1405206276"

		var googleSearchLink = "https://books.google.ca/books?id=" + item.id
		// Check if there are values so that "Undefined" does not get put into the app
		var categories = item.volumeInfo.categories === undefined ? 
			'' : "<span class='categories'>Category: " + item.volumeInfo.categories + "</span>"
		var pages = item.volumeInfo.pageCount === undefined ? '' : "<span class='pages'>" + item.volumeInfo.pageCount + " pages</span>"
		var published = item.volumeInfo.publishedDate === undefined ? 
			published = '' : published = "<br><br><span class='published'>Published " + item.volumeInfo.publishedDate + "</span>"

		var plural = item.volumeInfo.ratingsCount === 1 ? " vote)" : " votes)"
		var rating = item.volumeInfo.averageRating === undefined ? '' : "<br><br>Average rating: " 
			+ item.volumeInfo.averageRating + "/5 (" + item.volumeInfo.ratingsCount + plural

		var description = item.volumeInfo.description === undefined ? 
			description = 'No synopsis is available for this book.' : description = item.volumeInfo.description 
		// Associate ID: bookbros03-20
		var template_form = document.querySelector('#template')
		// console.log(template_form.elements)
		var token = template_form.elements[1].value

		document.getElementById("book-search-results").innerHTML += 
			("<li><form action='/books' accept-charset='UTF-8' method='post'>" 
				+ "<input name='utf8' type='hidden' value='✓'>"
				+ "<input type='hidden' name='authenticity_token' value='" + token + "'>"
				+ "<input id='book_book' name='book[book]' type='hidden' value='" + item.id + "'>"		
				+ "<input id='book_title' name='book[title]' type='hidden' value='" + item.volumeInfo.title + "'>"
				+ "<input id='book_author' name='book[author]' type='hidden' value='" + item.volumeInfo.authors + "'>"
				+ "<input id='book_club' name='book[club]' type='hidden' value='bookbros'>"
				+ "<div class='book-title-and-author'>"
					+ "<span class='book-title'>" + item.volumeInfo.title + "</span>"
					+ "<span class='by'> by </span>"
					+ "<span class='book-author'>" + item.volumeInfo.authors + "</span></div>"
				+ "<div class='description'>Details"
					+ "<div class='hidden-description'>" 
						+ "<span>"
							+ "<a class='rounded-link small-link' target='_blank' href=\"" + amazonSearchLink + "\">"
								+ "<img class='icon-small' src='/assets/amazon_icon.png'> Amazon</a>"
							+ "<a class='rounded-link small-link' target='_blank' href=\"" + googleSearchLink+ "\">"
								+ "<img class='icon-small' src='/assets/google_icon.png'> Google</a>"
						+"</span>"
						+ "<p>" + categories + pages + published + rating + "<br><br>"
							+ "<span class='synopsis'>" + description + "<span>"
						+ "</p>"
				+ "</div></div>"
				+ "<figure>"
					
					+ "<input type='submit' name='commit' value='' id = '" + item.id + "' style='background: url(" + bookCoverLink + "?fife=w200-h300)'> "
				+ "</figure></form></li>");
	}
	return response.items
}




