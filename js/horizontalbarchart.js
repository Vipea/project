console.log(d3v4.version)
console.log(d3.version)


//* HORIZONTAL BARS *//*********************************************************
var json_data = $.getJSON("../data/all_locations.json", function(data) {
  var data = data;
  var locationdata = data;
  console.log(locationdata)
  var initializedata = data["1990"]
  console.log(data)

  d3.selectAll(".stackedbar").on("click", function(d) {
        changeBars(locationdata, d.x)
        changeCircular(datacopy, $("#select_location").val(), d.x, $("#select_species").val());
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
    .on('click', function(d){
      console.log(d.location)
      changeLine(linedata, d.location)
      changeCircular(datacopy, d.location, slider.value, $("#select_species").val())
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
      slider.onchange = function() {
        changeBars(locationdata, slider.value)
        changeCircular(datacopy, $("#select_location").val(), slider.value, $("#select_species").val())
      };

});
