var nodeID;
var flavor_name;

$(function() {
    $('#id_flavor').change(function() {
        var val = $('#id_flavor').val();
        $('#flavor_name').html(flavors[val].name);
        $('#flavor_vcpus').html(flavors[val].vcpu);
        $('#flavor_disk').html(flavors[val].disk);
        $('#flavor_disk_total').html(flavors[val].disk + flavors[val].ephemeral);
        $('#flavor_ram').html(flavors[val].memory);
    });
    $('#add_instances_button').click(function() {
        nodeID = network.getSelectedNodes()[0];
        var label = nodes["_data"][nodeID].label;
        $('#virtual_node_label').html(label);
    });
    $('#add_instances_vnode').click(function() {
        /* Retrieve the info from the form */
        var name = removeTags($('#id_name').val());
        var flavor = removeTags($('#id_flavor').val());
        var instances = removeTags($('#id_count').val());
        var image = removeTags($('#id_image').val());
        flavor_name = removeTags($('option:selected', '#id_flavor').attr('name'));
        /* Add it to the JSON request */
        var len = request.vnodes.length;
        for (i = 0; i < len; i++) {
            if (request.vnodes[i].id == nodeID) {
                for (var k = 0; k < instances; k++) {
                    var nameCount = name;
                    if (instances > 1) {
                        nameCount = name + "-" + Number(k+1);
                    }
                    var obj = {
                        id: flavor_name+"-"+image,
                        label:  nameCount,
                        flavorName: flavor_name,
                        flavorID: flavor,
                        imageID: image
                    };
                    request.vnodes[i].vms.push(obj);
                    show_request(request);
                }
            }
        }
        $('#addInstances').modal('hide');
    });
});
