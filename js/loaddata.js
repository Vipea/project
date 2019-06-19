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
        changeCircular(speciesdata, $("#select_location").val(), $("#customRange1").val(), $("#select_species").val());
      });

      d3.selectAll(".stackedbar").on("click", function(d) {
          console.log("in de stacked on click")
            updateBars(locationdata, d.x)
            changeCircular(speciesdata, $("#select_location").val(), d.x, $("#select_species").val());
            console.log("ja")
            $('html,body').animate({
              scrollTop: $("#text-change").offset().top},
              'slow');

              d3.selectAll(".bar").on("click", function(d) {
                console.log("gonnascrell")
                changeLine(totaldata, d.location)
                changeCircular(speciesdata, d.location, $("#customRange1").val(), $("#select_species").val())
                $('html,body').animate({
                  scrollTop: $("#text-total").offset().top},
                  'slow');
                // $("total-location").html("This line chart shows the overall fauna change since 1990 in the " + d.location + " area").show()

                //document.querySelector("#total-location).innerHTML = "jee"
                $("#total-location").html(d.location)
                console.log(d.location)
              })
          })

      changeBars(locationdata, "1991")

      updateBars(locationdata, "1994")



          let slider = document.getElementById("customRange1");
          let valshow = document.getElementById("showVal");
          document.getElementById("showVal").innerHTML = slider.value
          slider.oninput = function() {
            updateBars(locationdata, slider.value)
            changeCircular(speciesdata, $("#select_location").val(), slider.value, $("#select_species").val())
            document.getElementById("showVal").innerHTML = slider.value

            d3.selectAll(".bar").on("click", function(d) {
              console.log("gonnascrell")
              changeLine(totaldata, d.location)
              changeCircular(speciesdata, d.location, $("#customRange1").val(), $("#select_species").val())
              $('html,body').animate({
                scrollTop: $("#text-total").offset().top},
                'slow');
              // $("total-location").html("This line chart shows the overall fauna change since 1990 in the " + d.location + " area").show()

              //document.querySelector("#total-location).innerHTML = "jee"
              $("#total-location").html(d.location)
              console.log(d.location)
            })



          };

          console.log("icon")
        $("#birdicon").click(function() {
          changeCircular(speciesdata, $("#select_location").val(), $("#customRange1").val(), "bird")
          $('html,body').animate({
            scrollTop: $("#text-circular").offset().top},
            'slow');
        })

        $("#fishicon").click(function() {
          changeCircular(speciesdata, $("#select_location").val(), $("#customRange1").val(), "fish")
          $('html,body').animate({
            scrollTop: $("#text-circular").offset().top},
            'slow');
        })

        $("#benthicicon").click(function() {
          changeCircular(speciesdata, $("#select_location").val(), $("#customRange1").val(), "bodem")
          $('html,body').animate({
            scrollTop: $("#text-circular").offset().top},
            'slow');
        })



  },
  function error(e) {
    throw e;
  }
)
