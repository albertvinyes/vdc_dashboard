$(function () {
    /* CSRF TOKEN IS REQUIRED FOR AJAX REQUESTS*/
    $.ajaxSetup({
        data: {csrfmiddlewaretoken: window.CSRF_TOKEN},
    });
    /* BUTTON METHODS */
    $('#create-vdc').click(function() {
        $(".initialized").fadeIn("slow");
        $("#create-vdc").prop("disabled", true);
        $("#clear-vdc").prop("disabled", false);
        $("#submit-vdc").prop("disabled", false);
        $('html,body').stop().animate({
          scrollTop: 300
        }, 1000);
        /* Tell Horizon the VDC request has been initialized */
        $.ajax({
             type:"POST",
             crossDomain: true,
             xhrFields: {withCredentials: true},
             url:"http://84.88.32.99:8877/cosign/create_vdc/",
             success: function(){
                 console.log("GREAT SUCCES");
             }
        });
    });
    $('#clear-vdc').click(function() {
        bootbox.confirm({
            title: 'Warning!',
            message: 'Are you sure you want to clear the request?',
            buttons: {
                'cancel': {
                    label: 'Cancel',
                    className: 'btn-default pull-left'
                },
                'confirm': {
                    label: 'Clear',
                    className: 'btn-danger pull-right'
                }
            },
            callback: function(result) {
                if (result) {
                    /* Clear the DOM */
                    var options = get_topology_options();
                    nodes = new vis.DataSet();
                    edges = new vis.DataSet();
                    topology = {
                        nodes: nodes,
                        edges: edges
                    };
                    container = document.getElementById('network');
                    network = new vis.Network(container, topology, options);
                    /* Tell Horizon the VDC must be unstacked */
                    $.ajax({
                         type:"POST",
                         crossDomain: true,
                         xhrFields: {withCredentials: true},
                         url:"http://84.88.32.99:8877/cosign/clear_vdc/",
                         success: function(){
                             console.log("GREAT SUCCES");
                         }
                    });
                }
            }
        });
    });
});
