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
});

function createEndpoint(id) {
    jsPlumb.addEndpoint(id, {
      anchor:"Bottom"
    }, exampleEndpoint1);
    console.log("creating endpoint on " + id);
};

function makeDraggable(id) {
    jsPlumb.draggable($("#" + id), {
       containment:true
    });
    $('#' + id).draggable({
        start: function(event){
            $(this).addClass('dragging');
        },
        stop: function(event){
            setTimeout(function(){
                $(this).removeClass('dragging');
            }, 100);
        },containment: "parent"
    });
}
