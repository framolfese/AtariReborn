
$(document).ready(function(){
	
	$("#carouselExampleIndicators").hover(function(){
		$('.d-block').addClass('withBlur');
		$("#carouselExampleIndicators").addClass('classWithShadow');
		$('.overlay').slideDown('slow');
		
	}, function(){
		$('.d-block').removeClass('withBlur');
		$("#carouselExampleIndicators").removeClass('classWithShadow');	
		$('.overlay').slideUp('slow');
		
	});

	$("#stopbutton").click(function(){
		$("#congrats").removeClass("withPulse");
		$("#congrats").removeClass("wrapper");
		$("#stopbutton").hide();
		$("#elem1").show();
		$("#elem2").show();
		$("#elem3").show();
		$("#elem4").show();
		$("#playbutton").show();
	});

});

