(function() {
  $(function() {
    //graphical items
    let submit_button = $("#submit");

    //storage items
    let body = $("body");
    let main_heading = $("#main_heading");
    let sub_heading = $("#sub_heading");
    let golden_answer = "";
    let user_answer = "";
    let user_score = 0;

    //jQuery equivelent to window.onload = function{}
    $(document).ready(function() {
      getQuestion();
    });

    function getQuestion() {
      $.get("http://jservice.io/api/random", function(data) {
        $.each(data, function(index, value) {
          // console.log(value);
          // console.log(value.question);
          console.log(value.answer);
          // console.log(value.value);
          // console.log(value.category.title);
          $('#category').html(value.category.title);
          $('#point_value').html(parseInt(value.value));
          $('#question').html(value.question);
          golden_answer = value.answer;
          // $.each(value, function(key, value) {
          // document.write(key + " : " + value + "<br>");
          // }) //2nd each
        }) //1st each
      });
      $('#answer').val("");
    } //end of getQuestion

    submit_button.click(function() {
      // console.log("clicked submit button");
      // console.log("The correct answer is: " + golden_answer);
      // console.log("User answer is: " + $('#answer').val());
      user_answer = $('#answer').val();

      if (user_answer === golden_answer) {
        user_score = user_score + parseInt($('#point_value').html());
        startCount();
      }

      getQuestion();

      //update user score
      $('#score').html(user_score);

    });

    let audio_cheer = new Audio("assets/audio/Audience.mp3");
    let counter = 0;
    var t;
    var timer_is_on = 0;

    function startCount() {
      main_heading.css('color', "yellow");

      //play cheering crowd
      audio_cheer.load();
      audio_cheer.play();

      if (!timer_is_on) {
        timer_is_on = 1;
        celebrate();
      }
    }

    function stopCount() {
      clearTimeout(t);
      timer_is_on = 0;
      counter = 0;

      audio_cheer.pause();
      main_heading.css('color', "white");
      main_heading.html("Jeopardy Lite!");
    }

    function celebrate() {
      // console.log("within celebrate");

      //if counter is odd, change text
      if ((counter % 2) !== 0) {
        main_heading.html("YOU'RE CORRECT!!!");
      } else {
        // main_heading.html() = "'TEAM ' + team_num + ' SCORED!!!'";
        main_heading.html("WOW!!!");
      }

      counter = counter + 1;

      //wait 1 second
      t = setTimeout(function() {
        celebrate()
      }, 1000);

      //breakout
      if (counter === 6) {
        stopCount();
      }

    }
  })
})();
