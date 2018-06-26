/*
 * Jitse Schol
 * Student Number: 10781463
 * Programmeerproject
 * 28-6-2018
 *
 * Main function that creates the web page by calling multiple functions
 */
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
