// Source: My Data processing week 5 repository
// Updates colors, used in the different color themes
  function color_updater(colorinput, country, map){
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
