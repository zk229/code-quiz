var startButtonEl = document.querySelector("#start-btn");
var bodyEl = document.querySelector(".body");
var choiceEl = document.querySelector("#answer-choices");
var previousEl = document.querySelector("#previous");
var highScore = 9999;
var numComplete = 0;
var questions = [
    "Which of the following is NOT a primitive data type in Java?",
    "Which of these tools is used for version control?",
    "Which of these tools is used for styling elements on a page?",
    "Which of the following describes a data type that contains a true or false value?",
    "Which of the following functions is used to convert a String to a JSON object?"
];
var answers = [
    ["String", "boolean", "int", "char"],
    ["CSS", "Angular", "Node.js", "CSS"],
    ["CSS", "HTML", "Javascript", "Python"],
    ["String", "Boolean", "Integer", "Float"],
    ["JSON.stringify", "JSON.parse", "JSON.toString", "JSON.parseInt"]
];
var correct = [1, 4, 1, 2, 1];
var numQuestions = questions.length;

var startButtonHandler = function(event) {
    loadQuestion(0);
    numComplete++;
    
    event.target.remove();
};

var loadQuestion = function(num) {
    document.querySelector("#question").innerHTML = questions[num];

    while(choiceEl.firstChild) {
        choiceEl.firstChild.remove();
    }

    for(var i = 0; i < answers[num].length; i++) {
        var newButton = makeButton(i + 1, answers[num][i]);
        newButton.setAttribute("data-question-num", i);
        choiceEl.appendChild(newButton);
    }
};

var makeButton = function(num, answer) {
    var newButton = document.createElement("button");
    newButton.className = "btn choice";
    newButton.textContent = num + ". " + answer;
    newButton.setAttribute("data-choice", num);
    return newButton;
};

var answerChoiceHandler = function(event) {
    console.log(event.target);

    var answerId = event.target.getAttribute("data-choice");

    console.log(answerId);

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
    }

    loadQuestion(parseInt(answerSelected.getAttribute("data-choice")) + 1);
};

startButtonEl.addEventListener("click", startButtonHandler);
choiceEl.addEventListener("click", answerChoiceHandler);