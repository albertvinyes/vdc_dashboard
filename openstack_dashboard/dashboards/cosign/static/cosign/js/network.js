var nodes = null;
var edges = null;
var network = null;
// var DIR = '../img/refresh-cl/';
var EDGE_LENGTH_MAIN = 150;
var EDGE_LENGTH_SUB = 50;

// Create a data table with nodes.
nodes = [];

// Create a data table with links.
edges = [];

// Called when the Visualization API is loaded.
$(function () {
    nodes.push({id: 1, label: 'Virtual node 1', image: 'stack-gray.svg', shape: 'image'});
    nodes.push({id: 2, label: 'Virtual node 2', image: 'stack-gray.svg', shape: 'image'});
    //edges.push({from: 1, to: 2, length: EDGE_LENGTH_MAIN});
    
    // create a network
    var container = document.getElementById('network');
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {};
    network = new vis.Network(container, data, options);
});
