var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).one("keypress", function() {
  nextSequence();
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1)

});



function nextSequence(){
  $("#level-title").text("LEVEL "+level);
  level++;
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){ $("#"+currentColour).removeClass("pressed"); }, 100);
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("Success");
    if (gamePattern.length == userClickedPattern.length){
      console.log("user finish the sequence");
      setTimeout(nextSequence(),1000);
      userClickedPattern = [];
    }
    else {
      console.log("user did not finish the sequence");
    }
  }
  else {
    console.log("wrong");
    startOver();
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){ $("body").removeClass("game-over"); }, 200);
    $("#level-title").text("Game Over. Press any Key to Restart");
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
