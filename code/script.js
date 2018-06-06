  /*
  * Jitse Schol
  * Programmeerproject
  * Student Number: 10781463
  * 5-5-2018
  */
  // http://datamaps.github.io/
  window.onload = function(){
  //     var map = new Datamap({
  //     element: document.getElementById('containerMap'),
  //     scope: 'world',
  //
  //     // http://datamaps.github.io/#scopes
  //     setProjection: function(element) {
  //     var projection = d3.geo.equirectangular()
  //     .center([20, 51])
  //     .rotate([4.4, 0])
  //     .scale(600)
  //     .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
  //     var path = d3.geo.path()
  //     .projection(projection);
  //
  //     return {path: path, projection: projection};
  //     }
  //     });

      // Some of the code of the barchart was retrieved from my own Data Processing repository
      // and from  https://www.digitalocean.com/community/tutorials/getting-started-with-data-visualization-using-javascript-and-the-d3-library

      // Append title
      d3.select("head").append("title").text("Casualties");

      // Retrieved from http://learnjsdata.com/read_data.html
      d3.json("https://raw.githubusercontent.com/Jitses/FinalMinorProject/master/data/wikiCasualties.json", function(dataset) {


      // Initialize empty array
      countryData = []

      var militaryDeathsAllCauses = dataset['data'][1]['Military deaths from all causes']
      var civilianDeaths = dataset['data'][1]['Civilian deaths due to military activity and crimes against humanity']
      var militaryWounded = dataset['data'][1]['Military wounded']
      var totalDeaths = dataset['data'][1]['Total Deaths']
      console.log(countryData)
      // Push variables to countryData array
      countryData.push(militaryDeathsAllCauses, civilianDeaths, militaryWounded, totalDeaths)

      // Create SVG element, retrieved from http://alignedleft.com/tutorials/d3/making-a-bar-chart
      var svg = d3.select("body")
        .append("svg")

        // Set width svg
        .attr("width", "40%")

        // Set height svg
        .attr("height", 1000);


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

              // Set ranges
              var range_min_x = 75;
              var range_max_x = 800;
              var range_min_y = 500;
              var range_max_y = 100;

              // create x scale using x domain and x range
              var xScale = d3.scale.linear()
                .domain([domain_min_x, domain_max_x])
                .range([range_min_x, range_max_x]);



              // create y scale using y domain and y range
              var yScale = d3.scale.linear()
                .domain([domain_min_y, domain_max_y])
                .range([range_min_y, range_max_y]);

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
            return ((range_min_y - range_max_y) * domain_max_y / d)
          }
        })

        .attr("width", "40")
        .attr("x", function(d, i) {
          return ((i * 60) + 100)
        })

        .attr("y", function(d, i) {
            if (d == "No data"){
              return(0)
            }
            else {
              return yScale(d)
            }

        });

      // create y axis
      var yAxis = d3.svg.axis()

        // use y scale
        .scale(yScale)

        // set orient
        .orient("left")

        // set ticks
        .ticks(5);

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
        .attr("transform", "translate(0, " + (500) + ")")

        // call x axis
        .call(xAxis);

        // append y axis
        svg.append("g")

        // use axis class
        .attr("class", "axis")

        // transform y axis
        .attr("transform", "translate(" + 80 +", 0)")

        // call y axis
        .call(yAxis);

        });
  };
