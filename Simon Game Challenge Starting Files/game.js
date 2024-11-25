var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var wrongaudio = new Audio("sounds/wrong.mp3")

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level); // Update the h1
        nextSequence(); // Call the nextSequence function
        started = true; // Set the flag to true
    }
});

// Capture user clicks
$(".btn").click(function() {
    // Get the id of the button clicked
    var userChosenColour = $(this).attr("id");
    
    // Add the user's choice to the pattern
    userClickedPattern.push(userChosenColour);

    // Play the sound for the clicked button
    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length -1);
});


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }    
    } else {
        console.log("wrong");
        wronganswereffect();
        wrongaudio.play();
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    console.log(gamePattern);
    console.log(userClickedPattern);
}


function nextSequence() {

    userClickedPattern = [];
    // Generate a random number between 0 and 3
    level++
    var randomNumber = Math.floor(Math.random()*4);

   
    // Choose a random colour based on the random number
    var randomChosenColour = buttonColours[randomNumber];

    // Add the random colour to the game pattern
    gamePattern.push(randomChosenColour);
    // Use jQuery to select the button with the id equal to randomChosenColour
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#level-title").text("Level " + level)

    playSound(randomChosenColour);
    // Log for debugging
    console.log("Random colour chosen:", randomChosenColour);

}

function playSound(colour) {
    var audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();
}


function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout (function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function wronganswereffect(){
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over")
    }, 200);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}











