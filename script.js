// Initialization
var cy = cytoscape({
    container: document.getElementById('cy') // Assumes you have a <div id="cy"></div> in your HTML
    zoom: 2,
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
        'color': 'white' // White label text for contrast
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
        'text-outline-color': '#3498db' // Outline color matching node color
      }
    },

    {
      selector: 'core',
      style: {
        'background-color': '#f5f5f5'
      }
    }
  ]);
  
  // Optional: Apply a layout for automatic positioning
  var layout = cy.layout({
    name: 'grid' // Try other layouts like 'grid', 'circle', 'breadthfirst'   'cose'
  });
  layout.run(); 
  
  
// Resizing functionality 
const cyContainer = document.getElementById('cy-container');
const resizeHandle = document.getElementById('resize-handle');
let isResizing = false;
let lastHeight = 500; // Initial height

resizeHandle.addEventListener('mousedown', function(e) {
  isResizing = true;
  lastHeight = cyContainer.offsetHeight; 
});

window.addEventListener('mousemove', function(e) {
  if (!isResizing) return;

  // Calculate new height based on mouse movement
  const offset = e.clientY - e.offsetY; 
  let newHeight = lastHeight + offset; 
  
  // Enforce a minimum height (optional)
  if (newHeight < 100) { // Set your desired minimum height
    newHeight = 100;
  }

  cyContainer.style.height = newHeight + 'px';
});

window.addEventListener('mouseup', function() {
  isResizing = false;
});