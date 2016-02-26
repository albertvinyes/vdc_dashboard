/* Dialogs for the VDC Topology */
$(function() {
    var d =  $('#balloon');
    var a = $('.popover-arrow');
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
    $('.closeTopologyBalloon').click(function() {
        d.hide();
        a.hide();
    })
});

function showBalloon(id,posX,posY) {
    var init = $('#network').position();
    $('#balloon').show();
    $('.popover-arrow').show();
    $('#balloon').css({"left": posX + init.left + 25, "top": posY + init.top - 40});
    $('.popover-arrow').css({"left": posX + 15 + init.left, "top": posY + init.top -20});
}
