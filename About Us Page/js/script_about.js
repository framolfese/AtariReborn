$(document).ready(function(){
    var clicked = false;
    var last_button = null;

    $('.continue_button').click(function(){
        var t = $(this);
        if(clicked){
            if(last_button.is(t)){
                $(t.attr('data-target')).slideUp('slow');
                console.log("sono in 1");
                clicked = false;
            }
            else{
                $('.descrizioni').slideUp('slow');
                last_button = t;
                $(t.attr('data-target')).slideDown('slow');
                console.log("sono in 2");
            }
        }
        else{
            clicked = true;
            last_button = t;
            $(t.attr('data-target')).slideDown('slow');
            console.log("sono in 3");
        }
        
    });
});