/*

Stacked bar chart for fishing methods

Name: Max Frings

Student number: 10544429

Course: Programmeerproject 2018/2019 (Semester 2)

Sources: https://www.clo.nl/indicatoren/nl0587-visserijtechnieken
https://www.clo.nl/indicatoren/nl1599-fauna-westerschelde
https://www.clo.nl/indicatoren/nl1598-fauna-oosterschelde
https://www.clo.nl/indicatoren/nl1597-fauna-wadden
https://www.clo.nl/indicatoren/nl1596-fauna-noordzee-kustzone
http://edepot.wur.nl/284011 (tabel 2.6)

This file is part of a data visualization project in which the impact of fishing
methods in the past 25 years on the fauna in different locations in the
North Sea is shown.

*/

// Function to initialize the fishing methods stacked bar chart
function initializeMethods(data) {

  // Transpose the data into layers
  const stack = d3v5.stack()
    .keys(["Trawling", "Flyshoot", "Puls", "Sumwing", "Shrimps", "Miscellaneous"])

  const dataset = stack(data)

  // Add margin
  const margin = {
    top: 20,
    right: 100,
    bottom: 60,
    left: 20
  };

  // Make width and height
  const width = $("#fishingmethods").width() - margin.left - margin.right,
    height = $("#fishingmethods").height() - margin.top - margin.bottom;

  // Select SVG
  const svg = d3v5.select("#fishingmethodsStackedbars")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Set x, y and colors
  const x = d3v5.scaleBand()
    .domain(dataset[0].map(function(d) {
      return d.data.Year;
    }))
    .range([10, width - 10], 0.02);

  // Set y scale
  const y = d3v5.scaleLinear()
    .domain([0, d3v5.max(dataset, function(d) {
      return d3v5.max(d, function(d) {
        return d["1"];
      });
    })])
    .range([height, 0]);

  // Define colors
  const colors = ["b33040", "#d25c4d", "#f2b447", "#d9d574", "#f9d021", "#a3e605"];

  // Define y axis
  const yAxis = d3v5.axisLeft(y)
    .ticks(5)
    .tickSize(-width, 0, 0)
    .tickFormat(function(d) {
      return d;
    });

  // Define x axis
  const xAxis = d3v5.axisBottom(x);

  // Draw y axis
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  // Draw x axis
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  // Create groups for each series, rects for each segment
  const groups = svg.selectAll("g.cost")
    .data(dataset)
    .enter().append("g")
    .attr("class", "cost")
    .style("fill", function(d, i) {
      return colors[i];
    });

  // Make rectangles for year
  const rect = groups.selectAll("rect")
    .data(function(d) {
      return d;
    })
    .enter()
    .append("rect")
    .attr("class", "stackedbar")
    .attr("x", function(d) {
      return x(d.data.Year);
    })
    .attr("y", function(d) {
      return y(d["1"]);
    })
    .attr("height", function(d) {
      return y(d["0"]) - y(d["1"]);
    })
    .attr("width", x.bandwidth() - 1)
    .on("mouseover", function(d) {
      tooltip.style("display", null);
    })
    .on("mouseout", function() {
      tooltip.style("display", "none");
    })
    .on("mousemove", function(d) {
      const xPosition = d3v5.mouse(this)[0] + 10;
      const yPosition = d3v5.mouse(this)[1] - 25;
      tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
      tooltip.select("text").text((d["1"] - d["0"]).toPrecision(2) + " million HP days");
    });

  // Create legend
  const legend = svg.selectAll(".legend")
    .data(colors)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) {
      return "translate(30," + i * 19 + ")";
    })
    .append("a")
    .attr("target", "_blank")
    .attr("xlink:href", function(d, i) {
      switch (i) {
        case 0:
          return "https://en.wikipedia.org/wiki/Bottom_trawling";
        case 1:
          return "http://www.padmos.nl/en/products/new-construction/5";
        case 2:
          return "https://en.wikipedia.org/wiki/Electric_pulse_fishing";
        case 3:
          return "http://www.sumwing.nl/SumWing_EN.pdf";
        case 4:
          return "https://en.wikipedia.org/wiki/Shrimp_fishery";
        case 5:
          return "https://en.wikipedia.org/wiki/Fishing_techniques";
      };
    });

  // Draw legend
  legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function(d, i) {
      return colors.slice()[i];
    });

  // Set legend text
  legend.append("text")
    .attr("x", width + 5)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text(function(d, i) {
      switch (i) {
        case 0:
          return "Trawling";
        case 1:
          return "Flyshoot";
        case 2:
          return "Puls";
        case 3:
          return "Sumwing";
        case 4:
          return "Shrimps";
        case 5:
          return "Miscellaneous";
      };
    });

  // Prep the tooltip bits, initial display is hidden
  const tooltip = svg.append("g")
    .attr("class", "tooltip")
    .style("display", "none")
    .style("opacity", 1);

  // Set tooltip text
  tooltip.append("text")
    .attr("x", 15)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold");

  // Add title
  svg.append("text")
    .attr("transform",
      "translate(" + (width / 2) + " ," +
      0 + ")")
    .attr("dy", ".25em")
    .text("Fishing methods")
    .style("text-anchor", "middle")
    .attr("fill", "black")
    .style("font-size", 20)
    .style("font-family", "sans-serif");

  // Set y axis label
  svg.append("text")
    .attr("x", 35)
    .attr("y", 0)
    .attr("dy", ".25em")
    .style("text-anchor", "middle")
    .text("million HP days")
    .attr("fill", "black")
    .style("font-size", 14)
    .style("font-family", "sans-serif");

  // Set x axis label
  svg.append("text")
    .attr("transform",
      "translate(" + (width / 2) + " ," +
      (height + margin.top + 10) + ")")
    .attr("dy", ".25em")
    .style("text-anchor", "middle")
    .text("Year")
    .attr("fill", "black")
    .style("font-size", 14)
    .style("font-family", "sans-serif");
};
