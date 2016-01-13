/* Additional JavaScript for cosign. */
jsPlumb.ready(function() {
	/* Init */
	jsPlumb.importDefaults({ 
	  ConnectionsDetachable:true
	});
	var instance = jsPlumb.getInstance();
	/* Events */
	

	/* Make elements draggable within the container bounds */
	var nonPlumbing = jsPlumb.getInstance();
    $('.box').draggable({
            start: function(event, ui) {
                ui.helper.bind("click.prevent",
                    function(event) { event.preventDefault(); });
            },
            stop: function(event, ui) {
                setTimeout(function(){ui.helper.unbind("click.prevent");}, 30);
            },containment: "parent"
    })
	jsPlumb.setContainer($(".topology-container"));
	jsPlumb.draggable($(".box"), {
	   containment:true
	});
	/* Define the anchors appearance and behaviour*/
	var exampleDropOptions = {
        tolerance: "touch",
        hoverClass: "dropHover",
        detachable:true,
        activeClass: "dragActive"
    };
	var exampleColor = "#3F51B5";
	var exampleEndpoint1 = {
        endpoint: "Rectangle",
        paintStyle: { width: 25, height: 10, fillStyle: exampleColor },
        isSource: true,
        reattach: true,
        scope: "blue",
        maxConnections: 30,
        connectorStyle: {
            gradient: {stops: [
                [0, exampleColor],
                [0.5, "#09098e"],
                [1, exampleColor]
            ]},
            lineWidth: 2,
            strokeStyle: exampleColor
        },
        isTarget: true,
        beforeDrop: function (params) {
        	return confirm("Connect " + params.sourceId + " to " + params.targetId + "?");
        },
        dropOptions: exampleDropOptions
    };
	var exampleEndpoint2 = {
        endpoint: ["Dot", {radius: 12} ],
        anchor: "BottomLeft",
        paintStyle: { fillStyle: exampleColor, opacity: 0.5 },
        isSource: true,
        scope: 'yellow',
        connectorStyle: {
            strokeStyle: exampleColor,
            lineWidth: 4
        },
        connector: "Bezier",
		maxConnections: 30,
        isTarget: true,
        dropOptions: exampleDropOptions,
            beforeDetach: function (conn) {
                return confirm("Detach connection?");
            },
            onMaxConnections: function (info) {
                alert("Cannot drop connection " + info.connection.id + " : maxConnections has been reached on Endpoint " + info.endpoint.id);
            }
    };

	jsPlumb.addEndpoint("box-1", { 
	  anchor:["Bottom", "Continuous"]
	}, exampleEndpoint1);

	jsPlumb.addEndpoint("box-2", { 
	  anchor:"Bottom"
	}, exampleEndpoint1);

	jsPlumb.addEndpoint("box-3", { 
	  anchor:"Bottom"
	}, exampleEndpoint1);

	jsPlumb.addEndpoint("box-4", { 
	  anchor:"Bottom"
	}, exampleEndpoint1);    

});
