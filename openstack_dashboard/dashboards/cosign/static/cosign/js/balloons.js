/* Dialogs for the VDC Topology*/
$(function() {                                          //Document ready
    var d =  $('#balloon');
    var a = $('.popover-arrow');
    d.css("position", "absolute");
    $('.box').click(function(event) {
       var posX = $(this).position().left + $('.box').width() + 12 ,
           posY = $(this).position().top - 5;
        d.show();
        a.show();
        d.css({"left": posX, "top": posY});
        a.css({"left": posX-10, "top": posY+30});
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
});
