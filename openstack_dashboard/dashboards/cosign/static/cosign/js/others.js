$(function () {
    /* Setting the height for the topology-container */
    var h = document.body.clientHeight - 150 + 'px';
    $('#network').css('height', h);
    /* Do the same when the window is resized */
    $(window).resize(function() {
        var h = document.body.clientHeight - 150 + 'px';
        $('#network').css('height', h);
    });
});
