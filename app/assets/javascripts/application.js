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

window.onscroll = function() {
	scrollFunction()
};

function scrollFunction() {
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
  	document.querySelector("#logo").classList.remove("logo-appear");
  } else {
  	document.querySelector("#logo").classList.add("logo-appear");
  }
}


// Causes the rating form to appear when the "Add rating" button is clicked (and the button to move up)
function getForm(id) {
	var form = document.getElementById(id);
	form.classList.toggle("form-show");
	button_id = id + "-button";
	document.getElementById(button_id).classList.toggle("move-add-rating-up");
}

// Sends the current range input value to the output field below it
function sendOutput() {
	document.querySelector("output").value = parseFloat(rating.value);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// // Used on the Clubs page to copy the Club URL to the clipboard
// async function copyToClipboard() {
//   const el = document.createElement('textarea');  // Create a <textarea> element
//   link = document.querySelector("#share-link").textContent;
//   // console.log("Link: " + link);
//   el.value = link;                                // Set its value to the string that you want copied
//   el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
//   el.style.position = 'absolute';                 
//   el.style.left = '-9999px';                      // Move outside the screen to make it invisible
//   document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
//   const selected =            
//     document.getSelection().rangeCount > 0        // Check if there is any content selected previously
//       ? document.getSelection().getRangeAt(0)     // Store selection if found
//       : false;                                    // Mark as false to know no selection existed before
//   el.select();                                    // Select the <textarea> content
//   document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
//   document.body.removeChild(el);                  // Remove the <textarea> element
//   if (selected) {                                 // If a selection existed before copying
//     document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
//     document.getSelection().addRange(selected);   // Restore the original selection
//     document.querySelector("#share-link-button").classList.add("copied");
//     await sleep(2000);
//   	document.querySelector("#share-link-button").classList.remove("copied");
//   }
// };

// Returns one book - this function should only be used if you have a Book ID
function googleBooksGetOneBook(response) {
	for (var i = 0; i < 1; i++) {
		var item = response.items[i];
		var categories = item.volumeInfo.categories === undefined ? 
			'' : "<span class='categories'>Category: " + item.volumeInfo.categories + "</span>"
		var pages = item.volumeInfo.pageCount === undefined ? '' : "<span class='pages'>" + item.volumeInfo.pageCount + " pages</span>"
		var published = item.volumeInfo.publishedDate === undefined ? 
			published = '' : published = "<span class='published'>Published " + item.volumeInfo.publishedDate + "</span>"

		var plural = item.volumeInfo.ratingsCount === 1 ? " vote)</em>" : " votes)</em>"
		var rating = item.volumeInfo.averageRating === undefined ? '' : "<em>Average rating on Google Books: " 
			+ item.volumeInfo.averageRating + "/5 (" + item.volumeInfo.ratingsCount + plural
		var description = item.volumeInfo.description === undefined ? 
			description = 'No synopsis is available for this book.' : description = item.volumeInfo.description 
		document.getElementById("book-synopsis").innerHTML += ("<p>" + categories + pages + published + rating
							+ "<span class='synopsis'>" + description + "<span>"
						+ "</p>");
		}
		document.getElementById("book_info").innerHTML +=
			("<input type='hidden' name='book[author]' value='" + item.volumeInfo.authors + "'>"
			+ "<input type='hidden' name='book[title]' value='" + item.volumeInfo.title + "'>");
	}

// You can configure how many books to return - currently set to 5
function googleBooksApiResponse(response) {
	for (var i = 0; i < 5; i++) {
		var item = response.items[i];
		var bookCoverLink = "https://books.google.com/books/content/images/frontcover/" + item.id
		var one = escape(1);
		var isbn = item.volumeInfo.industryIdentifiers[1].identifier

		// DuckDuckGo's search doesn't seem to work as consistently as Google's unfortunately
		// var amazonSearchLink = "https://duckduckgo.com/?q=!" + item.volumeInfo.title + "+" + item.volumeInfo.authors + "+amazon"
		
		var amazonSearchLink = "https://www.amazon.com/s?k=" + isbn + 
		"&ref=as_li_tl?ie=UTF8&tag=bookbros03-20&camp=15121&creative=330641&linkCode=as2&creativeASIN=1405206276"

		var googleSearchLink = "https://books.google.ca/books?id=" + item.id
		// Check if there are values so that "Undefined" does not get put into the app
		var categories = item.volumeInfo.categories === undefined ? 
			'' : "<span class='categories'>Category: " + item.volumeInfo.categories + "</span>"
		var pages = item.volumeInfo.pageCount === undefined ? '' : "<span class='pages'>" + item.volumeInfo.pageCount + " pages</span>"
		var published = item.volumeInfo.publishedDate === undefined ? 
			published = '' : published = "<span class='published'>Published " + item.volumeInfo.publishedDate + "</span>"

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
			("<li>"
				+ "<div class='book-title-and-author'>"
					+ "<span class='book-title'>" + item.volumeInfo.title + "</span>"
					+ "<span class='by'> by </span>"
					+ "<span class='book-author'>" + item.volumeInfo.authors + "</span>"
				+ "</div>"
				+ "<div class='description'>Details"
					+ "<div class='hidden-description'>" 
						+ "<span>"
							+ "<a class='rounded-link small-link' target='_blank' href=\"" + amazonSearchLink + "\">"
								+ "<img class='icon-small' src='/assets/amazon_icon.png'> Amazon</a>"
							+ "<a class='rounded-link small-link' target='_blank' href=\"" + googleSearchLink+ "\">"
								+ "<img class='icon-small' src='/assets/google_icon.png'> Google</a>"
						+"</span>"
						+ "<p>" + categories + pages + published + rating + ""
							+ "<span class='synopsis'>" + description + "<span>"
						+ "</p>"
					+ "</div>"
				+ "</div>"
				+ "<a class='book-cover-link' href='/books/" + item.id + "'>" 
					+ "<figure>"
						+ "<div id = '" + item.id + "' style='background: url(" + bookCoverLink + "?fife=w200-h300)'></div>"
					+ "</figure>"
				+ "</a>"
			+ "</li>");

	}
	return response.items
}




