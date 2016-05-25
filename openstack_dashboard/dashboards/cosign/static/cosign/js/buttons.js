function clear_DOM_network() {
    console.log("clearin topology");
    network.destroy();
    var options = get_topology_options();
    nodes = new vis.DataSet();
    edges = new vis.DataSet();
    var virtual_nodes = new vis.DataSet();
    var virtual_links = new vis.DataSet();
    request = {
        vnodes: [],
        vlinks: [],
    };
    topology = {
        nodes: nodes,
        edges: edges
    };
    container = document.getElementById('network');
    network = new vis.Network(container, topology, options);
    network.on("click", function (params) {
        info_listener(params);
    });
    show_request(request);
}

$(function () {
    /* CSRF TOKEN IS REQUIRED FOR AJAX REQUESTS*/
    $.ajaxSetup({
        data: {csrfmiddlewaretoken: window.CSRF_TOKEN},
    });
    /* BUTTON METHODS */
    $('#clear-vdc').click(function() {
        if (request.vnodes.length == 0) {
            $.bootstrapGrowl("Nothing to unstack.", {
                ele: 'body',
                type: 'danger',
                offset: {from: 'top', amount: 20},
                align: 'right',
                width: 'auto',
                delay: 3000,
                allow_dismiss: true,
                stackup_spacing: 10
            });
            return false;
        }
        bootbox.confirm({
            title: 'Warning',
            message: 'Are you sure you want to unstack the deployment? This action can not be undone.',
            buttons: {
                'cancel': {
                    label: 'Cancel',
                    className: 'btn-default pull-left'
                },
                'confirm': {
                    label: 'Unstack',
                    className: 'btn-danger pull-right'
                }
            },
            callback: function(result) {
                if (result) {
                    $('#clear-vdc').addClass('active');
                    /* Tell Horizon the VDC must be unstacked */
                    $.ajax({
                        type:"POST",
                        crossDomain: true,
                        xhrFields: {withCredentials: true},
                        url: document.URL+"delete_vdc/",
                        beforeSend: function() {
                            $("#clear-vdc").prop('disabled', true);
                            $("#submit-vdc").prop('disabled', true);
                            $('.vis-button').hide();
                        },
                        complete: function(response) {
                            $('#clear-vdc').removeClass('active');
                            $("#clear-vdc").prop('disabled', false);
                            $("#submit-vdc").prop('disabled', false);
                            $('.vis-button').show();
                            console.log(response);
                        },
                        success: function(response) {
                            $('#clear-vdc').removeClass('active');
                            response = response.slice(1, response.length-1);
                            if (response == "Delete operation has been processed" || response.indexOf("Incorrect") >= 0) {
                                /* Show notification */
                                $.bootstrapGrowl("Delete operation has been processed.", {
                                    ele: 'body', // which element to append to
                                    type: 'success', // (null, 'info', 'danger', 'success')
                                    offset: {from: 'top', amount: 20}, // 'top', or 'bottom'
                                    align: 'right', // ('left', 'right', or 'center')
                                    width: 'auto', // (integer, or 'auto')
                                    delay: 3000, // Time while the message will be displayed. It's not equivalent to the *demo* timeOut!
                                    allow_dismiss: true, // If true then will display a cross to close the popup.
                                    stackup_spacing: 10 // spacing between consecutively stacked growls.
                                });
                                /* Clear the DOM */
                                clear_DOM_network();
                            }
                        },
                        error: function(response) {
                            $('#clear-vdc').removeClass('active');
                            $.bootstrapGrowl(response, {
                                ele: 'body', // which element to append to
                                type: 'danger', // (null, 'info', 'danger', 'success')
                                offset: {from: 'top', amount: 20}, // 'top', or 'bottom'
                                align: 'right', // ('left', 'right', or 'center')
                                width: 'auto', // (integer, or 'auto')
                                delay: 3000, // Time while the message will be displayed. It's not equivalent to the *demo* timeOut!
                                allow_dismiss: true, // If true then will display a cross to close the popup.
                                stackup_spacing: 10 // spacing between consecutively stacked growls.
                           });

                        }
                    });
                    $('#request').empty();
                }
            }
        });
    });
    $('#submit-vdc').click(function() {
        if (request.vnodes.length == 0) {
            $.bootstrapGrowl("Nothing to deploy.", {
                ele: 'body',
                type: 'danger',
                offset: {from: 'top', amount: 20},
                align: 'right',
                width: 'auto',
                delay: 3000,
                allow_dismiss: true,
                stackup_spacing: 10
            });
            return false;
        }
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
                    var url = document.URL+"submit_vdc/";
                    $('#submit-vdc').addClass('active');
                    $.ajax({
                        type:"POST",
                        crossDomain: true,
                        xhrFields: {withCredentials: true},
                        url: url,
                        data: {csrfmiddlewaretoken: window.CSRF_TOKEN, json: JSON.stringify(request)},
                        dataType: 'json',
                        beforeSend: function() {
                            $("#clear-vdc").prop('disabled', true);
                            $("#submit-vdc").prop('disabled', true);
                            $('.vis-button').hide();
                        },
                        complete: function(response) {
                            $('#submit-vdc').removeClass('active');
                            $("#clear-vdc").prop('disabled', false);
                            $("#submit-vdc").prop('disabled', false);
                            $('.vis-button').show();
                        },
                        success: function(response) {
                            if (response == "The VDC given has been registered") {
                                $.bootstrapGrowl(response, {
                                    ele: 'body', // which element to append to
                                    type: 'success', // (null, 'info', 'danger', 'success')
                                    offset: {from: 'top', amount: 20}, // 'top', or 'bottom'
                                    align: 'right', // ('left', 'right', or 'center')
                                    width: 'auto', // (integer, or 'auto')
                                    delay: 3000, // Time while the message will be displayed. It's not equivalent to the *demo* timeOut!
                                    allow_dismiss: true, // If true then will display a cross to close the popup.
                                    stackup_spacing: 10 // spacing between consecutively stacked growls.
                                });
                                $('#network').effect("highlight", {color: "#00AAA0"}, 600);
                                update_network_color();
                            }
                        },
                        error: function(response) {
                            $('#submit-vdc').removeClass('active');
                            $.bootstrapGrowl(response, {
                                ele: 'body',
                                type: 'danger',
                                offset: {from: 'top', amount: 20},
                                align: 'right',
                                width: 'auto', 
                                delay: 3000,
                                allow_dismiss: true,
                                stackup_spacing: 10
                            });
                        }
                    });
                }
            }
        });
    });
    $('#stabilize-network').click(function () {
        network.stabilize();
    });
    $('#finput').click(function(){
        $("#input-1").click();
    });
    $('#copy-clipboard').click(function () {
        var aux = document.createElement("input");
        aux.setAttribute("value",JSON.stringify(request));
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);
        $.bootstrapGrowl("JSON has been copied to your clipboard", {
            ele: 'body',
            type: 'success',
            offset: {from: 'top', amount: 20},
            align: 'right',
            width: 'auto',
            delay: 3000,
            allow_dismiss: true,
            stackup_spacing: 10
        });
    });
});

