$(document).ready(function(){

    var mailLogin = sessionStorage.getItem("mailLogin");
    if(mailLogin){
        mailLogin = JSON.parse(mailLogin);
        $('#inputEmail').val(mailLogin.usermail);
    }

    $("#loginpanel").hover(function(){
        $("#imgmain").css("filter", "blur(10px)");
        $(".wrap-login100").addClass('classWithShadow');
    }, function(){
        $(".wrap-login100").removeClass('classWithShadow');
        $("#imgmain").css("filter", "none");
    });

    $('#showpassword_button').click(function(){
        var password_field = $('#inputPassword');
        if ($(password_field).attr('type') === "password") {
            $(password_field).attr('type','text');
        } else {
            $(password_field).attr('type','password');
        }
    });
    
});