//Switcher button effects
$(document).ready(function() {
	var $speech = $('div.speech');
	var defaultSize = $speech.css('fontSize');

	$('#switcher button').click(function() {
		var num = parseFloat($speech.css('fontSize'));

		switch (this.id) {
			case 'switcher-large':
				num *= 1.4;
				break;
			case 'switcher-small':
				num /= 1.4;
				break;
			default:
				num = parseFloat(defaultSize);
		}
		$speech.animate({fontSize: num + 'px'}, 'slow');
	});
});

//Read more link effects
$(document).ready(function() {
	var $firstPara = $('p').eq(1);
	$firstPara.hide();

	$('a.more').click(function() {
		$firstPara.animate({
			opacity: 'toggle',
			height: 'toggle'
		}, 'slow');

		var $link = $(this);
		
		if ($link.text() == 'read more') {
			$link.text('read less');
		} else {
			$link.text('read more');
		}
		return false;
	});
});

//Switcher animations
$(document).ready(function() {
	$('div.label').click(function() {
		var paraWidth = $('div.speech p').outerWidth();
		var $switcher = $(this).parent();
		var switcherWidth = $switcher.outerWidth();

		$switcher
			.css({position: 'relative'})
			.fadeTo('fast', 0.5)
			.animate({
				left: paraWidth - switcherWidth
			}, {
				duration: 'slow',
				queue: false
			})
			.fadeTo('slow', 1.0)
			.slideUp('slow', function() {
				$switcher.css({backgroundColor: '#f00'});
			})
			.slideDown('slow');
	});
});

//Paragraph effects
$(document).ready(function() {
	$('p').eq(2)
		.css('border', '1px solid #333')
		.click(function() {
			var $clickedItem = $(this);

			$clickedItem.next().slideDown('slow', function() {
				$clickedItem.slideUp('slow');
			});
		});
	$('p').eq(3).css('backgroundColor', '#ccc').hide();
});

//Excercises
$(document).ready(function() {
	$('body').fadeTo('slow', 1.0);

	$('p').hover(function(){
		$(this).css('backgroundColor', '#ffff00')
		}, function(){
			$(this).css('backgroundColor', '#fff')
		});

	$('h2').click(function() {
		$(this)
			.css({position: 'relative'})
			.animate({
				opacity: 0.25,
				left: '20px'
			})
			.queue(function(){
				$('div.speech').fadeTo('slow', 0.5);
			});
	});
});