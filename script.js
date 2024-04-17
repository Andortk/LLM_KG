// Initialization
var cy = cytoscape({
    container: document.getElementById('cy') // Assumes you have a <div id="cy"></div> in your HTML
  });
  
  // Loading data from the CYJS file
  fetch('LLM_KG.cyjs')
    .then(res => res.json())
    .then(data => {
      cy.add(data.elements); // Add the graph elements
    })
    .catch(error => console.error("Error loading CYJS file:", error));  // Error handling
  
  // Basic styling
  cy.style([
    {
      selector: 'node',
      style: {
        'background-color': '#666', // Dark grey nodes
        'label': 'data(id)' // Show the node ID as a label
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc'  // Light grey edges
      }
    }
  ]);
  
  // Optional: Apply a layout for automatic positioning
  var layout = cy.layout({
    name: 'cose' // Try other layouts like 'grid', 'circle', 'breadthfirst'
  });
  layout.run(); 
  