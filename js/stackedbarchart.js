


function initializeMethods(data) {

  var parse = d3.time.format("%Y").parse;

  console.log(parse)

  // Transpose the data into layers
  var dataset = d3.layout.stack()(["Boomkor", "Flyshoot", "Puls", "Sumwing", "Garnalen", "Diversen"].map(function(fruit) {
    return data.map(function(d) {
      return {
        x: d.Year,
        y: +d[fruit]
      };
    });
  }));

  var margin = {
    top: 20,
    right: 80,
    bottom: 20,
    left: 20
  };

  var width = $("#fishingmethods").width() - margin.left - margin.right,
    height = $("#fishingmethods").height() - margin.top - margin.bottom;

  var svg = d3.select("#fishingmethods_stackedbars")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Set x, y and colors
  var x = d3.scale.ordinal()
    .domain(dataset[0].map(function(d) {
      return d.x;
    }))
    .rangeRoundBands([10, width - 10], 0.02);

  var y = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) {
      return d3.max(d, function(d) {
        return d.y0 + d.y;
      });
    })])
    .range([height, 0]);

  var colors = ["b33040", "#d25c4d", "#f2b447", "#d9d574", "#f9d021", "#a3e605"];


  // Define and draw axes
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5)
    .tickSize(-width, 0, 0)
    .tickFormat(function(d) {
      return d
    });
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  // Create groups for each series, rects for each segment
  var groups = svg.selectAll("g.cost")
    .data(dataset)
    .enter().append("g")
    .attr("class", "cost")
    .style("fill", function(d, i) {
      return colors[i];
    });

  var rect = groups.selectAll("rect")
    .data(function(d) {
      return d;
    })
    .enter()
    .append("rect")
    .attr("class", "stackedbar")
    .attr("x", function(d) {
      return x(d.x);
    })
    .attr("y", function(d) {
      return y(d.y0 + d.y);
    })
    .attr("height", function(d) {
      return y(d.y0) - y(d.y0 + d.y);
    })
    .attr("width", x.rangeBand() - 1)
    .on("mouseover", function(d) {
      tooltip.style("display", null);
    })
    .on("mouseout", function() {
      tooltip.style("display", "none");
    })
    .on("mousemove", function(d) {
      var xPosition = d3.mouse(this)[0] + 10;
      var yPosition = d3.mouse(this)[1] - 25;
      tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
      tooltip.select("text").text(d.y.toPrecision(2) + " million HP days");
    });

  // Draw legend
  var legend = svg.selectAll(".legend")
    .data(colors)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) {
      return "translate(30," + i * 19 + ")";
    });

  legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function(d, i) {
      return colors.slice()[i];
    });

  legend.append("text")
    .attr("x", width + 5)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text(function(d, i) {
      switch (i) {
        case 0:
          return "Boomkor";
        case 1:
          return "Flyshoot";
        case 2:
          return "Puls";
        case 3:
          return "Sumwing";
        case 4:
          return "Garnalen";
        case 5:
          return "Diversen";
      }
    });

  // Prep the tooltip bits, initial display is hidden
  var tooltip = svg.append("g")
    .attr("class", "tooltip")
    .style("display", "none")
    .style("opacity", 1);

  tooltip.append("text")
    .attr("x", 15)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold");

    // Add title
    svg.append("text")
      .attr("x", 300)
      .attr("y", 0)
      .attr("dy", ".25em")
      .text("Fishing methods")
      .style("text-anchor", "middle")
      .attr("fill", "black")
      .style("font-size", 20)
      .style("font-family", "sans-serif");

      svg.append("text")
        .attr("x", 35)
        .attr("y", 0)
        .attr("dy", ".25em")
        .style("text-anchor", "middle")
        .text("million HP days")
        .attr("fill", "black")
        .style("font-size", 14)
        .style("font-family", "sans-serif");

        // x axis label
        svg.append("text")
          .attr("x", 640)
          .attr("y", 350)
          .attr("dy", ".25em")
          .style("text-anchor", "middle")
          .text("Year")
          .attr("fill", "black")
          .style("font-size", 14)
          .style("font-family", "sans-serif");
  };
