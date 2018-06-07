  /*
  * Jitse Schol
  * Programmeerproject
  * Student Number: 10781463
  * 5-5-2018
  */
  // http://datamaps.github.io/
  window.onload = function(){
      var map = new Datamap({
      element: document.getElementById('containerMap'),
      projection: 'mercator',
      fills: {
        defaultFill: "#e34a33"
      },
      scope: 'world',

      // http://datamaps.github.io/#scopes
      setProjection: function(element) {
      var projection = d3.geo.equirectangular()
      .center([20, 51])
      .rotate([4.4, 0])
      .scale(600)
      .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
      var path = d3.geo.path()
      .projection(projection);

      return {path: path, projection: projection};
      }
      });

      // Source: My Data processing week 5 repository
      // updates colors, used in the different color themes
      function color_updater(colorinput){
        var countries = Datamap.prototype.worldTopo.objects.world.geometries;

        for (var j = 0; j < countries.length; j++) {

          var country_code = countries[j].id

          // https://stackoverflow.com/questions/40423615/dynamically-updating-datamaps-fill-color-not-working-using-variable-as-country-k
          var color = colorinput
          var country_color = {};
          country_color[country_code] = color

          // https://github.com/markmarkoh/datamaps/releases/tag/v0.2.2
          map.updateChoropleth(country_color);
          }
        }


      // Some of the code of the barchart was retrieved from my own Data Processing repository
      // and from  https://www.digitalocean.com/community/tutorials/getting-started-with-data-visualization-using-javascript-and-the-d3-library

      // Append title
      d3.select("head").append("title").text("Casualties");

      // Retrieved from http://learnjsdata.com/read_data.html
      d3.json("https://raw.githubusercontent.com/Jitses/FinalMinorProject/master/data/wikiCasualties.json", function(dataset) {

      // Initialize empty array
      countryData = []

      var militaryDeathsAllCauses = dataset['data'][5]['Military deaths from all causes']
      var civilianDeaths = dataset['data'][5]['Civilian deaths due to military activity and crimes against humanity']
      var militaryWounded = dataset['data'][5]['Military wounded']
      var totalDeaths = dataset['data'][5]['Total Deaths']
      console.log(countryData)
      // Push variables to countryData array
      countryData.push(militaryDeathsAllCauses, civilianDeaths, militaryWounded, totalDeaths)



      // Source used for bar chart basis: http://bl.ocks.org/d3noob/8952219
      // SVG dimensions bar chart
      var marginBarChart = {top: 20, right: 40, left: 40, bottom: 20}
      var heightBarChart = 500 - marginBarChart.top - marginBarChart.bottom
      var widthBarChart = 550 - marginBarChart.left - marginBarChart.right

      // Create SVG element, retrieved from http://alignedleft.com/tutorials/d3/making-a-bar-chart
      var svg = d3.select("#containerBarChart")
        .append("svg")

        // Set width svg
        .attr("width", widthBarChart + marginBarChart.left + marginBarChart.right)

        // Set height svg
        .attr("height", heightBarChart + marginBarChart.top + marginBarChart.bottom)


              var domain_min_x = 0;

              // 5 data points
              var domain_max_x = 5;

              var domain_min_y = 0;

              // Initiate max domain of y at 0
              var domain_max_y = 0

              // Calculates max y domain
              for (i = 0; i < countryData.length; i++){
                if (countryData[i] == "No data"){
                  domain_max_y = domain_max_y
                }

                else if (Number(countryData[i]) > domain_max_y){
                  // Set new y domain max
                  domain_max_y= Number(countryData[i])
                }
              }
              console.log(domain_max_y)

              // Set ranges
              var range_min_x = 75;
              var range_max_x = 800;
              var range_min_y = 400;
              var range_max_y = 100;

              // create x scale using x domain and x range
              var xScale = d3.scale.linear()
                .domain([domain_min_x, domain_max_x])
                .range([range_min_x, range_max_x]);

              // create y scale using y domain and y range

              var yScale = d3.scale.linear()
                .domain([domain_min_y, domain_max_y])
                .range([heightBarChart, 0]);

      // Select all rectangles
      svg.selectAll("rect")

        // use dataset
        .data(countryData)
        .enter()

        // append rectangle
        .append("rect")

        // https://www.digitalocean.com/community/tutorials/getting-started-with-data-visualization-using-javascript-and-the-d3-library
        .attr("height", function(d, i) {
          if (d == "No data"){
            return(0)
          }
          else {

            return (heightBarChart - yScale(d))
          }
        })

        .attr("width", "60")
        .attr("x", function(d, i) {
          return ((i * 100) + 100)
        })

        .attr("y", function(d, i) {
            if (d == "No data"){
              return(range_min_y)
            }
            else {
              return (yScale(d))
            }
        });

      // create y axis
      var yAxis = d3.svg.axis()

        // use y scale
        .scale(yScale)

        // set orient
        .orient("left")

        // // set ticks
        // .ticks(4);

      // create x axis
      var xAxis = d3.svg.axis()

        // use x scale
        .scale(xScale)

        // set orient
        .orient("bottom")

        // append x axis
        svg.append("g")

        // use axis_x class
        .attr("class", "axis_x")

        // transform x axis
        .attr("transform", "translate(0, " + heightBarChart + ")")

        // call x axis
        .call(xAxis);

        // append y axis
        svg.append("g")

        // use axis class
        .attr("class", "axis")

        // transform y axis
        .attr("transform", "translate(" + 75 +", 0)")

        // call y axis
        .call(yAxis);

        });

//https://bl.ocks.org/Lulkafe/3832d628340038d9484fbd9edb705e01
function simpleSlider () {

    var width = 100,
        value = 0.5, /* Domain assumes to be [0 - 1] */
        event,
        x = 0,
        y = 0;

    function slider (selection) {

        //Line to represent the current value
        var valueLine = selection.append("line")
            .attr("x1", x)
            .attr("x2", x + (width * value))
            .attr("y1", y)
            .attr("y2", y)
            .style({stroke: "#51CB3F",
                    "stroke-linecap": "round",
                    "stroke-width": 6 });

        //Line to show the remaining value
        var emptyLine = selection.append("line")
            .attr("x1", x + (width * value))
            .attr("x2", x + width)
            .attr("y1", y)
            .attr("y2", y)
            .style({
                "stroke": "#ECECEC",
                "stroke-linecap": "round",
                "stroke-width": 6
            });

        var drag = d3.behavior.drag().on("drag", function() {
            var newX = d3.mouse(this)[0];

            if (newX < x)
                newX = x;
            else if (newX > x + width)
                newX = x + width;

            value = (newX - x) / width;
            valueCircle.attr("cx", newX);
            valueLine.attr("x2", x + (width * value));
            emptyLine.attr("x1", x + (width * value));

            if (event)
                event();

            d3.event.sourceEvent.stopPropagation();
        })

        //Draggable circle to represent the current value
        var valueCircle = selection.append("circle")
            .attr("cx", x + (width * value))
            .attr("cy", y)
            .attr("r", 8)
            .style({
                "stroke": "black",
                "stroke-width": 1.0,
                "fill": "white"
            })
            .call(drag);
    }


    slider.x = function (val) {
        x = val;
        return slider;
    }

    slider.y = function (val) {
        y = val;
        return slider;
    }

    slider.value = function (val) {
        if (val) {
            value = val;
            return slider;
        } else {
            return value;
        }
    }

    slider.width = function (val) {
        width = val;
        return slider;
    }

    slider.event = function (val) {
        event = val;
        return slider;
    }

    return slider;
}
  var svg = d3.select("#slider").append("svg").attr("width", 1000).attr("height", 700).attr("position", "relative").attr("left", 1000),
          slider = new simpleSlider();

      slider.width(200).x(30).y(200).value(1.0).event(function(){

          // Slider value is between 0 and 1
          if (slider.value() > 0.5){
              color_updater("orange")
          }
          else {
            color_updater("blue")
          }
      });

      svg.call(slider);
};
