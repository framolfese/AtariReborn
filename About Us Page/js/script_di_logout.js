$(document).ready(function(){
    var userInfo = sessionStorage.getItem("userInformation");
    var button_signin = $('#button_signin');
    var button_login = $('#button_login');
    var welcome_label = $('#welcome_label');
    var button_logout = '<button id="button_logout" class="btn btn-outline-danger my-2 mr-sm-2">Log Out</button>';
    if(userInfo){
        userInfo = JSON.parse(userInfo);
        $(welcome_label).text("WELCOME " + userInfo.username.toUpperCase());
        $(button_login).remove();
        $(button_signin).remove();
        $('.form-inline').prepend(button_logout);
        $('#home_button').attr('href','../Play Page/play.html');
    }

    $('#button_logout').click(function(){
		sessionStorage.removeItem("userInformation");
	});
});