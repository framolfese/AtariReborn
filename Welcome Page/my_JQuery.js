var clicked = false;
$(document).ready(function(){
    $("#welcome_label").click(function(){

    	if(clicked){
    		$(this).text('ATARI REBORN');
			$('#toshow').slideUp("slow");
			$('#firstline').slideUp('slow');
			
    		clicked =false;
    	}

    	else{
    		$(this).text('EASTER EGG');
			$('#toshow').slideDown("slow");
			$('#firstline').slideDown('slow');
    		clicked = true;
    	}
	});
	
	$("#carouselExampleIndicators").hover(function(){
		$('.d-block').addClass('withBlur');
		$("#carouselExampleIndicators").addClass('classWithShadow');
		$('.overlay').slideDown('slow');
		
	}, function(){
		$('.d-block').removeClass('withBlur');
		$("#carouselExampleIndicators").removeClass('classWithShadow');	
		$('.overlay').slideUp('slow');
		
	});

	$('#toshow').hover(function(){
		$(this).addClass('classWithShadow');
	}, function(){
		$(this).removeClass('classWithShadow');
	});

});

