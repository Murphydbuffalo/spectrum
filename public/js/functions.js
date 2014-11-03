;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);

	$doc.ready(function() {
		// Set "active" link by pathname
		console.log(window.location.pathname);
		if(window.location.pathname === '/home'){
			$('#home').addClass('active');
		} else if (window.location.pathname === '/commercial'){
			$('#commercial').addClass('active');
		} else {
			$('#residential').addClass('active');
		}

		//Fullscreener
		$('.background img').fullscreener();

		$('.expand').on('click', function () {
			$('.nav').toggleClass('open')

			return false;
		});

		function tableTitles () {
			var ww = $win.width()

			if (ww < 761) {
				$('.table td h5').each(function () {
					if ($(this).next().length ) { 
						$(this).show()
					}
				})
			} else if (ww > 760) {
				$('.table td h5').hide()
			}
		}
		tableTitles()

		$win.resize(function () {
			tableTitles();
		});

		$win.load(function() {
			$('.slider-services .slider-clip').flexslider({
				animation: "slide",
				slideshow: false,
				itemWidth: 283,
				controlNav: false,
				directionNav: false,
				move:1,
				itemMargin: 5
			});
		});

		// MAP
		function initialize() { 
			var mapOptions = {
				center: new google.maps.LatLng(27.429960, -82.521129),
				zoom: 16,
				scrollwheel: false,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			var map = new google.maps.Map(document.getElementById("map"), mapOptions);
			var myLatlng = new google.maps.LatLng(27.429960, -82.521129);

			var marker = new google.maps.Marker({
		        position: myLatlng,
		        map: map
		    });
		};
		
		if ( $('.map').length ) {
			initialize();
		};

		plugin_submit_forms();
	});

	// Forms JS

	 function validate_form(form) {
		var pattern = /^([A-Za-z0-9_\-\.\+])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
			error = false;

		$( "input.required", form ).each(function(){
			if (error == false) {
				var field 		= $(this),
					field_type 	= $(this).attr('type'),
					field_value = $(this).val(),
					field_title = $(this).attr('title');

				switch( field_type ) {
					case 'text':
						if (field_value=='' || field_value==field_title) {
							console.log(field_value, field_title, field_value==field_title)
							if (field_title) {
								alert("Please fill out " + field_title + ".");
							}else{
								alert("Please fill out all require fields.");
							};
							field.focus();
							error = true;
						}
					  break;
					case 'email':
						if (field_value=='' || field_value==field_title) {
							if (field_title) {
								alert("Please fill out " + field_title + " field.");
							}else{
								alert("Please fill out all require fields.");
							};
							field.focus();
							error = true;
						}else if ( !pattern.test(field_value) ) {
							if (field_title) {
								alert("Please enter a valid " + field_title + ".");
							}else{
								alert("Please enter a valid e-mail address.");
							};
							field.focus();
							error = true;
						}
					  break;
					default:
					  // do nothing
					break;
				}
			};
		});

		return !error;
	}

	function plugin_submit_forms() {
		$('form.js_handler').on('submit',function() {
			if ( !validate_form($(this)) ) {
				return false;
			}

			var self 	= $(this);
			var data 	= $(this).serializeArray();
			var url 	= $(this).attr('action');
			$.ajax({
				url: url,
				data: data,
				type: 'POST',
				success: function (response) {
					if ( response !== 'Message has been sent.' && response !== 'An error has occur.' ) {
						self.find('.submit-error').remove();
						self.append('<div class="submit-error"><div class="section-head"><p style="text-align: center;">' + response + '</p></div></div>')
						return;
					};

					if (self.attr('data-thank-you')) {
						window.location.href = self.attr('data-thank-you');
					}else{
						self.slideUp('300',function(){
							self.html('<div class="success-submit"><h2 style="text-align: center;">Thank you.</h2></div>').slideDown();
						});
					};
				},
				error: function (err) {
					alert("Sorry, your message couldn't be sent at this time. Please try again later.");
				}
			});
			return false;
		});
	}

	// End Forms JS
})(jQuery, window, document);
