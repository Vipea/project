/*

Creates and updates the line chart that shows the overall fauna change

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

// Intialize the line chart
function changeLine(linedata, location) {

  // Set margin, width and height
  const margin = {
      top: 50,
      right: 80,
      bottom: 80,
      left: 50
    },
    width = $("#faunatotal").width() - margin.left - margin.right,
    height = $("#faunatotal").height() - margin.top - margin.bottom;

  // Set x scale
  const x = d3v5.scaleLinear()
    .range([0, width]);

  // Set y scale
  const y = d3v5.scaleLinear()
    .range([height, 0]);

  // Set color
  const color = d3v5.scaleOrdinal(d3v5.schemeCategory10);

  // Set x axis
  const xAxis = d3v5.axisBottom(x)

  // Set y axis
  const yAxis = d3v5.axisLeft(y)

  // Set data
  const data = linedata[location]

  // Set line function
  const line = d3v5.line()
    .curve(d3v5.curveCardinal)
    .x(function(d) {
      return x(d.date);
    })
    .y(function(d) {
      return y(d.temperature);
    });

  // Select SVG and transform the location
  const svg = d3v5.select("#faunatotalLinechart")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("class", "totalline");

  // Get color keys
  color.domain(d3v5.keys(data[0]).filter(function(key) {
    return key !== "date";
  }));

  // Set date
  data.forEach(function(d) {
    d.date = d.date;
  });

  // Map all data to specific line chart format
  const cities = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {
          date: d.date,
          temperature: +d[name]
        };
      })
    };
  });

  // Set x domain
  x.domain(d3v5.extent(data, function(d) {
    return d.date;
  }));

  // Set y domain
  y.domain([
    d3v5.min(cities, function(c) {
      return d3v5.min(c.values, function(v) {
        return v.temperature;
      });
    }),
    d3v5.max(cities, function(c) {
      return d3v5.max(c.values, function(v) {
        return v.temperature;
      });
    })
  ]);

  // Append the x axis
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis
      .tickFormat(d3v5.format("")));

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

  // Append the y axis
  svg.append("g")
    .attr("class", "yLine")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Index 1990");

  // Set y axis label
  svg.append("text")
    .attr("x", 45)
    .attr("y", -20)
    .attr("dy", ".25em")
    .style("text-anchor", "middle")
    .text("Index 100 = Year 1990")
    .attr("fill", "black")
    .style("font-size", 14)
    .style("font-family", "sans-serif");


  // Append a g element to contain the line
  const city = svg.selectAll(".city")
    .data(cities)
    .enter().append("g")
    .attr("class", "city");

  // Append the line
  city.append("path")
    .attr("class", "line")
    .attr("d", function(d) {
      return line(d.values);
    })
    .style("stroke", function(d) {
      return color(d.name);
    });

  // Append a g element to track mouse movement
  const mouseG = svg.append("g")
    .attr("class", "mouse-over-effects");

  // Append a black line to visually track mouse movement
  mouseG.append("path")
    .attr("class", "mouse-line")
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", "0");

  // Select the line
  const lines = document.getElementsByClassName('line');

  // Append a g on the line to track movement
  const mousePerLine = mouseG.selectAll('.mouse-per-line')
    .data(cities)
    .enter()
    .append("g")
    .attr("class", "mouse-per-line");

  // Append a circle to show when user hovers on the line
  mousePerLine.append("circle")
    .attr("r", 7)
    .style("stroke", function(d) {
      return color(d.name);
    })
    .style("fill", "none")
    .style("stroke-width", "1px")
    .style("opacity", "0");

  // Add text next to the circle
  mousePerLine.append("text")
    .attr("transform", "translate(10,3)")
    .attr("font-size", "12px")
    .attr("font-weight", "bold")

  // Append a rect to catch mouse movements
  mouseG.append('svg:rect')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', 'none')
    .attr('pointer-events', 'all')

    // On mouse out hide line, circles and text
    .on('mouseout', function() {
      d3v5.select(".mouse-line")
        .style("opacity", "0");
      d3v5.selectAll(".mouse-per-line circle")
        .style("opacity", "0");
      d3v5.selectAll(".mouse-per-line text")
        .style("opacity", "0");
    })

    // On mouse in show line, circles and text
    .on('mouseover', function() {
      d3v5.select(".mouse-line")
        .style("opacity", "1");
      d3v5.selectAll(".mouse-per-line circle")
        .style("opacity", "1");
      d3v5.selectAll(".mouse-per-line text")
        .style("opacity", "1");
    })

    // Update text on mouse move
    .on('mousemove', function() {
      const mouse = d3v5.mouse(this);
      d3v5.select(".mouse-line")
        .attr("d", function() {
          let d = "M" + mouse[0] + "," + height;
          d += " " + mouse[0] + "," + 0;
          return d;
        });

      // Transform the tooltip location
      d3v5.selectAll(".mouse-per-line")
        .attr("transform", function(d, i) {
          const xDate = x.invert(mouse[0]),
            bisect = d3v5.bisector(function(d) {
              return d.date;
            }).right;
          idx = bisect(d.values, xDate);

          // Get length of line
          let beginning = 0,
            end = lines[i].getTotalLength(),
            target = null;

          // Check if mouse is between the line width
          while (true) {
            target = Math.floor((beginning + end) / 2);
            pos = lines[i].getPointAtLength(target);
            if ((target === end || target === beginning) && pos.x !== mouse[0]) {
              break;
            }
            if (pos.x > mouse[0]) end = target;
            else if (pos.x < mouse[0]) beginning = target;
            else break; //position found
          }

          // Set the position of the text
          d3v5.select(this).select('text')
            .text(y.invert(pos.y).toFixed(2))

          // Returns the new location
          return "translate(" + mouse[0] + "," + pos.y + ")";
        });
    });

  // Add title
  svg.append("text")
    .attr("x", width/2)
    .attr("y", -30)
    .attr("dy", ".25em")
    .style("text-anchor", "middle")
    .text("Overall fauna change in the " + location + " area")
    .attr("fill", "black")
    .attr("id", "lineTitle")
    .style("font-size", 20)
    .style("font-family", "sans-serif");
};


// Updates the line chart
function updateLineHeight(linedata, location) {

  // Set data
  const data = linedata[location]

  // Set margin, width and height
  const margin = {
      top: 50,
      right: 80,
      bottom: 80,
      left: 50
    },
    width = $("#faunatotal").width() - margin.left - margin.right,
    height = $("#faunatotal").height() - margin.top - margin.bottom;

  // Set color
  const color = d3v5.scaleOrdinal(d3v5.schemeCategory10);
  color.domain(d3v5.keys(data[0]).filter(function(key) {
    return key !== "date";
  }));

  // Set x scale
  const x = d3v5.scaleTime()
    .range([0, width]);

  // Set y scale
  const y = d3v5.scaleLinear()
    .range([height, 0]);

  // Set date
  data.forEach(function(d) {
    d.date = d.date;
  });

  // Set updated line function
  const line = d3v5.line()
    .curve(d3v5.curveCardinal)
    .x(function(d) {
      return x(d.date);
    })
    .y(function(d) {
      return y(d.temperature);
    });

  // Set color keys
  color.domain(d3v5.keys(data[0]).filter(function(key) {
    return key !== "date";
  }));

  // Map all data to specific line chart format
  const cities = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {
          date: d.date,
          temperature: +d[name]
        };
      })
    };
  });

  // Set x domain
  x.domain(d3v5.extent(data, function(d) {
    return d.date;
  }));

  // Set y domain
  y.domain([
    d3v5.min(cities, function(c) {
      return d3v5.min(c.values, function(v) {
        return v.temperature;
      });
    }),
    d3v5.max(cities, function(c) {
      console.log(c)
      return d3v5.max(c.values, function(v) {
        return v.temperature;
      });
    })
  ]);

  // Set y axis
  const yAxis = d3v5.axisLeft(y)

  // Update the y axis
  d3v5.select(".yLine")
    .transition()
    .duration(2000)
    .call(yAxis)

  // Update the line
  const nieuwelijn = d3v5.select(".line")
    .data(cities)
    .transition()
    .duration(2000)
    .attr("d", function(d) {
      return line(d.values);
    })
    .style("stroke", function(d) {
      return color(d.name);
    });

  // Update the title
  d3v5.select("#lineTitle")
    .text("Overall fauna change in the " + location + " area");
};
