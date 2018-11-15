$(document).ready(function(){
    $("#loginpanel").hover(function(){
        $("#imgmain").css("filter", "blur(10px)");
        $(".wrap-login100").addClass('classWithShadow');
    }, function(){
        $(".wrap-login100").removeClass('classWithShadow');
        $("#imgmain").css("filter", "none");
    });

    
});