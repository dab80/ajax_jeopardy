(function() {
  $(function() {
    //graphical items
    let submit_button = $("#submit");
    let cat_0_button = $('#cat_0');
    let cat_1_button = $('#cat_1');
    let cat_2_button = $('#cat_2');
    let category = $('#category');
    let point_value = $('#point_value');
    let question = $('#question');

    //storage items
    let body = $("body");
    let main_heading = $("#main_heading");
    let sub_heading = $("#sub_heading");
    let golden_answer = "";
    let user_answer = "";
    let user_score = 0;
    let cat_title_array = [];
    let cat_idnum_array = [];

    let audio_cheer = new Audio("assets/audio/Audience.mp3");
    let counter = 0;
    let t;
    let timer_is_on = 0;

    $(document).ready(function() {
      get3categories();
    });

    function get3categories() {
      //hide category, point value, and question
      $('#question_area').hide();
      $('.answer_div').hide();
      $('#category_area').show();
      $('#please_select').show();

      let amount = Math.floor(Math.random() * 38); //amount of food
      let my_url = '"http://jservice.io/api/categories?count=3&offset=' + Math.floor(Math.random() * 100) + '"';

      console.log(my_url);
      cat_title_array = [];
      cat_idnum_array = [];

      let my_var = $.get(eval(my_url), function(data) {
        $.each(data, function(index, value) {
          cat_title_array.push(value.title);
          cat_idnum_array.push(value.id);
          console.log(value.title);
        }) //1st each
      });

      my_var.done(function() {
        cat_0_button.html(cat_title_array[0]);
        cat_1_button.html(cat_title_array[1]);
        cat_2_button.html(cat_title_array[2]);
      });

    } //end of get3categories


    function getQuestion(num) {
      let my_url = '"http://jservice.io/api/clues?category=' + cat_idnum_array[num] + '"';

      // console.log("###############################");
      // console.log("my_url = " + my_url);
      // console.log("###############################");

      let my_var = $.get(eval(my_url), function(data) {
        $.each(data, function(index, value) {
          console.log(value.answer);
          $('#category').html(value.category.title);

          //sometimes point value is null
          if (value.value === null) {
            $('#point_value').html(200);
          } else {
            $('#point_value').html(parseInt(value.value));
          }

          $('#question').html(value.question);
          golden_answer = value.answer;
          // $.each(value, function(key, value) {
          // document.write(key + " : " + value + "<br>");
          // }) //2nd each
        }) //1st each
      });

      //display the hidden question area
      my_var.done(function() {
        $('#category_area').hide();
        $('#please_select').hide();
        $('#question_area').show();
        $('.answer_div').show();
        $('#answer').val("");
      });
    } //end of getQuestion

    cat_0_button.click(function() {
      getQuestion(0)
    });

    cat_1_button.click(function() {
      getQuestion(1)
    });

    cat_2_button.click(function() {
      getQuestion(2)
    });

    submit_button.click(function() {
      user_answer = $('#answer').val();

      if (user_answer === golden_answer) {
        user_score = user_score + parseInt($('#point_value').html());
        startCount();
        // console.log("correct");
      }

      get3categories();
      $('#score').html(user_score);

    });

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
