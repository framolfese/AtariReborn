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


    /*var clicked_reading = false;
    $('#reading_button').click(function(){
        console.log($("#blog").children())
        if(clicked_reading){
            $($('body').find("*").not($("#blog")).not($("#blog").children())).removeClass('readingClass');
            clicked_reading = false;
        }
        else{
            $($('body').find("*").not($("#blog")).not($("#blog").children())).addClass('readingClass');
            clicked_reading = true;
        }
    });*/
});