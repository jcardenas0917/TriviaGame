
//set global variables 

var intervalId;
var currentQueIndex = 0;
const initialTime = 3;
const correctPage = "correct";
const wrongPage = "wrong";
const outOfTimePage = "time";
const gameEndPage = "end";
var totalCorrect = 0;
var totalWrong = 0;
var totalTimeOut = 0;
var time = 0;
const nextTime = 1000;
var listOfQuestions = [
    {
        question: "What was the last song John Lennon played for a paying audience?",
        option1: "Bennie and the Jets",
        option2: "Across The Universe",
        option3: "Imagine",
        option4: "I saw her standing there",
        answer: "I saw her standing there"
    },
    {
        question: "Which of the Beatles did some fans believe had died and been replaced by a double?",
        option1: "George",
        option2: "Paul",
        option3: "Ringo",
        option4: "John",
        answer: "Paul"
    },
    {
        question: "Where were the Beatles originally formed?",
        option1: "Liverpool",
        option2: "London",
        option3: "Manchester",
        option4: "Hamburg",
        answer: "Liverpool"
    },
    {
        question: "Which Beatles song inspired the most cover versions?",
        option1: "I want to hold your hand",
        option2: "Hey Jude",
        option3: "Yesterday",
        option4: "I saw her standing there",
        answer: "Yesterday"
    },

]
var trivia = {
    //set clock to not run until the function is called
    clockRunning: false,
    //Start to count downt the time for the trivia game
    questionTimer: function () {
        time = initialTime;
        if (!this.clockRunning) {
            this.clockRunning = true;
            intervalId = setInterval(trivia.count, 1000)
        }

    },

    //Manages the count timer
    count: function () {
        time--
        $("#message").text("Time Remaining " + time);
        if (time === 0) {
            console.log(time + " is now 0");
            trivia.stopClock();
            console.log("current index " + currentQueIndex);
            console.log("list of questions length " + listOfQuestions.length);

            trivia.showOutOfTime();
            console.log("Increment current index from count()");
            // currentQueIndex++;
        };


    },

    //stops time clock
    stopClock: function () {
        clearInterval(intervalId)
        this.clockRunning = false;
    },

    //starts the game and pulls the first set of questions
    startGame: function () {
        // trivia.questionTimer();
        trivia.updateQuestion();


    },

    //Updates to the next question
    updateQuestion: function () {

        $("#question").css("font-size", "30px");
        $(".options").show();
        $(".image-container").hide();
        console.log("clock is running " + trivia.clockRunning);
        console.log("total correct " + totalCorrect);
        console.log("total wrong " + totalWrong);
        console.log("total out of time " + totalTimeOut);

        trivia.questionTimer();
        $("#question").text(listOfQuestions[currentQueIndex].question);

        $("#option1").text(listOfQuestions[currentQueIndex].option1);
        $("#option2").text(listOfQuestions[currentQueIndex].option2);
        $("#option3").text(listOfQuestions[currentQueIndex].option3);
        $("#option4").text(listOfQuestions[currentQueIndex].option4);
        $("#message").text("Time Remaining " + time);
    },



    //this function will check the answers
    checkAnswer: function (selected, answer) {

        if (selected === answer) {

            console.log("you win");
            trivia.stopClock();
            trivia.showCorrect();
        } else {
            console.log("you losse");
            trivia.stopClock();
            trivia.showWrong();
        }

        console.log("current index " + currentQueIndex);
        console.log("list of questions length " + listOfQuestions.length);
       
    },
    //show the page after each answer or time out
    // switchToPage: function (page) {
    //     console.log("inside pageswitch funciton");
    //     if (page === correctPage) {
    //         console.log("Switch to correctPage");
    //         totalCorrect++;
    //         $("#question").text("Correct!");
    //         $("#question").css("font-size", "50px");
    //         $(".answers").hide();
    //         $(".image-container").show();
    //         $(".image-container").html("<img src='assets/images/win.gif' width='300px'/>");
    //         trivia.resetTime();

    //     } else if (page === wrongPage) {
    //         console.log("Switch to wrongePage");
    //         totalWrong++;
    //         $("#question").text("Wrong!");
    //         $("#question").css("font-size", "50px");
    //         $(".answers").hide();
    //         $(".image-container").show();
    //         $(".image-container").html("<img src='assets/images/losse.gif' width='300px'/>");
    //         trivia.resetTime();
    //     } else if (page === outOfTimePage) {
    //         totalTimeOut++;
    //         console.log("Switch to out of time page");
    //         $("#question").text("Out Of Time!");
    //         $("#question").css("font-size", "50px");
    //         $(".answers").hide();
    //         $(".image-container").show();
    //         $(".image-container").html("<img src='assets/images/time.gif' width='300px'/>");
    //         trivia.resetTime();
    //     }

    //     if (page === gameEndPage) {
    //         console.log("Switch to game end page");
    //         $("#question").text("All done, here is how you did");
    //         $("#question").css("font-size", "50px");
    //         $("#option1").text("Total correct: " + totalCorrect);
    //         $("#option2").text("Total wrong: " + totalWrong);
    //         $("#option3").text("Unanswered: " + totalTimeOut);
    //         $("#option4").hide();
    //         // $(".gameover").show();

    //     }

    // },
    showCorrect: function () {
        console.log("Switch to correctPage");
        totalCorrect++;
        $("#question").text("Correct!");
        $("#question").css("font-size", "50px");
        $(".options").hide();
        $(".image-container").show();
        $(".image-container").html("<img src='assets/images/win.gif' width='300px'/>");
        trivia.checkForNextPage();
    },

    showWrong: function () {
        console.log("Switch to wrongePage");
        totalWrong++;
        $("#question").text("Wrong!");
        $("#question").css("font-size", "50px");
        $(".options").hide();
        $(".image-container").show();
        $(".image-container").html("<img src='assets/images/losse.gif' width='300px'/>");

        trivia.checkForNextPage();

    },

    showOutOfTime: function () {
        totalTimeOut++;
        console.log("Switch to out of time page");
        $("#question").text("Out Of Time!");
        $("#question").css("font-size", "50px");
        $(".options").hide();
        $(".image-container").show();
        $(".image-container").html("<img src='assets/images/time.gif' width='300px'/>");

        trivia.checkForNextPage();

    },

    showEndOfGame: function () {
        console.log("Switch to game end page");
        $(".options").hide();
        $(".results").show();
        $("#question").text("All done, here is how you did");
        $("#question").css("font-size", "50px");
        $("#result1").text("Total correct: " + totalCorrect);
        $("#result2").text("Total wrong: " + totalWrong);
        $("#result3").text("Unanswered: " + totalTimeOut);
        $("#result4").hide();
        $(".image-container").hide();
        $(".gameover").show();
    },



    //Checks for end of game or next page
    checkForNextPage: function () {

        if (currentQueIndex >= listOfQuestions.length - 1) {
            console.log("current index is greater than or equal to list of que")
            trivia.stopClock();
            setTimeout(function () {
                trivia.showEndOfGame();
            }, nextTime)

        } else {
            console.log("Increment current index from checkAnswer()");
            currentQueIndex++;
            setTimeout(function () {
                trivia.updateQuestion();
            }, nextTime)

        }

    },

    resetGame: function () { }
};

//Hides the play again button
window.onload = function () {
    $(".gameover").hide();

};

$(".start").on("click", function () {

    trivia.startGame();
    $(".start").hide();

})

$("#option1").on("click", function () {

    trivia.checkAnswer(listOfQuestions[currentQueIndex].option1, listOfQuestions[currentQueIndex].answer);
});

$("#option2").on("click", function () {

    trivia.checkAnswer(listOfQuestions[currentQueIndex].option2, listOfQuestions[currentQueIndex].answer);
});

$("#option3").on("click", function () {

    trivia.checkAnswer(listOfQuestions[currentQueIndex].option3, listOfQuestions[currentQueIndex].answer);

});

$("#option4").on("click", function () {

    trivia.checkAnswer(listOfQuestions[currentQueIndex].option4, listOfQuestions[currentQueIndex].answer);

});




