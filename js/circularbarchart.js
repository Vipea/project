/*

Creates and updates the circular bar chart that shows the change per species

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

function initializeBars(circulardata, location, year, species) {

  // Set data
  const data = circulardata[location][year][species]

  // Set the dimensions and margins of the graph
  const margin = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    width = $("#specieschange").width() - margin.left - margin.right,
    height = $("#specieschange").height() - margin.top - margin.bottom,
    innerRadius = 90,
    outerRadius = Math.min(width, height) / 2;

  // Append the svg object
  const svg = d3v5.select("#specieschangeCircularbars")
    .attr("width", width + margin.left + margin.right)
    .attr("class", "circlesvg")
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + (width / 2 + margin.left) + "," +
                                  (height / 2 + margin.top) + ")")
    .attr("class", "theg")

  // X scale
  const x = d3v5.scaleBand()
    .range([0, 2 * Math.PI])
    .align(0)
    .domain(data.map(function(d) {
      return d.name;
    }));

  // Y scale
  const y = d3v5.scaleRadial()
    .range([innerRadius, outerRadius])
    .domain([0, 4000]);

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
      } else {
        return "#ff6961"
      }
    })
    .attr("class", "yo")
    .attr("d", d3v5.arc()
      .innerRadius(innerRadius)
      .outerRadius(function(d) {
        return y(d['value']);
      })
      .startAngle(function(d) {
        return x(d.name);
      })
      .endAngle(function(d) {
        return x(d.name) + x.bandwidth();
      })
      .padAngle(0.01)
      .padRadius(innerRadius))
    .on("mouseover", function(d) {
      tooltip.style("display", null);
    })
    .on("mouseout", function() {
      tooltip.style("display", "none");
    })
    .on("mousemove", function(d) {
      const xPosition = d3v5.mouse(this)[0] - 15;
      const yPosition = d3v5.mouse(this)[1] - 25;
      tooltip.attr("transform", "translate(" + xPosition + "," + yPosition +
                                           ")");
      tooltip.select("text").text((d.value - 100) + "%")
    });

  // Add the labels
  svg.append("g")
    .attr("class", "gimmelabels")
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("text-anchor", function(d) {
      return (x(d.name) + x.bandwidth() / 2 + Math.PI) %
                          (2 * Math.PI) < Math.PI ? "end" : "start";
    })
    .attr("transform", function(d) {
      return "rotate(" + ((x(d.name) + x.bandwidth() / 2) * 180 /Math.PI - 90) +
                         ")" + "translate(" + (y(d['value']) + 10) + ",0)";
    })
    .attr("class", "speciesbar")
    .append("text")
    .text(function(d) {
      return (d.name)
    })
    .attr("transform", function(d) {
      return (x(d.name) + x.bandwidth() / 2 + Math.PI) %
                          (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)";
    })
    .style("font-size", "11px")
    .attr("alignment-baseline", "middle")
    .attr("class", "specieslabel")

  // Set legend title
  d3v5.select("#specieschangeCircularbars").append("text")
    .attr("x", 0)
    .attr("y", 50)
    .text(species.charAt(0).toUpperCase() + species.slice(1) +
                                            " fauna in the " + location +
                                            " area in " + year +
                                            " relative to 1990")
    .attr("class", "circularTitle")
    .attr("fill", "black")
    .style("font-size", 20)
    .style("font-family", "sans-serif")



  // Append tooltip
  const tooltip = svg.append("g")
    .attr("class", "circulartooltip")
    .style("display", "none")
    .style("opacity", 1);

  // Set tooltip text
  tooltip.append("text")
    .attr("x", 15)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold");

    const legendGreen = d3v5.select("#specieschangeCircularbars").append("g")
      .attr("class", "greenlegend")
      .attr("x", 0)
      .attr("y", 70)

    // Draw legend
    legendGreen.append("circle")
      .attr("cx", 10)
      .attr("cy", 70)
      .attr("r", 10)
      .style("fill", "#98FB98")

    // Set legend text
    legendGreen.append("text")
      .attr("x", 30)
      .attr("y", 70)
      .attr("font-size", "11px")
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text("Species increased since 1990")


      const legendRed = d3v5.select("#specieschangeCircularbars").append("g")
        .attr("class", "redlegend")
        .attr("x", 0)
        .attr("y", 95)

      // Draw legend
      legendRed.append("circle")
        .attr("cx", 10)
        .attr("cy", 95)
        .attr("r", 10)
        .style("fill", "#ff6961")

      // Set legend text
      legendRed.append("text")
        .attr("x", 30)
        .attr("y", 95)
        .attr("font-size", "11px")
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text("Species decreased since 1990")
};


// Function to update the circular bar chart
function updateCircular(circulardata, location, year, species) {
  const data = circulardata[location][year][species]

  // Update title
  d3v5.select(".circularTitle")
    .text(function() {
      if (species == "bodem") {
        return ("Benthic fauna in the " + location + " area in " +
                year + " relative to 1990");
      } else {
        return (species.charAt(0).toUpperCase() + species.slice(1) +
                                                  " fauna in the " + location +
                                                  " area in " + year +
                                                  " relative to 1990");
      }
    })

  // Set the dimensions and margins of the graph
  const margin = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    width = $("#specieschange").width() - margin.left - margin.right,
    height = $("#specieschange").height() - margin.top - margin.bottom,
    innerRadius = 90,
    outerRadius = Math.min(width, height) / 2;

  // X scale
  const x = d3v5.scaleBand()
    .range([0, 2 * Math.PI])
    .align(0)
    .domain(data.map(function(d) {
      return d.name;
    }));

  // Y scale
  const y = d3v5.scaleRadial()
    .range([innerRadius, outerRadius])
    .domain([0, 4000]);

  // Select all path elements and add the new data
  const newBars = d3v5.select(".barg")
    .selectAll("path")
    .data(data);

    const tooltip = d3v5.select(".circulartooltip").attr("display", null);

  // Enter and append all new paths and merge them
  newBars
    .enter().append("path").merge(newBars)
    .attr("d", d3v5.arc()
      .innerRadius(innerRadius)
      .outerRadius(function(d) {
        if (d['value'] < 11 || d['value'] == null) {
          return y(d['value'] + 10);
      }
        return y(d['value']);
      })
      .startAngle(function(d) {
        return x(d.name);
      })
      .endAngle(function(d) {
        return x(d.name) + x.bandwidth();
      })
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
      const xPosition = d3v5.mouse(this)[0] - 15;
      const yPosition = d3v5.mouse(this)[1] - 25;
      tooltip.attr("transform", "translate(" + xPosition + "," + yPosition +
                                           ")");
      tooltip.select("text").text((d.value - 100) + "%")
    })
    .attr("fill", function(d) {
      if (d.value >= 100) {
        return "#98FB98";
      } else {
        return "#ff6961";
      }
    });

  // Exit and remove old paths
  newBars.exit().remove();

  // Remove labels
  const oldLabels = d3v5.selectAll(".specieslabel").remove();

  // Select labels and add new data
  const newLabels = d3v5.select(".gimmelabels")
    .selectAll("g")
    .data(data);

  // Enter append and merge new labels
  newLabels.enter()
    .append("g")
    .merge(newLabels)
    .attr("text-anchor", function(d) {
      return (x(d.name) + x.bandwidth() / 2 +
                          Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start";
    })
    .attr("transform", function(d) {
      return "rotate(" + ((x(d.name) + x.bandwidth() / 2) *
                         180 / Math.PI - 90) + ")" +
                         "translate(" + (y(d['value']) + 10) + ",0)";
    })
    .attr("class", "nwebar")
    .append("text")
    .text(function(d) {
      return (d.name)
    })
    .attr("transform", function(d) {
      return (x(d.name) + x.bandwidth() / 2 + Math.PI) %
                          (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)";
    })
    .style("font-size", "11px")
    .attr("alignment-baseline", "middle")
    .attr("class", "specieslabel")

  // Exit and remove the old labels
  newLabels.exit().remove();
};
