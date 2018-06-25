function scroller(){

// https://stackoverflow.com/questions/2659354/jquery-scroll-down-page-a-set-increment-in-pixels-on-click
// Current position on page
  $(".fa.fa-chevron-circle-down").click(function(event){
      $('html, body').animate({scrollTop: '+=1000px'}, 800);
  });
}
