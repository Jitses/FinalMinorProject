  /*
  * Jitse Schol
  * Programmeerproject
  * Student Number: 10781463
  * 5-5-2018
  */

// linken bar chart met map:
// check met d3 maps welk land er aan geklikt wordt.
// Vervolgens loopen over de dataset totdat je hetzelfde land tegenkomt
// Vervolgens de index opslaan van de loop en dat land van kleur veranderen

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
   },
    // https://bl.ocks.org/briwa/60024d70a5aee921d5910828fe8115be
    // Waits for click on map
    done: function(datamap) {
      datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {

          // Save country name of country clicked on
          var countryName = geography.properties.name;


          // Create bar chart of clicked country
          createBarChart(countryName)

      });
    }
  });
    // Source: My Data processing week 5 repository
    // Updates colors, used in the different color themes
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
    // Bar chart shows the casualties info of a single country
    function createBarChart(country){

      // https://stackoverflow.com/questions/3450593/how-do-i-clear-the-content-of-a-div-using-javascript
      // empty barchart container
      document.getElementById('containerBarChart').innerHTML = "";

      // Retrieved from http://learnjsdata.com/read_data.html
      d3.json("https://raw.githubusercontent.com/Jitses/FinalMinorProject/master/data/wikiCasualties.json", function(dataset) {

      // Initialize empty array
      countryData = []

      // Initiate index
      var index = 0

      // Loop over casualties dataset
      for(i = 0; i < dataset.data.length; i++){

        // If the country that was given as argument in createBarChart is found
        if (dataset.data[i]['Country'] == country){
          var militaryDeathsAllCauses = dataset.data[index]['Military deaths from all causes']
          var civilianDeaths = dataset.data[index]['Civilian deaths due to military activity and crimes against humanity']
          var militaryWounded = dataset.data[index]['Military wounded']
          var totalDeaths = dataset.data[index]['Total Deaths']



          // Push variables to countryData array
          countryData.push(militaryDeathsAllCauses, civilianDeaths, militaryWounded, totalDeaths)
          console.log(countryData)
          if (countryData[0] == "No data" && countryData[1] == "No data" && countryData[2] == "No data" && countryData[3] == "No data"){

            document.getElementById('containerBarChart').innerHTML = "No data for the country"

            // All done
            return 0;
          }

          // Source used for bar chart basis: http://bl.ocks.org/d3noob/8952219
          // SVG dimensions bar chart
          var marginBarChart = {top: 20, right: 40, left: 40, bottom: 20}
          var heightBarChart = 500 - marginBarChart.top - marginBarChart.bottom
          var widthBarChart = 550 - marginBarChart.left - marginBarChart.right

          // http://bl.ocks.org/Caged/6476579
          var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d, i) {
              return "<span style='color:red'>" + d + "</span>";
            })

          // Create SVG element, retrieved from http://alignedleft.com/tutorials/d3/making-a-bar-chart
          var svg = d3.select("#containerBarChart")
            .append("svg")

            // Set width svg
            .attr("width", widthBarChart + marginBarChart.left + marginBarChart.right)

            // Set height svg
            .attr("height", heightBarChart + marginBarChart.top + marginBarChart.bottom)

          // http://bl.ocks.org/Caged/6476579
          svg.call(tip);

          var domain_min_x = 0;

          // 5 data points
          var domain_max_x = countryData.length;

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

          // Set ranges
          var range_min_x = 75;
          var range_max_x = 800;
          var range_min_y = 400;
          var range_max_y = 100;

          // Create x scale using x domain and x range
          var xScale = d3.scale.linear()
            .domain([domain_min_x, domain_max_x])
            .range([range_min_x, range_max_x]);

          // Create y scale using y domain and y range

          var yScale = d3.scale.linear()
            .domain([domain_min_y, domain_max_y])
            .range([heightBarChart, 0]);

          // Select all rectangles
          svg.selectAll("rect")

            // Use dataset
            .data(countryData)
            .enter()

            // Append rectangle
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
            })
            // http://bl.ocks.org/Caged/6476579
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

          // Create y axis
          var yAxis = d3.svg.axis()

            // Use y scale
            .scale(yScale)

            // Set orient
            .orient("left")

          // Create x axis
          var xAxis = d3.svg.axis()

            // Use x scale
            .scale(xScale)

            // Set orient
            .orient("bottom")

            .ticks(0)

            // Append x axis
            svg.append("g")

            // Use axis_x class
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

            // All done
            return 0
          }


        else{
          index = index + 1
        }
      }
      document.getElementById('containerBarChart').innerHTML = "No data for the country";
    });
    }

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

        //  Draggable circle to represent the current value
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
  var svg = d3.select("#slider").append("svg").attr("width", 500).attr("height", 100),
      slider = new simpleSlider();

      // The war took 72 months. Therefore every month has a value of 1.0/72
      month = 1.0 / 72

      slider.width(400).x(20).y(10).value(1.0).event(function(){

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
