// Initialization
var cy = cytoscape({
  container: document.getElementById('cy')
});

// Load the graph data
fetch('LLM_KG.cyjs')
  .then(res => res.json())
  .then(data => {
    cy.add(data.elements); // Add the graph elements
    applyStylesAndLayout(); // Apply styles and layout after data is loaded
  })
  .catch(error => console.error("Error loading CYJS file:", error));

function applyStylesAndLayout() {
  // Apply styles to the graph
  cy.style([
      {
          selector: 'node',
          style: {
            'shape': 'round-rectangle',
            'background-color': '#6C3483', // Rich purple color
            'label': 'data(name)',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '14px',
            'color': 'white',
            'width': 'label',
            'height': 'label',
            'padding': '20px',
            'text-wrap': 'wrap',
            'text-max-width': '200px',
            'border-width': '2px',
            'border-color': '#4A235A', // Darker shade of purple
            'border-style': 'solid',
            'border-opacity': 0.8,
            'shadow-blur': '15px',
            'shadow-color': '#2c3e50',
            'shadow-opacity': 0.5,
            'shadow-offset-x': '0px',
            'shadow-offset-y': '0px'
          }
      },
      {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#B3B3B3', // Light gray color
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle',
            'target-arrow-color': '#6C3483', // Same purple color as nodes
            'label': 'data(interaction)',
            'text-margin-y': -20,
            'text-outline-width': 2,
            'text-outline-color': 'white', // White outline for better visibility
            'target-arrow-fill': 'filled',
            'arrow-scale': 2,
            'line-style': 'solid'
          }
      },
      {
        selector: 'core',
        style: {
              'background-color': '#f5f5f5',  
        }
    }
  ]);



  /*
  // Optional: Apply a layout for automatic positioning
  var layout = cy.layout({
      name: 'cose'
  });
  layout.run();
*/


  // Setup event listeners after everything is ready
  setupEventListeners();
}

function setupEventListeners() {
  cy.on('click', 'node', function(evt) {
      var node = evt.target;
      var nodeName = node.data('name');
      updatePageWithData(nodeName); // Function to update HTML based on node name
  });
}

function updatePageWithData(nodeName) {
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

function displayNodeData(nodeData) {
  var dataContainer = document.getElementById('node-data');
  dataContainer.innerHTML = `<h1>${nodeData.Name}</h1><p>Details: ${nodeData.Description}</p>`; // Customize as needed
}
