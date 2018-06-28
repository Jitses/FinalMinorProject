/*
 * Jitse Schol
 * Student Number: 10781463
 * Programmeerproject
 * 28-6-2018
 *
 * Contains an interval timer, started when the play button is clicked.
 * It increments months and years accordingly.
 * Country colours in the map are updated as well
 */
function interval(map){

  /* Retrieved from http://learnjsdata.com/read_data.html
   * Datasets used:
   * http://www.historyplace.com/worldwar2/timeline/ww2time.htm
   * https://en.wikipedia.org/wiki/World_War_II_by_country
   */
  d3.json("https://raw.githubusercontent.com/Jitses/FinalMinorProject/master/data/occupation.json", function(dataset){

    buttonPlay = document.getElementsByClassName('button.play')

    // https://stackoverflow.com/questions/37187504/javascript-second-counter
    var month = 0;

    // Runs from month 1 until 84
    var monthDataCounter = 0;

    // Initial year
    var year = 1939;

    var counter = document.getElementById('counter');

   /*
    * Increments the months and years when the timer is on
    */
    function incrementSeconds(){
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

      // Sets the right colour for the countries in the map, according to their status
      for (i = 0; i < dataset.data.length; i++){
        if (dataset.data[i]['Neutral'] == "True"){
            colorUpdater("#92c5de", dataset.data[i]['Country'], map)
        }
        else if (dataset.data[i]['Allied Control Date'] <= monthDataCounter && dataset.data[i]['Allied Control Date'] != ""){

            colorUpdater("#0571b0", dataset.data[i]['Country'], map)
        }
        else if (dataset.data[i]['Surrender Date'] <= monthDataCounter && dataset.data[i]['Surrender Date'] != ""){
            colorUpdater("#ca0020", dataset.data[i]['Country'], map)
        }
        else if (dataset.data[i]['Invasion Date'] <= monthDataCounter && dataset.data[i]['Invasion Date'] != ""){
            colorUpdater("#f4a582", dataset.data[i]['Country'], map)
        }
        else{
            colorUpdater("#f7f7f7", dataset.data[i]['Country'], map)
        }
      }
    }

    // https://codepen.io/MarioDesigns/pen/ENevMJ
    // On click button, changes class button from play to pause and the reverse
    $('body').on('click', '.button', function(e){
    	e.preventDefault();
      // Start playing when class is play on click
    	if ( $(this).hasClass('play')){
        timeframe = setInterval(incrementSeconds, 500);
    		$(this).removeClass('play');
    		$(this).addClass('pause');
    	}
      // Pause playing if class is pause
      else{
        // https://stackoverflow.com/questions/109086/stop-setinterval-call-in-javascript
        clearInterval(timeframe);
    		$(this).removeClass('pause');
    		$(this).addClass('play');
    	}
    });

    // Refresh button: https://stackoverflow.com/questions/5404839/how-can-i-refresh-a-page-with-jquery
    $('.refresh').click(function(){
      location.reload();
    });
  });
}
