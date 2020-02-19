var progressBar = 3.33;
var question = 0;
var partyPosition = ['pro', 'contra', 'none'];
var data = [];

var partyOpinion = document.getElementById('partyOpinion');
var opinionPage = document.getElementById('opinionPage');
var standTitle = document.getElementById('standTitle');
var standStatement = document.getElementById('standStatement');

standTitle.innerHTML = question + 1 + ". " + subjects[question].title;
standStatement.innerHTML = subjects[question].statement;

subjects.forEach(userInput => {
    userInput.myOpinion = "";
    userInput.important = false;
});

document.getElementById("noOpinion").addEventListener("click", function () {
    nextStatement();
});

function start() {
    document.getElementById("startPage").style.display = "none";
    document.getElementById("standPage").style.display = "block";
}

function backButton() {
    if (question == 0) {
        document.getElementById("startPage").style.display = "block";
        document.getElementById("standPage").style.display = "none";
    } else {
        question = question - 1;
        progressBar = progressBar - 3.33;
        routineFunction();
    }
}

function nextStatement(opinion) {
    question = question + 1;
    if (question == 29) {
        progressBar = 100;
    } else if (question == 30) {
        showResults();
    } else {
        progressBar = progressBar + 3.33;
    }

    subjects[question].myOpinion = opinion;
    routineFunction();
}

function routineFunction() {
    standTitle.innerHTML = question + 1 + ". " + subjects[question].title;
    standStatement.innerHTML = subjects[question].statement;

    document.getElementById("progressBar").style.width = progressBar.toString() + "%";
}

function showResults() { }