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
    save_topology();
}

function remove_link(index) {
    a.hide();
    d.hide();
    request.vlinks.splice(index,1);
    edges.remove(edges.getIds(index)[index]);
    save_topology();
}

function remove_vnode() {
    a.hide();
    d.hide();
    request.vnodes.splice(vnode_index,1);
    nodes.remove(nodes.getIds(vnode_index)[vnode_index]);
    save_topology();
}
