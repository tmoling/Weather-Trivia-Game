//game begins with click of start button....on.click function
//game changes to different screen
//30 second timer begins automatically...question with four answers
//correct answer is clicked
//screen changes, timer stops and answer is revealed to be correct or not
//after three seconds, new question is revealed and timer resets to 30
//after five questions, the timer stops, a recap of correct, incorrect and unanswered questions is shown
//on the same screen, the game asks if you want to start over...click to restart game and cycle of questions and timer begins again


$(document).ready(function () {

  function initialScreen() {
    startScreen = "<p2 class='startButton' id='button'>Click here to test your knowledge.</p2>";
    $(".mainArea").html(startScreen);
  }

  initialScreen();

  $("body").on("click", ".startButton", function (event) {
    event.preventDefault();
    generateHTML();
    timerWrapper();
  });

  $("body").on("click", ".answer", function (event) {
    selectedAnswer = $(this).text();
    if (selectedAnswer === correctAnswers[questionCounter]) {
      clearInterval(theClock);
      generateWin();
    }
    else {
      clearInterval(theClock);
      generateLoss();
    }
  });

  $("body").on("click", ".resetButton", function (event) {
    resetGame();
  });

});

function generateLossDueToTimeOut() {
  unansweredTally++;
  gameHTML = "<p>Seconds Remaining: <label class='timer'>"
    + counter + "</label></p>" + "<p>Looks like you got distracted staring at the sky!  <br><br> The correct answer was: "
    + correctAnswers[questionCounter] + "</p>";
  $(".mainArea").html(gameHTML);
  setTimeout(wait, 1000 * 5);
}

function generateWin() {
  correctTally++;
  gameHTML = "<p>Time Remaining: <label class='timer'>"
    + counter + "</label></p>" + "<p>Whoa! You must be a cloud connoisseur! <br><br>  The answer was: "
    + correctAnswers[questionCounter] + "</p>";
  $(".mainArea").html(gameHTML);
  setTimeout(wait, 1000 * 5);
}

function generateLoss() {
  incorrectTally++;
  gameHTML = "<p>Seconds Remaining: <label class='timer'>"
    + counter + "</label></p>" + "<p>Oh no! I think your head is stuck in the clouds! <br><br> The correct answer was: "
    + correctAnswers[questionCounter] + "</p>";
  $(".mainArea").html(gameHTML);
  setTimeout(wait, 1000 * 5);
}

function generateHTML() {
  gameHTML = "<p>Seconds Remaining: <label class='timer'>30</label></p><p>"
    + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. "
    + answerArray[questionCounter][0] + "</p><p class='answer'>B. "
    + answerArray[questionCounter][1] + "</p><p class='answer'>C. " + answerArray[questionCounter][2] +
    "</p><p class='answer'>D. " + answerArray[questionCounter][3] + "</p>";
  $(".mainArea").html(gameHTML);
}

function wait() {
  if (questionCounter < 7) {
    questionCounter++;
    generateHTML();
    counter = 30;
    timerWrapper();
  }
  else {
    finalScreen();
  }
}

function timerWrapper() {
  theClock = setInterval(thirtySeconds, 1000);
  function thirtySeconds() {
    if (counter === 0) {
      clearInterval(theClock);
      generateLossDueToTimeOut();
    }
    if (counter > 0) {
      counter--;
    }
    $(".timer").html(counter);
  }
}

function finalScreen() {
  gameHTML = "<p>Seconds Remaining: <label class='timer'>" + counter + "</label></p>"
    + "<p>Check out how you did." + "</p>" + "<p>Correct Answers: "
    + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Questions Not Answered: " + unansweredTally +
    "</p>" + "<p class='text-center resetButton-container'><a class=resetButton href='#' role='button'>Try Again!</a></p>";
  $(".mainArea").html(gameHTML);
}

function resetGame() {
  questionCounter = 0;
  correctTally = 0;
  incorrectTally = 0;
  unansweredTally = 0;
  counter = 30;
  generateHTML();
  timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = [
  "High clouds that are composed of ice crystals are called what?",
  "Which of the following is a cloud on the ground?",
  "Precipitation that vaporizes before making it to the earth's surface is called what?",
  "Which clouds occur at the highest altitude?",
  "The term stratus means what?",
  "Fog formed by cooling of the earth's surface at night is known as what?",
  "What are the cirrocumulus clouds that look like fish scales?",
  "A ring around the sun or moon will show when they shine through this cloud. Which is it?"
];

var answerArray = [
  ["Cirrus", "Cumulus", "Nimbostratus", "Altocumulus"],
  ["Funnel Cloud", "Fog", "Wall Cloud", "Shelf Cloud"],
  ["Haze", "Fog", "Virga", "Cloud Droplets"],
  ["Altostratus", "Stratocumulus", "Noctilucent", "Cirostratus"],
  ["Vertically Developed", "Upper Level", "Low Level", "Horizontally Layered"],
  ["Radiation Fog", "Advection Fog", "Steam Fog", "Frontal Fog"],
  ["Lenticular", "Mackerel Sky", "Mare's tails", "Uncinus"],
  ["Nimbostratus", "Altocumulus", "Fair weather cumulus", "Cirrostratus"]
];

var correctAnswers = [
  "A. Cirrus",
  "B. Fog",
  "C. Virga",
  "C. Noctilucent",
  "D. Horizontally Layered",
  "A. Radiation Fog",
  "B. Mackerel Sky",
  "D. Cirrostratus"
];

var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;