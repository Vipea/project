Promise.all([d3v5.json("../data/all_locations.json"),
             d3v5.json("../data/allindividuals.json"),
             d3v5.json("../data/new_totals.json"),
             d3v5.json("../data/fishingmethods.json"),])
  .then(
  function success(allData) {
    console.log(allData)
    const locationdata = allData[0],
          speciesdata = allData[1],
          totaldata = allData[2],
          fishingdata = allData[3];

    initializeMethods(fishingdata)

    changeLine(totaldata, "coastal")

    // Onchange event for selecting species triggers changeCircular()
    $("#select_location").change(function() {
      changeLine(totaldata, $("#select_location").val())
      changeCircular(speciesdata, $("#select_location").val(), $("#customRange1").val(), $("#select_species").val());
    })

    initializeBars(speciesdata, "waddenzee", "1993", "fish")

      /// deze twee in initialize
      // Onchange event for selecting species triggers changeCircular()
      $("#select_species").change(function() {
        changeCircular(speciesdata, $("#select_location").val(), $("#customRange1").val(), $("#select_species").val());
      });

      $("#select_location").change(function() {
        changeCircular(datacopy, $("#select_location").val(), $("#customRange1").val(), $("#select_species").val());
      });

      d3.selectAll(".stackedbar").on("click", function(d) {
            changeBars(locationdata, d.x)
            changeCircular(speciesdata, $("#select_location").val(), d.x, $("#select_species").val());
          })

      changeBars(locationdata, "1991")

      d3.selectAll(".bar").on("click", function(d) {
        changeLine(totaldata, d.location)
        changeCircular(speciesdata, d.location, $("#customRange1").val(), $("#select_species").val())
      })

      d3.selectAll(".stackedbar").on("click", function(d) {
            changeBars(locationdata, d.x)
            changeCircular(speciesdata, $("#select_location").val(), d.x, $("#select_species").val());

            d3.selectAll(".bar").on("click", function(d) {
              changeLine(totaldata, d.location)
              changeCircular(speciesdata, d.location, $("#customRange1").val(), $("#select_species").val())
            })
          })

          let slider = document.getElementById("customRange1");
          let valshow = document.getElementById("showVal");
          document.getElementById("showVal").innerHTML = slider.value
          slider.oninput = function() {
            changeBars(locationdata, slider.value)
            changeCircular(speciesdata, $("#select_location").val(), slider.value, $("#select_species").val())
            document.getElementById("showVal").innerHTML = slider.value

            d3.selectAll(".bar").on("click", function(d) {
              changeLine(totaldata, d.location)
              changeCircular(speciesdata, d.location, $("#customRange1").val(), $("#select_species").val())
            })
          };





  },
  function error(e) {
    throw e;
  }
)
