/* Dialogs for the VDC Topology */
var a;
var d;

$(function() {
    d =  $('#balloon');
    a = $('.popover-arrow');
    $('.closeTopologyBalloon').click(function() {
        d.hide();
        a.hide();
    })
    $(document).mouseup(function (e) {
        if (!d.is(e.target) && d.has(e.target).length == 0) {
            d.hide();
            a.hide();
        }
        e.preventDefault(); 
    });
    $('.closeTopologyBalloon').click(function() {
        d.hide();
        a.hide();
    })
});

function showBalloon(id,posX,posY) {
    $('#balloon').show();
    $('.popover-arrow').show();
    $('#balloon').css({"left": posX + 50, "top": posY + 250});
    $('.popover-arrow').css({"left": posX + 40, "top": posY + 270});
}
