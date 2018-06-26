/*
 * Jitse Schol
 * Student Number: 10781463
 * Programmeerproject
 * 28-6-2018
 *
 * Scrolls down page when user clicks scroll button
 */
function scroller(){

  // https://stackoverflow.com/questions/2659354/jquery-scroll-down-page-a-set-increment-in-pixels-on-click
  $(".fa.fa-chevron-circle-down").click(function(event){
      $('html, body').animate({scrollTop: '+=1000px'}, 800);
  });
}
