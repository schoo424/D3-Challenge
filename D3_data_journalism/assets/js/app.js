// @TODO: YOUR CODE HERE!

//initial setup work

// Read CSV
d3.csv("assets/data/data.csv").then(function (journalismData) {
    console.log(journalismData);

    journalismData.forEach(function(data) {
            data.smokes = +data.smokes;
            // console.log("Smokes", data.smokes);
            
            data.income = +data.income;
            // console.log("Income", data.income);
            
            data.healthcare = +data.healthcare;
            // console.log("Healthcare", data.healthcare);

            data.poverty = + data.poverty;
            // console.log("Poverty", data.poverty);
           
});

var svgArea = d3.select("body").select("svg");

// SVG wrapper dimensions are determined by the current width and
// height of the browser window.
var svgWidth = window.innerWidth;
var svgHeight = window.innerHeight;

var margin = {
  top: 100,
  bottom: 250,
  right: 250,
  left: 250
};

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

// Append SVG element
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append group element
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// var chosenXAxis = "smokes";

  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain(d3.extent(journalismData, d => d.smokes))
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(journalismData, d => d.income)])
    .range([height, 0]);

  // create axes
  var xAxis = d3.axisBottom(xLinearScale);
  var yAxis = d3.axisLeft(yLinearScale);
  

  // append axes
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  chartGroup.append("g")
    .call(yAxis);

  //append y-axis  
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height/2))
    .attr("dy", "10em")
    .classed("axis-text", true)
    .text("Income");

  // Create group for  2 x- axis labels
  var labelsGroup = chartGroup.append("g")
  .attr("transform", `translate(${width / 2}, ${height + 20})`);

  // Create group for  2 x- axis labels
  var smokesLabel = labelsGroup.append("text")
  .attr("x", 0)
  .attr("y", 20)
  .attr("value", "smokes") 
  .classed("active", true)
  .text("Smokers (%)");


//   // line generator
//   var line = d3.line()
//     .x(d => xTimeScale(d.date))
//     .y(d => yLinearScale(d.medals));

  // append line
//   chartGroup.append("path")
//     .data([medalData])
//     .attr("d", line)
//     .attr("fill", "none")
//     .attr("stroke", "red");

  //fill in the circles with state abbreviations
  var circlesText = chartGroup.selectAll(null)
    .data(journalismData)
    .enter()
    .append("text")
    .attr("class", "stateText")
    // .attr("font-color", "black")    
    .attr("dx", d => xLinearScale(d.smokes-.15))  
    .attr("dy", d => yLinearScale(d.income-500))
    // .attr("opacity", "100")
    .text(function(d){
      return d.abbr;   
    
    });  
  // append circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(journalismData)
    .enter()
    .append("circle")
    .attr("class", "stateCircle")
    .attr("cx", d => xLinearScale(d.smokes))
    .attr("cy", d => yLinearScale(d.income))
    .attr("r", "15")
    .attr("fill", "rgb(12,240,233)")
    .attr("stroke-width", "1")
    .attr("stroke", "black")
    .attr("opacity", ".5")
  
// console.log(journalismData);    

// circlesGroup.append("text").text(d => d.abbr)
  
// date formatter to display dates nicely
//   var dateFormatter = d3.timeFormat("%d-%b");

  // Step 1: Append tooltip div
  var toolTip = d3.select("body")
    .append("div")
    .classed("tooltip", true);

  // Step 2: Create "mouseover" event listener to display tooltip
  circlesGroup.on("mouseover", function(d) {
    toolTip.style("display", "block")
        .html(
          `<strong>${d.state}</strong><hr>Smokes: ${d.smokes}`)
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY + "px");
  })
  // Step 3: Create "mouseout" event listener to hide tooltip
  .on("mouseout", function() {
    toolTip.style("display", "none");
  });

}
, function(error) {
  console.log(error);
});



// var toolTip = d3.tip().attr("class","tooltip").offset([80,-60])
// .html(function(d){
//   return(        
//   `<strong>${d.state}</strong><hr>Smokes: ${d.smokes}`)
          
// })
// chartGroup.call(toolTip)

// circlesGroup.on("mouseover", function(d) {
//   toolTip.show(d,this)

// }).on("mouseout",function(d){
//   toolTip.hide(d)
// });
// }
// , function(error) {
//   console.log(error);
// });