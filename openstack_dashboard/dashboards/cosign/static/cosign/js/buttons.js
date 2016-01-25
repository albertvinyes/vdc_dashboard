$(function () {
    $('.toggleView').click(function() {
        $('.box span').toggleClass("hide");    
    });
    $('#create-vnode').click( function() {
        var label;
        console.log("click!");
        bootbox.prompt("Enter desired Label for the new <strong> Virtual Node </strong>", function(result) {
            if (result === null) {

            }
            else {
                label = result;
                var activeLabels = ($('#toggle-button').hasClass("active"));
                var vnode;
                var rTop = Math.random() * 100;
                if (activeLabels) {
                    vnode = '<div class="box center" id='+label+' style="top:'+rTop+'%"> <span class="">'+ label +'</span> </div>';
                }
                else {
                    vnode = '<div class="box center" id='+label+' style="top:'+rTop+'%"> <span class="hide">'+ label +'</span> </div>';
                }
                $('.topology-container').append(vnode);
                createEndpoint(label);
                makeDraggable(label);
                makeClickable();
            }
        });
    });
});
