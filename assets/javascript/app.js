

var intervalId;
var time = 5;
var questionTime = 5;
var trivia = {
    clockRunning: false,
    lap: 1,
    overallTimer: function () {
        if (!this.clockRunning){
        this.clockRunning = true;
        intervalId = setInterval(trivia.count, 1000)
        }

    },

    count: function () {
        time--
        console.log(time)
        if (time === 0) {
            console.log("time is up")
            trivia.stop();
        }
    },
    stop : function(){
        clearInterval(intervalId)
        clockRunning = false;
    }
};

window.onload = function () {
        trivia.overallTimer()
};




