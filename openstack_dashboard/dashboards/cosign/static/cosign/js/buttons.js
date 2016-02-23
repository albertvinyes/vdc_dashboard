$(function () {
    /* CSRF TOKEN IS REQUIRED FOR AJAX REQUESTS*/
    $.ajaxSetup({
        data: {csrfmiddlewaretoken: window.CSRF_TOKEN},
    });
    console.log(window.CSRF_TOKEN);
    /* BUTTON METHODS */
    $('.toggleView').click(function() {
        $('.box span').toggleClass("hide");    
    });
    $('#create-vnode').click(function() {
        var label;
        bootbox.prompt("Enter desired Label for the new <strong> Virtual Node </strong>", function(result) {
            if (result === null) {

            }
            else {
                label = result;
                var activeLabels = ($('#toggle-button').hasClass("active"));
                var vnode;
                var rLeft = Math.random() * 15;
                if (activeLabels) {
                    vnode = '<div class="box center" id='+label+' style="left'+rLeft+'%"> <span class="">'+ label +'</span> </div>';
                }
                else {
                    vnode = '<div class="box center" id='+label+' style="left:'+rLeft+'%"> <span class="hide">'+ label +'</span> </div>';
                }
                $('.topology-container').append(vnode);
                createEndpoint(label);
                makeDraggable(label);
                makeClickable();
                $.ajax({
                     type:"POST",
                     crossDomain: true,
                     xhrFields: {withCredentials: true},
                     url:"http://84.88.32.99:8877/cosign/create_vnode/",
                     data: {
                            'label': label // from form
                            },
                     success: function(){
                         console.log("GREAT SUCCES"); 
                     }
                });
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
                    $('.topology-container').empty();
                }
            }
        });
    });
});
