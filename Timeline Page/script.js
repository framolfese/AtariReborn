$(document).ready(function(){
	var dates = $('.mydata');
	var dates_inverted = $('.mydata-inverted');
	var dates_array = new Array();
	var inc = 100 / (dates.length + dates_inverted.length);

	function isInArray(value, array) {
		var i = 0;
		for(i; i<array.length; i++){
			if(array[i].is(value)) return true;
		}
		return false;
	}

	function findIndex(value, array) {
		var i = 0;
		for(i; i<array.length; i++){
			if(array[i].is(value)) return i;
		}
		return -1;
	}

	$(dates).on("click" ,(function(){
		var t = $(this);
		var cond = isInArray(t,dates_array);
		var width_parent = $('#statusbar').parent().width();
		if(!cond){
			$(t).parent().css({"margin-bottom": "7rem"});
			$(t).addClass('schiacciato');
			$(t).parent().children().not(t).removeClass('withBlur');
			$(t).next().fadeIn(1500);
			$('#statusbar').css({"width": (($('#statusbar').width()/width_parent) * 100 + inc)  + "%"});
			dates_array.push(t);
		}
		else{
			$(t).parent().css({"margin-bottom": "22rem"});
			$(t).removeClass('schiacciato');
			$(t).parent().children().not(t).not(t.next()).addClass('withBlur');
			$(t).next().hide();
			$('#statusbar').css({"width": (($('#statusbar').width()/width_parent) * 100 - inc)  + "%"});
			var idx = findIndex(t, dates_array);
			if(idx > -1) dates_array.splice(idx, 1);
		}
		
	}));

	$(dates_inverted).on("click", (function(){
		var t = $(this);
		var cond = isInArray(t,dates_array);
		var width_parent = $('#statusbar').parent().width();
		if(!cond){
			$(t).parent().css({"margin-top": "8.5rem"});
			$(t).addClass('schiacciato-inverted');
			$(t).parent().children().not(t).removeClass('withBlur');
			$(t).next().fadeIn(1500);
			$('#statusbar').css({"width": (($('#statusbar').width()/width_parent) * 100 + inc)  + "%"});
			dates_array.push(t);
		}
		else{
			$(t).parent().css({"margin-top": "22rem"});
			$(t).removeClass('schiacciato-inverted');
			$(t).parent().children().not(t).not(t.next()).addClass('withBlur');
			$(t).next().hide();
			$('#statusbar').css({"width": (($('#statusbar').width()/width_parent) * 100 - inc)  + "%"});
			var idx = findIndex(t, dates_array);
			if(idx > -1) dates_array.splice(idx, 1);
		}
	}));

	/*var clicked = false;
	$('#openall_button').click(function(){
		var toTrigger1 = new Array();
		var toTrigger2 = new Array();
		console.log(dates_array);
		console.log(toTrigger1);
		console.log(toTrigger2);
		if(!clicked){
			var i = 0;
			for(i; i<dates.length; i++){
				if(!isInArray(dates[i], dates_array)){
					toTrigger1.push(dates[i]);
				}
			}
			
			var j = 0;
			for(j; j<dates_inverted.length; j++){
				if(isInArray(dates_inverted[j], dates_array)){
					toTrigger2.push(dates_inverted[j]);
				}
			}

			dates(toTrigger1).trigger("click");
			console.log(toTrigger1);
			toTrigger1.splice(0,toTrigger1.length);
			dates_inverted(toTrigger2).trigger("click");
			console.log(toTrigger2);
			toTrigger2.splice(0,toTrigger2.length);

			console.log(toTrigger1);
			console.log(toTrigger2);
			
			$('#statusbar').css({"width": 100+"%"});
			//clicked = true;
		}/*
		else{
			for(i; i<toTrigger1.length; i++){
				if(isInArray(toTrigger1[i], dates_array)){
					toTrigger1.splice(i, 1);
				}
			}
			var j = 0;
			for(j; j<toTrigger2.length; j++){
				if(isInArray(toTrigger2[j], dates_array)){
					toTrigger2.splice(j, 1);
				}
			}
			$(toTrigger1).trigger("click");
			$(toTrigger2).trigger("click");
			$('#statusbar').css({"width": 0+"%"});
			clicked = false;
		}
	});*/
});
