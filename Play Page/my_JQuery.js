
$(document).ready(function(){
	var audio = new Audio('alarm_sound.mp3');
	audio.play();

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

