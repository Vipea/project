Promise.all([d3v5.json("../data/all_locations.json"),
             d3v5.json("../data/allindividuals1.json"),
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

    //changeline(totaldata, "coastal")

    // Onchange event for selecting species triggers updateCircular()
    $("#select_location").change(function() {
      console.log("word dit ooit getriggerd?")
      updateLineHeight(totaldata, $("#select_location").val())
      updateCircular(speciesdata, $("#select_location").val(), $("#customRange1").val(), $("#select_species").val());
    })

    initializeBars(speciesdata, "coastal", "1991", "fish")
    //updateCircular(speciesdata, "coastal", "2004", "bodem")

    //updateCircular(speciesdata, "waddenzee", "1993", "bodem")


      /// deze twee in initialize
      // Onchange event for selecting species triggers updateCircular()
      $("#select_species").change(function() {
        updateCircular(speciesdata, $("#select_location").val(), $("#customRange1").val(), $("#select_species").val());
      });

      $("#select_location").change(function() {
        updateCircular(speciesdata, $("#select_location").val(), $("#customRange1").val(), $("#select_species").val());
      });

      d3v5.selectAll(".stackedbar").on("click", function(d) {
          console.log("in de stacked on click")
            updateBars(locationdata, d.x)
            updateCircular(speciesdata, $("#select_location").val(), d.x, $("#select_species").val());
            console.log("ja")
            $('html,body').animate({
              scrollTop: $("#text-change").offset().top},
              'slow');

              $("#customRange1").val(d.x)

              document.getElementById("showVal").innerHTML = d.x


          })



      changeBars(locationdata, "1991")



          let slider = document.getElementById("customRange1");
          let valshow = document.getElementById("showVal");
          document.getElementById("showVal").innerHTML = slider.value
          slider.oninput = function() {
            updateBars(locationdata, slider.value)
            updateCircular(speciesdata, $("#select_location").val(), slider.value, $("#select_species").val())
            document.getElementById("showVal").innerHTML = slider.value





          };

          console.log("klikie")
          d3v5.selectAll(".bar").on("click", function(d) {
            console.log("gonnascrell")
            updateLineHeight(totaldata, d.location)
            updateCircular(speciesdata, d.location, $("#customRange1").val(), $("#select_species").val())
            $('html,body').animate({
              scrollTop: $("#text-total").offset().top},
              'slow');
            // $("total-location").html("This line chart shows the overall fauna change since 1990 in the " + d.location + " area").show()

            //document.querySelector("#total-location).innerHTML = "jee"
            $("#total-location").html(d.location)
            $("#individualslocation").html(d.location)
            console.log(d.location)
          })

          console.log("klikie")
          d3v5.select("#faunachange_relativebars").selectAll(".tick").on("click", function(d) {
            console.log(d)
            console.log("gonnascrell")
            updateLineHeight(totaldata, d)
            updateCircular(speciesdata, d, $("#customRange1").val(), $("#select_species").val())
            $('html,body').animate({
              scrollTop: $("#text-total").offset().top},
              'slow');
            // $("total-location").html("This line chart shows the overall fauna change since 1990 in the " + d.location + " area").show()

            //document.querySelector("#total-location).innerHTML = "jee"
            $("#total-location").html(d)
            $("#individualslocation").html(d)
          })



          d3v5.selectAll(".overall_label")
          .on("click", function(d) {
            console.log(d.location)

            updateLineHeight(totaldata, d.location)
            updateCircular(speciesdata, d.location, $("#customRange1").val(), $("#select_species").val())
            $('html,body').animate({
              scrollTop: $("#text-total").offset().top},
              'slow');
            // $("total-location").html("This line chart shows the overall fauna change since 1990 in the " + d.location + " area").show()

            //document.querySelector("#total-location).innerHTML = "jee"
            $("#total-location").html(d.location)
            $("#individualslocation").html(d.location)
            console.log(d.location)
          })

          console.log("icon")
        $("#birdicon").click(function() {
          updateCircular(speciesdata, $("#select_location").val(), $("#customRange1").val(), "bird")
          $('html,body').animate({
            scrollTop: $("#text-circular").offset().top},
            'slow');
            $("#select_species").val("bird")
        })

        $("#fishicon").click(function() {
          updateCircular(speciesdata, $("#select_location").val(), $("#customRange1").val(), "fish")
          $('html,body').animate({
            scrollTop: $("#text-circular").offset().top},
            'slow');
            $("#select_species").val("fish")
        })

        $("#benthicicon").click(function() {
          updateCircular(speciesdata, $("#select_location").val(), $("#customRange1").val(), "bodem")
          $('html,body').animate({
            scrollTop: $("#text-circular").offset().top},
            'slow');
            $("#select_species").val("bodem")
        })



  },
  function error(e) {
    throw e;
  }
)
