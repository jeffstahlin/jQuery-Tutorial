$(document).ready(function() {
	$('div.chapter a[href*="wikipedia"]').attr({
		rel: 'external',
		title: function() {
			return 'Learn more about ' + $(this).text() + ' at Wikipedia.';
		},
		id: function(index, oldValue) {
			return 'wikilink-' + index;
		}
	});
});

//Back to top link
$(document).ready(function() {
	$('<a href="#top">back to top</a>').insertAfter('div.chapter p');
	$('<a id="top"></a>').prependTo('body');
});

//Move footnotes to above the footer and add links to them in the page where they were moved from
$(document).ready(function() {
	var $notes = $('<ol id="notes"></ol>').insertBefore('#footer');

	$('span.footnote').each(function(index) {
		$(this)
			.before([
				'<a href="#footnote-',
				index + 1,
				'" id="context-',
				index + 1,
				'" class="context">',
				'<sup>',
				index + 1,
				'</sup></a>'
			].join(''))
			.appendTo($notes)
			.append([
				'&nbsp; (<a href="#context-',
				index + 1,
				'">context</a>)'
				].join(''))
			.wrap('<li id="footnote-' + (index + 1) + '"></li>');
	});
});

//Clone elements
$(document).ready(function() {
	$('div.chapter p:eq(0)').clone().insertBefore('div.chapter');
});

//Pull-quotes
$(document).ready(function() {
	$('span.pull-quote').each(function(index) {
		var $parentParagraph = $(this).parent('p');
		$parentParagraph.css('position', 'relative');

		var $clonedCopy = $(this).clone();
		$clonedCopy
			.addClass('pulled')
			.find('span.drop')
				.html('&hellip;')
			.end()
			.text($clonedCopy.text())
			.prependTo($parentParagraph)
			.addClass('rounded-top')
			.wrapInner('<div class="rounded-bottom"></div>');
	});
});