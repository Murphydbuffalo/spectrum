;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);

	$doc.ready(function() {
		// Set "active" link by pathname
		if(window.location.pathname === '/home'){
			$('#home').addClass('active');
		} else if (window.location.pathname === '/commercial'){
			$('#commercial').addClass('active');
		} else {
			$('#residential').addClass('active');
		}

		// Scroll to contact form on click
		$('#contact').click(function(event){
			event.preventDefault();
			$('html, body').animate({
				scrollTop: $('.form-contact').offset().top - 225
			}, 600);
		});

		// Modals
		$('.open-modal').click(function(event){
			event.preventDefault();
			$('.wrapper').css({ "pointer-events": "none"});
			$('.modal').css({ display: "block", "pointer-events": "auto" });
		});

		$('.close-modal').click(function(event){
			event.preventDefault();
			$('.modal').css({ display: "none" });
			$('.wrapper').css({ 'pointer-events': "auto"});
		});

		// Show more testimonials
		$('#toggle-testimonials').click(function(event){
			event.preventDefault();
			var $oldTestimonials = $('.shown.testimonials');
			var $newTestimonials = $('.hidden.testimonials');

			$oldTestimonials.css("display", "none").removeClass('shown').addClass('hidden');
			$newTestimonials.fadeIn().css("display", "table").removeClass('hidden').addClass('shown');
		});

		// Sweet Alert
		$win.load(function(){
			if( $('.form-contact').data('sweet-alert') === true){
				swal("Message sent!", "Your message was succesfully submitted.  Someone will be in touch with you shortly.", "success");
			}
		});

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
	});
})(jQuery, window, document);
