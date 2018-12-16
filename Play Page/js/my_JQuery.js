
$(document).ready(function(){

	var userInfo = sessionStorage.getItem("userInformation");
	if(userInfo){
		userInfo = JSON.parse(userInfo);
		$('#welcome_label').text("WELCOME " + userInfo.username.toUpperCase());
		$('.span_username').text(userInfo.username);
	}

	$('#button_logout').click(function(){
		sessionStorage.removeItem("userInformation");
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

	$("#cardSnake").hover(function(){
		$(this).css({"transform": "scale(1.2)"});
		$(this).next().css({"transform": "scale(0.8)"});
	}, function(){
		$(this).css({"transform": "scale(1)"});
		$(this).next().css({"transform": "scale(1)"});
	});

	$("#cardSpace").hover(function(){
		$(this).css({"transform": "scale(1.2)"});
		$(this).prev().css({"transform": "scale(0.8)"});
	}, function(){
		$(this).css({"transform": "scale(1)"});
		$(this).prev().css({"transform": "scale(1)"});
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





