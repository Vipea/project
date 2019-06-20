function initializeBars(data, location, year, species) {



data = data[location][year][species]

// set the dimensions and margins of the graph
var margin = {top: 0, right: 0, bottom: 0, left: 0},
    width = $("#specieschange").width() - margin.left - margin.right,
    height = $("#specieschange").height() - margin.top - margin.bottom,
    innerRadius = 90,
    outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border

// append the svg object
var svg = d3v5.select("#specieschange_circularbars")
    .attr("width", width + margin.left + margin.right)
    .attr("class", "circlesvg")
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")")
    .attr("class", "theg")
  // X scale: common for 2 data series
  var x = d3v5.scaleBand()
      .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
      .align(0)                  // This does nothing
      .domain(data.map(function(d) { return d.name; })); // The domain of the X axis is the list of states.

  // Y scale outer variable
  var y = d3v5.scaleRadial()
      .range([innerRadius, outerRadius])   // Domain will be define later.
      .domain([0, 10000]); // Domain of Y is from 0 to the max seen in the data

  // Second barplot Scales
  var ybis = d3v5.scaleRadial()
      .range([innerRadius, 5])   // Domain will be defined later.
      .domain([0, 13000]);



  // Add the bars
  svg.append("g")
    .attr("class", "barg")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
      .attr("fill", function(d) {
        if (d.value >= 100) {
          return "#98FB98"
        }
        else {
          return "#ff6961"
        }
      })
      .attr("class", "yo")
      .attr("d", d3v5.arc()     // imagine your doing a part of a donut plot
          .innerRadius(innerRadius)
          .outerRadius(function(d) { return y(d['value']); })
          .startAngle(function(d) { return x(d.name); })
          .endAngle(function(d) { return x(d.name) + x.bandwidth(); })
          .padAngle(0.01)
          .padRadius(innerRadius))
          .on("mouseover", function(d) {
            tooltip.style("display", null);
          })
          .on("mouseout", function() {
            tooltip.style("display", "none");
          })
          .on("mousemove", function(d) {
            var xPosition = d3v5.mouse(this)[0] - 15;
            var yPosition = d3v5.mouse(this)[1] - 25;
            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            tooltip.select("text").text((d.value - 100) + "%")
          });


  // Add the labels
  svg.append("g")
      .attr("class", "gimmelabels")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
        .attr("text-anchor", function(d) { return (x(d.name) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
        .attr("transform", function(d) { return "rotate(" + ((x(d.name) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d['value'])+10) + ",0)"; })
        .attr("class", "speciesbar")
      .append("text")
        .text(function(d){return(d.name)})
        .attr("transform", function(d) { return (x(d.name) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
        .style("font-size", "11px")
        .attr("alignment-baseline", "middle")
        .attr("class", "specieslabel")

        // Set legend title
        d3v5.select("#specieschange_circularbars").append("text")
        // .attr("transform",
        //     "translate(" + (-width/3.3) + " ," +
        //                    -height/2 + ")")
                           .attr("x", 0)
                           .attr("y", 70)
          .attr("dy", ".25em")
          .text(species.charAt(0).toUpperCase() + species.slice(1) + " fauna in the " + location + " area in " + year + " relative to 1990")
          .attr("class", "circular_title")
          .attr("fill", "black")
          .style("font-size", 20)
          .style("font-family", "sans-serif")

          tooltip = svg.append("g")
            .attr("class", "tooltip")
            .style("display", "none")
            .style("opacity", 1);

          tooltip.append("text")
            .attr("x", 15)
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold");
      };



function updateCircular(data, location, year, species) {

  console.log("daaro")

  d3v5.select(".circular_title")
    .text(function() {
      if (species == "bodem") {
        return ("Benthic fauna in the " + location + " area in " + year + " relative to 1990")
      }
      else {
      return (species.charAt(0).toUpperCase() + species.slice(1) + " fauna in the " + location + " area in " + year + " relative to 1990")
    }
    })

    console.log(species + " fauna in the " + location + " area in " + year + " relative to 1990")

  // set the dimensions and margins of the graph
  var margin = {top: 0, right: 0, bottom: 0, left: 0},
      width = $("#specieschange").width() - margin.left - margin.right,
      height = $("#specieschange").height() - margin.top - margin.bottom,
      innerRadius = 90,
      outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border

       var data = data[location][year][species]


  var x = d3v5.scaleBand()
      .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
      .align(0)                  // This does nothing
      .domain(data.map(function(d) { return d.name; })); // The domain of the X axis is the list of states.

  // Y scale outer variable
  var y = d3v5.scaleRadial()
      .range([innerRadius, outerRadius])   // Domain will be define later.
      .domain([0, 10000]); // Domain of Y is from 0 to the max seen in the data

var nieuwedingen = d3v5.select(".barg")
.selectAll("path")
.data(data)

console.log(nieuwedingen)

//var tooltip = d3v5.select(".tooltip")

console.log(tooltip)


// Dit doet niks
//
var enter = nieuwedingen
  .enter().append("path")



  enter
  .attr("d", d3v5.arc()     // imagine your doing a part of a donut plot
      .innerRadius(innerRadius)
      .outerRadius(function(d) {
        console.log("heehoi")
        return y(d['value']); })
      .startAngle(function(d) {
         return x(d.name); })
      .endAngle(function(d) {
        return x(d.name) + x.bandwidth(); })
      .padAngle(0.01)
      .padRadius(innerRadius))
      .attr("class", "yo")
      .on("mouseover", function(d) {
        tooltip.style("display", null);
      })
      .on("mouseout", function() {
        tooltip.style("display", "none");
      })
      .on("mousemove", function(d) {
        var xPosition = d3v5.mouse(this)[0] - 15;
        var yPosition = d3v5.mouse(this)[1] - 25;
        tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
        tooltip.select("text").text((d.value - 100) + "%")
      })
      .attr("fill", function(d) {
        if (d.value >= 100) {
          return "#98FB98"
        }
        else {
          return "#ff6961"
        }
      })

      nieuwedingen.exit().remove()


      nieuwedingen
      .attr("d", d3v5.arc()     // imagine your doing a part of a donut plot
          .innerRadius(innerRadius)
          .outerRadius(function(d) {
            console.log("heehoi")
            return y(d['value']); })
          .startAngle(function(d) {
             return x(d.name); })
          .endAngle(function(d) {
            return x(d.name) + x.bandwidth(); })
          .padAngle(0.01)
          .padRadius(innerRadius))
          .attr("class", "yo")
          .on("mouseover", function(d) {
            tooltip.style("display", null);
          })
          .on("mouseout", function() {
            tooltip.style("display", "none");
          })
          .on("mousemove", function(d) {
            var xPosition = d3v5.mouse(this)[0] - 15;
            var yPosition = d3v5.mouse(this)[1] - 25;
            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            tooltip.select("text").text((d.value - 100) + "%")
          })
          .attr("fill", function(d) {
            if (d.value >= 100) {
              return "#98FB98"
            }
            else {
              return "#ff6961"
            }
          })

          //nieuwedingen = nieuwedingen.merge(enter); ??? hoeft niet toch


var nieuwelabels = d3v5.selectAll(".specieslabel").remove()

var nieuwelabels = d3v5.select(".gimmelabels")
.selectAll("g")
.data(data)


nieuwelabels.enter()
.append("g")
.attr("text-anchor", function(d) { return (x(d.name) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
.attr("transform", function(d) { return "rotate(" + ((x(d.name) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d['value'])+10) + ",0)"; })
.attr("class", "nwebar")
.append("text")
.text(function(d){return(d.name)})
.attr("transform", function(d) { return (x(d.name) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
.style("font-size", "11px")
.attr("alignment-baseline", "middle")
.attr("class", "specieslabel")

nieuwelabels.exit().remove()

nieuwelabels
.attr("text-anchor", function(d) { return (x(d.name) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
.attr("transform", function(d) { return "rotate(" + ((x(d.name) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d['value'])+10) + ",0)"; })
.attr("class", "speciesbar")
.append("text")
.text(function(d){return(d.name)})
.attr("transform", function(d) { return (x(d.name) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
.style("font-size", "11px")
.attr("alignment-baseline", "middle")
.attr("class", "specieslabel")



}
