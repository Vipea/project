


/* Data in strings like it would be if imported from a csv */

var json_data = $.getJSON("../data/fishingmethods.json", function(data) {
  var data = data;
  console.log(data)

  var parse = d3.time.format("%Y").parse;

  console.log(parse)

  // Transpose the data into layers
  var dataset = d3.layout.stack()(["Boomkor", "Flyshoot", "Puls", "Sumwing", "Garnalen", "Diversen"].map(function(fruit) {
    return data.map(function(d) {
      return {x: d.Year, y: +d[fruit]};
    });
  }));

  var margin = {top: 20, right: 80, bottom: 20, left: 20};

  var width = $("#fishingmethods").width() - margin.left - margin.right,
      height = $("#fishingmethods").height() - margin.top - margin.bottom;

  var svg = d3.select("#fishingmethods_stackedbars")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Set x, y and colors
  var x = d3.scale.ordinal()
    .domain(dataset[0].map(function(d) { return d.x; }))
    .rangeRoundBands([10, width-10], 0.02);

  var y = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; });  })])
    .range([height, 0]);

  var colors = ["b33040", "#d25c4d", "#f2b447", "#d9d574", "#f9d021", "#a3e605"];


  // Define and draw axes
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5)
    .tickSize(-width, 0, 0)
    .tickFormat( function(d) { return d } );
    console.log("hoi")
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")

console.log("hoi")
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

console.log("hoi")
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

console.log("hoi")
  // Create groups for each series, rects for each segment
  var groups = svg.selectAll("g.cost")
    .data(dataset)
    .enter().append("g")
    .attr("class", "cost")
    .style("fill", function(d, i) { return colors[i]; });

  var rect = groups.selectAll("rect")
    .data(function(d) { return d; })
    .enter()
    .append("rect")
    .attr("x", function(d) { return x(d.x); })
    .attr("y", function(d) { return y(d.y0 + d.y); })
    .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
    .attr("width", x.rangeBand())
    .on("mouseover", function() { tooltip.style("display", null); })
    .on("mouseout", function() { tooltip.style("display", "none"); })
    .on("mousemove", function(d) {
      var xPosition = d3.mouse(this)[0] - 15;
      var yPosition = d3.mouse(this)[1] - 25;
      tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
      tooltip.select("text").text(d.y);
    });

console.log("hoi")
  // Draw legend
  var legend = svg.selectAll(".legend")
    .data(colors)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });

  legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function(d, i) {return colors.slice()[i];});

  legend.append("text")
    .attr("x", width + 5)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text(function(d, i) {
      switch (i) {
        case 0: return "Boomkor";
        case 1: return "Flyshoot";
        case 2: return "Puls";
        case 3: return "Sumwing";
        case 4: return "Garnalen";
        case 5: return "Diversen";
      }
    });


  // Prep the tooltip bits, initial display is hidden
  var tooltip = svg.append("g")
    .attr("class", "tooltip")
    .style("display", "none");

  tooltip.append("rect")
    .attr("width", 30)
    .attr("height", 20)
    .attr("fill", "white")
    .style("opacity", 0.5);
console.log("hoi")
  tooltip.append("text")
    .attr("x", 15)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold");
});

var json_data = $.getJSON("../data/all_locations.json", function(data) {
  var data = data["1995"];
  console.log(data)


//sort bars based on value
data = data.sort(function (a, b) {
    return d3.ascending(a.value, b.value);
})

//set up svg using margin conventions - we'll need plenty of room on the left for labels
var margin = {
    top: 15,
    right: 25,
    bottom: 15,
    left: 60
};

var width = $("#faunachange").width() - margin.left - margin.right,
    height = $("#faunachange").height() - margin.top - margin.bottom;

var svg = d3.select("#faunachange_relativebars")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scale.linear()
    .range([0, width])
    .domain([-100, 100]);

var y = d3.scale.ordinal()
    .rangeRoundBands([height, 0], .1)
    .domain(data.map(function (d) {
        return d.location;
    }));

//make y axis to show bar names
var yAxis = d3.svg.axis()
    .scale(y)
    //no tick marks
    .tickSize(0)
    .orient("left");
var gy = svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)


var bars = svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("g")

//append rects
bars.append("rect")
    .attr("class", "bar")
    .attr("y", function (d) {
        return y(d.location);
    })
    .attr("height", y.rangeBand())
    .attr("x", 0)
    .attr("width", function (d) {
        return x(d.value);
    });

//add a value label to the right of each bar
bars.append("text")
    .attr("class", "label")
    //y position of the label is halfway down the bar
    .attr("y", function (d) {
        return y(d.location) + y.rangeBand() / 2 + 4;
    })
    //x position is 3 pixels to the right of the bar
    .attr("x", function (d) {
        return x(d.value) + 3;
    })
    .text(function (d) {
        return d.value;
    });

    svg.append("path")
                  .attr("d", " M 99 0 L 99 500 L 101 500 L 101 0 ")
    .attr("fill", "red")
})

////////////////////////////* Circular bar plot *///////////////////////////////

var json_data = $.getJSON("../data/allindividuals.json", function(data) {
  var data = data["west"]["1995"];

  // set the dimensions and margins of the graph
  var margin = {top: 100, right: 0, bottom: 0, left: 0},
      width = 460 - margin.left - margin.right,
      height = 460 - margin.top - margin.bottom,
      innerRadius = 90,
      outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border

  // append the svg object
  var svg = d3.select("#specieschange_circularbars")
    .append("svg")
      .attr("width", $("#specieschange").width() + margin.left + margin.right)
      .attr("height", $("#specieschange").height() + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

    // X scale: common for 2 data series
    var x = d3.scale.ordinal()
        .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
        .domain(data.map(function(d) { return d.name; })); // The domain of the X axis is the list of states.

    // Y scale outer variable
    var y = d3.scaleRadial()
        .range([innerRadius, outerRadius])   // Domain will be define later.
        .domain([0, 13000]); // Domain of Y is from 0 to the max seen in the data

    // Second barplot Scales
    var ybis = d3.scaleRadial()
        .range([innerRadius, 5])   // Domain will be defined later.
        .domain([0, 13000]);

    // Add the bars
    svg.append("g")
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
        .attr("fill", "#69b3a2")
        .attr("class", "yo")
        .attr("d", d3.arc()     // imagine your doing a part of a donut plot
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
        .append("text")
          .text(function(d){return(d.name)})
          .attr("transform", function(d) { return (x(d.name) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
          .style("font-size", "11px")
          .attr("alignment-baseline", "middle")

    // Add the second serie
    svg.append("g")
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
        .attr("fill", "red")
        .attr("d", d3.arc()     // imagine your doing a part of a donut plot
            .innerRadius( function(d) { return ybis(0) })
            .outerRadius( function(d) { return ybis(d['Value']); })
            .startAngle(function(d) { return x(d.name); })
            .endAngle(function(d) { return x(d.name) + x.bandwidth(); })
            .padAngle(0.01)
            .padRadius(innerRadius))

  });
