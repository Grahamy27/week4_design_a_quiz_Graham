var startButton = document.querySelector(".start-button");
var timerCountEl = document.querySelector("#timer");
var questionEl = document.getElementById("question");
var quizContainer = document.querySelector(".quiz-container");
var answerBtns = document.querySelector(".answer-btns"); // Changed this to singular form
var answerStatus = document.querySelector(".answer-status");
var inputForm = document.querySelector(".input-form");
var userInput = document.querySelector("#initials-input");
var submitBtn = document.getElementById("submit-btn");
var timer;
var timerCountdown = 60;
var index = 0;
var score = 0;
var highScoreArr = [];

function startQuiz() {
    if (index === myQuestions.length) {
        endQuiz();
        return; // Added a return statement to avoid further execution
    }

    startButton.style.display = "none";
    quizContainer.classList.replace("hide", "show");

    questionEl.textContent = myQuestions[index].question;

    answerBtns.innerHTML = ""; // Cleared previous answer buttons

    // Create and append new answer buttons for the current question
    for (let i = 0; i < myQuestions[index].answers.length; i++) {
        const btn = document.createElement("button");
        btn.setAttribute("class", "quiz-btn");
        btn.textContent = myQuestions[index].answers[i];
        answerBtns.appendChild(btn); // Append the new button to the answerBtns
    }
}

function setTimeLeft() {
    timer = setInterval(function () {
        timerCountdown--;
        timerCountEl.textContent = timerCountdown;
        if (timerCountdown <= 0) {
            endQuiz();
        }
    }, 1000);
}

answerBtns.addEventListener("click", function (event) {
    if (event.target.matches(".quiz-btn")) {
        checkAnswer(event.target.textContent);
    }
});

function checkAnswer(answer) {
    if (answer === myQuestions[index].correct) {
        answerStatus.textContent = "Correct!";
        answerStatus.style.color = "green";
        setTimeout(function () {
            answerStatus.innerHTML = "";
            index++;
            score++;
            startQuiz();
        }, 1000);
    } else {
        answerStatus.textContent = "Incorrect!";
        answerStatus.style.color = "red";
        setTimeout(function () {
            answerStatus.innerHTML = "";
            index++;
            timerCountdown -= 5;
            startQuiz();
        }, 1000);
    }
}

function endQuiz() {
    clearInterval(timer);
    timerCountdown = 60; // Reset the timerCountdown to its initial value
    quizContainer.style.display = "none";
    inputForm.classList.replace("hide", "show");
}

function storage() {
    var initials = userInput.value;
    if (initials !== "") {
        highScoreArr = JSON.parse(localStorage.getItem("highScores")) || [];
        var userObj = {
            initials: initials,
            score: score
        };
        highScoreArr.push(userObj);
        highScoreArr.sort((a, b) => b.score - a.score); // Sort high scores in descending order
        localStorage.setItem("highScores", JSON.stringify(highScoreArr));
        window.location.assign("scorePage.html");
    }
}

startButton.addEventListener("click", function () {
    startQuiz();
    setTimeLeft();
});

submitBtn.addEventListener("click", storage);

const myQuestions = [
    {
        question: "What does HTML stand for?",
        answers: [
            "Hyper Text Marker Label",
            "Hyper Text Makes Labels",
            "HyperText Markup Language",
            "How That Makes Leads"
        ],

        correct: "HyperText Markup Language"
    },

    {
        question: "What does CSS stand for?",
        answers: ["Cascading Style Shots", "Cascading Style Sheets", "Computer Style System"],

        correct: "Cascading Style Sheets"
    },

    {
        question: "What is LIFO?",
        answers: ["Last In First Out", "Last In Fight Out", "Late In First Out"],

        correct: "Last In First Out"
    },

    {
        question: "JavaScript, CSS & HTML will NOT work together!",
        answers: ["True", "False"],
        correct: "False"
    },
];

