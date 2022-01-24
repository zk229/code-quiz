var startButtonEl = document.querySelector("#start-btn");
var bodyEl = document.querySelector(".body");
var choiceEl = document.querySelector("#answer-choices");
var previousEl = document.querySelector("#previous");
var timerEl = document.querySelector(".timer");
var highScore = 9999;
var numComplete = 0;
var score = 30;
var questions = [
    "Which of the following is NOT a primitive data type in Java?",
    "Which of these tools is used for version control?",
    "Which of these tools is used for styling elements on a page?",
    "Which of the following describes a data type that contains a true or false value?",
    "Which of the following functions is used to convert a String to a JSON object?"
];
var answers = [
    ["String", "boolean", "int", "char"],
    ["CSS", "Angular", "Node.js", "Git"],
    ["CSS", "HTML", "Javascript", "Python"],
    ["String", "Boolean", "Integer", "Float"],
    ["JSON.stringify", "JSON.parse", "JSON.toString", "JSON.parseInt"]
];
var correct = [1, 4, 1, 2, 1];
var numQuestions = questions.length;
var isGoing = false;

// start the quizs
var startButtonHandler = function(event) {
    loadQuestion(0);
    numComplete++;
    isGoing = true;
    
    event.target.remove();
};

// load the next question
var loadQuestion = function(num) {
    document.querySelector("#question").innerHTML = questions[num];

    while(choiceEl.firstChild) {
        choiceEl.firstChild.remove();
    }

    for(var i = 0; i < answers[num].length; i++) {
        var newButton = makeButton(i + 1, answers[num][i]);
        newButton.setAttribute("data-question-num", num);
        choiceEl.appendChild(newButton);
    }
};

// make an answer choice button
var makeButton = function(num, answer) {
    var newButton = document.createElement("button");
    newButton.className = "btn choice";
    newButton.textContent = num + ". " + answer;
    newButton.setAttribute("data-choice", num);
    return newButton;
};

// handle event when an answer choice is clicked
var answerChoiceHandler = function(event) {
    var answerId = event.target.getAttribute("data-choice");
    var answerSelected = document.querySelector(".choice[data-choice='" + answerId + "']");

    if(!answerSelected) {
        return false;
    }

    var prevQuestion = answerSelected.getAttribute("data-question-num");

    if(parseInt(answerSelected.getAttribute("data-choice")) === correct[prevQuestion]) {
       previousEl.innerHTML = "Correct!";
       previousEl.setAttribute("color", "green");
    }
    else {
        previousEl.innerHTML = "Incorrect!";
        previousEl.setAttribute("color", "red");
        score -= 10;
    }

    if(parseInt(prevQuestion) === numQuestions - 1) {
        showScore();
        return true;
    }
    if(score < 0) {
        gameOver();
        return true;
    }

    loadQuestion(parseInt(answerSelected.getAttribute("data-question-num")) + 1);
};

// end the quiz if all questions are answered
var showScore = function() {
    document.querySelector("#question").innerHTML = "This quiz is over! Your score is " + score;
    isGoing = false;
    console.log(isGoing);

    while(choiceEl.firstChild) {
        choiceEl.firstChild.remove();
    }

    var highScoreDiv = document.createElement("div");
    highScoreDiv.setAttribute("display", "flex");
    highScoreDiv.setAttribute("justify-content", "space-between");
    highScoreDiv.setAttribute("margin", "auto");
    highScoreDiv.setAttribute("width", "100%");

    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("name", "name");
    inputEl.setAttribute("placeholder", "Enter your initials");
    inputEl.setAttribute("width", "60%");

    var submitButton = document.createElement("button");
    submitButton.className = "btn";
    submitButton.setAttribute("type", "submit");
    submitButton.textContent = "Submit";
    submitButton.setAttribute("width", "30%");

    highScoreDiv.appendChild(inputEl);
    highScoreDiv.appendChild(submitButton);
    choiceEl.appendChild(highScoreDiv);
};

// end the quiz if time runs out
var gameOver = function() {
    document.querySelector("#question").innerHTML = "This quiz is over! You did not complete the quiz... 😭";
    isGoing = false;
    console.log(isGoing);

    while(choiceEl.firstChild) {
        choiceEl.firstChild.remove();
    }
};

// constantly update the timer
var updateTimer = function() {
    if(isGoing) {
        score--;
    }
    timerEl.innerHTML = "Time: " + score;
}

setInterval(updateTimer, 1000);
startButtonEl.addEventListener("click", startButtonHandler);
choiceEl.addEventListener("click", answerChoiceHandler);