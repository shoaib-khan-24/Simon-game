var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).keydown(function(){
    if(level == 0){
        nextSequence();
    }
    
})



$(".btn").click(function(){
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
})

function nextSequence(){
    level++;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(70).fadeIn(70).fadeOut(30).fadeIn(30);
    playSound(randomChosenColour);
    $("#level-title").text("level "+level); 
}

function playSound(name) {
    var audio = new Audio(name+".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if (userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1500);
            userClickedPattern.length = 0;
        }
    }
    else{
        console.log("wrong.");
        var audio = new Audio("wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },300);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }    
}

function startOver() {
    level=0;
    gamePattern = [];
    userClickedPattern = [];
}




