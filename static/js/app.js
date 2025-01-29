// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;
    console.log("Metadata Field", metadata);

    // Filter the metadata for the object with the desired sample number
    let result = metadata.find(meta => meta.id == sample);
    console.log("Filtered results:", result);

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(results).forEach(([key, value]) => {
      panel.append("p").text(`${key}: ${value}`);
    });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let result = samples.find(sampleObj => sampleObj.id == sample);

    // Get the otu_ids, otu_labels, and sample_values
    let o_ids = result.o_ids;
    let o_labels = result.o_labels;
    let sample_values = result.sample_values;

    // Build a Bubble Chart
    let b_Trace = {
      x: o_ids,
      y: sample_values,
      text: o_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: o_ids,
        colorscale: "Earth"
      },
    };

    let b_Layout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: { title: "OTU ID"},
      yaxis: { title: "Number of Bacteria"},
    }; 
    // Render the Bubble Chart
    Plotly.newPlot('bubble', [b_Trace], b_Layout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = o_ids.slice(0,10).map(id => `OTU ${id}`).reverse();


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let Trace = {
      x: sample_values.slice(0,10).reverse(),
      y: yticks,
      text: o_labels.slice(0,10).reverse(),
      type: 'bar',
      orientation: 'h'
    };

    let Layout = {
      title: "Top 10 Bacteria Cultures Found"
    };
    // Render the Bar Chart
    Plotly.newPlot('bar', [Trace], Layout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;
    console.log("Names: ". names);

    // Use d3 to select the dropdown with id of `#selDataset`
    let id_dropdown = d3.salect("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    names.forEach(name => {
      id_dropdown.append("option").text(name).property("value", name);
    });

    // Get the first sample from the list
    let Samples = names[0];
    console.log("First sampple: ", Samples);

    // Build charts and metadata panel with the first sample
    buildCharts(Samples);
    buildMetadata(Samples);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
