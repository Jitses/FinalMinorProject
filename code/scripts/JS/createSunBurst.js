/*
 * Jitse Schol
 * Student Number: 10781463
 * Programmeerproject
 * 28-6-2018
 *
 * Creates a sunburst containing battles data
 * https://bl.ocks.org/mbostock/4348373
 */
function createSunBurst(){

  // Dimensions of sunburst
  var widthSunBurst = 960,
  heightSunBurst = 700,
  radiusSunBurst = (Math.min(widthSunBurst, heightSunBurst) / 2) - 10;

  var formatNumber = d3.format(",d");

  var x = d3.scale.linear()
      .range([0, 2 * Math.PI]);

  var y = d3.scale.sqrt()
      .range([0, radiusSunBurst]);

  var color = d3.scale.category20c();

  // Divides the sunburst in multiple sections
  var partition = d3.layout.partition()
      .value(function(d) {return d.size;});

  // Calculates arc dimensions
  var arc = d3.svg.arc()
      .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
      .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
      .innerRadius(function(d) { return Math.max(0, y(d.y)); })
      .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

  // Append svg to sunburst container
  var svg = d3.select("#sunBurstContainer").append("svg")
      .attr("width", widthSunBurst)
      .attr("height", heightSunBurst)
      .append("g")
      .attr("transform", "translate(" + widthSunBurst / 2 + "," + (heightSunBurst / 2) + ")");

 /* Sources used for battles data
  * https://www.thoughtco.com/world-war-ii-battles-2361453
  * https://en.wikipedia.org/wiki/Battle_of_Dunkirk
  * https://en.wikipedia.org/wiki/Battle_of_Greece
  * https://bl.ocks.org/mbostock/4348373
  * https://en.wikipedia.org/wiki/Siege_of_Leningrad
  * https://en.wikipedia.org/wiki/Third_Battle_of_Kharkov
  * https://en.wikipedia.org/wiki/Warsaw_Ghetto_Uprising
  * https://en.wikipedia.org/wiki/Operation_Chastise
  * https://en.wikipedia.org/wiki/Schweinfurt%E2%80%93Regensburg_mission
  * https://en.wikipedia.org/wiki/Battle_of_Monte_Cassino
  * https://en.wikipedia.org/wiki/Battle_for_Caen
  * https://en.wikipedia.org/wiki/Operation_Cobra
  * https://en.wikipedia.org/wiki/Falaise_Pocket
  * https://en.wikipedia.org/wiki/Operation_Market_Garden
  * https://en.wikipedia.org/wiki/Battle_of_Remagen
  * https://en.wikipedia.org/wiki/Operation_Varsity
  */
  d3.json("https://raw.githubusercontent.com/Jitses/FinalMinorProject/master/data/battles.json", function(error, dataset) {
    if (error) throw error;

    svg.selectAll("path")
        .data(partition.nodes(dataset))
      .enter().append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
        .on("click", click)
        .append("title")
        .text(function(d) { return d.name + "\n" + formatNumber(d.value); });


    // Wait for click in dropdown menu
    $(".dropdown-item").click(function(event){
      country = ($(this).html())

      // https://stackoverflow.com/questions/13437446/how-to-display-selected-item-in-bootstrap-button-dropdown-title
      $(".btn.btn-secondary.dropdown-toggle:first-child").text($(this).text());
      $(".btn.btn-secondary.dropdown-toggle:first-child").val($(this).text());

      // Loop over dataset of battles, until clicked country is found
      for (i = 0; i < dataset.children.length; i++){
        if (dataset.children[i].name == country){
          var index = i
        }
      }
      // Call click function with right index of country
      // This opens the sunburst at the right country
      click(dataset.children[index])
    });
  });

  // Initiated when clicked on sunburst and when dropdown menu country is clicked
  function click(d){
    // https://stackoverflow.com/questions/13437446/how-to-display-selected-item-in-bootstrap-button-dropdown-title
    $(".btn.btn-secondary.dropdown-toggle:first-child").text(d.name);

    svg.transition()
        .duration(750)
        .tween("scale", function(){
          var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
              yd = d3.interpolate(y.domain(), [d.y, 1]),
              yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radiusSunBurst]
          );
          return function(t){x.domain(xd(t)); y.domain(yd(t)).range(yr(t));
          };
        })
      .selectAll("path")
        .attrTween("d", function(d) { return function() {return arc(d);};
      });
        $('html, body').animate({scrollTop: '+=1000px'}, 800);
  }

  d3.select(self.frameElement).style("height", heightSunBurst + "px");
};
