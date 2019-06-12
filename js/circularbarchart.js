

var json_data = $.getJSON("../data/allindividuals.json", function(data) {

  // Show the value of the slider in the HTML page
  let slider = document.getElementById("customRange1");
  let output = document.getElementById("showVal");
  output.innerHTML = slider.value;

  d3.selectAll(".stackedbar").onclick = function(d) {
        changeCircular(datacopy, $("#select_location").val(), d.x, $("#select_species").val());
      }

  // Changes the year
  function changeYear(year) {

    // Shows the year that is currently selected
    output.innerHTML = slider.value;
  };

  // Changes the datapoint every time the slider is moved
  slider.oninput = function() {
    changeCircular(datacopy, $("#select_location").val(), slider.value, $("#select_species").val())
    changeYear(this.value);
    yearSelect = this.value
  };

  var datacopy = data

  console.log(data)
  var data = data["waddenzee"]["1993"]["fish"];

  // set the dimensions and margins of the graph
  var margin = {top: 100, right: 0, bottom: 0, left: 0},
      width = $("#specieschange").width() - margin.left - margin.right,
      height = $("#specieschange").height() - margin.top - margin.bottom,
      innerRadius = 90,
      outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border

  // append the svg object
  var svg = d3v4.select("#specieschange_circularbars")
      .attr("width", width + margin.left + margin.right)
      .attr("class", "circlesvg")
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")")
      .attr("class", "theg")
    // X scale: common for 2 data series
    var x = d3v4.scaleBand()
        .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
        .align(0)                  // This does nothing
        .domain(data.map(function(d) { return d.name; })); // The domain of the X axis is the list of states.

    // Y scale outer variable
    var y = d3v4.scaleRadial()
        .range([innerRadius, outerRadius])   // Domain will be define later.
        .domain([0, 2000]); // Domain of Y is from 0 to the max seen in the data

    // Second barplot Scales
    var ybis = d3v4.scaleRadial()
        .range([innerRadius, 5])   // Domain will be defined later.
        .domain([0, 13000]);

    // Add the bars
    svg.append("g")
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
        .attr("d", d3v4.arc()     // imagine your doing a part of a donut plot
            .innerRadius(innerRadius)
            .outerRadius(function(d) { return y(d['value']); })
            .startAngle(function(d) { return x(d.name); })
            .endAngle(function(d) { return x(d.name) + x.bandwidth(); })
            .padAngle(0.01)
            .padRadius(innerRadius))

    // Add the labels
    svg.append("g")
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


          // Function to change circular bars
          function changeCircular(data, location, year, species) {
            data = data[location][year][species]

            console.log(data)
            // X scale: common for 2 data series
            var x = d3v4.scaleBand()
                .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
                .align(0)                  // This does nothing
                .domain(data.map(function(d) { return d.name; })); // The domain of the X axis is the list of states.

            // Y scale outer variable
            var y = d3v4.scaleRadial()
                .range([innerRadius, outerRadius])   // Domain will be define later.
                .domain([0, 2000]); // Domain of Y is from 0 to the max seen in the data


            een = d3v4.selectAll(".yo")
            een.remove()
            twee = d3v4.selectAll(".speciesbar")
            twee.remove()
            drie = d3v4.selectAll(".specieslabel")
            drie.remove()
            gg = d3v4.select(".theg")

            gg.remove()







              var svg = d3v4.select("#specieschange_circularbars")
              .append("g")
                .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")")
                .attr("class", "theg")

            // Add the bars
            svg.append("g")
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
                .attr("d", d3v4.arc()     // imagine your doing a part of a donut plot
                    .innerRadius(innerRadius)
                    .outerRadius(function(d) {
                      return y(d['value']); })
                    .startAngle(function(d) {
                       return x(d.name); })
                    .endAngle(function(d) {
                      return x(d.name) + x.bandwidth(); })
                    .padAngle(0.01)
                    .padRadius(innerRadius))

            console.log(data)
            // Add the labels
            svg.append("g")
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
                  svg.append("text")
                    .attr("x", -170)
                    .attr("y", -260)
                    .attr("dy", ".25em")
                    .text(species + " fauna in the " + location + " area in the year " + year)
                    .attr("fill", "black")
                    .style("font-size", 20)
                    .style("font-family", "sans-serif")
          }

          // Onchange event for selecting species triggers changeCircular()
          $("#select_species").change(function() {
            console.log(datacopy);
            changeCircular(datacopy, $("#select_location").val(), slider.value, $("#select_species").val());
          });

          $("#select_location").change(function() {
            changeCircular(datacopy, $("#select_location").val(), slider.value, $("#select_species").val());
          });



  });
