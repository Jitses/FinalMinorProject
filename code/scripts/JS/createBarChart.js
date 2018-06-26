/*
 * Jitse Schol
 * Student Number: 10781463
 * Programmeerproject
 * 28-6-2018
 *
 * This function creates a bar chart of the respective country, showing military wounded,
 * military deaths, civilian deaths and total deaths in that country.
 * Some of the code of the barchart was retrieved from my own Data Processing repository
 * and some from https://www.digitalocean.com/community/tutorials/getting-started-with-data-visualization-using-javascript-and-the-d3-library
 * Dataset used for bar chart wikicasualties https://en.wikipedia.org/wiki/World_War_II_casualties
 * which was organized and saved in the file wikiCasualties.json
 */
 function createBarChart(country){

  // Empty barchart container, https://stackoverflow.com/questions/3450593/how-do-i-clear-the-content-of-a-div-using-javascript
  document.getElementById('containerBarChart').innerHTML = "";

  // Display source bar chart, https://www.w3schools.com/js/js_htmldom_css.asp
  document.getElementById('sourceBarChart').style.display = "block";

  // Retrieved from http://learnjsdata.com/read_data.html
  d3.json("https://raw.githubusercontent.com/Jitses/FinalMinorProject/master/data/wikiCasualties.json", function(dataset){

    // Initialize empty array
    countryData = [];

    // Initiate index
    var index = 0;

    // Loop over casualties dataset
    for(i = 0; i < dataset.data.length; i++){

      // If the country that was given as argument in createBarChart is found
      if (dataset.data[i]['Country'] == country){
        var militaryWounded = dataset.data[index]['Military wounded']
        var militaryDeathsAllCauses = dataset.data[index]['Military deaths from all causes']
        var civilianDeaths = dataset.data[index]['Civilian deaths due to military activity and crimes against humanity']
        var totalDeaths = dataset.data[index]['Total Deaths'];


        // Push variables to countryData array
        countryData.push(militaryWounded, militaryDeathsAllCauses, civilianDeaths, totalDeaths);

        // Check for no data
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
        var domain_max_y = 0;

        // Calculates max y domain
        for (i = 0; i < countryData.length; i++){
          if (countryData[i] == "No data"){
            domain_max_y = domain_max_y;
          }

          else if (Number(countryData[i]) > domain_max_y){
            // Set new y domain max
            domain_max_y= Number(countryData[i]);
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
              return(0);
            }
            else {
              return (heightBarChart - yScale(d));
            }
          })

          .attr("width", "60")
          .attr("x", function(d, i) {
            return ((i * 110) + 100);
          })

          .attr("y", function(d, i) {
              if (d == "No data"){
                return(range_min_y);
              }
              else {
                return (yScale(d));
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

          // http://www.d3noob.org/2012/12/adding-axis-labels-to-d3js-graph.html
          svg.append("text")
            .attr("x", 120)
            .attr("y", 490)
            .style("text-anchor", "middle")
            .text("Military Wounded");

          svg.append("text")
            .attr("x", 240)
            .attr("y", 490)
            .style("text-anchor", "middle")
            .text("Military Deaths");

          svg.append("text")
            .attr("x", 350)
            .attr("y", 490)
            .style("text-anchor", "middle")
            .text("Civilian Deaths");

          svg.append("text")
          .attr("x", 460)
          .attr("y", 490)
          .style("text-anchor", "middle")
          .text("Total Deaths");

          // Append y axis
          svg.append("g")

          // Use axis class
          .attr("class", "axis")

          // Transform y axis
          .attr("transform", "translate(" + 75 +", 0)")

          // Call y axis
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
