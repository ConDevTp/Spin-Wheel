function BtnCloseModal2() {
  document.getElementById("btnclose").click();
}

var test = false;

$(document).ready(function () {
  // Function to check if the user visited in the last 24 hours
  function checkVisit() {
    // Get the stored timestamp from localStorage
    const lastVisit = localStorage.getItem('lastVisit');

    // Get the current time
    const currentTime = new Date().getTime();

    // If there's no timestamp or it's more than 24 hours ago
    if (!lastVisit || currentTime - lastVisit > 24 * 60 * 60 * 1000) {
      // Set the current timestamp as the last visit
      localStorage.setItem('lastVisit', currentTime);
      document.getElementsByClassName("myspin")[0].setAttribute("id", "spin");
    } else {
      // Restrict access or show a message
      $("#content").html("<h1>You have already visited today. Please come back in 24 hours.</h1>");
      document.getElementsByClassName("myspin")[0].removeAttribute("id");
      test = true;
    }
  }

  // Call the function to check visit
  checkVisit();
});



var degree = 3600;
var clicks = 0;
var count = 0;


//Clear interval timer if id saved in attributes:
function clear_interval(t) {
  var interval = parseInt(t.data('interval'));
  if (interval > 0) {
    clearInterval(interval);
    t.data('interval', '');
  }
}

$(document).ready(function () {
  $('#spin').click(function () {
    document.getElementById("spin").setAttribute("disabled", false);
    clicks++;


    if (clicks < 4) {

      var newDegree = degree * clicks;

      var winvalue = [270, 120, 90, 40];
      var randowmval = (winvalue[Math.floor(Math.random() * winvalue.length)]);
      if (clicks === 3) {
        var extraDegree = 165;
      } else {
        if (count === 0 || count === 69) {
          if (randowmval === 120) {
            count = 1;
            var extraDegree = 120;
          } else if (randowmval === 90) {
            count = 1
            var extraDegree = 90;

          } else if (randowmval === 40) {
            count = 1
            var extraDegree = 40;
          }
          if (count !== 69) {
            if (randowmval === 270) {
              count = 69;
              var extraDegree = 270;
            }
          } else {
            var extraDegree = 40;
          }
        } else if (count === 1) {
          count = 69;
          var extraDegree = 270;
        }

      }
      totalDegree = newDegree + extraDegree;






      //Calculate result index:
      // alert(totalDegree % 360 + 22.5) ;
      var win_num = 8 - Math.floor((totalDegree % 360 + 22.5) / 45);
      // var win_num = 6 - Math.floor((totalDegree % 360 + 30) / 60);

      $('#wheel .sec').each(function () {
        var t = $(this);

        clear_interval(t);

        //Save timer ID in data-interval attribute:
        t.data('interval', setInterval(function () {
          var aoY = t.offset().top;

          if (aoY < 23.89) {
            $('#spin').addClass('spin');
            setTimeout(function () {
              $('#spin').removeClass('spin');
            }, 100);
          }
        }, 10));

        $('#inner-wheel').css({
          'transform': 'rotate(' + totalDegree + 'deg)'
        });
      });

      //Stop updates and show result when transition already ended:
      setTimeout(function () {
        if (randowmval === 270) {
          $('#inner-wheel').css({
            'transform': 'rotate(' + 0 + 'deg)'
          });
        }
        $('#wheel .sec').each(function () {
          clear_interval($(this));

          document.getElementById("spin").removeAttribute("disabled");

        });
        var text1 = $('#wheel div.sec:nth-child(' + win_num + ')')[0].getElementsByClassName("text2")[0].innerText;
        if ($('#wheel div.sec:nth-child(' + win_num + ')')[0].getElementsByClassName("text2").length > 1) {
          var text2 = $('#wheel div.sec:nth-child(' + win_num + ')')[0].getElementsByClassName("text2")[1].innerText;
        }
        $('#inner-wheel').css({
          'transform': 'rotate(' + 0 + 'deg)'
        });

        var mresult = text1 + " " + text2;

        if (clicks === 3) {
          mresult = text2 + " " + text1;

        }

        document.getElementById("textshow").innerHTML = mresult;
        document.getElementById("btnshow").click();

      }, 6100);
    } else {
      document.getElementsByClassName("myspin")[0].removeAttribute("id");
      test = true;
    }

  });
});


function limitround() {
  if (test === true) {
    document.getElementById("btnclosehour").click();
  }
}