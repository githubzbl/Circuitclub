// std.js
$(document).ready(function() {
	alert('is on');
	$('a#exam').click(function(event) {
		event.preventDefault();
		// alert('its click');
		$('main.container').load('/std/paperinfo');
	});
});