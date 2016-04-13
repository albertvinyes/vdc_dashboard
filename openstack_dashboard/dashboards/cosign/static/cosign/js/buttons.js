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
             url:"http://84.88.32.99:8877/cosign/get_vdc/",
             success: function(){
                 console.log("Server response from create_vdc");
             }
        });
    });
    $('#clear-vdc').click(function() {
        bootbox.confirm({
            title: 'Warning',
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
                    virtual_nodes = new vis.DataSet();
                    virtual_links = new vis.DataSet();
                    topology = {
                        nodes: nodes,
                        edges: edges
                    };
                    container = document.getElementById('network');
                    network = new vis.Network(container, topology, options);
                    network.on("click", function (params) {
                        info_listener(params);
                    });
                    localStorage.clear();
                    request = {
                        tenantID: tenant_id,
                        vnodes: [],
                        vlinks: [],
                    };
                    $.jStorage.set("request", null);
                    /* Tell Horizon the VDC must be unstacked */
                    $.ajax({
                         type:"POST",
                         crossDomain: true,
                         xhrFields: {withCredentials: true},
                         url:"http://84.88.32.99:8877/cosign/delete_vdc/",
                         success: function(){
                             console.log("Server succes response from delete_vdc");
                         }
                    });
                    $('#request').empty();
                }
            }
        });
    });
    $('#submit-vdc').click(function() {
        bootbox.confirm({
            title: 'Attention',
            message: 'Do you want to deploy the request?',
            buttons: {
                'cancel': {
                    label: 'Cancel',
                    className: 'btn-default pull-left'
                },
                'confirm': {
                    label: 'Deploy',
                    className: 'btn-primary pull-right'
                }
            },
            callback: function(result) {
                if (result) {
                    /* TODO: Tell the algorithms to deploy the request */
                    var url = "http://84.88.32.99:8877/cosign/submit_vdc/";
                    $.ajax({
                        type:"POST",
                        crossDomain: true,
                        xhrFields: {withCredentials: true},
                        url: url,
                        data: {csrfmiddlewaretoken: window.CSRF_TOKEN, json: JSON.stringify(request)},
                        dataType: 'json',
                        beforeSend: function() {
                            $('#submit-vdc').toggleClass('active');
                        },
                        complete: function() {
                            $('#submit-vdc').toggleClass('active');
                        },
                        success: function(response) {
                            console.log("Succes response for submit: " + response);
                            clear_local_storage();                           
                        },
                        error: function(response) {
                            console.log("Error response for submit: " + JSON.stringify(response));
                            $('#submit-vdc').toggleClass('active');
                        }
                     });
                }
            }
        });
    });
});

