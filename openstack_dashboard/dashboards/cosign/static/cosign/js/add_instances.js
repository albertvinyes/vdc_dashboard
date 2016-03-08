$(function() {
    $('#id_flavor').change(function() {
        var val = $('#id_flavor').val();
        $('#flavor_name').html(flavors[val].name);
        $('#flavor_vcpus').html(flavors[val].vcpu);
        $('#flavor_disk').html(flavors[val].disk);
        $('#flavor_disk_total').html(flavors[val].disk);
        $('#flavor_ram').html(flavors[val].memory);
    });
    $('#add_instances_button').click(function() {
        var node = network.getSelectedNodes()[0];
        var label = nodes["_data"][node].label;
        $('#virtual_node_label').html(label);
        console.log("hola");
    });
});
