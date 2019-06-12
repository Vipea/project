console.log(d3v4.version)
console.log(d3.version)


/* Data in strings like it would be if imported from a csv */

//* FISHING METHODS *//*********************************************************
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

//* HORIZONTAL BARS *//*********************************************************
var json_data = $.getJSON("../data/all_locations.json", function(data) {
  var data = data;
  var locationdata = data;
  console.log(locationdata)
  var initializedata = data["1990"]
  console.log(data)



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
      .range([0, 200])
      .domain([0, 20]);

  var y = d3.scale.ordinal()
      .rangeRoundBands([height, 0], .1)
      .domain(initializedata.map(function (d) {
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

  function changeBars(locationdata, year) {

    svg.selectAll(".bar").remove()
    svg.selectAll(".overall_label").remove()
    svg.selectAll(".overall_title").remove()
    svg.select(".divide").remove()

    data = locationdata[year]
    console.log(data)

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
      .attr("x", function (d) {
        if (d.value - 100 >= 0) {
          return 200
        }
        else {
          return 200 - x(100 - d.value)
        }
      })
      .attr("width", function (d) {
        console.log
          return x(Math.abs(100 - d.value))
      })
      .attr("fill", function(d) {
        if (d.value - 100 >= 0) {
          return "#98FB98"
        }
        else {
          return "#ff6961"
        }
      })

  //add a value label to the right of each bar
  bars.append("text")
      .attr("class", "overall_label")
      //y position of the label is halfway down the bar
      .attr("y", function (d) {
          return y(d.location) + y.rangeBand() / 2 + 4;
      })
      //x position is 3 pixels to the right of the bar
      .attr("x", function (d) {
        if (d.value - 100 >= 0) {
          return 200 + x(Math.abs(100 - d.value)) + 10
        }
        else {
          return 200 - x(100 - d.value) - 25
        }
      })
      .text(function (d) {
          return d.value - 100 + "%";
      });

      svg.append("path")
                    .attr("d", " M 199 0 L 199 500 L 201 500 L 201 0 ")
      .attr("fill", "red")
      .attr("class", "divide")

      // Set legend title
      svg.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("dy", ".25em")
        .text("Overall fauna change per location in " + year)
        .attr("fill", "black")
        .style("font-size", 20)
        .style("font-family", "sans-serif")
        .attr("class", "overall_title")
      }
      changeBars(locationdata, "1991")

      let slider = document.getElementById("customRange1");
      console.log("Voor jaj")
      slider.onchange = function() {
        console.log("jaja")
        console.log(locationdata)
        changeBars(locationdata, slider.value)
      };
})





////////////////////////////* Circular bar plot *///////////////////////////////
var json_data = $.getJSON("../data/allindividuals.json", function(data) {
  var datacopy = data
  console.log(data)
  var data = data["waddenzee"]["1993"]["fish"];

  // set the dimensions and margins of the graph
  var margin = {top: 100, right: 0, bottom: 0, left: 0},
      width = 460 - margin.left - margin.right,
      height = 460 - margin.top - margin.bottom,
      innerRadius = 90,
      outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border

  // append the svg object
  var svg = d3v4.select("#specieschange_circularbars")
      .attr("width", 600 + margin.left + margin.right)
      .attr("class", "circlesvg")
    .attr("height", 600 + margin.top + margin.bottom)
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
        .domain([0, 13000]); // Domain of Y is from 0 to the max seen in the data

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
        .attr("fill", "#69b3a2")
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
            console.log(data)
            console.log(location)

            console.log(species)
            console.log(typeof year)
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
                .domain([0, 13000]); // Domain of Y is from 0 to the max seen in the data


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
                .attr("fill", "#69b3a2")
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

          // Show the value of the slider in the HTML page
          let slider = document.getElementById("customRange1");
          let output = document.getElementById("showVal");
          output.innerHTML = slider.value;

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

  });

////////////////////////////* Total Line Chart *////////////////////////////////
var json_data = $.getJSON("../data/new_totals.json", function(data) {
  var locationdata = data
  var data = data

var margin = {
    top: 20,
    right: 80,
    bottom: 30,
    left: 50
  },
  width = 900 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y%m%d").parse;

var x = d3.time.scale()
  .range([0, width]);

var y = d3.scale.linear()
  .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");

  function changeLine(data, location) {
    d3.select(".totalline").remove()
    data = data[location]
    console.log(data)
    var line = d3.svg.line()
      .interpolate("basis")
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return y(d.temperature);
      });

    var svg = d3.select("#faunatotal_linechart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("class", "totalline");

    //var data = d3.tsv.parse(myData);
    console.log("komtie")
    console.log(locationdata)

    color.domain(d3.keys(data[0]).filter(function(key) {
      return key !== "date";
    }));

    console.log("hoi")

    data.forEach(function(d) {
      d.date = d.date;
    });

    var cities = color.domain().map(function(name) {
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

    x.domain(d3.extent(data, function(d) {
      return d.date;
    }));

    y.domain([
      d3.min(cities, function(c) {
        return d3.min(c.values, function(v) {
          return v.temperature;
        });
      }),
      d3.max(cities, function(c) {
        return d3.max(c.values, function(v) {
          return v.temperature;
        });
      })
    ]);


    var legend = svg.selectAll('g')
      .data(cities)
      .enter()
      .append('g')
      .attr('class', 'legend');

    legend.append('rect')
      .attr('x', width - 20)
      .attr('y', function(d, i) {
        return i * 20;
      })
      .attr('width', 10)
      .attr('height', 10)
      .style('fill', function(d) {
        return color(d.name);
      });

    legend.append('text')
      .attr('x', width - 8)
      .attr('y', function(d, i) {
        return (i * 20) + 9;
      })
      .text(function(d) {
        return d.name;
      });

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Index 1990");

    var city = svg.selectAll(".city")
      .data(cities)
      .enter().append("g")
      .attr("class", "city");

    city.append("path")
      .attr("class", "line")
      .attr("d", function(d) {
        return line(d.values);
      })
      .style("stroke", function(d) {
        return color(d.name);
      });

    city.append("text")
      .datum(function(d) {
        return {
          name: d.name,
          value: d.values[d.values.length - 1]
        };
      })
      .attr("transform", function(d) {
        return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")";
      })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) {
        return d.name;
      });

    var mouseG = svg.append("g")
      .attr("class", "mouse-over-effects");

    mouseG.append("path") // this is the black vertical line to follow mouse
      .attr("class", "mouse-line")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", "0");

    var lines = document.getElementsByClassName('line');

    var mousePerLine = mouseG.selectAll('.mouse-per-line')
      .data(cities)
      .enter()
      .append("g")
      .attr("class", "mouse-per-line");

    mousePerLine.append("circle")
      .attr("r", 7)
      .style("stroke", function(d) {
        return color(d.name);
      })
      .style("fill", "none")
      .style("stroke-width", "1px")
      .style("opacity", "0");

    mousePerLine.append("text")
      .attr("transform", "translate(10,3)");

    mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
      .attr('width', width) // can't catch mouse events on a g element
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mouseout', function() { // on mouse out hide line, circles and text
        d3.select(".mouse-line")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "0");
      })
      .on('mouseover', function() { // on mouse in show line, circles and text
        d3.select(".mouse-line")
          .style("opacity", "1");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "1");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "1");
      })
      .on('mousemove', function() { // mouse moving over canvas
        var mouse = d3.mouse(this);
        d3.select(".mouse-line")
          .attr("d", function() {
            var d = "M" + mouse[0] + "," + height;
            d += " " + mouse[0] + "," + 0;
            return d;
          });

        d3.selectAll(".mouse-per-line")
          .attr("transform", function(d, i) {
            var xDate = x.invert(mouse[0]),
                bisect = d3.bisector(function(d) { return d.date; }).right;
                idx = bisect(d.values, xDate);

            var beginning = 0,
                end = lines[i].getTotalLength(),
                target = null;

            while (true){
              target = Math.floor((beginning + end) / 2);
              pos = lines[i].getPointAtLength(target);
              if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                  break;
              }
              if (pos.x > mouse[0])      end = target;
              else if (pos.x < mouse[0]) beginning = target;
              else break; //position found
            }

            d3.select(this).select('text')
              .text(y.invert(pos.y).toFixed(2));

            return "translate(" + mouse[0] + "," + pos.y +")";
          });
});

svg.append("text")
  .attr("x", 20)
  .attr("y", 0)
  .attr("dy", ".25em")
  .text("Overall fauna change in the " + location + " area")
  .attr("fill", "black")
  .style("font-size", 20)
  .style("font-family", "sans-serif")
}
changeLine(locationdata, "coastal")

  // Onchange event for selecting species triggers changeCircular()
  $("#select_location").change(function() {
    changeLine(locationdata, $("#select_location").val())
    console.log("gonna change circles")
  })



});
