$(document).ready(function(){

	function validateMail(input){
		if(input.trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
				return false;
		}
		return true;
	}

	function validateConfirm(input1,input2){
		if(input1.trim().match(input2.trim()) == null) return false;
		else if(input2.trim().match(input1.trim()) == null) return false;
		else return true;
	}

	function validatePass(input){
		if(input.trim() == '' || input.trim().length < 8){
			return false;
		}
		return true;
	}
	
	function validateName(input){
		if(input.trim().match(/^[a-z]+$/i) == null) {
			return false;
		}
		else return true;
	}

	function validateNameOnCard(input){
		if(input.trim().match(/^[a-z\s]+$/i) == null) {
			return false;
		}
		else return true;
	}

	function validateCCNumber(input){
		if(input.trim() == '') return false;
		else if(input.length != 16) return false;
		else if(isNaN(parseInt(input))) return false;
		else return true;
	}

	function validateExpiration(input){
		if(input.trim() == '') return false;
		else if(input.length != 5) return false;
		else if(input[2] != '/') return false;
		else{
			var mese = parseInt(input.substring(0,2));
			var anno = parseInt(input.substring(3));
			if(isNaN(mese)) return false;
			else if(isNaN(anno)) return false;
			else if(mese < 0 || mese > 12) return false;
			else if(anno < 0) return false;
			else return true;
		}
	}

	function validateImport(input){
		if(input.trim() == '') return false;
		else if(isNaN(parseFloat(input))) return false;
		else return true;
	}

	function validateCVV(input){
		if(input.trim() == '' || input.trim().length != 3) return false;
		else if(parseInt(input) < 100) return false;
		else if(isNaN(parseInt(input))) return false;
		else return true;
	}

	$('#button_login_now').click(function(){
		sessionStorage.setItem("mailLogin", JSON.stringify(toSession));
		$(location).attr('href',"../Log In Page/loggedin.html");
	});

	$('#button_login_later').click(function(){
		$(location).attr('href',"../Welcome Page/index.html");
	});

	var toSession = null;

	$('#register-form').submit(function(event){
		event.preventDefault();

		var firstName = $('#first_name');
		var lastName = $('#last_name');
		var mail = $('#mail');
		var password = $('#password');
		var toShow = Array();
		var toCheckObb = $('.obb');
		var donationInputs = $('.donation');
		var donationMade = false;

		$('.invalid').hide();

		for(var i=0; i<toCheckObb.length; i++){
			if(i == 0 || i == 1) {
				if(!validateName($(toCheckObb[i]).val())) toShow.push(toCheckObb[i]);
			}
			else if(i == 2){
				if(!validateMail($(toCheckObb[i]).val())) toShow.push(toCheckObb[i]);
			} 
			else if(i == 3){
				if(!validateConfirm($(toCheckObb[i]).val(), $(toCheckObb[i-1]).val())) toShow.push(toCheckObb[i]);
			}
			else if(i == 4){
				if(!validatePass($(toCheckObb[i]).val())) toShow.push(toCheckObb[i]);
			}
			else{
				if(!validateConfirm($(toCheckObb[i]).val(), $(toCheckObb[i-1]).val())) toShow.push(toCheckObb[i]);
			}
		}

		for(var i=0; i<donationInputs.length; i++){
			if($(donationInputs[i]).val() != "") donationMade = true;
		}

		if(toShow.length > 0){
			for(var i=0; i<toShow.length; i++) $(toShow[i]).next().show();
			return;
		}

		if(donationMade){
			for(var i=0; i<donationInputs.length; i++){
				if(i == 0) {
					if(!validateNameOnCard($(donationInputs[i]).val())) toShow.push(donationInputs[i]);
				}
				else if(i == 1){
					if(!validateCCNumber($(donationInputs[i]).val())) toShow.push(donationInputs[i]);
				}
				else if(i == 2){
					if(!validateImport($(donationInputs[i]).val())) toShow.push(donationInputs[i]);
				} 
				else if(i == 3){
					if(!validateExpiration($(donationInputs[i]).val())) toShow.push(donationInputs[i]);
				}
				else{
					if(!validateCVV($(donationInputs[i]).val())) toShow.push(donationInputs[i]);
				}
			}

			if(toShow.length > 0){
				for(var i=0; i<toShow.length; i++) $(toShow[i]).next().show();
				return;
			}

			else{
				var modal_body = $('.modal-body');
				$('<img class="img-modal" src="images/donation.jpeg">').insertBefore($(modal_body).children()[0]);
				$('<div class="message message-donation">And thank you for the donation... ;)</div>').insertAfter($(modal_body).children()[1]);
			}
		}
		
		var toSend = {fname:$(firstName).val().trim(),
						lname:$(lastName).val().trim(),
						mail:$(mail).val().trim(),
						password:$(password).val().trim()
		};

		var ajaxRequest1 =$.ajax({
					type:'POST',
					url:'http://localhost:8888/Progetto/Server/signup.php',
					dataType:'json',
					data:toSend
		});

		ajaxRequest1.done(function(return_data){
			if(return_data.status){
				toSession = return_data;
				console.log(return_data);
				$('#modalSuccess').modal('show');
			}
			else{
				var errore = return_data.errore;
				alert(errore);
			}
		});

		ajaxRequest1.fail(function(return_data){
			alert("Error with server, please try again");
		});

	});
});