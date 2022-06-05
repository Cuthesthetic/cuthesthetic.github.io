(function($) {
	$(document).ready(function() {
		"use strict";
		// HERO FADE
		var div = $('.header');
			$(window).on('scroll', function() {
			var st = $(this).scrollTop();
			div.css({ 'opacity' : (1 - st/500) });
		});

		var divs = $('.page-header');
			$(window).on('scroll', function() {
			var st = $(this).scrollTop();
			divs.css({ 'opacity' : (1 - st/400) });
		});
		
		// NAV LINK HOVER AUDIO
		$(".navigation-menu a")
			.each(function(i) {
			if (i != 0) {
			  $("#hover-audio")
				.clone()
				.attr("id", "hover-audio" + i)
				.appendTo($(this).parent());
			}
			$(this).data("beeper", i);
		}).mouseenter(function() {
			$("#hover-audio" + $(this).data("beeper"))[0].play();
			});
			$("#hover-audio").attr("id", "hover-audio0");

			// SANDWICH MENU AUDIO
			document.getElementById("sandwich-btn").addEventListener('click', function(e) {
			document.getElementById("link").play();
	  	});
		

		// PAGE TRANSITION
		$('.navigation-menu ul li a').on('click', function(e) {
		$('.transition-overlay').toggleClass("open");
		});
		$('.navigation-menu ul li a').on('click', function(e) {
			e.preventDefault();                  
			var goTo = this.getAttribute("href"); 
			setTimeout(function(){
				window.location = goTo;
			},1000);       
		});	

		// HIDE NAVBAR
		$(window).scroll(function () {
			if ($(this).scrollTop() > 300) {
				$('.navbar').addClass('hide');
				$('.navbar').css('transition-delay', '0s');
			} else {
				$('.navbar').removeClass('hide');
			}
		});

		// SANDWICH BUTTON
		$('.sandwich-btn').on('click', function(e) {
			if ($(".navigation-menu").hasClass("open")) {
				$("body").removeClass('overflow');
				$(".navigation-menu").removeClass('open');
				$('.navigation-menu .two-layer').css('transition-delay', '0.4s');
				$('.navigation-menu .one-layer').css('transition-delay', '0.8s');
			} else
			{
				$(".navigation-menu").addClass('open');
				$("body").addClass('overflow');
				$('.navigation-menu .two-layer').css('transition-delay', '0.4s');
				$('.navigation-menu .one-layer').css('transition-delay', '0s');
			}
			$(this).toggleClass("open");
		});
		
		// SMOOTH SCROLL
		$('.case-details .case-navbar ul li a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000, 'easeInOutExpo');
        event.preventDefault();
    });
			
	});
	// END JQUERY		

	
	
	// PRELOADER
	var width = 100,
		perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
		EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
		time = parseInt((EstimatedTime/1000)%60, 10)*100;

	$(".loadbar").animate({
	  	width: width + "%"
		}, time);

	function animateValue(id, start, end, duration) {

	var range = end - start,
	  	current = start,
	  	increment = end > start? 1 : -1,
	  	stepTime = Math.abs(Math.floor(duration / range)),
	  	obj = $(id);

	var timer = setInterval(function() {
		current += increment;
		$(obj).text(current + "%");
		if (current == end) {
			clearInterval(timer);
		}
	}, stepTime);
	}

	setTimeout(function(){
		$("body").addClass("page-loaded");
	}, time);

	// DATA BACKGROUND IMAGE
	var pageSection = $(".bg-image");
	pageSection.each(function(indx){
		if ($(this).attr("data-background")){
			$(this).css("background-image", "url(" + $(this).data("background") + ")");
		}
	});

	// WOW ANIMATION 
	var wow = new WOW(
	{
		animateClass: 'animated',
		offset:       50
	}
	);
	wow.init();

	// COUNTER 
	if (!document.getElementById("counter")) {
	} 
	else {

	var lastWasLower = false;
		$(document).scroll(function(){

		var p = $( "#counter" );
		var position = p.position();
		var position2 = position.top;

		if ($(document).scrollTop() > position2-300){
		if (!lastWasLower)
			$('#1').html("21");
			$('#2').html("37");
			$('#3').html("78");

		lastWasLower = true;
			} else {
		lastWasLower = false;
		}
		});		
	}

	// SLIDER
	var galleryTop = new Swiper('.gallery-top', {
		spaceBetween: 0,
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
		},
		autoplay: {
		delay: 4500,
		disableOnInteraction: false,
		},
		loop: true,
		loopedSlides: 3,
		thumbs: {
        swiper: galleryThumbs
      }
	});

	// SLIDER CONTROL
	var galleryThumbs = new Swiper('.gallery-thumbs', {
		spaceBetween: 10,
		centeredSlides: true,
		slidesPerView: 3,
		touchRatio: 0.2,
		slideToClickedSlide: true,
			direction: 'vertical',
		loop: true,
		loopedSlides: 3,
		breakpoints: {
        1024: {
          slidesPerView: 3
        },
        768: {
          slidesPerView: 3
        },
        640: {
          slidesPerView: 1
        },
        320: {
          slidesPerView: 1
        }
      }
		});
	
	if ($(".gallery-top")[0]){
		galleryTop.controller.control = galleryThumbs;
		galleryThumbs.controller.control = galleryTop;
		} 
	else {

		}
	
})(jQuery);
