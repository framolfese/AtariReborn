$(document).ready(function(){

	function validateMail(input){
		if(input.trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
				return false;
		}
		return true;
	}
	function validatePass(input){
		if(input.trim() == '' || input.trim().length < 8){
			return false;
		}
		return true;
	}

  var modal = '<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'+
	'<div class="modal-dialog modal-dialog-centered" role="document">'+
	  '<div class="modal-content">'+
		'<div class="modal-header">'+
		  '<h5 class="modal-title" id="exampleModalLongTitle">Ops an error occured!</h5>'+
		  '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
			'<span aria-hidden="true">&times;</span>'+
		  '</button>'+
		'</div>'+
		'<div class="modal-body">'+
		  'Email or Password are wrong, check them and try again.'+
		'</div>'+
		'<div class="modal-footer">'+
		  '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'+
		'</div>'+
	  '</div>'+
	'</div>'+
    '</div>';

		$('#loginpanel').submit(function(event){
			event.preventDefault();

			var mail = $('#inputEmail').val();
			var password = $('#inputPassword').val();
			var labelsError = $('.invalid');
			$(labelsError).hide();
			if(!validateMail(mail) && !validatePass(password)) $(labelsError).show();
			else if(!validateMail(mail)) $(labelsError[0]).show();
			else if(!validatePass(password)) $(labelsError[1]).show();
			else{
				var ajaxRequest =$.ajax({
						type:'POST',
						url:'http://localhost:8888/Progetto/Server/login.php',
						dataType:'json',
						data:{mail:mail, password:password}
				});

				ajaxRequest.done(function(return_data){
					if(return_data.status){
						sessionStorage.removeItem("mailLogin");
						sessionStorage.setItem("userInformation", JSON.stringify(return_data));
						$(location).attr('href',"../Play Page/play.html");
					}
					else{
						$(modal).modal('show');
						$('#inputEmail').val("");
						$('#inputPassword').val("");
					}
				});

				ajaxRequest.fail(function(return_data){
					alert("Error with server, please try again");
				});
			}

		});
});