/*

Script that loads all the datasets and sets all event listeners

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

// Load all data
Promise.all([d3v5.json("./data/all_locations.json"),
    d3v5.json("./data/allindividuals2.json"),
    d3v5.json("./data/new_totals.json"),
    d3v5.json("./data/fishingmethods.json"),
  ])
  .then(
    function success(allData) {
      console.log(allData)
      const locationdata = allData[0],
        speciesdata = allData[1],
        totaldata = allData[2],
        fishingdata = allData[3];

      // Create stacked bar chart
      initializeMethods(fishingdata)

      // Create horizontal bar chart
      changeBars(locationdata, "1991")

      // Create line chart
      changeLine(totaldata, "coastal")

      // Create circular bar chart
      initializeBars(speciesdata, "coastal", "1991", "fish")

      // Onchange event for selecting species updates the circular bar chart
      $("#select_species").change(function() {
        updateCircular(speciesdata, $("#select_location").val(),
          $("#customRange1").val(), $("#select_species").val());
      });

      // Onchange event for selecting location updates the circular bar chart
      $("#select_location").change(function() {
        updateCircular(speciesdata, $("#select_location").val(),
          $("#customRange1").val(), $("#select_species").val());
      });


      // Onclick event updates horizontal and circular bars and the range input
      d3v5.selectAll(".stackedbar").on("click", function(d) {
        updateBars(locationdata, d.x);
        updateCircular(speciesdata, $("#select_location").val(), d.x,
          $("#select_species").val());

        $('html,body').animate({
            scrollTop: $("#text-change").offset().top
          },
          'slow');

        $("#customRange1").val(d.x);

        document.getElementById("showVal").innerHTML = d.x;
      });

      // Show the range input value
      const slider = document.getElementById("customRange1");
      document.getElementById("showVal").innerHTML = slider.value;

      // Oninput event of the slider updates horizontal and circular bars
      slider.oninput = function() {
        updateBars(locationdata, slider.value);
        updateCircular(speciesdata, $("#select_location").val(), slider.value,
          $("#select_species").val());
        document.getElementById("showVal").innerHTML = slider.value;
      };

      // Onclick of horizontal bars updates the line chart and circular bars
      d3v5.selectAll(".bar").on("click", function(d) {
        updateLineHeight(totaldata, d.location);
        updateCircular(speciesdata, d.location, $("#customRange1").val(),
          $("#select_species").val());
        $('html,body').animate({
            scrollTop: $("#text-total").offset().top
          },
          'slow');

        // Update chart titles to the new location
        $("#total-location").html(d)
        $("#individualslocation").html(d)
      })

      // Onclick of horizontal bar ticks updates line chart and circular bars
      d3v5.select("#faunachange_relativebars").selectAll(".tick").on("click",
        function(d) {
          updateLineHeight(totaldata, d);
          updateCircular(speciesdata, d, $("#customRange1").val(),
            $("#select_species").val());
          $('html,body').animate({
              scrollTop: $("#text-total").offset().top
            },
            'slow');

          // Update chart titles to the new location
          $("#total-location").html(d);
          $("#individualslocation").html(d);
        });

      // On click of horizontal bar labels updates line chart and circular bars
      d3v5.selectAll(".overall_label")
        .on("click", function(d) {
          updateLineHeight(totaldata, d.location);
          updateCircular(speciesdata, d.location, $("#customRange1").val(),
            $("#select_species").val());
          $('html,body').animate({
              scrollTop: $("#text-total").offset().top
            },
            'slow');

          // Update chart titles to the new location
          $("#total-location").html(d);
          $("#individualslocation").html(d);
        })

      // Onclick of the icons updates circular bar chart
      $("#birdicon").click(function() {
        updateCircular(speciesdata, $("#select_location").val(),
          $("#customRange1").val(), "bird");
        $('html,body').animate({
            scrollTop: $("#text-circular").offset().top
          },
          'slow');
        $("#select_species").val("bird");
      });

      // Onclick of the icons updates circular bar chart
      $("#fishicon").click(function() {
        updateCircular(speciesdata, $("#select_location").val(),
          $("#customRange1").val(), "fish");
        $('html,body').animate({
            scrollTop: $("#text-circular").offset().top
          },
          'slow');
        $("#select_species").val("fish");
      });

      // Onclick of the icons updates circular bar chart
      $("#benthicicon").click(function() {
        updateCircular(speciesdata, $("#select_location").val(),
          $("#customRange1").val(), "bodem");
        $('html,body').animate({
            scrollTop: $("#text-circular").offset().top
          },
          'slow');
        $("#select_species").val("bodem");
      });

    },
    function error(e) {
      throw e;
    });
