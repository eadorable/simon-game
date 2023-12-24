
const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

const nextSequence = () => {

  userClickedPattern = [];
  level++;
  $("#level-title").html(`Level: ${level}`);
  let randomNumber = Math.floor((Math.random() * 4))
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
  console.log(`gamePattern: ${gamePattern[gamePattern.length -1]}`);

  playSound(randomChosenColour);
};

const playSound = (name) => {
  let audioPath = `sounds/${name}.mp3`
  new Audio(audioPath).play();
};

const animatePress = (currentColour) => {
  $(`${currentColour}`).addClass("pressed");
  setTimeout(() => {
    $(`${currentColour}`).removeClass("pressed");
  }, 100);
};

const startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
}


const checkAnswer = (currentLevel) => {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success!");
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    };
  } else {
    //console.log("Wrong!")
    new Audio("sounds/wrong.mp3").play();
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").html("Game Over, Press Any Key to Restart");
    startOver()
  };
}


const playSimon = () => {
  $(document).on("keypress", function () {
    if (!started) {
      $("#level-title").html(`Level: ${level}`);
      nextSequence();
      started = true;
    }
  });

  $(".btn").on("click", function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(`userClickedPattern: ${userClickedPattern[userClickedPattern.length - 1]}`);

    playSound(userChosenColour);
    animatePress(`#${userChosenColour}`);
    checkAnswer(userClickedPattern.length - 1);
  });

}

playSimon();
