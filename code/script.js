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

      // Code barchart retrieved from my own Data Processing repository

      // append title
      d3.select("head").append("title").text("Casualties");

      // retrieved from http://learnjsdata.com/read_data.html
      d3.json("dataset", function(dataset) {

      // create SVG element, retrieved from http://alignedleft.com/tutorials/d3/making-a-bar-chart
      var svg = d3.select("body")
      .append("svg")

      // set width svg
      .attr("width", 1000)

      // set height svg
      .attr("height", 600);

      // select all rectangles
      svg.selectAll("rect")

      // use dataset
      .data(dataset['data'])
      .enter()

      // append rectangle
      .append("rect")
      .attr("x", function(d, i) {

      // set x position of bar chart
      return 80 + (i * 61);
      })
      .attr("y", function(d) {

      // set y position of bar chart
      return 500 - (d['GDP_current_prices'])/200;
      })

      // set width of bar to 60
      .attr("width", 60)

      // set height of bar
      .attr("height", function(d) {
      return (d['GDP_current_prices'])/200})

      /* retrieved from http://bl.ocks.org/Caged/6476579,
      * show tip when mouse hovers over element
      */
      .on('mouseover', tip.show)

      // hide tip when mouse moves out
      .on('mouseout', tip.hide)

      svg.selectAll("text")
      .data(dataset['data'])
      .enter()

      // append text
      .append("text")
      .text(function(d) {

      // write country name
      return d['Country'];
      })

      // set x position of text
      .attr("x", function(d, i) {

      // for short country names, f.e. UK
      if ((d['Country'].length) < 3){

      // position text
      return (i * 61) + 98;
      }

      // for longer country names
      else
      {

      // position text
      return (i * 61) + 85;
      }
      })

      // height of country name text
      .attr("y", function(d) {
      return 520;
      })

      // set domain and range for x and y
      var domain_min_x = 0;
      var domain_max_x = 12;
      var domain_min_y = 0;
      var domain_max_y = 80000
      var range_min_x = 80;
      var range_max_x = 811;
      var range_min_y = 500;
      var range_max_y = 101;

      // create x scale using x domain and x range
      var xScale = d3.scale.linear()
      .domain([domain_min_x, domain_max_x])
      .range([range_min_x, range_max_x]);

      // create y scale using y domain and y range
      var yScale = d3.scale.linear()
      .domain([domain_min_y, domain_max_y])
      .range([range_min_y, range_max_y]);

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
