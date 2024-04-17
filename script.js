// Define your graph data
var elements = [
    { data: { id: 'a' } },
    { data: { id: 'b' } },
    { data: { id: 'ab', source: 'a', target: 'b' } }
  ];
  
  // Create an instance of Cytoscope.js
  var cy = cytoscape({
    container: document.getElementById('cy'), // Container to render the graph
  
    elements: elements, // Your graph data
  
    style: [ // Style for the graph
      {
        selector: 'node',
        style: {
          'background-color': '#11479e'
        }
      },
      {
        selector: 'edge',
        style: {
          'width': 4,
          'line-color': '#9dbaea',
          'target-arrow-color': '#9dbaea'
        }
      }
    ],
  
    layout: {
      name: 'grid' // Layout for the graph
    }
  });