const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);
let data = {};

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
    this.data = data;
    this.metadata = data['metadata'];
    this.samples = data['samples'];
    
  // create select dropdown options from the data names array
  const selDataset = data['names'];
    for (let i = 0; i < selDataset.length; i++) {
        let option = d3.select("select").append("option");
        option.text(selDataset[i]);
    }

    // to initially populate charts with first selected option
    optionChanged(selDataset[0]);
});

function optionChanged(selectedOption) {
    console.log('option changed: ', selectedOption)
    
    // update demographic info
    updateDemographicInfo(selectedOption);

    // create bar chart
    createBarChart(selectedOption);

    // create bubble chart
    createBubbleChart(selectedOption);
}

function createBarChart(id) {
    const sample = this.data['samples'].filter(sample => sample.id === id)[0];

    const topTenOtuIds = sample['otu_ids'].slice(0, 10);
    console.log('top 10 otu ids', topTenOtuIds);
    
    const topTenSampleValues = sample['sample_values'].slice(0, 10);
    const topTenOtuLabels = sample['otu_labels'].slice(0, 10);
    
    data = [{
        x: topTenSampleValues.reverse(),
        y: topTenOtuIds.map(otu_id => "OTU " + otu_id).reverse(),
        text: topTenOtuLabels.reverse(),
        type: 'bar',
        orientation: 'h'
    }];
    
      Plotly.newPlot("bar", data);
}

function updateDemographicInfo(id) {
    const metadata = this.data['metadata'].filter(metadata => metadata.id === parseInt(id))[0];
    // grab reference to HTML elements
    let idElement = d3.select("#id");
    idElement.text("id: " + metadata['id']);

    let ethnicElement = d3.select("#ethnicity");
    ethnicElement.text("ethnicity: " + metadata['ethnicity']);

    let genderElement = d3.select("#gender");
    genderElement.text("gender: " + metadata['gender']);

    let ageElement = d3.select("#age");
    ageElement.text("age: " + metadata['age']);

    let locElement = d3.select("#location");
    locElement.text("location: " + metadata['location']);

    let bbtypeElement = d3.select("#bbtype");
    bbtypeElement.text("bbtype: " + metadata['bbtype']);

    let wfreqElement = d3.select("#wfreq");
    wfreqElement.text("wfreq: " + metadata['wfreq']);

}

function createBubbleChart(id) {
    const sample = this.data['samples'].filter(sample => sample.id === id)[0];

    var trace1 = {
        x: sample["otu_ids"],
        y: sample['sample_values'],
        mode: 'markers',
        text: sample['otu_labels'],
        marker: {
          color: sample['otu_ids'],
          opacity: [1, 0.8, 0.6, 0.4],
          size: sample['sample_values']
        }
      };
      
      var data = [trace1];
      
      
      Plotly.newPlot('bubble', data);

}