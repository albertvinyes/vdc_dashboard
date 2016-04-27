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
    });
    $('#delete-virtual-node').click(function() {
        remove_vnode();
    });
});

function remove_instance_vnode(index) {
    request.vnodes[vnode_index].vms.splice(index,1);
    a.hide();
    d.hide();
    show_request(request);
}

function remove_link(index) {
    a.hide();
    d.hide();
    request.vlinks.splice(index,1);
    edges.remove(edges.getIds(index)[index]);
    show_request(request);
}

function remove_vnode() {
    a.hide();
    d.hide();
    //remove node from nodes object
    var node_id = network.getSelectedNodes();
    nodes.remove(node_id);
    //remove node from request
    for (var t = 0; t < request.vnodes.length; t++) {
        if (request.vnodes[t].id == node_id) {
            request.vnodes.splice(t,1);
        }
    }
    //remove edges from edges object and retrieve removed ids
    var edges_ids = network.getSelectedEdges();
    var removed_edges = edges.remove(edges_ids);
    for (var k = 0; k < request.vlinks.length; k++) {
        for (var i = 0; i < removed_edges.length; i++) {
            if (request.vlinks[k]["id"] == removed_edges[i]) {
                request.vlinks.splice(k,1);
                k--;
                break;
            }
        }
    }
    show_request(request);
}
