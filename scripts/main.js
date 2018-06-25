  /*
  * Jitse Schol
  * Programmeerproject
  * Student Number: 10781463
  * 5-5-2018
  */

// http://datamaps.github.io/
window.onload = function(){

  // Make a map
  var map = createMap()

  // Call interval function, so the user can click the play/pause button
  interval(map);

  // Call scroller function, so the user can click the scroll button
  scroller()

  // Create sunburst
  createSunBurst()
}
