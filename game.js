var level = 0;
var gamePattern = [];
var userClickedPattern = [];

var started = false;

$(document).on("keydown", function () {
    if (!started) {
        $("h1").text("Level 0");
        nextSequence();
        started = true;
    }
})

$(".btn").on("click", function () {

    var userChosenColour = ($(this).attr("id"));
    userClickedPattern.push(userChosenColour);

    playSound(userClickedPattern);

    $("#" + randomChosenColour).fadeOut(200).fadeIn(200);

    checkAnswer(userClickedPattern.length - 1);
});



function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);

    var buttonColours = ["red", "blue", "green", "yellow"];
    randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(200).fadeIn(200);

    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}



function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}