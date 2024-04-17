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
  
 // Enhanced Styling
cy.style([
    {
      selector: 'node',
      style: {
        'shape': 'round-rectangle', // More modern node shape
        'background-color': '#3498db', // A pleasant blue color
        'label': 'data(id)', 
        'text-valign': 'center',
        'text-halign': 'center',
        'font-size': '12px',
        'color': 'white', // White label text for contrast
        'label': 'data(name)' // Use the 'name' property 
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#95a5a6', // Slightly darker grey
        'curve-style': 'bezier', // Smooth curves for edges
        'target-arrow-shape': 'triangle', // Add arrowheads
        'target-arrow-color': '#95a5a6', 
        'label': 'data(label)', // Assuming you have 'label' in your edge data
        'text-margin-y': -10, // Offset labels above the edge line
        'text-outline-width': 1,   // Add a subtle outline for labels
        'text-outline-color': '#3498db', // Outline color matching node color
        'label': 'data(interaction)'
      }
    }
  ]);
  
  // Optional: Apply a layout for automatic positioning
  var layout = cy.layout({
    name: 'cose' // Try other layouts like 'grid', 'circle', 'breadthfirst'
  });
  layout.run(); 
  
