/*

Creates and updates the horizontal bar chart for fauna change per location

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

// Creates the horizontal bar chart
function changeBars(data, year) {

  // Set data
  const locdata = data[year]

  // Select SVG
  svg = d3v5.select("#faunachange_relativebars")

  // Set margin
  const margin = {
    top: 50,
    right: 25,
    bottom: 15,
    left: 60
  };

  // Set width and height
  const width = $("#faunachange").width() - margin.left - margin.right,
    height = $("#faunachange").height() - margin.top - margin.bottom;

  // Set SVG width and height, and transform the location
  svg
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("class", "horizontal")

  // Set x scale
  const x = d3v5.scaleLinear()
    .range([0, 250])
    .domain([0, 20]);

  // Set y scale
  const y = d3v5.scaleBand()
    .range([height, 20], .1)
    .domain(locdata.map(function(d) {
      return d.location;
    }));

  // Make y axis to show bar names
  const yAxis = d3v5.axisRight(y)
    .tickSize(0)

  // Append y axis
  const gy = svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .attr("transform",
      "translate(" + 75 + " ," +
      (0) + ")")
    .style("font-size", 15);

  // Add horizontal bars
  const bars = svg.selectAll(".bar")
    .data(locdata)
    .enter()
    .append("g");

  // Append rects
  bars.append("rect")
    .attr("class", "bar")
    .attr("y", function(d) {
      return y(d.location);
    })
    .attr("height", y.bandwidth())
    .attr("x", function(d) {
      if (d.value - 100 >= 0) {
        return width / 2;
      } else {
        return width / 2 - x(100 - d.value);
      }
    })
    .attr("width", function(d) {
      return x(Math.abs(100 - d.value));
    })
    .attr("fill", function(d) {
      if (d.value - 100 >= 0) {
        return "#98FB98";
      } else {
        return "#ff6961";
      }
    });

  // Add a value label
  bars.append("text")
    .attr("class", "overall_label")
    //y position of the label is halfway down the bar
    .attr("y", function(d) {
      return y(d.location) + y.bandwidth() / 2 + 4;
    })
    .style("font-size", 15)
    //x position is 3 pixels to the right of the bar
    .attr("x", function(d) {
      if (d.value - 100 >= 0) {
        return width / 2 + x(Math.abs(100 - d.value)) + 10
      } else {
        return width / 2 - x(100 - d.value) - 40
      }
    })
    .text(function(d) {
      return d.value - 100 + "%";
    })
    .attr("id", function(d) {
      return d.location
    });

  // Add the divide line where there is zero change
  svg.append("path")
    .attr("d", " M " + (width / 2 - 1) + " " + y("waddenzee") + " L " + (width / 2 - 1) + " " + (height) + " L " + (width / 2 + 1) + " " + (height) + " L " + (width / 2 + 1) + " " + y("waddenzee") + " ")
    .attr("fill", "red")
    .attr("class", "divide")

  // Set legend title
  svg.append("text")
    .attr("transform",
      "translate(" + (width / 2) + " ," +
      10 + ")")
    .style("text-anchor", "middle")
    .attr("dy", ".25em")
    .text("Fauna change relative to 1990 in the year " + year)
    .attr("fill", "black")
    .style("font-size", 20)
    .style("font-family", "sans-serif")
    .attr("class", "overall_title");

};


// Function that updates the horizontal bar chart
function updateBars(data, year) {

  // Set margin
  const margin = {
    top: 50,
    right: 25,
    bottom: 15,
    left: 60
  };

  // Set width and height
  const width = $("#faunachange").width() - margin.left - margin.right,
    height = $("#faunachange").height() - margin.top - margin.bottom;

  // Set x scale
  const x = d3v5.scaleLinear()
    .range([0, 250])
    .domain([0, 20]);

  // Set data
  const locdata = data[year];

  // Update horizontal bars
  const horizontalBars = d3v5.selectAll(".bar")
    .data(locdata)
    .transition()
    .duration(100)
    .attr("x", function(d) {
      if (d.value - 100 >= 0) {
        return width / 2;
      } else {
        return width / 2 - x(100 - d.value);
      }
    })
    .attr("width", function(d) {
      return x(Math.abs(100 - d.value));
    })
    .attr("fill", function(d) {
      if (d.value - 100 >= 0) {
        return "#98FB98";
      } else {
        return "#ff6961";
      }
    });

  // Update labels
  d3v5.selectAll(".overall_label")
    .data(locdata)
    .transition()
    .duration(100)
    .attr("x", function(d) {
      if (d.value - 100 >= 0) {
        return width / 2 + x(Math.abs(100 - d.value)) + 10;
      } else {
        return width / 2 - x(100 - d.value) - 40;
      }
    })
    .text(function(d) {
      return d.value - 100 + "%";
    });

  // Update title
  d3v5.select(".overall_title")
    .text("Fauna change relative to 1990 in the year " + year);
};
