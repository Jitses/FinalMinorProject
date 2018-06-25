function interval(map){

  // Retrieved from http://learnjsdata.com/read_data.html
  // Datasets used:
  // http://www.historyplace.com/worldwar2/timeline/ww2time.htm
  // https://en.wikipedia.org/wiki/World_War_II_by_country */
  d3.json("https://raw.githubusercontent.com/Jitses/FinalMinorProject/master/data/occupation.json", function(dataset) {

    buttonPlay = document.getElementsByClassName('button.play')

    // https://stackoverflow.com/questions/37187504/javascript-second-counter
    var month = 0;
    // Runs from month 1 until 84
    var monthDataCounter = 0;
    // Initial year
    var year = 1939;

    var counter = document.getElementById('counter');

    function incrementSeconds() {
      if (month == 12){
        if (counter.innerText == "12-1945"){

          clearInterval(timeframe);
          $('.button').removeClass('pause');
          $('.button').addClass('play');
        }
        else{
        month = 1
        year += 1
        counter.innerText = month + "-" + year;
      }
      }
      else{
        month += 1
        counter.innerText = month + "-" + year;
      }
      monthDataCounter += 1

      for (i = 0; i < dataset.data.length; i++){
        // At start of war, set default allied colour for all countries
        if (dataset.data[i]['Neutral'] == "True"){
            color_updater("#92c5de", dataset.data[i]['Country'], map)
        }
        else if (dataset.data[i]['Allied Control Date'] <= monthDataCounter && dataset.data[i]['Allied Control Date'] != ""){

            color_updater("#0571b0", dataset.data[i]['Country'], map)
        }
        else if (dataset.data[i]['Surrender Date'] <= monthDataCounter && dataset.data[i]['Surrender Date'] != ""){
            color_updater("#ca0020", dataset.data[i]['Country'], map)

        }
        else if (dataset.data[i]['Invasion Date'] <= monthDataCounter && dataset.data[i]['Invasion Date'] != ""){
            color_updater("#f4a582", dataset.data[i]['Country'], map)
        }
        else{
            color_updater("#f7f7f7", dataset.data[i]['Country'], map)
        }
      }
    }

    // https://codepen.io/MarioDesigns/pen/ENevMJ
    // On click button, changes class button from play to pause and the reverse
    $('body').on('click', '.button', function(e)   {
  	e.preventDefault();
  	if ( $(this).hasClass('play') ) {
      timeframe = setInterval(incrementSeconds, 50);
  		$(this).removeClass('play');
  		$(this).addClass('pause');
  	} else {
      // https://stackoverflow.com/questions/109086/stop-setinterval-call-in-javascript
      clearInterval(timeframe);
  		$(this).removeClass('pause');
  		$(this).addClass('play');
  	}
    });

    // https://stackoverflow.com/questions/5404839/how-can-i-refresh-a-page-with-jquery
    $('.refresh').click(function() {
    location.reload();
    });

  });
}
