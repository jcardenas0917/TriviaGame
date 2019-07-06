
//set global variables 

var intervalId;
var currentQueIndex = 0;
const initialTime = 10;
var totalCorrect = 0;
var totalWrong = 0;
var totalTimeOut = 0;
var time = 0;
const nextTime = 3000;
//Set of questions, options and answers
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
    {
        question: "Which Beatle crossed Abbey Road first?",
        option1: "John",
        option2: "Ringo",
        option3: "Paul",
        option4: "George",
        answer: "John"
    },
    {
        question: "What was the Beatles' first single??",
        option1: "Twist and Shout",
        option2: "I saw her standing there",
        option3: "Love me do",
        option4: "Please Please me",
        answer: "Love me do"
    },
    {
        question: "What was the Beatles' first film?",
        option1: "Help",
        option2: "Yellow Submarine",
        option3: "Magical Mystery Tour",
        option4: "A Hard day's night",
        answer: "A Hard day's night"
    },
    {
        question: "Which of the Beatles had a magic piano?",
        option1: "George",
        option2: "John",
        option3: "Paul",
        option4: "Ringo",
        answer: "Paul"
    },
    {
        question: "Which Beatles song was dedicated to John's son?",
        option1: "I want to hold your hand",
        option2: "Hey Jude",
        option3: "Yesterday",
        option4: "I saw her standing there",
        answer: "Hey Jude"
    },
    {
        question: "Who inspired John Lennon to write Across the Universe?",
        option1: "Yoko Ono",
        option2: "Julia Lennon",
        option3: "Paul McCartney",
        option4: "Cynthia Lennon",
        answer: "Cynthia Lennon"
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
            trivia.stopClock();
            trivia.showOutOfTime();
        };
    },

    //stops time clock
    stopClock: function () {
        clearInterval(intervalId)
        this.clockRunning = false;
    },

    //starts the game and pulls the first set of questions
    startGame: function () {
        trivia.updateQuestion();

    },

    //Updates to the next question
    updateQuestion: function () {

        $("#question").css("font-size", "30px");
        $(".options").show();
        $(".image-container").hide();
    
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
            trivia.stopClock();
            trivia.showCorrect();
        } else {
            trivia.stopClock();
            trivia.showWrong();
        }
    },
    //Shows correct anwer page
    showCorrect: function () {
        totalCorrect++;
        $("#question").text("Correct!");
        $("#question").css("font-size", "50px");
        $(".options").hide();
        $(".image-container").show();
        $(".image-container").html("<img src='assets/images/win.gif' width='300px'/>");
        trivia.checkForNextPage();
    },

    //Shows wrong answer page
    showWrong: function () {
        totalWrong++;
        $("#question").text("Wrong!");
        $("#question").css("font-size", "50px");
        $(".options").hide();
        $(".image-container").show();
        $(".image-container").html("<img src='assets/images/losse.gif' width='300px'/>");

        trivia.checkForNextPage();

    },

    //shows Out of time screen
    showOutOfTime: function () {
        totalTimeOut++;
        $("#question").text("Out Of Time!");
        $("#question").css("font-size", "50px");
        $(".options").hide();
        $(".image-container").show();
        $(".image-container").html("<img src='assets/images/time.gif' width='300px'/>");

        trivia.checkForNextPage();

    },

    //shows End of Game screen and score and prompts to start again
    showEndOfGame: function () {
        $(".options").hide();
        $(".results").show();
        $("#question").text("All done, here is how you did");
        $("#question").css("font-size", "50px");
        $("#result1").text("Total correct: " + totalCorrect);
        $("#result2").text("Total wrong: " + totalWrong);
        $("#result3").text("Unanswered: " + totalTimeOut);
        $("#result4").hide();
        $(".image-container").hide();
        $(".gameover").html("<h1>Start Over?</h1>");
    },



    //Checks for next or end of game or next page
    checkForNextPage: function () {

        if (currentQueIndex >= listOfQuestions.length - 1) {
            trivia.stopClock();
            setTimeout(function () {
                trivia.showEndOfGame();
            }, nextTime)

        } else {
            currentQueIndex++;
            setTimeout(function () {
                trivia.updateQuestion();
            }, nextTime)

        }

    },

    //Resets game to question 1
    resetGame: function () { 
        totalCorrect = 0;
        totalWrong = 0;
        totalTimeOut = 0;
        time = 0;
        currentQueIndex = 0;
        trivia.updateQuestion();
        $(".results").hide();
        $(".gameover").empty();

    }
};


//Start buttons calls the beginning of the game
$(".start").on("click", function () {
    trivia.startGame();
    $(".start").hide();

})
//Click option 1 passes answer and option to checkAnswer function
$("#option1").on("click", function () {

    trivia.checkAnswer(listOfQuestions[currentQueIndex].option1, listOfQuestions[currentQueIndex].answer);
});

//Click option 2 passes answer and option to checkAnswer function
$("#option2").on("click", function () {

    trivia.checkAnswer(listOfQuestions[currentQueIndex].option2, listOfQuestions[currentQueIndex].answer);
});

//Click option 3 passes answer and option to checkAnswer function
$("#option3").on("click", function () {

    trivia.checkAnswer(listOfQuestions[currentQueIndex].option3, listOfQuestions[currentQueIndex].answer);

});//Click option 4 passes answer and option to checkAnswer function
$("#option4").on("click", function () {

    trivia.checkAnswer(listOfQuestions[currentQueIndex].option4, listOfQuestions[currentQueIndex].answer);

});

//On click calls the reset function to start the game again
$(".gameover").on("click", function () {
    trivia.resetGame();

});




