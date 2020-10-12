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

document.onload = function() {
	const logo = document.querySelector("#logo");
	if (logo) {
		logo.classList.add("logo-appear");
	}
}

window.onscroll = function() {
	const logo = document.querySelector("#logo");
	if (logo) {
		scrollFunction(logo);
	}
};

function scrollFunction(logo) {
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
  	logo.classList.remove("logo-appear");
  } else {
  	logo.classList.add("logo-appear");
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

// Used on the Clubs page to copy the Club URL to the clipboard
async function copyToClipboard() {
  const el = document.createElement('textarea');  // Create a <textarea> element
  link = document.querySelector("#share-link").textContent;
  // console.log("Link: " + link);
  el.value = link;                                // Set its value to the string that you want copied
  el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
  el.style.position = 'absolute';                 
  el.style.left = '-9999px';                      // Move outside the screen to make it invisible
  document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
  const selected =            
    document.getSelection().rangeCount > 0        // Check if there is any content selected previously
      ? document.getSelection().getRangeAt(0)     // Store selection if found
      : false;                                    // Mark as false to know no selection existed before
  el.select();                                    // Select the <textarea> content
  document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
  document.body.removeChild(el);                  // Remove the <textarea> element
  if (selected) {                                 // If a selection existed before copying
    document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
    document.getSelection().addRange(selected);   // Restore the original selection
    document.querySelector("#share-link-button").classList.add("copied");
    await sleep(2000);
  	document.querySelector("#share-link-button").classList.remove("copied");
  }
};

// Returns one book - this function should only be used if you have a Book ID
function googleBooksGetOneBook(response) {
	const item = response.items[0];
	const categories = item.volumeInfo.categories === undefined ? ''
		: "<span class='categories'>Category: " + item.volumeInfo.categories + "</span>"
	const pages = item.volumeInfo.pageCount === undefined ? '' 
		: "<span class='pages'>" + item.volumeInfo.pageCount + " pages</span>"
	const published = item.volumeInfo.publishedDate === undefined ? ''
		: "<span class='published'>Published " + item.volumeInfo.publishedDate + "</span>"
	const plural = item.volumeInfo.ratingsCount === 1 ? " vote)</em>" : " votes)</em>"
	const rating = item.volumeInfo.averageRating === undefined ? '' 
		: "<em>Average rating on Google Books: " + item.volumeInfo.averageRating + 
			"/5 (" + item.volumeInfo.ratingsCount + plural
	const description = item.volumeInfo.description === undefined ? 
		'No synopsis is available for this book.' 
		: item.volumeInfo.description 
	document.getElementById("book-synopsis").innerHTML += (
		"<p>" + 
			categories + pages + published + rating +
			"<span class='synopsis'>" + 
				description + 
			"</span>" +
		"</p>"
	);
	// Temporarily replace quotes so they don't end the string prematurely
	const unsanitized_title = item.volumeInfo.title;
	let title = unsanitized_title.replaceAll("'", "~~");
	title = title.replaceAll('"', '::'); 
	document.getElementById("book_info").innerHTML +=
		("<input type='hidden' name='book[author]' value='" + item.volumeInfo.authors + "'>"
		+ "<input type='hidden' name='book[title]' value='" + title + "'>");
}

// Function that queries Google Books API - currently set to return 5 results
function googleBooksApiResponse(response) {
	for (let i = 0; i < 5; i++) {
		const item = response.items[i];
		const bookCoverLink = "https://books.google.com/books/content/images/frontcover/" + item.id
		const isbn = item.volumeInfo.industryIdentifiers[1].identifier
		const amazonSearchLink = "https://www.amazon.ca/s?k=" + isbn + "&i=stripbooks&ie=UTF8"
		const googleSearchLink = "https://books.google.ca/books?id=" + item.id
		const categories = item.volumeInfo.categories === undefined ? 
			'' : "<span class='categories'>Category: " + item.volumeInfo.categories + "</span>"
			const pages = item.volumeInfo.pageCount === undefined ? '' : "<span class='pages'>" + item.volumeInfo.pageCount + " pages</span>"
		const published = item.volumeInfo.publishedDate === undefined ? 
			published = '' : "<span class='published'>Published " + item.volumeInfo.publishedDate + "</span>"
		const plural = item.volumeInfo.ratingsCount === 1 ? " vote)" : " votes)"
		const rating = item.volumeInfo.averageRating === undefined ? '' : "<br><br>Average rating: " 
			+ item.volumeInfo.averageRating + "/5 (" + item.volumeInfo.ratingsCount + plural
		const description = item.volumeInfo.description === undefined ? 
			description = 'No synopsis is available for this book.' : item.volumeInfo.description 

		const bookSearchResults = document.getElementById("book-search-results");
		if (bookSearchResults) { 
			bookSearchResults.innerHTML += 
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
	}
	return response.items
}




