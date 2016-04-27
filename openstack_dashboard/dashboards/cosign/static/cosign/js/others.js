$(function () {
    /* Setting the height of the network topology and the request */
    var h = document.body.clientHeight - 170 + 'px';
    $('#network').css('height', h);
    $('#request').css('height', h);
    /* Do the same when the window is resized */
    $(window).resize(function() {
        var h = document.body.clientHeight - 170 + 'px';
        $('#network').css('height', h);
        $('#request').css('height', h);
    });
    $('#add_node').on('hidden.bs.modal', function () {
        network.disableEditMode();        
    })
});
