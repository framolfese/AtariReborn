$(document).ready(function(){
    var clicked = false;
    var last_button = null;

    $('.continue_button').click(function(){
        var t = $(this);
        if(clicked){
            if(last_button.is(t)){
                $(t.attr('data-target')).slideUp('slow');
                clicked = false;
            }
            else{
                $('.descrizioni').slideUp('slow');
                last_button = t;
                $(t.attr('data-target')).slideDown('slow');
            }
        }
        else{
            clicked = true;
            last_button = t;
            $(t.attr('data-target')).slideDown('slow');
        }
        
    });
});