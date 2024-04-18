// Initialization
var cy = cytoscape({
    container: document.getElementById('cy') // Assumes you have a <div id="cy"></div> in your HTML
    
    zoom: 2

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
        'label': 'data(name)', 
        'text-valign': 'center',
        'text-halign': 'center',
        'font-size': '12px',
        'color': 'white' // White label text for contrast
        'width': 120, // Set the node width to 50 pixels
        'height': 80, // Set the node height to 50 pixels
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
        'label': 'data(interaction)', // Assuming you have 'label' in your edge data
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


// Adding event listener for node 'click' events
cy.on('click', 'node', function(evt) {
  var node = evt.target;
  var nodeName = node.data('name'); // Assuming 'name' is the field in your node data
  console.log('Node clicked:', nodeName);
  updatePageWithData(nodeName); // Function to update HTML based on node name
});

// Function to retrieve and display data based on node name
function updatePageWithData(nodeName) {
  // Using SheetJS to read Excel file - Assuming you have a way to serve this file to the client
  var url = "descriptions.xlsx"; // Path to your Excel file
  fetch(url).then(function(res) {
    if(!res.ok) throw new Error("Failed to load the Excel file");
    return res.arrayBuffer();
  })
  .then(function(buffer) {
    var data = new Uint8Array(buffer);
    var workbook = XLSX.read(data, {type: 'array'});

    var sheetName = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[sheetName];
    var excelData = XLSX.utils.sheet_to_json(worksheet);

    // Find the data for the node
    var nodeData = excelData.find(row => row.Name === nodeName);
    if (nodeData) {
      displayNodeData(nodeData);
    } else {
      console.error("No data found for node:", nodeName);
    }
  })
  .catch(function(error) {
    console.error("Error processing the Excel file:", error);
  });
}

// Function to display data on the page
function displayNodeData(nodeData) {
  // Assume you have an HTML element with id 'node-data' to display node data
  var dataContainer = document.getElementById('node-data');
  dataContainer.innerHTML = `<h1>${nodeData.Name}</h1>
                             <p>Details: ${nodeData.Description}</p>`; // Customize as needed
}
