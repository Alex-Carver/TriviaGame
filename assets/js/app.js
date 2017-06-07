


$( document ).ready(function() {
  // Click Events
   	$( "#clickStart" ).click(function() {
  	$('#questions').show(600);
  	$('#clock').show(700);
  	$('#hide').hide(500);
});

  // Starts timer
    $('#clickStart').click(function(){
     var counter = 120;
     setInterval(function() {
      counter--;
    if (counter >= 0) {
      span = document.getElementById("display");
      span.innerHTML = counter;
    }
    if (counter === 0) {
     alert('sorry, out of time');
     clearInterval(counter);
     $('#start').show();
    }
  }, 1000);

  });


(function() {
  var questions = [
    {
      question: "The great Victoria Desert is located in?",
      choices: ['Canada','West Africa','Australia','North America'],
      correctAnswer: 2
    },
    {
      question: "The intersecting lines drawn on maps and globes are?",
      choices: ['lattitudes','longitudes','Geogrpahic Grids','None of the above'],
      correctAnswer: 2
    },
    {
      question: "The landmass of which of the following continents is the least?",
      choices: ['Africa','Asia','Australia','Europe'],
      correctAnswer: 2
    },
    {
      question: "Without ____ the equator would be much hotter than it is while the poles would be much cooler",
      choices: [ 'Lattitude of redistribution of heat','Cycle of air circulation','Global wind pattern','All are similiar'],
      correctAnswer: 3
    },
    {
      question: "The habitats valuable for commercially harvested species are called?",
      choices: ['Coral reefs','Sea grass bed','Hot spots','None of the above'],
      correctAnswer: 1
    },
      {
      question: "The island state of Australia is?",
      choices: ['Victoria','Queensland','Tasmania','New South Wales'],
      correctAnswer: 2
    },
      {
      question: "The islands with coral covered surfaces in Bay of Bengal are?",
      choices: ['Andaman Islands','Nicobar Islands','Both (a) and (b)','None of the above'],
      correctAnswer: 1
    },
      {
      question: " The hot, dry wind on the east or leeward side of the Rocky mountains (North America) is called?",
      choices: ['The Chinook','The Sirocco','The Harmattan','The Loo'],
      correctAnswer: 0
    },
      {
      question: "The islands of Seychelles are located in the?",
      choices: ['Arctic Ocean','Atlantic Ocean','Indian Ocean','Pacific Ocean'],
      correctAnswer: 2
    },

  ];

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $("#quiz"); //Quiz div object
 
  // Display initial question
  displayNext();

  //  'next' button
  $("#next").on("click", function(e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if (quiz.is(":animated")) {
      return false;
    }
    choose();

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert("Please make a selection!");
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // 'prev' button
  $("#prev").on("click", function(e) {
    e.preventDefault();

    if (quiz.is(":animated")) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // 'Start Over' button
  $("#start").on("click", function(e) {
    e.preventDefault();
    var counter = 120;

    if (quiz.is(":animated")) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $("#start").hide();
    document.getElementById("display")
    span.innerHTML = counter;

  });


  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $("<div>", {
      id: "question"
    });

    var header = $("<h2>Question " + (index + 1) + ":</h2>");
    qElement.append(header);

    var question = $("<p>").append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Choices
  function createRadios(index) {
    var radioList = $("<ul>");
    var item;
    var input = "";
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $("<li>");
      input = '<input class="selection" type="radio" name="answer" value=' + i + " />";
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $("#question").remove();

      if (questionCounter < questions.length) {
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!isNaN(selections[questionCounter])) {
          $("input[value=" + selections[questionCounter] + "]").prop(
            "checked",
            true
          );
        }

        // Controls display of 'prev' button
        if (questionCounter === 1) {
          $("#prev").show();
        } else if (questionCounter === 0) {
          $("#prev").hide();
          $("#next").show();
        }
      } else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $("#next").hide();
        $("#prev").hide();
        $("#start").show();
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $("<p>", { id: "question" });

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }

    score.append(
      "You got " +
        numCorrect +
        " questions out of " +
        questions.length +
        " right!!!"
    );
    return score;
  }
})();

});