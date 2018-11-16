$(document).ready(function(){
    var clicked = false;
    var lastB = null;
    var inputs = $('.input');
    var paras = $('.description-flex-container').find('p');
	$(inputs).click(function(){
        var t = $(this),
                ind = t.index(),
                indparent = t.parent().parent().index();
				matchedPara = $(paras).eq((indparent*10)+ind);
        if(!clicked){
		    $(t).add(matchedPara).addClass('active');
            clicked = true;
            lastB = t;
        }
        else if(clicked && !lastB.is(t)){
            $(t).add(matchedPara).addClass('active');
            $(inputs).not(t).add($(paras).not(matchedPara)).removeClass('active');
            lastB = t;
        }
        else{
            $(t).add(matchedPara).removeClass('active');
            lastB = t;
            clicked = false;
        }
    });
});
