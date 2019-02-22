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

// count=0
function getForm(id) {
	// id[count] = 0;
	var form = document.getElementById(id)
	// form.className += "form-show";
	form.classList.toggle("form-show");
	button_id = id + "-button";
	document.getElementById(button_id).classList.toggle("move-add-rating-up");
	// id[count] += 1;
}

