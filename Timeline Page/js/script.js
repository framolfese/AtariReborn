$(document).ready(function(){
	var dates = $('.mydata');
	var dates_inverted = $('.mydata-inverted');
	var dates_array = new Array();
	var col_dx = $(".coldx").find("li");
	var col_sx = $(".colsx").find("li");
	var last_schiacced = null;

	function findIndex(value, array) {
		var i = 0;
		for(i; i<array.length; i++){
			if(array[i] === (value)) return i;
		}
		return -1;
	}

	function openAllSx(idx_elem){
		var i = 0;
		for(i; i<col_sx.length; i++){
			if(i <= idx_elem){
				var t = $(col_sx[i]).children().children()[1];
				$(t).addClass('schiacciato');
				$(t).parent().children().not(t).removeClass('withBlur');
				$(t).next().fadeIn(1500);
				dates_array.push(t);
			}
			else{
				var t = $(col_sx[i]).children().children()[1];
				$(t).removeClass('schiacciato');
				$(t).parent().children().not(t).addClass('withBlur');
				$(t).next().hide();
				var idx = findIndex(t, dates_array);
				if(idx > -1) dates_array.splice(idx, 1);
			}
		}
		i = 0;
		for(i; i<col_dx.length; i++){
			if(i < idx_elem){
				var t = $(col_dx[i]).children().children()[1];
				$(t).addClass('schiacciato-inverted');
				$(t).parent().children().not(t).removeClass('withBlur');
				$(t).next().fadeIn(1500);
				dates_array.push(t);
			}
			else{
				var t = $(col_dx[i]).children().children()[1];
				$(t).removeClass('schiacciato-inverted');
				$(t).parent().children().not(t).addClass('withBlur');
				$(t).next().hide();
				var idx = findIndex(t, dates_array);
				if(idx > -1) dates_array.splice(idx, 1);
			}
		}
		last_schiacced = $(col_sx[idx_elem]).children().children()[1];
	}

	function openAllDx(idx_elem){
		var i = 0;
		for(i; i<col_sx.length; i++){
			if(i <= idx_elem){
				var t = $(col_sx[i]).children().children()[1];
				$(t).addClass('schiacciato');
				$(t).parent().children().not(t).removeClass('withBlur');
				$(t).next().fadeIn(1500);
				dates_array.push(t);
			}
			else{
				var t = $(col_sx[i]).children().children()[1];
				$(t).removeClass('schiacciato');
				$(t).parent().children().not(t).addClass('withBlur');
				$(t).next().hide();
				var idx = findIndex(t, dates_array);
				if(idx > -1) dates_array.splice(idx, 1);
			}
		}
		i = 0;
		for(i; i<col_dx.length; i++){
			if(i <= idx_elem){
				var t = $(col_dx[i]).children().children()[1];
				$(t).addClass('schiacciato-inverted');
				$(t).parent().children().not(t).removeClass('withBlur');
				$(t).next().fadeIn(1500);
				dates_array.push(t);
			}
			else{
				var t = $(col_dx[i]).children().children()[1];
				$(t).removeClass('schiacciato-inverted');
				$(t).parent().children().not(t).addClass('withBlur');
				$(t).next().hide();
				var idx = findIndex(t, dates_array);
				if(idx > -1) dates_array.splice(idx, 1);
			}
		}
		last_schiacced = $(col_dx[idx_elem]).children().children()[1];
	}

	$(dates).on("click" ,(function(){
		var t = $(this);
		var elem_idx = $(this).parent().parent().index();
		if(!t.is(last_schiacced)){
			openAllSx(elem_idx);
			$('#statusbar').css({"height": (30 + elem_idx * 60 + 2)  + "rem"});
		}
		else{
			$(t).removeClass('schiacciato');
			$(t).parent().children().not(t).addClass('withBlur');
			$(t).next().hide();
			if(t.is($('#first_elem'))){
				$('#statusbar').css({"height": 0 + "%"});
				last_schiacced = null;
			} 
			else{
				last_schiacced = $(col_dx[elem_idx - 1]).children().children()[1];
				$('#statusbar').css({"height": ((elem_idx) * 60 + 2)  + "rem"});
			} 
			var idx = findIndex(t, dates_array);
			if(idx > -1) dates_array.splice(idx, 1);
		}
	}));

	$(dates_inverted).on("click", (function(){
		var t = $(this);
		var elem_idx = $(this).parent().parent().index();
		if(!t.is(last_schiacced)){
			openAllDx(elem_idx);
			if(t.is($('#last_elem'))) $('#statusbar').css({"height": 100 + "%"});
			else $('#statusbar').css({"height": ((elem_idx+1) * 60 + 2)  + "rem"});
		}
		else{
			$(t).removeClass('schiacciato-inverted');
			$(t).parent().children().not(t).addClass('withBlur');
			$(t).next().hide();
			$('#statusbar').css({"height": ((elem_idx+1) * 60 + 2 - 30)  + "rem"});
			var idx = findIndex(t, dates_array);
			if(idx > -1) dates_array.splice(idx, 1);
			last_schiacced = $(col_sx[elem_idx]).children().children()[1];
		}
	}));
});
