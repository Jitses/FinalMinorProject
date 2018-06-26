/*
 * Jitse Schol
 * Student Number: 10781463
 * Programmeerproject
 * 28-6-2018
 *
 * Source: My Data processing week 5 repository
 * Updates colors of map countries
 *
 * Some country IDs of the datamaps.world.min.js were -99. For instance Cyprus and Kosovo.
 * This caused problems when colouring the map dynamically. Therefore the -99s were changed to a country
 * id that fit in the data (did not collide with another variable name). Cyprus ID was for instance changed to CYP.
 * Furthermore, some countries in the second world war were named differently then now.
 * Therefore some changes in names were made:
 * Changed Czech Republic and Slovakia into Czechslovakia.
 * Changed Bosnia Herzegovina, Croatia, Kosovo, Macedonia, Serbia and Slovenia to Yugoslavia.
 * Changed Russia, Ukraine and Belarus, Moldova to Soviet Union.
 */
function colorUpdater(colorinput, country, map){
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
