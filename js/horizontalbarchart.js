console.log(d3v4.version)
console.log(d3.version)

function changeBars(locationdata, year) {
  locationdata = locationdata[year]

  svg = d3.select("#faunachange_relativebars")
  svg.selectAll(".horizontal").remove()

  var margin = {
      top: 10,
      right: 25,
      bottom: 15,
      left: 60
  };
  var width = $("#faunachange").width() - margin.left - margin.right,
      height = $("#faunachange").height() - margin.top - margin.bottom;

  svg
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .attr("class", "horizontal")

  svg.selectAll(".horizontal").remove()
  svg.selectAll(".bar").remove()
  svg.selectAll(".overall_label").remove()
  svg.selectAll(".overall_title").remove()
  svg.select(".divide").remove()

  var x = d3.scale.linear()
      .range([0, 250])
      .domain([0, 20]);

  var y = d3.scale.ordinal()
      .rangeRoundBands([height, 0], .1)
      .domain(locationdata.map(function (d) {
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
    .data(locationdata)
    .enter()
    .append("g")

//append rects
bars.append("rect")
    .attr("class", "bar")
    .attr("y", function (d) {
        return y(d.location) + 20;
    })
    .attr("height", y.rangeBand())
    .attr("x", function (d) {
      if (d.value - 100 >= 0) {
        return 250
      }
      else {
        return 250 - x(100 - d.value)
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
        return 250 + x(Math.abs(100 - d.value)) + 10
      }
      else {
        return 250 - x(100 - d.value) - 25
      }
    })
    .text(function (d) {
        return d.value - 100 + "%";
    });

    svg.append("path")
                  .attr("d", " M 249 25 L 249 370 L 251 370 L 251 25 ")
    .attr("fill", "red")
    .attr("class", "divide")

    // Set legend title
    svg.append("text")
      .attr("x", 50)
      .attr("y", 15)
      .attr("dy", ".25em")
      .text("Fauna change relative to 1990 in the year " + year)
      .attr("fill", "black")
      .style("font-size", 20)
      .style("font-family", "sans-serif")
      .attr("class", "overall_title");
    }
