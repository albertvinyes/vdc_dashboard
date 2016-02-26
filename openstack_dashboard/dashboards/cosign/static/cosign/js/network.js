var nodes = null;
var edges = null;
var network = null;
var topology = null;
var seed = 2;

function destroy() {
    if (network !== null) {
        network.destroy();
        network = null;
    }
}

$(function() {
    destroy();
    $.ajaxSetup({
        data: {csrfmiddlewaretoken: window.CSRF_TOKEN},
    });
    nodes = new vis.DataSet();
    edges = new vis.DataSet();
    topology = {
        nodes: nodes,
        edges: edges
    };
    // create a network
    var container = document.getElementById('network');
    var options = {
        interaction: {
            zoomView: false
        },
        physics: {
            enabled: true,
            barnesHut: {
                  gravitationalConstant: -2000,
                  centralGravity: 0,
                  springLength: 95,
                  springConstant: 0.04,
                  damping: 0.09,
                  avoidOverlap: 1
            }  /* {
            stabilization: false,
            barnesHut: {
                "springConstant": 0
            }*/
        },
        manipulation: {
            addNode: function (data, callback) {
                bootbox.prompt("Enter desired Label for the new <strong> Virtual Node </strong>", function(result) {
                    if (result) {
                        label = result;
                        data.label = result;
                        data.shape = "image";
                        data.image = STATIC_URL + "cosign/img/stack-gray.svg";
                        data.borderWidth = 0;
                        data.size = 40;
                        nodes.add(data);
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
            },
            editNode: function (data, callback) {
                $.localStorage.network = Network;
            },
            addEdge: function (data, callback) {
                bootbox.prompt("Enter the desired Bandwith in Mbps for the <b> Virtual Link </b>", function(result) {
                    if(result) {
                        // TODO: Bandwith must be a number
                        data.title = "Bw: " + result + " Mbps."
                        data.bandwith = result;
                        edges.add(data);
                    }
                });
                if (data.from == data.to) {
                    var r = confirm("Do you want to connect the node to itself?");
                    if (r == true) {
                        edges.add(data);
                    }
                }
            }
        }
    };
    network = new vis.Network(container, topology, options);
    network.on("click", function (params) {
        if (params.nodes.length == 0) return false;
        var id = params.nodes[0];
        var pos = network.getPositions(id)[id];
        showBalloon(id,pos.x,pos.y);
    });
});


function cancelEdit(callback) {
    clearPopUp();
    callback(null);
}

