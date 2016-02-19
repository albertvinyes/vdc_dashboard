/* Dialogs for the VDC Topology */
function makeClickable() {
    var d =  $('#balloon');
    var a = $('.popover-arrow');
    d.css("position", "absolute");
    $('.box').click(function(event) {
        if ($(this).hasClass('jsplumb-drag')) {  
            return false;
        }
        //if($(this).data('dragging')) return;
        var posX = $(this).position().left + $('.box').width() + 5 ,
           posY = $(this).position().top - 5;
        d.show();
        a.show();
        d.css({"left": posX, "top": posY+20});
        a.css({"left": posX-10, "top": posY+50});
    });

    $('.closeTopologyBalloon').click(function() {
            d.hide();
            a.hide();
    })

    $(document).mouseup(function (e) {
        if (!d.is(e.target) && d.has(e.target).length == 0) {
            d.hide();
            a.hide();
        }
    });
};

$(function() {
    makeClickable();
});

