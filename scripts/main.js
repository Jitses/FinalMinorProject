  /*
  * Jitse Schol
  * Programmeerproject
  * Student Number: 10781463
  * 5-5-2018
  */

// Datum van de timeline wordt gereturned. Vervolgens loopen over alle landen. Kijken of de Datum
// van de bevrijding is geweest, vervolgens de surrender, vervolgens de invasion. Het land wordt dan gekleurd op de juiste manier.
// data kunnen makkelijk vergeken worden als ik 0-84 gebruik (er zijn 84 maanden van 1939-1945) als data.


// http://datamaps.github.io/
window.onload = function(){
    var map = new Datamap({
    element: document.getElementById('containerMap'),
    projection: 'mercator',
    fills: {
      defaultFill: "#f7f7f7"
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
          var range_max_y = 10;

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
            .orient("left");

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
            .call(yAxis)

            // All done
            return 0;
          }


        else{
          index = index + 1;
        }
      }
      document.getElementById('containerBarChart').innerHTML = "No data for the country";
    });
    }

// Source: My Data processing week 5 repository
// Updates colors, used in the different color themes
  function color_updater(colorinput, country){
    var countries = Datamap.prototype.worldTopo.objects.world.geometries;

    for (var j = 0; j < countries.length; j++) {

      var countryName = countries[j].properties.name

      // If country was found
      if (countryName == country)
      {
        countryID = countries[j].id
        // https://stackoverflow.com/questions/40423615/dynamically-updating-datamaps-fill-color-not-working-using-variable-as-country-k
        var color = colorinput
        var country_color = {};
        country_color[countryID] = color
      }


      // https://github.com/markmarkoh/datamaps/releases/tag/v0.2.2
      map.updateChoropleth(country_color);
      }
  }

  // Retrieved from http://learnjsdata.com/read_data.html
  // Datasets used:
  // http://www.historyplace.com/worldwar2/timeline/ww2time.htm
  // https://en.wikipedia.org/wiki/World_War_II_by_country */
  d3.json("https://raw.githubusercontent.com/Jitses/FinalMinorProject/master/data/occupation.json", function(dataset) {

    buttonPlay = document.getElementsByClassName('btn.play')

    // https://stackoverflow.com/questions/37187504/javascript-second-counter
    var month = 0;
    // Runs from month 1 until 84
    var monthDataCounter = 0;
    // Initial year
    var year = 1939;

    var counter = document.getElementById('counter');

    function incrementSeconds() {
      if (counter.innerText == "12-1945"){
        clearInterval(startTimeframe);
      }
      if (month == 12){
        month = 1
        year += 1
        counter.innerText = month + "-" + year;
      }
      else{
        month += 1
        counter.innerText = month + "-" + year;
      }
      monthDataCounter += 1

      for (i = 0; i < dataset.data.length; i++){
        // At start of war, set default allied colour for all countries
        if (monthDataCounter < 1){
            color_update("#0571b0", dataset.data[i]['Country'])
        }
        else if (dataset.data[i]['Neutral'] == "True"){
            color_updater("#92c5de", dataset.data[i]['Country'])
        }
        else if (dataset.data[i]['Allied Control Date'] <= monthDataCounter && dataset.data[i]['Allied Control Date'] != ""){

            color_updater("#0571b0", dataset.data[i]['Country'])
        }
        else if (dataset.data[i]['Surrender Date'] <= monthDataCounter && dataset.data[i]['Surrender Date'] != ""){
            color_updater("#ca0020", dataset.data[i]['Country'])

        }
        else if (dataset.data[i]['Invasion Date'] <= monthDataCounter && dataset.data[i]['Invasion Date'] != ""){
            color_updater("#f4a582", dataset.data[i]['Country'])
        }
        else{
            color_updater("#f7f7f7", dataset.data[i]['Country'])
        }
      }
    }

    // https://codepen.io/MarioDesigns/pen/ENevMJ
    // On click button, changes class button from play to pause and the reverse
    $('body').on('click', '.btn', function(e)   {
  	e.preventDefault();
  	if ( $(this).hasClass('play') ) {
      timeFrame = setInterval(incrementSeconds, 1000);
  		$(this).removeClass('play');
  		$(this).addClass('pause');
  	} else {
      // https://stackoverflow.com/questions/109086/stop-setinterval-call-in-javascript
      clearInterval(timeFrame);
  		$(this).removeClass('pause');
  		$(this).addClass('play');
  	}
    });

  });

  // https://stackoverflow.com/questions/2659354/jquery-scroll-down-page-a-set-increment-in-pixels-on-click
  // Current position on page
    $(".fa.fa-chevron-circle-down").click(function(event){
        $('html, body').animate({scrollTop: '+=1000px'}, 800);
    });


    // Sources used for battles data
    // https://www.thoughtco.com/world-war-ii-battles-2361453
    // https://en.wikipedia.org/wiki/Battle_of_Dunkirk
    // https://en.wikipedia.org/wiki/Battle_of_Greece
    // https://bl.ocks.org/mbostock/4348373
    // https://en.wikipedia.org/wiki/Siege_of_Leningrad
    // https://en.wikipedia.org/wiki/Third_Battle_of_Kharkov
    // https://en.wikipedia.org/wiki/Warsaw_Ghetto_Uprising
    // https://en.wikipedia.org/wiki/Operation_Chastise
    // https://en.wikipedia.org/wiki/Schweinfurt%E2%80%93Regensburg_mission
    // https://en.wikipedia.org/wiki/Battle_of_Monte_Cassino
    // https://en.wikipedia.org/wiki/Battle_for_Caen
    // https://en.wikipedia.org/wiki/Operation_Cobra
    // https://en.wikipedia.org/wiki/Falaise_Pocket
    // https://en.wikipedia.org/wiki/Operation_Market_Garden
    // https://en.wikipedia.org/wiki/Battle_of_Remagen
    // https://en.wikipedia.org/wiki/Operation_Varsity


    // https://bl.ocks.org/mbostock/4348373
    function CreateSunBurst(){
      var widthSunBurst = 960,
      heightSunBurst = 700,
      radiusSunBurst = (Math.min(widthSunBurst, heightSunBurst) / 2) - 10;

      var formatNumber = d3.format(",d");

      var x = d3.scale.linear()
          .range([0, 2 * Math.PI]);

      var y = d3.scale.sqrt()
          .range([0, radiusSunBurst]);

      var color = d3.scale.category20c();

      var partition = d3.layout.partition()
          .value(function(d) { return d.size; });

      var arc = d3.svg.arc()
          .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
          .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
          .innerRadius(function(d) { return Math.max(0, y(d.y)); })
          .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

      var svg = d3.select("body").append("svg")
          .attr("width", widthSunBurst)
          .attr("height", heightSunBurst)
        .append("g")
          .attr("transform", "translate(" + widthSunBurst / 2 + "," + (heightSunBurst / 2) + ")");

      d3.json("battles.json", function(error, root) {
        if (error) throw error;

        svg.selectAll("path")
            .data(partition.nodes(root))
          .enter().append("path")
            .attr("d", arc)
            .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
            .on("click", click)
          .append("title")
            .text(function(d) { return d.name + "\n" + formatNumber(d.value); });
      });

      function click(d) {
        svg.transition()
            .duration(750)
            .tween("scale", function() {
              var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
                  yd = d3.interpolate(y.domain(), [d.y, 1]),
                  yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radiusSunBurst]);
              return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
            })
          .selectAll("path")
            .attrTween("d", function(d) { return function() { return arc(d); }; });
      }

      d3.select(self.frameElement).style("height", heightSunBurst + "px");
    }
CreateSunBurst()





}
