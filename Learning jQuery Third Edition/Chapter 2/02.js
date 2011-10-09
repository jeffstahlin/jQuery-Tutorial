$(document).ready(function() {
	$('#selected-plays > li').addClass('horizontal');
	$('#selected-plays li:not(.horizontal)').addClass('sub-level');
	$('a[href^="mailto:"]').addClass('mailto');
	$('a[href$=".pdf"]').addClass('pdflink');
	$('a[href^="http"][href*="henry"]').addClass('henrylink');
});

$(document).ready(function() {
	$('tr:nth-child(odd)').addClass('alt');
	$('td:contains(Henry)').parent().children().addClass('highlight');
});

$('a').filter(function() {
	return this.hostname && this.hostname != location.hostname;
}).addClass('external');

$(document).ready(function() {
	$('#selected-plays ul').children().addClass('special');
	$('td:nth-child(3)').addClass('year');
	$('td:contains(Tragedy):first').parent().addClass('special');
});