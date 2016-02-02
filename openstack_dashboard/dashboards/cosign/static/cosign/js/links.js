/* Additional JavaScript for cosign. */
var exampleDropOptions = {
    tolerance: "touch",
    hoverClass: "dropHover",
    detachable: false,
    activeClass: "dragActive"
};
var exampleColor = "#3F51B5";
var linkStyle = {
    gradient: {stops: [
        [0, exampleColor],
        [0.5, "#09098e"],
        [1, exampleColor]
    ]},
    lineWidth: 2,
    strokeStyle: exampleColor,
};
var anchorStyle = {
    endpoint: ["Rectangle", { width:25, height: 10} ]
};
var exampleEndpoint1 = {
    endpoint: "Rectangle",
    paintStyle: { width: 25, height: 10, fillStyle: exampleColor },
    isSource: true,
    reattach: true,
    scope: "blue",
    maxConnections: 30,
    connectorStyle: linkStyle,
    connector: ["Flowchart", {cornerRadius: 6}],
    isTarget: true,
    /*beforeDrop: function (params) {
        return confirm("Connect " + params.sourceId + " to " + params.targetId + "?");
    },*/
    //dropOptions: exampleDropOptions
    detachable: false
};

jsPlumb.ready(function() {
	/* Init */
	jsPlumb.importDefaults({ 
	  ConnectionsDetachable:true
	});
	var instance = jsPlumb.getInstance();
	/* Events */
    
    jsPlumb.bind("beforeDrop", function(info) {
        bootbox.prompt("Enter the desired Bandwith in Mbps for the <b> Virtual Link </b>", function(result) {
            if (result === null) {
            
            }
            else {
                // TODO: Bandwith must be a number
                var bandwith = result;
                console.log(bandwith);
                jsPlumb.connect({
                    source: info.sourceId,
                    target: info.targetId,
                    paintStyle: linkStyle,
                    endpoint: ["Rectangle", { width:25, height: 10} ],
                    endpointStyle: exampleColor,
                    dropOptions: exampleDropOptions,
                    connector: ["Flowchart", {cornerRadius: 6}],
                    detachable: false
                });
            }
        });
    });

	/* Make elements draggable within the container bounds */
	var nonPlumbing = jsPlumb.getInstance();
    /*$('.box').draggable({
            start: function(event, ui) {
                ui.helper.bind("click.prevent",
                    function(event) { event.preventDefault(); });
            },
            stop: function(event, ui) {
                setTimeout(function(){
                    ui.helper.unbind("click.prevent");
                    console.log("unbind!")}, 30);
            },containment: "parent"
    })*/
    $('.box').draggable({
        start: function(event){
            $(this).addClass('dragging');
        },
        stop: function(event){
            console.log("dragged " + this.id);
            setTimeout(function(){
                $(this).removeClass('dragging');
            }, 1);
        }
    });
	jsPlumb.setContainer($(".topology-container"));
	jsPlumb.draggable($(".box"), {
	   containment:true
	});
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

function createEndpoint(id) {
    jsPlumb.addEndpoint(id, {
      anchor:"Bottom"
    }, exampleEndpoint1);
};

function makeDraggable(id) {
    jsPlumb.draggable($("#" + id), {
       containment:true
    });
}
