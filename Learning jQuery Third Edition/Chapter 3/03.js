/*Simpler Alternative Code

$(document).ready(function() {
	$('#switcher-default').addClass('selected');

	$('#switcher').click(function(event) {
		if ($(event.target).is('button')) {
			var bodyClass = event.target.id.split('-')[1];

			$('body').removeClass().addClass(bodyClass);

			$('#switcher button').removeClass('selected');
			$(event.target).addClass('selected');
		} else {
			$('#switcher button').toggleClass('hidden');
		}
	});
});
*/

$(document).ready(function() {
	//Enable hover effect on the style swticher
	$('#switcher').hover(function() {
		$(this).addClass('hover');
	}, function() {
		$(this).removeClass('hover');
	});

	//Allow the style switcher to expand and collapse
	var toggleSwitcher = function(event) { 
		if (!$(event.target).is('button')) {
			$('#switcher button').toggleClass('hidden');
		}
	};
	$('#switcher').bind('click', toggleSwitcher);

	//Simulate a click so we start in a collapsed state
	$('#switcher').click();
	 

	// The setBodyClass() function changes the page style
	// The style switcher state is also updated
	var setBodyClass = function(className) {
		$('body').removeClass().addClass(className);

		$('#switcher button').removeClass('selected');
		$('#switcher-' + className).addClass('selected');

		$('#switcher').unbind('click', toggleSwitcher);

		if (className == 'default') {
			$('#switcher').bind('click', toggleSwitcher)
		}
	};

	//Begin with switcher-default button "selected"
	$('#switcher-default').addClass('selected');

	//Map keys to their corresponding buttons to click
	var triggers = {
		D: 'default',
		N: 'narrow',
		L: 'large'
	};

	//Call setBodyClass() when a button is clicked
	$('#switcher button').click(function(event) {
		if ($(event.target).is('button')) {
			var bodyClass = event.target.id.split('-')[1];
			setBodyClass(bodyClass);	
		}
	});

	//Call setBodyClass() when a key is pressed
	$(document).keyup(function(event) {
		var key = String.fromCharCode(event.keyCode);
		if (key in triggers) {
			setBodyClass(triggers[key]);
		}
	});
});

//Scripts for Excercise section
$(document).ready(function() {
	
	//When Charles Dickens is clicked toggle 'selected' style
	$('.author').click(function(event) {
		$(this).toggleClass('selected');
	});

	//When a chapter title (<h3 class="chapter-title">) is double-clicked, toggle the visibility of the chapter text
	$('.chapter-title').click(function(event) {
		$(this).parent().children('p').toggleClass('hidden');
	});
});