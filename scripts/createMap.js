function createMap(){

    // Initialize new map
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

      })
    }
  });
  return map
}
