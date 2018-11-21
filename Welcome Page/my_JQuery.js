
$(document).ready(function(){
	var clicked = false;
	var modal = '<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'+
	'<div class="modal-dialog modal-dialog-centered" role="document">'+
	  '<div class="modal-content">'+
		'<div class="modal-header">'+
		  '<h5 class="modal-title" id="exampleModalLongTitle">Preliminary instructions</h5>'+
		  '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
			'<span aria-hidden="true">&times;</span>'+
		  '</button>'+
		'</div>'+
		'<div class="modal-body">'+
		  'Our web-site is completely interactive, can I ask you to click everywhere? :)<br>'+
		  'Maybe try to click the ATARI REBORN logo on the left-top side.'+
		'</div>'+
		'<div class="modal-footer">'+
		  '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'+
		'</div>'+
	  '</div>'+
	'</div>'+
	'</div>';
	  
	var back_to_top_button = '<p class="float-right"><a href="#" style="color: #dc3545">Back to top</a></p>'
	
	$(modal).modal('show');

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

	var modal_terms = '<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">'+
	'<div class="modal-dialog" role="document">'+
	  '<div class="modal-content">'+
		'<div class="modal-header">'+
		  '<h5 class="modal-title" id="exampleModalLongTitle">Terms</h5>'+
		  '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
			'<span aria-hidden="true">&times;</span>'+
		  '</button>'+
		'</div>'+
		'<div class="modal-body">'+
		  '...'+
		'</div>'+
		'<div class="modal-footer">'+
		  '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'+
		  '<button type="button" class="btn btn-primary">Save changes</button>'+
		'</div>'+
	  '</div>'+
	'</div>'+
  '</div>'

  	var modal_privacy = '<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">'+
	'<div class="modal-dialog" role="document">'+
	  '<div class="modal-content">'+
		'<div class="modal-header">'+
		  '<h5 class="modal-title" id="exampleModalLongTitle">Privacy</h5>'+
		  '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
			'<span aria-hidden="true">&times;</span>'+
		  '</button>'+
		'</div>'+
		'<div class="modal-body">'+
		  '...'+
		'</div>'+
		'<div class="modal-footer">'+
		  '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'+
		  '<button type="button" class="btn btn-primary">Save changes</button>'+
		'</div>'+
	  '</div>'+
	'</div>'+
  '</div>'
	$('.privacyandterms').click(function(){
		if($(this).attr('id') === 'terms'){
			$(modal_terms).modal('show');
		}
		else{
			$(modal_privacy).modal('show');
		}
	});
});

