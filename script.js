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
              'background-color': '#3498db',
              'label': 'data(name)',
              'text-valign': 'center',
              'text-halign': 'center',
              'font-size': '12px',
              'color': 'white',
              'width': 120,
              'height': 80
          }
      },
      {
          selector: 'edge',
          style: {
              'width': 3,
              'line-color': '#95a5a6',
              'curve-style': 'bezier',
              'target-arrow-shape': 'triangle',
              'target-arrow-color': '#95a5a6',
              'label': 'data(interaction)',
              'text-margin-y': -10,
              'text-outline-width': 1,
              'text-outline-color': '#3498db'
          }
      },
      {
        selector: 'core',
        style: {
              'background-color': '#f5f5f5',  
        }
    }
  ]);

  // Optional: Apply a layout for automatic positioning
  var layout = cy.layout({
      name: 'breadthfirst'
  });
  layout.run();

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
