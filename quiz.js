let startPage = document.getElementById("start-page");
let startButton = document.getElementById("start-btn");
let quizPage = document.getElementById("quiz-page");
let nextBtn = document.getElementById("next-btn");
let numberOfQuestion = document.getElementById("num-of-question");
let displayQuestion = document.querySelector(".question-container");
let answerOptions = document.getElementById("answer-options");
let score = 0;
let timePerQuestion = 15;
let myNextInterval; 
let questionNumber = "1 of 5 Questions";

//Question set
const quizSet = [
    {
        question: " Which operator is used to assign a value to a variable?",
        choice1: "=",
        choice2: "*",
        choice3: "-",
        choice4: "x",
        answer: "="
    },
    {
        question: "What does HTML stand for?",
        choice1: "Hyper Text Markup Language",
        choice2: "Home Tool Markup Language",
        choice3: "HyperLinks and Tool Markup Language",
        choice4: "Hyper Tool Markup Language",
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Choose the correct HTML element for the largest heading:",
        choice1: "<head>",
        choice2: "<heading>",
        choice3: "<h1>",
        choice4: "<h6>",
        answer: "<h1>"
    },
    {
        question: "What is Git?",
        choice1: "A nickname of GitHub.",
        choice2: "A version control system.",
        choice3: "A remote repository platform.",
        choice4: "A programming Language",
        answer: "A version control system."
    },
    {
        question: "Which is the correct CSS syntax?",
        choice1: "body:color=black;",
        choice2: "body {color:black;}",
        choice3: "{body:color=black;}",
        choice4: "{body;color:black;}",
        answer: "body {color:black;}"
    }

];

// start quiz function
$(document).ready(function() {
    
    //alert("the page is loaded");
    $(quizPage).attr('class', 'd-none');
    $("#result-page").attr('class', 'd-none');
});

function startQuiz() {
    //hide the homepage container
    $(startPage).attr('class', 'd-none');
    $(quizPage).attr('class', 'h-100 d-flex align-items-center justify-content-center');
    for (let i = 1; i <= 4; i++) {
        $("#choice" + i).attr('class', 'btn btn-outline-info');
    }
    score = 0;
    questionNumber = "1 of 5 Questions";
    $("#num-of-question").text(questionNumber);
  // $("#result-page").attr('class', 'd-none');

    //display the first question
    const firstQuestion = quizSet[0];
    $("#question").text(firstQuestion.question);
    $("#choice1").text(firstQuestion.choice1);
    $("#choice2").text(firstQuestion.choice2);
    $("#choice3").text(firstQuestion.choice3);
    $("#choice4").text(firstQuestion.choice4);
    $("#qIdx").text("0");

    //set timer
    myNextInterval = setInterval(function () {
        timePerQuestion--;
        $("#timeLeft").text(timePerQuestion);

        if (timePerQuestion == 0) {
            for (let i = 1; i <= 4; i++) {
                $("#choice" + i).attr('class', 'btn btn-outline-info disabled');
            }
            //$("#timeLeft").text("0");
            clearInterval(myInterval);
        }
    }, 1000);
    //
}
//check the answer
function checkAnswer(choice) {
    //alert("choice="+choice);
    tmpQIdx = $("#qIdx").text();
    //alert("qIdx"+tmpQIdx);
    clearInterval(myNextInterval);

    const currentQuestion = quizSet[tmpQIdx];
    var currentAnswer = $("#" + choice).text();
    //alert("btn text="+ currentAnswer);
    //alert("final-anser="+ currentQuestion.answer);
    for (let i = 1; i <= 4; i++) {
        $("#choice" + i).attr('class', 'btn btn-outline-info disabled');
    }
    if (currentQuestion.answer === currentAnswer) {
        //alert("answer is CORRECT");
        $("#" + choice).attr('class', 'btn btn-success disabled');
        score++;
    }
    else {
        //alert("answer is WRONG");
        $("#" + choice).attr('class', 'btn btn-danger disabled');
    }
    stopTimer();
    if (tmpQIdx == (quizSet.length - 1)) {
        //alert("last question");
        $(quizPage).attr('class', 'd-none');
        //alert("Your score =  " +score);
        showScore();
    }

}

//display next question
//pick up the next index
//replace the next question

function showNextQuestion() {
    var qIdx = $("#qIdx").text();
    qIdx++;
    questionNumber =  (qIdx + 1) +" of 5 Questions";
    $("#num-of-question").text(questionNumber);
    const nextQuestion = quizSet[qIdx];
    $("#question").text(nextQuestion.question);
    $("#choice1").text(nextQuestion.choice1);
    $("#choice2").text(nextQuestion.choice2);
    $("#choice3").text(nextQuestion.choice3);
    $("#choice4").text(nextQuestion.choice4);
    $("#qIdx").text(qIdx);

    for (let i = 1; i <= 4; i++) {
        $("#choice" + i).attr('class', 'btn btn-outline-info');
    }
    //set timer
    timePerQuestion = 15; 
    $("#timeLeft").text(timePerQuestion);
    //myNextInterval = setInterval(myTimer, 1000);
    myNextInterval = setInterval(function () {
        
        $("#timeLeft").text(timePerQuestion);
        timePerQuestion--;
        if (timePerQuestion == 0) {
            for (let i = 1; i <= 4; i++) {
                $("#choice" + i).attr('class', 'btn btn-outline-info disabled');
            }
            //$("#timeLeft").text("0");
            clearInterval(myNextInterval);
        }
    }, 1000);

}
function myTimer() {
    timePerQuestion--;
    $("#timeLeft").text(timePerQuestion);

    if (timePerQuestion == 0) {
        for (let i = 1; i <= 4; i++) {
            $("#choice" + i).attr('class', 'btn btn-outline-info disabled');
        }
        //$("#timeLeft").text("0");
       // clearInterval(myNextInterval);
       stopTimer();
    }
}

function stopTimer() {
    clearInterval(myNextInterval);
}

// startPage.addEventListener('click', showHomePage);
function showHomePage() {
    $("#start-page").attr('class', 'h-100 d-flex align-items-center justify-content-center');
    $("#result-page").attr('class', 'd-none');
}

function showScore() {
    //alert("Score " + score);
    $("#result-page").attr('class', 'h-100 d-flex align-items-center justify-content-center scorePage')
    $("#displayScore").html("Your Score is: " + score);
}

