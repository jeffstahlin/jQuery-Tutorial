$(document).ready(function() {
	$('tr:nth-child(even)').addClass('alt');
	$('td:contains(Henry)').nextAll().andSelf().addClass('highlight');
	$('a').filter(function() {
		return this.hostname && this.hostname != location.hostname;
	}).addClass('external');
});