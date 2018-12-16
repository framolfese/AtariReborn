
$(document).ready(function(){
	var clicked = false;
	  
	var back_to_top_button = '<p class="float-right"><a href="#" style="color: #dc3545">Back to top</a></p>'
	

    $("#welcome_label").click(function(){

    	if(clicked){
    		$(this).text('ATARI REBORN');
			$('#toshow').slideUp("slow");
			$('#firstline').slideUp('slow');
			$('footer p:first-child').remove();
    		clicked =false;
    	}

    	else{
    		$(this).text('EASTER EGG');
			$('#toshow').slideDown("slow");
			$('#firstline').slideDown('slow');
			$('footer').prepend(back_to_top_button);
    		clicked = true;
    	}
	});
	
	$("#my-carousel").hover(function(){
		$('.d-block').addClass('withBlur');
		$("#my-carousel").addClass('classWithShadow');
		$('.overlay').slideDown('slow');
		
	}, function(){
		$('.d-block').removeClass('withBlur');
		$("#my-carousel").removeClass('classWithShadow');	
		$('.overlay').slideUp('slow');
		
	});

	$('#toshow').hover(function(){
		$(this).addClass('classWithShadow');
	}, function(){
		$(this).removeClass('classWithShadow');
	});

	$('.privacyandterms').click(function(){
		if($(this).attr('id') === 'terms'){
			$('#modal-terms').modal('show');
		}
		else{
			$('#modal_privacy').modal('show');
		}
	});
});

